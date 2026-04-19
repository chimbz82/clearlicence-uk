import React from 'react';
import { calculateRouteD } from '../../lib/engine/routeD';
import { CheckerResult } from '../../types';
import { DESIGNATED_COUNTRIES } from '../../lib/engine/routeA';

interface RouteDProps {
  onComplete: (results: CheckerResult, data: any) => void;
}

export default function RouteD_Theory({ onComplete }: RouteDProps) {
  const [formData, setFormData] = React.useState({
    country: 'India',
    category: 'B' as const,
    isEU: false,
    isValid: true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = calculateRouteD(formData);
    onComplete(result, formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <label className="block">
          <span className="block text-[12px] text-text-dim mb-2 uppercase tracking-[0.5px]">Origin Country</span>
          <select 
            value={formData.country}
            onChange={(e) => setFormData({...formData, country: e.target.value})}
            className="w-full bg-[#1C1C1F] border border-border-dim p-[14px] text-white rounded-lg text-[15px] outline-none focus:border-accent transition-colors"
          >
            {DESIGNATED_COUNTRIES.concat(['India', 'Pakistan', 'Nigeria', 'United States', 'China', 'Other']).sort().map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="block text-[12px] text-text-dim mb-2 uppercase tracking-[0.5px]">Vehicle Category</span>
          <select 
            value={formData.category}
            onChange={(e) => setFormData({...formData, category: e.target.value as any})}
            className="w-full bg-[#1C1C1F] border border-border-dim p-[14px] text-white rounded-lg text-[15px] outline-none focus:border-accent transition-colors"
          >
            <option value="B">Car (B)</option>
            <option value="A">Motorcycle (A)</option>
            <option value="C">Lorry (C)</option>
            <option value="D">Bus (D)</option>
          </select>
        </label>
      </div>

      <div className="flex flex-col gap-4 py-4">
        <label className="flex items-center gap-3 cursor-pointer">
          <input 
            type="checkbox"
            checked={formData.isEU}
            onChange={(e) => setFormData({...formData, isEU: e.target.checked})}
            className="w-5 h-5 rounded border-border-dim bg-[#1C1C1F] text-accent focus:ring-accent focus:ring-offset-bg"
          />
          <span className="text-sm text-text-main">Is this an EU/EEA issued licence?</span>
        </label>

        <label className="flex items-center gap-3 cursor-pointer">
          <input 
            type="checkbox"
            checked={formData.isValid}
            onChange={(e) => setFormData({...formData, isValid: e.target.checked})}
            className="w-5 h-5 rounded border-border-dim bg-[#1C1C1F] text-accent focus:ring-accent focus:ring-offset-bg"
          />
          <span className="text-sm text-text-main">Is the licence currently valid and unexpired?</span>
        </label>
      </div>

      <button
        type="submit"
        className="w-full mt-4 bg-accent text-[#000] border-none p-4 rounded-lg font-bold text-[15px] cursor-pointer uppercase tracking-[1px] hover:bg-[#F2C475] transition-colors"
      >
        View Required Tests →
      </button>
    </form>
  );
}
