import express from 'express';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { supabase } from './server/lib/supabase.js';
import { stripe } from './server/lib/stripe.js';
import { sendPaymentAlert } from './server/lib/mailer.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());

  // Webhook needs raw body for signature verification
  app.post('/api/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig!,
        process.env.STRIPE_WEBHOOK_SECRET!
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
          timestamp: new Date().toISOString()
        });

        console.log(`Payment confirmed for session ${sessionId}`);
      } catch (err) {
        console.error('Error fulfilling order:', err);
      }
    }

    res.json({ received: true });
  });

  app.use(express.json());

  // API Routes
  app.post('/api/leads', async (req, res) => {
    try {
      const { email, route_type, progress_snapshot, full_name } = req.body;
      const { data, error } = await supabase
        .from('leads')
        .insert([{ email, route_type, progress_snapshot, full_name }])
        .select();

      if (error) throw error;
      res.json(data[0]);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.post('/api/checkout', async (req, res) => {
    try {
      const { priceId, email, productName, leadId } = req.body;

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'gbp',
              product_data: {
                name: productName,
              },
              unit_amount: priceId === 'basic' ? 1900 : priceId === 'pro' ? 3900 : 6900,
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        customer_email: email,
        success_url: `${process.env.APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.APP_URL}/pricing`,
        metadata: {
          product_name: productName,
          lead_id: leadId
        }
      });

      // Log purchase attempt in Supabase
      await supabase.from('purchases').insert([{
        stripe_session_id: session.id,
        customer_email: email,
        product_name: productName,
        amount_gbp: session.amount_total ? session.amount_total / 100 : 0,
        fulfilled: false
      }]);

      res.json({ url: session.url });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
