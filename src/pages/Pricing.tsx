import React from 'react';
import PricingCards from '../components/Pricing/PricingCards';
import { ShieldCheck } from 'lucide-react';

export default function Pricing() {
  const handleSelect = async (tierId: string, name: string) => {
    try {
      const email = prompt('Please enter your email for the report:') || '';
      if (!email) return;

      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          priceId: tierId,
          email,
          productName: `ClearLicence ${name}`,
          leadId: 'temp_lead_001'
        })
      });

      const { url } = await response.json();
      if (url) window.location.href = url;
    } catch (err) {
      console.error('Checkout failed:', err);
      alert('Checkout failed. Please try again.');
    }
  };

  return (
    <div className="pt-32 pb-24 bg-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-[11px] font-bold uppercase tracking-wider mb-6">
            <ShieldCheck className="w-4 h-4" /> 100% Secure Checkout
          </div>
          <h1 className="text-5xl font-serif text-text-main mb-6 leading-[1.1]">Unlock Your Legal Roadmap</h1>
          <p className="text-lg text-text-dim leading-relaxed">
            Join 12,000+ drivers who protected their licence with an expert risk analysis report.
          </p>
        </div>

        <PricingCards onSelect={handleSelect} />

        <div className="mt-20 p-12 bg-surface rounded-2xl border border-border-dim flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-md">
            <h3 className="text-2xl font-serif text-text-main mb-4">Enterprise & Fleet?</h3>
            <p className="text-text-dim">We offer bulk checks for logistics companies and international recruitment agencies. Contact our commercial team for a custom quote.</p>
          </div>
          <button className="px-10 py-5 bg-transparent border border-text-dim text-text-main rounded-lg font-bold hover:bg-text-main hover:text-bg transition-all uppercase tracking-widest text-[13px]">
            Contact Commercial →
          </button>
        </div>
      </div>
    </div>
  );
}
