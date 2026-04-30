# ClearLicence UK

ClearLicence UK is a UK driving licence risk checker for immigrants and foreign nationals. The product flow is a free checker, locked risk results, then paid reports at £19, £39, and £69.

## Stack

- Vite, React, TypeScript
- Vercel static hosting and serverless API routes
- Supabase for leads and purchases
- Stripe Checkout and webhooks
- Nodemailer with Zoho SMTP for payment alerts

## Local Development

```bash
npm ci
npm run dev
```

Use Vercel for production API execution. The API routes live in `api/`:

- `api/leads.ts`
- `api/checkout.ts`
- `api/webhook.ts`

## Checks

```bash
npm run lint
npm run build
```

## Environment

Copy `.env.example` and fill real values in your deployment environment. Do not commit real secrets.

