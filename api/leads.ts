import type { VercelRequest, VercelResponse } from '@vercel/node';
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
}

