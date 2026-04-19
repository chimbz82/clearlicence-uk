import React from 'react';
import { DESIGNATED_COUNTRIES } from '../../lib/engine/routeA';
import { calculateRouteA } from '../../lib/engine/routeA';
import { CheckerResult } from '../../types';

interface RouteAProps {
  onComplete: (results: CheckerResult, data: any) => void;
}

export default function RouteA_Conversion({ onComplete }: RouteAProps) {
  const [formData, setFormData] = React.useState({
    country: 'Australia',
    isResident: true,
    residencyMonths: 0,
    hasVisa: true,
    licenceHeldYears: 2
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = calculateRouteA(formData);
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
            {DESIGNATED_COUNTRIES.concat(['Other / Non-Designated']).sort().map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="block text-[12px] text-text-dim mb-2 uppercase tracking-[0.5px]">Months as UK Resident</span>
          <input 
            type="number"
            min="0"
            value={formData.residencyMonths}
            onChange={(e) => setFormData({...formData, residencyMonths: parseInt(e.target.value) || 0})}
            className="w-full bg-[#1C1C1F] border border-border-dim p-[14px] text-white rounded-lg text-[15px] outline-none focus:border-accent transition-colors"
          />
        </label>

        <label className="block">
          <span className="block text-[12px] text-text-dim mb-2 uppercase tracking-[0.5px]">Licence Held (Years)</span>
          <input 
            type="number"
            min="0"
            value={formData.licenceHeldYears}
            onChange={(e) => setFormData({...formData, licenceHeldYears: parseInt(e.target.value) || 0})}
            className="w-full bg-[#1C1C1F] border border-border-dim p-[14px] text-white rounded-lg text-[15px] outline-none focus:border-accent transition-colors"
          />
        </label>

        <div className="flex items-center gap-4 pt-8">
          <label className="flex items-center gap-3 cursor-pointer">
            <input 
              type="checkbox"
              checked={formData.hasVisa}
              onChange={(e) => setFormData({...formData, hasVisa: e.target.checked})}
              className="w-5 h-5 rounded border-border-dim bg-[#1C1C1F] text-accent focus:ring-accent focus:ring-offset-bg"
            />
            <span className="text-sm text-text-main">I have a valid UK visa</span>
          </label>
        </div>
      </div>

      <button
        type="submit"
        className="w-full mt-4 bg-accent text-[#000] border-none p-4 rounded-lg font-bold text-[15px] cursor-pointer uppercase tracking-[1px] hover:bg-[#F2C475] transition-colors"
      >
        Run Eligibility Check →
      </button>
    </form>
  );
}
