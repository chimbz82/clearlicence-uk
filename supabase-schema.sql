CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  email TEXT,
  source TEXT DEFAULT 'clearlicence',
  route_type TEXT CHECK (route_type IN ('conversion','points','validity','theory')),
  progress_snapshot JSONB,
  full_name TEXT,
  stripe_session_id TEXT
);
CREATE TABLE IF NOT EXISTS purchases (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  stripe_session_id TEXT UNIQUE NOT NULL,
  stripe_customer_id TEXT,
  customer_email TEXT NOT NULL,
  product_name TEXT,
  amount_gbp INTEGER NOT NULL,
  fulfilled BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;
CREATE POLICY "service_role_all_leads" ON leads FOR ALL USING (true);
CREATE POLICY "service_role_all_purchases" ON purchases FOR ALL USING (true);
