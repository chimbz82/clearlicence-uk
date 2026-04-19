import React from 'react';
import { CheckCircle, Download, FileText, ArrowRight } from 'lucide-react';
import { useSearchParams, Link } from 'react-router-dom';

export default function Success() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');

  return (
    <div className="pt-32 pb-24 min-h-screen bg-bg">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <div className="w-24 h-24 bg-accent/10 border border-accent/20 rounded-full flex items-center justify-center mx-auto mb-8">
          <CheckCircle className="w-12 h-12 text-accent" />
        </div>
        
        <h1 className="text-4xl font-serif text-text-main mb-4">Payment Successful</h1>
        <p className="text-xl text-text-dim mb-12">Your ClearLicence Report is now unlocked and ready for download.</p>

        <div className="bg-surface rounded-2xl p-8 shadow-2xl border border-border-dim text-left mb-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="flex items-center justify-between mb-8 pb-8 border-b border-border-dim">
            <div>
              <h3 className="text-[10px] font-bold text-text-dim uppercase tracking-widest mb-1">Receipt ID</h3>
              <p className="font-mono text-xs text-text-main">{sessionId}</p>
            </div>
            <div className="text-right">
              <h3 className="text-[10px] font-bold text-text-dim uppercase tracking-widest mb-1">Status</h3>
              <span className="px-3 py-1 bg-accent/10 text-accent border border-accent/20 rounded-full text-[10px] font-bold uppercase tracking-widest">UNLOCKED</span>
            </div>
          </div>

          <div className="space-y-6 mb-10">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-bg border border-border-dim rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h4 className="font-bold text-text-main">Custom Risk Analysis</h4>
                <p className="text-xs text-text-dim">Breakdown of specific blockers by origin territory</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-bg border border-border-dim rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h4 className="font-bold text-text-main">Document Checklist</h4>
                <p className="text-xs text-text-dim">Required forms and original identification guides</p>
              </div>
            </div>
          </div>

          <button className="w-full py-5 bg-accent text-bg rounded-lg font-bold text-[13px] uppercase tracking-[1.5px] flex items-center justify-center gap-3 hover:bg-[#F2C475] transition-all group shadow-[0_0_20px_rgba(229,180,93,0.15)]">
            <Download className="w-5 h-5" /> Download Full PDF Report <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <p className="text-sm text-text-dim">
          A copy of your report and receipt has been sent to your email. <br />
          Need help? <Link to="/support" className="text-accent hover:text-white transition-colors underline underline-offset-4">Contact our concierge team</Link>.
        </p>
      </div>
    </div>
  );
}
