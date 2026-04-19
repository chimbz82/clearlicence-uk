import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { SEO_DATA_STORE } from '../../lib/seoData';
import MetaTags from '../../components/SEO/MetaTags';
import SchemaOrg from '../../components/SEO/SchemaOrg';
import { ArrowLeft, ChevronRight, Info, ShieldCheck } from 'lucide-react';

export default function DynamicSEOPage() {
  const { slug } = useParams();
  const data = SEO_DATA_STORE[slug || ''];

  if (!data) {
    return (
      <div className="pt-40 pb-20 text-center bg-bg min-h-screen">
        <h1 className="text-4xl font-serif text-text-main mb-4">Page Not Found</h1>
        <Link to="/" className="text-accent hover:underline">Return Home</Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 bg-bg min-h-screen">
      <MetaTags title={data.title} description={data.description} />
      <SchemaOrg type="Article" data={data} />
      <SchemaOrg type="FAQPage" data={data.faqs} />
      <SchemaOrg type="BreadcrumbList" data={[
        { name: 'Home', url: '/' },
        { name: 'Guides', url: '/guides' },
        { name: data.h1, url: `/${slug}` }
      ]} />

      <article className="max-w-4xl mx-auto px-4">
        <Link to="/" className="inline-flex items-center gap-2 text-[11px] font-bold text-text-dim hover:text-text-main mb-12 transition-colors group uppercase tracking-[1px]">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Checker
        </Link>
        
        <h1 className="text-5xl md:text-6xl font-serif text-text-main mb-10 leading-[1.1]">
          {data.h1}
        </h1>

        <div className="prose prose-lg max-w-none text-text-dim mb-16 leading-relaxed">
          <p className="mb-8 p-8 bg-surface rounded-2xl border-l-[3px] border-accent font-serif italic text-xl text-text-main">
            {data.intro}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 mb-12">
            <div className="p-8 bg-surface rounded-2xl border border-border-dim">
              <h3 className="text-xl font-serif text-text-main mb-4 flex items-center gap-2">
                <Info className="w-5 h-5 text-accent" /> Executive Summary
              </h3>
              <ul className="space-y-4 text-sm text-text-dim">
                <li className="flex gap-3"><span className="text-accent">•</span> Real-time DVLA 2026 rule matching</li>
                <li className="flex gap-3"><span className="text-accent">•</span> Territory specific conversion rules</li>
                <li className="flex gap-3"><span className="text-accent">•</span> Verification of insurance validity</li>
                <li className="flex gap-3"><span className="text-accent">•</span> Points threshold notifications</li>
              </ul>
            </div>
            <div className="p-8 bg-surface border border-accent/20 rounded-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-accent/5 pointer-events-none"></div>
              <h3 className="text-xl font-serif text-text-main mb-6 flex items-center gap-2 relative z-10">
                <ShieldCheck className="w-5 h-5 text-accent" /> Next Legal Steps
              </h3>
              <Link to="/#checker" className="block w-full text-center py-4 bg-accent text-bg rounded-lg font-bold text-[13px] hover:bg-[#F2C475] transition-colors uppercase tracking-[1.5px] relative z-10 shadow-[0_0_15px_rgba(229,180,93,0.15)]">
                Run Free Assessment →
              </Link>
            </div>
          </div>
        </div>

        <section className="mt-20 border-t border-border-dim pt-16">
          <h2 className="text-3xl font-serif text-text-main mb-12">Frequently Asked Questions</h2>
          <div className="space-y-8">
            {data.faqs.map((faq, i) => (
              <div key={i} className="group p-6 bg-surface rounded-xl border border-border-dim hover:border-text-dim transition-colors">
                <h3 className="font-serif text-xl text-text-main mb-4 flex items-start gap-4">
                  <span className="text-accent/50 font-sans font-bold text-sm mt-1">Q{i + 1}.</span> {faq.q}
                </h3>
                <p className="text-text-dim leading-relaxed md:pl-10">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Dynamic CTA */}
        <div className="mt-24 p-12 bg-surface border border-accent/20 rounded-2xl text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-accent/10 to-transparent pointer-events-none"></div>
          <h2 className="text-3xl md:text-4xl font-serif text-text-main mb-6 relative z-10">Avoid the £1,000 fine today</h2>
          <p className="text-lg text-text-dim mb-10 max-w-xl mx-auto relative z-10">
            Get an instant, legally-verified answer for your specific situation. No signup required.
          </p>
          <Link to="/#checker" className="inline-flex items-center gap-3 px-8 py-5 bg-accent text-bg rounded-lg font-bold text-[13px] uppercase tracking-[1.5px] hover:bg-[#F2C475] transition-all shadow-[0_0_20px_rgba(229,180,93,0.2)] group relative z-10">
            Check My Licence Status <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </article>
    </div>
  );
}
