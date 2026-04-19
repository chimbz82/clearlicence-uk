import React from 'react';
import { calculateRouteB } from '../../lib/engine/routeB';
import { CheckerResult } from '../../types';

interface RouteBProps {
  onComplete: (results: CheckerResult, data: any) => void;
}

export default function RouteB_Points({ onComplete }: RouteBProps) {
  const [formData, setFormData] = React.useState({
    points: 0,
    monthsSincePassing: 36
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = calculateRouteB(formData);
    onComplete(result, formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <label className="block">
          <span className="block text-[12px] text-text-dim mb-2 uppercase tracking-[0.5px]">Current Penalty Points</span>
          <input 
            type="number"
            min="0"
            max="20"
            value={formData.points}
            onChange={(e) => setFormData({...formData, points: parseInt(e.target.value) || 0})}
            className="w-full bg-[#1C1C1F] border border-border-dim p-[14px] text-white rounded-lg text-[15px] outline-none focus:border-accent transition-colors"
          />
        </label>

        <label className="block">
          <span className="block text-[12px] text-text-dim mb-2 uppercase tracking-[0.5px]">Months Since Passing Test</span>
          <input 
            type="number"
            min="0"
            value={formData.monthsSincePassing}
            onChange={(e) => setFormData({...formData, monthsSincePassing: parseInt(e.target.value) || 0})}
            className="w-full bg-[#1C1C1F] border border-border-dim p-[14px] text-white rounded-lg text-[15px] outline-none focus:border-accent transition-colors"
          />
        </label>
      </div>

      <button
        type="submit"
        className="w-full mt-4 bg-accent text-[#000] border-none p-4 rounded-lg font-bold text-[15px] cursor-pointer uppercase tracking-[1px] hover:bg-[#F2C475] transition-colors"
      >
        Check Ban Risk →
      </button>
    </form>
  );
}
