import type { VercelRequest, VercelResponse } from '@vercel/node';
import { stripe } from '../server/lib/stripe';
import { supabase } from '../server/lib/supabase';
import { sendPaymentAlert } from '../server/lib/mailer';

function setCorsHeaders(res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Stripe-Signature');
}

function readRawBody(req: VercelRequest): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];

    req.on('data', (chunk) => {
      chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
    });

    req.on('end', () => {
      resolve(Buffer.concat(chunks));
    });

    req.on('error', reject);
  });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  setCorsHeaders(res);

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const sig = req.headers['stripe-signature'];
  const stripeSignature = Array.isArray(sig) ? sig[0] : sig;
  let event;

  try {
    const rawBody = await readRawBody(req);
    event = stripe.webhooks.constructEvent(
      rawBody,
      stripeSignature!,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (err: any) {
    console.error(`Webhook Error: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as any;
    const sessionId = session.id;
    const customerEmail = session.customer_details?.email;
    const amountTotal = session.amount_total / 100;

    try {
      // Update purchase in Supabase
      const { error: purchaseError } = await supabase
        .from('purchases')
        .update({ fulfilled: true })
        .eq('stripe_session_id', sessionId);

      if (purchaseError) throw purchaseError;

      // Trigger email alerts
      await sendPaymentAlert({
        amount: amountTotal,
        tier: session.metadata?.product_name || 'ClearLicence Report',
        email: customerEmail || 'unknown',
        sessionId: sessionId,
        timestamp: new Date().toISOString(),
      });

      console.log(`Payment confirmed for session ${sessionId}`);
    } catch (err) {
      console.error('Error fulfilling order:', err);
    }
  }

  res.json({ received: true });
}

