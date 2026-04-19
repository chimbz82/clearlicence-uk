import React from 'react';
import { ShieldCheck, ChevronRight, Star, CheckCircle, Smartphone, Globe, Lock, Zap } from 'lucide-react';
import RouteSelector from '../components/Checker/RouteSelector';
import RouteA_Conversion from '../components/Checker/RouteA_Conversion';
import RouteB_Points from '../components/Checker/RouteB_Points';
import RouteC_Validity from '../components/Checker/RouteC_Validity';
import RouteD_Theory from '../components/Checker/RouteD_Theory';
import { CheckerResult } from '../types';
import ResultsGate from '../components/Checker/ResultsGate';

export default function Home() {
  const [selectedRoute, setSelectedRoute] = React.useState<string | null>(null);
  const [result, setResult] = React.useState<CheckerResult | null>(null);
  const [formData, setFormData] = React.useState<any>(null);

  const handleComplete = (res: CheckerResult, data: any) => {
    setResult(res);
    setFormData(data);
    // Auto-scroll to result
    setTimeout(() => {
      document.getElementById('result-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-40 pb-20 overflow-hidden bg-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[rgba(255,75,43,0.1)] border border-warning text-warning text-[11px] font-bold uppercase tracking-wider mb-6">
              UK Road Law Compliance 2026
            </div>
            <h1 className="text-5xl md:text-6xl font-serif text-text-main mb-6 leading-[1.1]">
              Check if your foreign licence is <b className="text-accent font-normal">valid</b> to drive in the UK — before you get a £1,000 fine.
            </h1>
            <p className="text-lg text-text-dim mb-10 leading-relaxed max-w-lg">
              Instant legal risk assessment for foreign nationals. Covering 22 designated countries, theory exemptions, and penalty thresholds. From £19.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-16">
              <a href="#checker" className="px-8 py-4 bg-accent text-bg rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-green hover:shadow-[0_0_25px_rgba(34,197,94,0.35)] transition-all uppercase tracking-widest text-sm group">
                Start Free Risk Check <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
            
            <div className="flex flex-wrap items-center gap-12 pt-10 border-t border-border-dim">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] text-text-dim uppercase tracking-[1px]">Last Update</span>
                <span className="text-[13px] font-medium text-text-main">Jan 12, 2026</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] text-text-dim uppercase tracking-[1px]">Jurisdiction</span>
                <span className="text-[13px] font-medium text-text-main">England & Wales</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] text-text-dim uppercase tracking-[1px]">Data Source</span>
                <span className="text-[13px] font-medium text-text-main">DVLA / Gov.UK</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Checker Tool */}
      <section id="checker" className="py-24 bg-surface border-t border-border-dim">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif text-text-main mb-4">UK Driving Risk Checker</h2>
            <p className="text-text-dim">Select your current situation to begin analysis</p>
          </div>

          <RouteSelector selected={selectedRoute} onSelect={(id) => { setSelectedRoute(id); setResult(null); }} />

          <div className="mt-12 bg-bg rounded-2xl p-8 md:p-12 border border-border-dim shadow-2xl relative overflow-hidden">
            {!selectedRoute ? (
              <div className="text-center py-12">
                <Smartphone className="w-12 h-12 text-border-dim mx-auto mb-4" />
                <p className="text-text-dim text-sm uppercase tracking-widest">Select a category above to load</p>
              </div>
            ) : (
              <>
                {selectedRoute === 'conversion' && <RouteA_Conversion onComplete={handleComplete} />}
                {selectedRoute === 'points' && <RouteB_Points onComplete={handleComplete} />}
                {selectedRoute === 'validity' && <RouteC_Validity onComplete={handleComplete} />}
                {selectedRoute === 'theory' && <RouteD_Theory onComplete={handleComplete} />}
              </>
            )}
          </div>

          {result && (
            <div id="result-section" className="mt-20">
              <ResultsGate result={result} onPay={() => {}} />
            </div>
          )}
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 bg-bg border-t border-border-dim">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-serif text-text-main mb-16 text-center">Common Questions</h2>
          <div className="grid gap-6">
            <div className="bg-surface p-8 rounded-xl border border-border-dim">
              <h3 className="font-serif text-xl text-text-main mb-3">Does an IDP extend my 12-month limit?</h3>
              <p className="text-text-dim leading-relaxed">No. An International Driving Permit is merely a translation of your licence. If your 12-month residency grace period has expired, an IDP will not make you legal to drive.</p>
            </div>
            <div className="bg-surface p-8 rounded-xl border border-border-dim">
              <h3 className="font-serif text-xl text-text-main mb-3">What happens if I exchange my licence too late?</h3>
              <p className="text-text-dim leading-relaxed">If you miss the 5-year exchange deadline for designated countries, you must apply for a UK provisional licence and take the full theory and practical tests from scratch.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
