import React from 'react';
import { Lock, CheckCircle, AlertTriangle, XCircle, AlertCircle, ArrowRight } from 'lucide-react';
import { CheckerResult } from '../../types';
import { Link } from 'react-router-dom';

interface ResultsGateProps {
  result: CheckerResult;
  onPay: () => void;
}

export default function ResultsGate({ result, onPay }: ResultsGateProps) {
  const normalizedStatus = result.status.toLowerCase();
  const isDanger = normalizedStatus.includes('not eligible') || normalizedStatus.includes('ban');
  const isWarning = normalizedStatus.includes('borderline') || normalizedStatus.includes('warning');

  const statusTone = isDanger
    ? {
        container: 'border-warning/20 bg-warning/5',
        text: 'text-warning',
      }
    : isWarning
      ? {
          container: 'border-accent/20 bg-accent/5',
          text: 'text-accent',
        }
      : {
          container: 'border-green/20 bg-green/5',
          text: 'text-green',
        };

  const StatusIcon = isDanger ? XCircle : isWarning ? AlertTriangle : CheckCircle;

  return (
    <div className="bg-surface rounded-2xl overflow-hidden shadow-2xl border border-border-dim animate-in fade-in zoom-in duration-500">
      <div className="bg-bg border-b border-border-dim p-8 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-accent/20 rounded-full blur-[100px] pointer-events-none"></div>
        <h2 className="text-3xl font-serif text-text-main mb-2 relative z-10">Initial Assessment Ready</h2>
        <p className="text-text-dim text-sm uppercase tracking-widest relative z-10">We have identified your risk profile</p>
      </div>

      <div className="p-8 space-y-8">
        <div className={`flex items-start gap-4 p-6 rounded-xl border ${statusTone.container}`}>
          <StatusIcon className={`w-8 h-8 mt-1 shrink-0 ${statusTone.text}`} />
          <div>
            <h3 className={`font-bold text-lg mb-1 tracking-wide ${statusTone.text}`}>Status: {result.status}</h3>
            <p className="text-text-dim leading-relaxed">{result.summary}</p>
          </div>
        </div>

        {/* Locked Sections */}
        <div className="relative">
          <div className="space-y-6 opacity-20 pointer-events-none select-none filter blur-[2px]">
            <div className="flex items-start gap-4 p-6 bg-bg rounded-xl border border-border-dim">
              <AlertCircle className="w-6 h-6 text-warning mt-1 shrink-0" />
              <div>
                <h4 className="font-bold text-text-main mb-2">Critical Risk Factors Identified (3)</h4>
                <div className="h-4 w-48 bg-border-dim rounded mb-2"></div>
                <div className="h-4 w-64 bg-border-dim rounded"></div>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 bg-bg rounded-xl border border-border-dim">
              <div className="w-6 h-6 rounded-full bg-border-dim text-text-dim flex items-center justify-center text-xs font-bold shrink-0">1</div>
              <div className="flex-1">
                <h4 className="font-bold text-text-main mb-2">Step-by-Step Action Plan</h4>
                <div className="h-4 w-full bg-border-dim rounded mb-2"></div>
                <div className="h-4 w-3/4 bg-border-dim rounded"></div>
              </div>
            </div>
          </div>

          <div className="absolute inset-0 flex items-center justify-center pointer-events-auto">
            <div className="bg-[#1C1C1F]/90 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-accent/20 text-center max-w-md w-full relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent pointer-events-none"></div>
              <div className="w-16 h-16 bg-accent/10 border border-accent/30 rounded-full flex items-center justify-center mx-auto mb-6 relative z-10">
                <Lock className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-2xl font-serif text-text-main mb-3 relative z-10">Report Locked</h3>
              <p className="text-text-dim mb-8 text-sm leading-relaxed relative z-10">
                To view your full risk breakdown, specific blocker details, and legal action plan, please select a report tier.
              </p>
              <Link
                to="/pricing"
                onClick={onPay}
                className="block w-full py-4 bg-accent text-bg rounded-lg font-bold text-[15px] uppercase tracking-[1px] hover:bg-green transition-all flex items-center justify-center gap-2 group relative z-10 shadow-[0_0_20px_rgba(229,180,93,0.2)] hover:shadow-[0_0_30px_rgba(34,197,94,0.4)]"
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
