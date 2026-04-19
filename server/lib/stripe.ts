import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const stripeSecretKey = process.env.STRIPE_SECRET_KEY || '';

if (!stripeSecretKey) {
  console.warn('STRIPE_SECRET_KEY missing. Payment operations will fail.');
}

export const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2025-01-27-acacia' as any,
});
