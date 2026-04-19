import React from 'react';
import { calculateRouteC } from '../../lib/engine/routeC';
import { CheckerResult } from '../../types';

interface RouteCProps {
  onComplete: (results: CheckerResult, data: any) => void;
}

export default function RouteC_Validity({ onComplete }: RouteCProps) {
  const [formData, setFormData] = React.useState({
    origin: 'Non-EU' as const,
    residencyMonths: 0,
    hasIDP: false,
    isExpired: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = calculateRouteC(formData);
    onComplete(result, formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <label className="block">
          <span className="block text-[12px] text-text-dim mb-2 uppercase tracking-[0.5px]">Licence Origin</span>
          <select 
            value={formData.origin}
            onChange={(e) => setFormData({...formData, origin: e.target.value as any})}
            className="w-full bg-[#1C1C1F] border border-border-dim p-[14px] text-white rounded-lg text-[15px] outline-none focus:border-accent transition-colors"
          >
            <option value="EU/EEA">EU / EEA Member State</option>
            <option value="Non-EU">Other International (Non-EU)</option>
          </select>
        </label>

        <label className="block">
          <span className="block text-[12px] text-text-dim mb-2 uppercase tracking-[0.5px]">UK Residency Time (Months)</span>
          <input 
            type="number"
            min="0"
            value={formData.residencyMonths}
            onChange={(e) => setFormData({...formData, residencyMonths: parseInt(e.target.value) || 0})}
            className="w-full bg-[#1C1C1F] border border-border-dim p-[14px] text-white rounded-lg text-[15px] outline-none focus:border-accent transition-colors"
          />
        </label>
      </div>

      <div className="flex flex-col gap-4 py-4">
        <label className="flex items-center gap-3 cursor-pointer">
          <input 
            type="checkbox"
            checked={formData.hasIDP}
            onChange={(e) => setFormData({...formData, hasIDP: e.target.checked})}
            className="w-5 h-5 rounded border-border-dim bg-[#1C1C1F] text-accent focus:ring-accent focus:ring-offset-bg"
          />
          <span className="text-sm text-text-main">I have an International Driving Permit (IDP)</span>
        </label>

        <label className="flex items-center gap-3 cursor-pointer">
          <input 
            type="checkbox"
            checked={formData.isExpired}
            onChange={(e) => setFormData({...formData, isExpired: e.target.checked})}
            className="w-5 h-5 rounded border-border-dim bg-[#1C1C1F] text-accent focus:ring-accent focus:ring-offset-bg"
          />
          <span className="text-sm text-text-main">My foreign licence is currently expired</span>
        </label>
      </div>

      <button
        type="submit"
        className="w-full mt-4 bg-accent text-[#000] border-none p-4 rounded-lg font-bold text-[15px] cursor-pointer uppercase tracking-[1px] hover:bg-[#F2C475] transition-colors"
      >
        Check Legal Validity →
      </button>
    </form>
  );
}
