import React from 'react';
import { Check, Shield, Zap, Crown } from 'lucide-react';
import { cn } from '../../lib/utils';

interface PricingTierProps {
  key?: React.Key;
  id: 'basic' | 'pro' | 'plus';
  name: string;
  price: number;
  icon: any;
  features: string[];
  popular?: boolean;
  onSelect: (id: string, name: string) => void;
}

function PricingCard({ id, name, price, icon: Icon, features, popular, onSelect }: PricingTierProps) {
  return (
    <div className={cn(
      "relative p-8 rounded-2xl border transition-all duration-300 flex flex-col h-full bg-surface group",
      popular ? "border-accent shadow-[0_0_30px_rgba(229,180,93,0.15)] scale-105 z-10" : "border-border-dim hover:border-text-dim"
    )}>
      {popular && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-bg px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[1.5px]">
          Most Popular
        </span>
      )}
      
      <div className={cn(
        "w-14 h-14 rounded-lg flex items-center justify-center mb-6 border",
        popular ? "bg-accent/10 border-accent text-accent" : "bg-bg border-border-dim text-text-dim"
      )}>
        <Icon className="w-6 h-6" />
      </div>

      <h3 className="text-xl font-serif text-text-main mb-2 tracking-wide">{name}</h3>
      <div className="flex items-baseline gap-1 mb-8">
        <span className="text-4xl font-sans font-normal text-text-main tracking-tight">£{price}</span>
        <span className="text-text-dim text-[11px] uppercase tracking-widest">/ one-time</span>
      </div>

      <ul className="space-y-4 mb-10 flex-1">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-4">
            <Check className={cn("w-4 h-4 shrink-0 mt-1", popular ? "text-accent" : "text-text-dim")} />
            <span className="text-[13px] text-text-dim leading-relaxed tracking-wide">{feature}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={() => onSelect(id, name)}
        className={cn(
          "w-full py-4 rounded-lg font-bold transition-all text-[13px] uppercase tracking-[1.5px]",
          popular 
            ? "bg-accent text-bg hover:bg-[#F2C475] shadow-[0_0_15px_rgba(229,180,93,0.2)]" 
            : "bg-transparent border border-border-dim text-text-main hover:border-text-main"
        )}
      >
        Get {name} →
      </button>
    </div>
  );
}

const tiers = [
  {
    id: 'basic' as const,
    name: 'Basic Report',
    price: 19,
    icon: Shield,
    features: ['Full risk assessment results', 'All blocker details unlocked', 'Verification of eligibility', 'PDF Report generation'],
  },
  {
    id: 'pro' as const,
    name: 'Professional',
    price: 39,
    icon: Zap,
    popular: true,
    features: ['Everything in Basic', 'Detailed regulation breakdown', 'Document checklist per country', 'DVLA form filling guide', 'Email support access'],
  },
  {
    id: 'plus' as const,
    name: 'Premium Plus',
    price: 69,
    icon: Crown,
    features: ['Everything in Pro', 'Custom Action Plan', 'Priority Concierge Support', '24h Turnaround Guarantee', 'Personal legal consultation booking'],
  },
];

export default function PricingCards({ onSelect }: { onSelect: (id: string, name: string) => void }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full items-stretch">
      {tiers.map((tier) => (
        <PricingCard 
          key={tier.id} 
          id={tier.id}
          name={tier.name}
          price={tier.price}
          icon={tier.icon}
          features={tier.features}
          popular={!!tier.popular}
          onSelect={onSelect} 
        />
      ))}
    </div>
  );
}
