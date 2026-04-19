export interface Lead {
  id: string;
  created_at: string;
  email: string;
  source: string;
  route_type: 'conversion' | 'points' | 'validity' | 'theory';
  progress_snapshot: any;
  full_name: string;
  stripe_session_id?: string;
}

export interface Purchase {
  id: string;
  stripe_session_id: string;
  stripe_customer_id: string;
  customer_email: string;
  product_name: string;
  amount_gbp: number;
  fulfilled: boolean;
  created_at: string;
}

export type RiskLevel = 'Safe' | 'Warning' | 'Eligible' | 'Borderline' | 'Not Eligible' | 'Ban Imminent' | 'Already Banned' | 'Valid' | 'Time-Limited' | 'Expired' | 'Invalid' | 'Full Test Required' | 'Theory Only' | 'Exchange Only' | 'Exempt';

export interface CheckerResult {
  status: RiskLevel;
  summary: string;
  blockers: string[];
  nextSteps: string[];
}
