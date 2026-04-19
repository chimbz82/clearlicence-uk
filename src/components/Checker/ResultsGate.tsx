import React from 'react';
import { Lock, CheckCircle2, AlertTriangle, XCircle, ArrowRight } from 'lucide-react';
import { CheckerResult } from '../../types';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';

interface ResultsGateProps {
  result: CheckerResult;
  onPay: () => void;
}

function StatusIcon({ status }: { status: string }) {
  if (status === 'Eligible' || status === 'Safe')
    return <CheckCircle2 className="w-8 h-8 text-green mt-1 shrink-0 pulse-green" />;
  if (status === 'Borderline' || status === 'Warning')
    return <AlertTriangle className="w-8 h-8 text-amber mt-1 shrink-0" />;
  return <XCircle className="w-8 h-8 text-red mt-1 shrink-0" />;
}

function statusStyle(status: string) {
  if (status === 'Eligible' || status === 'Safe')
    return 'border-green/20 bg-green/5';
  if (status === 'Borderline' || status === 'Warning')
    return 'border-amber/20 bg-amber/5';
  return 'border-red/20 bg-red/5';
}

function statusTextColour(status: string) {
  if (status === 'Eligible' || status === 'Safe') return 'text-green';
  if (status === 'Borderline' || status === 'Warning') return 'text-amber';
  return 'text-red';
}

export default function ResultsGate({ result, onPay }: ResultsGateProps) {
  return (
    <div className="bg-surface rounded-2xl overflow-hidden shadow-2xl border border-border-dim">
      {/* Header */}
      <div className="bg-bg border-b border-border-dim p-8 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-amber/10 rounded-full blur-[100px] pointer-events-none" />
        <h2 className="text-3xl font-serif text-text-main mb-2 relative z-10">Initial Assessment Ready</h2>
        <p className="text-text-dim text-sm uppercase tracking-widest relative z-10">We have identified your risk profile</p>
      </div>

      <div className="p-8 space-y-8">
        {/* Status — traffic light colour */}
        <div className={cn('flex items-start gap-4 p-6 rounded-xl border', statusStyle(result.status))}>
          <StatusIcon status={result.status} />
          <div>
            <h3 className={cn('font-bold text-lg mb-1 tracking-wide', statusTextColour(result.status))}>
              Status: {result.status}
            </h3>
            <p className="text-text-dim leading-relaxed">{result.summary}</p>
          </div>
        </div>

        {/* Locked sections */}
        <div className="relative">
          <div className="space-y-6 opacity-20 pointer-events-none select-none filter blur-[2px]">
            <div className="flex items-start gap-4 p-6 bg-bg rounded-xl border border-border-dim">
              <AlertTriangle className="w-6 h-6 text-red mt-1 shrink-0" />
              <div>
                <h4 className="font-bold text-text-main mb-2">Critical Risk Factors Identified (3)</h4>
                <div className="h-4 w-48 bg-border-dim rounded mb-2" />
                <div className="h-4 w-64 bg-border-dim rounded" />
              </div>
            </div>
            <div className="flex items-start gap-4 p-6 bg-bg rounded-xl border border-border-dim">
              <div className="w-6 h-6 rounded-full bg-border-dim flex items-center justify-center text-xs font-bold shrink-0">1</div>
              <div className="flex-1">
                <h4 className="font-bold text-text-main mb-2">Step-by-Step Action Plan</h4>
                <div className="h-4 w-full bg-border-dim rounded mb-2" />
                <div className="h-4 w-3/4 bg-border-dim rounded" />
              </div>
            </div>
          </div>

          {/* Paywall overlay */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-auto">
            <div className="bg-[#1C1C1F]/90 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-amber/20 text-center max-w-md w-full relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-amber/5 to-transparent pointer-events-none" />
              <div className="w-16 h-16 bg-amber/10 border border-amber/30 rounded-full flex items-center justify-center mx-auto mb-6 relative z-10">
                <Lock className="w-8 h-8 text-amber" />
              </div>
              <h3 className="text-2xl font-serif text-text-main mb-3 relative z-10">Report Locked</h3>
              <p className="text-text-dim mb-8 text-sm leading-relaxed relative z-10">
                To view your full risk breakdown, specific blocker details, and legal action plan, select a report tier.
              </p>
              <Link
                to="/pricing"
                className="block w-full py-4 bg-amber text-bg rounded-lg font-bold text-[15px] uppercase tracking-[1px]
                           transition-all duration-300 flex items-center justify-center gap-2 group relative z-10
                           hover:bg-green hover:shadow-[0_0_30px_rgba(34,197,94,0.4)]"
              >
                Unlock My Full Report <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
