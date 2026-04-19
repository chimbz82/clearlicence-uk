-- ClearLicence UK Supabase Schema

-- Leads Table
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    email TEXT,
    full_name TEXT,
    route_type TEXT,
    progress_snapshot JSONB
);

-- Purchases Table
CREATE TABLE IF NOT EXISTS public.purchases (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    stripe_session_id TEXT UNIQUE NOT NULL,
    customer_email TEXT,
    product_name TEXT,
    amount_gbp NUMERIC(10, 2),
    fulfilled BOOLEAN DEFAULT false
);

-- Row Level Security (RLS)
-- Enable RLS on both tables
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.purchases ENABLE ROW LEVEL SECURITY;

-- Create policies for service role access (backend API)
-- These allow the backend service role to perform all operations, while public access is disabled
CREATE POLICY "Enable all for service-role" ON public.leads
    FOR ALL
    USING (auth.uid() IS NULL); -- We are using service_role key, so we don't rely on auth.uid() here. Alternatively, just rely on service_role bypassing RLS natively.

CREATE POLICY "Enable all for service-role" ON public.purchases
    FOR ALL
    USING (auth.uid() IS NULL);

-- It's best practice to allow postgres and service_role to bypass RLS natively, 
-- so if you are using the service_role key in the backend, RLS is bypassed automatically.
