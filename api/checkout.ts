import type { VercelRequest, VercelResponse } from '@vercel/node';
import { stripe } from '../server/lib/stripe';
import { supabase } from '../server/lib/supabase';

function setCorsHeaders(res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  setCorsHeaders(res);

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { priceId, email, productName, leadId } = req.body;

    const PRICE_MAP = {
      basic: 'price_1TNj5RDb7CYzRjW63rMfroyM',
      pro: 'price_1TNj63Db7CYzRjW6mL7NLg3I',
      'pro-plus': 'price_1TNj6iDb7CYzRjW6xdiGs4Or',
    };
    const stripePriceId = PRICE_MAP[priceId as keyof typeof PRICE_MAP] || priceId;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{ price: stripePriceId, quantity: 1 }],
      mode: 'payment',
      customer_email: email,
      success_url: `${process.env.APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.APP_URL}/pricing`,
      metadata: {
        product_name: productName,
        lead_id: leadId,
      },
    });

    // Log purchase attempt in Supabase
    await supabase.from('purchases').insert([
      {
        stripe_session_id: session.id,
        customer_email: email,
        product_name: productName,
        amount_gbp: session.amount_total ? session.amount_total / 100 : 0,
        fulfilled: false,
      },
    ]);

    res.json({ url: session.url });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

