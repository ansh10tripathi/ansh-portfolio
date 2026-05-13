'use client';

import { Github, Linkedin, Mail, Heart } from 'lucide-react';
import { PERSONAL, NAV_ITEMS } from '@/lib/constants';

export function Footer() {
  const scrollTo = (href: string) => {
    document.getElementById(href.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer
      className="relative overflow-hidden"
      style={{ background: 'var(--bg-elevated)', borderTop: '1px solid var(--border-subtle)' }}
    >
      {/* Top gradient border */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, var(--accent-cyan), var(--accent-violet), transparent)' }}
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
                  border: '1px solid var(--border-accent)',
                }}
              >
                <span className="gradient-text">AT</span>
              </div>
              <span className="font-syne font-bold text-lg" style={{ color: 'var(--text-primary)' }}>
                Ansh Tripathi
              </span>
            </div>
            <p className="text-sm max-w-xs" style={{ color: 'var(--text-muted)' }}>
              AI/ML Engineer · Full Stack Developer · Building at the intersection of ML and modern web.
            </p>
          </div>

          {/* Quick Nav */}
          <div className="flex flex-col gap-2">
            <p className="text-xs font-outfit font-semibold uppercase tracking-widest mb-1" style={{ color: 'var(--text-muted)' }}>
              Navigation
            </p>
            {NAV_ITEMS.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollTo(item.href)}
                className="text-sm text-left w-fit transition-colors duration-200"
                style={{ color: 'var(--text-muted)' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent-cyan)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Social */}
          <div>
            <p className="text-xs font-outfit font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--text-muted)' }}>
              Connect
            </p>
            <div className="flex gap-3">
              {[
                { href: PERSONAL.github, icon: Github, label: 'GitHub' },
                { href: PERSONAL.linkedin, icon: Linkedin, label: 'LinkedIn' },
                { href: `mailto:${PERSONAL.email}`, icon: Mail, label: 'Email' },
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
                  style={{ border: '1px solid var(--border-card)', background: 'var(--bg-card)', color: 'var(--text-muted)' }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.color = 'var(--accent-cyan)';
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-accent)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)';
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-card)';
                  }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs"
          style={{ borderTop: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }}
        >
          <span className="flex items-center gap-1">
            Built with <Heart size={12} className="text-[#F43F5E] mx-1" fill="currentColor" /> by Ansh Tripathi · 2026
          </span>
          <span>Open Source — MIT License</span>
        </div>
      </div>
    </footer>
  );
}
