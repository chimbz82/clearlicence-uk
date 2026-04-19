import React from 'react';
import { RefreshCw, AlertTriangle, Clock, GraduationCap } from 'lucide-react';
import { cn } from '../../lib/utils';

interface RouteSelectorProps {
  onSelect: (route: string) => void;
  selected: string | null;
}

const routes = [
  { id: 'conversion', icon: RefreshCw, title: 'Licence Conversion', desc: 'Can I swap my licence without a test?' },
  { id: 'points', icon: AlertTriangle, title: 'Penalty Points', desc: 'Am I at risk of a driving ban?' },
  { id: 'validity', icon: Clock, title: 'Validity Check', desc: 'How long can I drive on my current ID?' },
  { id: 'theory', icon: GraduationCap, title: 'Theory & Practical', desc: 'What tests do I actually need?' },
];

export default function RouteSelector({ onSelect, selected }: RouteSelectorProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      {routes.map((route) => (
        <button
          key={route.id}
          onClick={() => onSelect(route.id)}
          className={cn(
            "p-6 rounded-xl text-left transition-all duration-300 border group bg-surface",
            selected === route.id
              ? "border-accent bg-accent/5 shadow-[0_0_20px_rgba(229,180,93,0.15)]"
              : "border-border-dim hover:border-green hover:bg-green/5 hover:shadow-[0_0_20px_rgba(34,197,94,0.12)]"
          )}
        >
          <div className={cn(
            "w-12 h-12 rounded-lg mb-4 flex items-center justify-center transition-colors border",
            selected === route.id
              ? "bg-accent/10 border-accent text-accent"
              : "bg-bg border-border-dim text-text-dim group-hover:border-green group-hover:text-green"
          )}>
            <route.icon className="w-6 h-6" />
          </div>
          <h3 className={cn(
            "font-serif text-lg mb-1 transition-colors",
            selected === route.id ? "text-accent" : "text-text-main group-hover:text-green"
          )}>{route.title}</h3>
          <p className="text-xs text-text-dim leading-relaxed transition-colors group-hover:text-green/80">{route.desc}</p>
        </button>
      ))}
    </div>
  );
}
