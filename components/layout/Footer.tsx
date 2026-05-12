'use client';

import { Github, Linkedin, Mail, Heart } from 'lucide-react';
import { PERSONAL, NAV_ITEMS } from '@/lib/constants';

/** Site footer with social links and quick nav */
export function Footer() {
  const scrollTo = (href: string) => {
    const id = href.replace('#', '');
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/5 overflow-hidden">
      {/* Top gradient border */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #00F5FF, #7C3AED, transparent)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center font-syne font-bold text-lg"
                style={{
                  background: 'linear-gradient(135deg, rgba(0,245,255,0.15), rgba(124,58,237,0.15))',
                  border: '1px solid rgba(0,245,255,0.3)',
                }}
              >
                <span className="gradient-text">AT</span>
              </div>
              <span className="font-syne font-bold text-lg text-[var(--text-primary)]">
                Ansh Tripathi
              </span>
            </div>
            <p className="text-sm text-[var(--text-muted)] max-w-xs">
              AI/ML Engineer · Full Stack Developer · Building at the intersection of ML and modern web.
            </p>
          </div>

          {/* Quick Nav */}
          <div className="flex flex-col gap-2">
            <p className="text-xs font-outfit font-semibold text-[var(--text-muted)] uppercase tracking-widest mb-1">
              Navigation
            </p>
            {NAV_ITEMS.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollTo(item.href)}
                className="text-sm text-[var(--text-secondary)] hover:text-[#00F5FF] transition-colors text-left w-fit"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Social */}
          <div>
            <p className="text-xs font-outfit font-semibold text-[var(--text-muted)] uppercase tracking-widest mb-3">
              Connect
            </p>
            <div className="flex gap-3">
              {[
                { href: PERSONAL.github, icon: Github, label: 'GitHub', color: '#fff' },
                { href: `https://${PERSONAL.linkedin}`, icon: Linkedin, label: 'LinkedIn', color: '#0A66C2' },
                { href: `mailto:${PERSONAL.email}`, icon: Mail, label: 'Email', color: '#00F5FF' },
              ].map(({ href, icon: Icon, label, color }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center transition-all duration-200 hover:scale-110"
                  style={{ ['--hover-color' as string]: color }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = `${color}60`;
                    (e.currentTarget as HTMLElement).style.color = color;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = '';
                    (e.currentTarget as HTMLElement).style.color = '';
                  }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[var(--text-muted)]">
          <span className="flex items-center gap-1">
            Built with <Heart size={12} className="text-[#F43F5E] mx-1" fill="currentColor" /> by Ansh Tripathi · 2026
          </span>
          <span>Open Source — MIT License</span>
        </div>
      </div>
    </footer>
  );
}
