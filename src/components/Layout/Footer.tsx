import React from 'react';
import { ShieldCheck, Mail, MapPin, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-surface pt-16 pb-8 border-t border-border-dim">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <span className="font-serif font-bold text-2xl tracking-tight text-text-main">
                Clear<span className="text-accent">Licence</span> UK
              </span>
            </div>
            <p className="text-text-dim max-w-sm mb-6 leading-relaxed">
              Protecting foreign drivers in the UK from unnecessary fines and legal complications since 2024. Expert guidance based on DVLA 2026 standards.
            </p>
            <div className="flex items-center gap-4 text-sm text-text-dim">
              <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> London, SE1</span>
              <span className="flex items-center gap-1.5"><Mail className="w-4 h-4" /> help@clearlicence.co.uk</span>
            </div>
          </div>

          <div>
            <h4 className="font-serif text-lg tracking-wide text-text-main mb-6">Product</h4>
            <ul className="space-y-4">
              <li><Link to="/#checker" className="text-sm text-text-dim hover:text-accent transition-colors">Free Risk Checker</Link></li>
              <li><Link to="/pricing" className="text-sm text-text-dim hover:text-accent transition-colors">Premium Reports</Link></li>
              <li><Link to="/success" className="text-sm text-text-dim hover:text-accent transition-colors">Sample Report</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg tracking-wide text-text-main mb-6">Resources</h4>
            <ul className="space-y-4 text-sm text-text-dim">
              <li><a href="https://www.gov.uk/exchange-foreign-driving-licence" target="_blank" className="flex items-center gap-1 hover:text-accent transition-colors">DVLA Official <ExternalLink className="w-3 h-3" /></a></li>
              <li><a href="/sitemap.xml" className="hover:text-accent transition-colors">Sitemap</a></li>
              <li><Link to="/#faq" className="hover:text-accent transition-colors">Common Questions</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border-dim pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-text-dim">
            © 2026 ClearLicence UK. Not affiliated with the DVLA or UK Government.
          </p>
          <div className="flex gap-8 text-xs text-text-dim font-medium tracking-[1px] uppercase">
            <span className="hover:text-text-main cursor-pointer transition-colors">PRIVACY POLICY</span>
            <span className="hover:text-text-main cursor-pointer transition-colors">TERMS OF SERVICE</span>
            <span className="hover:text-text-main cursor-pointer transition-colors">COOKIES</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
