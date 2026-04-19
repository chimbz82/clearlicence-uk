import React from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Header() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 bg-bg/90 backdrop-blur-md z-50 border-b border-border-dim">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center gap-2">
            <span className="font-serif font-bold text-2xl tracking-tight text-text-main">
              Clear<span className="text-amber">Licence</span> <span className="text-text-dim text-lg">UK</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {[
              { to: '/#checker', label: 'Checker' },
              { to: '/pricing',  label: 'Pricing'  },
              { to: '/#faq',     label: 'FAQ'       },
            ].map(({ to, label }) => (
              <Link
                key={label}
                to={to}
                className="text-sm uppercase tracking-widest text-text-dim transition-colors duration-200 hover:text-green"
              >
                {label}
              </Link>
            ))}
            {/* CTA — amber → green on hover (traffic light: amber = ready, green = go) */}
            <Link
              to="/#checker"
              className="px-6 py-3 bg-amber text-bg rounded-lg text-sm font-bold uppercase tracking-widest
                         transition-all duration-300
                         hover:bg-green hover:shadow-[0_0_20px_rgba(34,197,94,0.35)]"
            >
              Check Now
            </Link>
          </nav>

          <button
            className="md:hidden p-2 text-text-dim hover:text-green transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-surface border-b border-border-dim px-4 pt-4 pb-8 flex flex-col gap-6 shadow-2xl">
          {[
            { to: '/#checker', label: 'Checker' },
            { to: '/pricing',  label: 'Pricing'  },
            { to: '/#faq',     label: 'FAQ'       },
          ].map(({ to, label }) => (
            <Link
              key={label}
              to={to}
              className="text-sm uppercase tracking-widest text-text-dim hover:text-green transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {label}
            </Link>
          ))}
          <Link
            to="/#checker"
            className="w-full py-4 bg-amber text-bg rounded-lg text-center text-sm font-bold uppercase tracking-widest
                       mt-2 transition-all duration-300 hover:bg-green hover:shadow-[0_0_20px_rgba(34,197,94,0.35)]"
            onClick={() => setIsOpen(false)}
          >
            Start Free Check
          </Link>
        </div>
      )}
    </header>
  );
}
