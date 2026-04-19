import React from 'react';
import { RefreshCw, AlertTriangle, Clock, GraduationCap } from 'lucide-react';
import { cn } from '../../lib/utils';

const routes = [
  {
    id: 'conversion',
    icon: RefreshCw,
    label: 'Licence Conversion',
    desc: 'Can I swap my licence without a test?',
  },
  {
    id: 'points',
    icon: AlertTriangle,
    label: 'Penalty Points',
    desc: 'Am I at risk of a driving ban?',
  },
  {
    id: 'validity',
    icon: Clock,
    label: 'Validity Check',
    desc: 'How long can I drive on my current ID?',
  },
  {
    id: 'theory',
    icon: GraduationCap,
    label: 'Theory & Practical',
    desc: 'What tests do I actually need?',
  },
];

interface Props {
  selected: string | null;
  onSelect: (id: string) => void;
}

export default function RouteSelector({ selected, onSelect }: Props) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {routes.map(({ id, icon: Icon, label, desc }) => {
        const isActive = selected === id;
        return (
          <button
            key={id}
            onClick={() => onSelect(id)}
            className={cn(
              'p-6 rounded-xl border text-left cursor-pointer transition-all duration-300 group',
              isActive
                ? 'border-amber bg-amber/5 shadow-[0_0_20px_rgba(229,180,93,0.15)]'
                : 'border-border-dim bg-surface hover:border-green hover:bg-green/5 hover:shadow-[0_0_20px_rgba(34,197,94,0.12)]'
            )}
          >
            <Icon
              className={cn(
                'w-5 h-5 mb-3 transition-colors duration-300',
                isActive ? 'text-amber' : 'text-text-dim group-hover:text-green'
              )}
            />
            <p className={cn(
              'font-semibold text-sm mb-1 transition-colors duration-300',
              isActive ? 'text-amber' : 'text-text-main group-hover:text-green'
            )}>
              {label}
            </p>
            <p className="text-text-dim text-xs leading-relaxed">{desc}</p>
          </button>
        );
      })}
    </div>
  );
}
