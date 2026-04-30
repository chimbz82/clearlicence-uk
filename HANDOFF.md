# HANDOFF.md

## 1. Mission
ClearLicence UK is a UK driving licence risk checker for immigrants and foreign nationals. Free checker → locked results → paid report (£19/£39/£69). Target user is about to drive illegally and risk a £1,000 fine. Revenue is the goal — get to first payment.

## 2. Current State

### ✅ Working and verified
- Vite + React + TypeScript frontend deployed at https://clearlicence-uk.vercel.app (commit 5468d28)
- GitHub repo: https://github.com/chimbz82/clearlicence-uk (branch: main)
- Vercel project: clearlicence-uk under team simbas-projects-eab09361
- Traffic light colour system applied: red=#FF4B2B, amber=#E5B45D, green=#22C55E
- All 4 checker routes built: RouteA_Conversion, RouteB_Points, RouteC_Validity, RouteD_Theory
- Stripe products created in ClearLicence UK sandbox account (under LIONTECH INNOVATIONS LTD org)
- Supabase project created at https://bgnsxbbqrxpsgxvexjsz.supabase.co (liontechino@gmail.com account)

### ❌ Not done yet
- Supabase SQL schema NOT run yet — tables do not exist
- Vercel serverless API routes are now the backend — Railway is no longer required
- Stripe webhook NOT configured — STRIPE_WEBHOOK_SECRET is placeholder
- Email alerts NOT tested — Zoho SMTP creds not yet entered
- Domain clearlicence.co.uk NOT purchased yet (deferred until ClearVisa first payout)

### ⚡ Next action
Run the Supabase SQL schema. Go to https://supabase.com → liontechino@gmail.com → clearlicenceuk project → SQL Editor → run the contents of supabase-schema.sql in the repo root.

## 3. Decisions Made

- **Decision:** Supabase project on separate account (liontechino@gmail.com) not main account (chimbz.fm@gmail.com)
  **Reason:** Main account hit 2-project free tier limit (clearvisauk + expatnannies both active)
  **Reversibility:** Easy to migrate later if upgraded to Pro

- **Decision:** Stripe products in ClearLicence UK sub-account under LIONTECH INNOVATIONS LTD org
  **Reason:** Keeps finances separate per product, same login
  **Reversibility:** Load-bearing — price IDs are hardcoded in api/checkout.ts PRICE_MAP

- **Decision:** Frontend and backend both run on Vercel
  **Reason:** Express was converted to Vercel serverless API routes, removing the Railway dependency
  **Reversibility:** Easy to change if a persistent backend becomes necessary

- **Decision:** Using Zoho SMTP (smtp.zoho.eu:465) for payment alert emails
  **Reason:** Already used on other products (ExpatNannies)
  **Reversibility:** Easy to swap to SendGrid later

- **Decision:** .co.uk domain deferred — using clearlicence-uk.vercel.app until ClearVisa pays out
  **Reason:** clearlicence.co.uk is TAKEN — broker fee £77.99. Not worth it now.
  **Reversibility:** Easy — add custom domain in Vercel settings in 2 minutes when ready

- **Decision:** No unit tests — ship first, test later
  **Reversibility:** Fine for now

## 4. Architecture & Key Files

```
clearlicence-uk/
├── src/
│   ├── components/
│   │   ├── Checker/
│   │   │   ├── RouteA_Conversion.tsx   — Foreign licence conversion checker (22 designated countries)
│   │   │   ├── RouteB_Points.tsx       — Penalty points / ban risk checker
│   │   │   ├── RouteC_Validity.tsx     — Licence validity timeline checker
│   │   │   ├── RouteD_Theory.tsx       — Theory/practical test requirements
│   │   │   ├── RouteSelector.tsx       — 4-tab route picker (traffic light hover: green)
│   │   │   └── ResultsGate.tsx         — Free result + paywall lock (amber→green CTA)
│   │   ├── Layout/
│   │   │   └── Header.tsx              — Nav + CTA (amber→green hover)
│   │   └── Pricing/
│   │       └── PricingCards.tsx        — £19/£39/£69 cards (popular=amber, hover=green)
│   ├── lib/
│   │   ├── engine/
│   │   │   ├── routeA.ts              — DVLA conversion logic (22 countries list)
│   │   │   ├── routeB.ts              — Totting-up rules (12pts=ban, new driver 6pt rule)
│   │   │   ├── routeC.ts              — 12-month residency validity logic
│   │   │   └── routeD.ts              — Test requirements by nationality
│   │   ├── supabase.ts                — Supabase client (anon key)
│   │   └── seoData.ts                 — 140+ SEO page data
│   ├── pages/
│   │   ├── Home.tsx                   — Hero + checker + FAQ
│   │   ├── Pricing.tsx                — Pricing page
│   │   ├── Success.tsx                — Post-payment success
│   │   └── seo/
│   │       └── DynamicSEOPage.tsx     — Handles all 140+ programmatic SEO routes
│   ├── index.css                      — Traffic light design system (DO NOT revert colours)
│   └── App.tsx                        — React Router routes
├── api/
│   ├── leads.ts                       — POST /api/leads, saves lead to Supabase
│   ├── checkout.ts                    — POST /api/checkout, creates Stripe Checkout session
│   └── webhook.ts                     — POST /api/webhook, Stripe fulfillment + payment alert
├── supabase-schema.sql                — Run this in Supabase SQL Editor (NOT RUN YET)
├── vercel.json                        — X-Robots-Tag headers and Vercel API function runtime
├── vite.config.ts                     — Vite config
└── .env.example                       — All placeholder values (real values in Vercel dashboard)
```

## 5. Gotchas & Hard-Won Knowledge

- **clearlicence.co.uk is TAKEN** — do not try to register it. Use vercel URL until broker deal or alternative domain.
- **Supabase free tier = 2 active projects max** — liontechino@gmail.com account has 0 projects currently so ClearLicence is the only one. Do not create more projects on that account without pausing ClearLicence first.
- **Stripe MCP is connected to ExpatNannies (acct_1SliWAFwFeavywBN)** — cannot use Claude's Stripe MCP to manage ClearLicence Stripe account. Must use dashboard directly or pass secret key explicitly.
- **PRICE_MAP in api/checkout.ts** — the checkout handler maps tier strings (basic/pro/pro-plus) to real Stripe price IDs. Do not change these IDs:
  - basic: price_1TNj5RDb7CYzRjW63rMfroyM (£19)
  - pro: price_1TNj63Db7CYzRjW6mL7NLg3I (£39)
  - pro-plus: price_1TNj6iDb7CYzRjW6xdiGs4Or (£69)
- **STRIPE_WEBHOOK_SECRET is placeholder** — Stripe webhook will fail until the real Vercel webhook secret is added
- **GitHub secret scanning** — .env.example was flagged for containing real Supabase service role key. It now has placeholders only. Never commit real secrets.
- **Vercel env var import** — manual entry threw "invalid characters" error. Always use "Import .env" button with a downloaded .env file instead.

## 6. Conventions In Play

- Commits: imperative present tense — "Fix: ...", "Design: ...", "Add: ..."
- All changes made via VSCode Copilot Agent — never direct file edits from Claude.ai (token waste)
- Colours: NEVER use hardcoded hex in components — use CSS variables from index.css
  - --color-amber: #E5B45D (CTA default)
  - --color-green: #22C55E (hover/success)
  - --color-red: #FF4B2B (danger/urgency)
  - --color-bg: #0A0A0B
  - --color-surface: #141416
- No unit tests — prototyping phase
- SEO pages use DynamicSEOPage.tsx with data from seoData.ts — do not create individual page files

## 7. Open Questions

1. What is the Zoho sending email address for ClearLicence? (needed for ZOHO_EMAIL env var on Vercel)
2. What is the Zoho app password? (needed for ZOHO_APP_PASSWORD env var on Vercel)
3. Once domain is purchased — should it be added to Vercel only, or also GoDaddy DNS needs configuring?

## 8. Do Not Touch

- `src/index.css` colour variables — traffic light system is locked, do not revert or rename
- Stripe price IDs in `api/checkout.ts` PRICE_MAP — these are live sandbox products
- Supabase project ref `bgnsxbbqrxpsgxvexjsz` — do not delete or pause this project
- `src/lib/engine/` files — DVLA rules logic, do not simplify or mock
- Vercel project name `clearlicence-uk` — changing it breaks the deployment URL

## 9. Resume Command

> "Read HANDOFF.md. The Supabase SQL schema has not been run yet — run supabase-schema.sql in the SQL Editor at https://supabase.com (login: liontechino@gmail.com, project: clearlicenceuk). Then add all backend env vars to Vercel (SUPABASE_SERVICE_ROLE_KEY, STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, ZOHO_EMAIL, ZOHO_APP_PASSWORD, ALERT_EMAIL_1, ALERT_EMAIL_2, APP_URL). Then configure the Stripe webhook URL to https://clearlicence-uk.vercel.app/api/webhook and redeploy. Do not touch src/index.css colours or Stripe price IDs. Confirm before making changes outside these tasks."
