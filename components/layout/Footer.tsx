'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';
import { PERSONAL, NAV_ITEMS } from '@/lib/constants';

const SOCIALS = [
  { href: PERSONAL.github,            icon: Github,   label: 'GitHub'   },
  { href: PERSONAL.linkedin,          icon: Linkedin, label: 'LinkedIn' },
  { href: `mailto:${PERSONAL.email}`, icon: Mail,     label: 'Email'    },
];

export function Footer() {
  const scrollTo = (href: string) => {
    document.getElementById(href.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative overflow-hidden" style={{ background: 'var(--bg-elevated)' }}>
      {/* Neon hairline */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, var(--accent-cyan), var(--accent-violet), transparent)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">

          {/* Brand — spans 2 cols on lg */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-3">
              <motion.div
                className="w-9 h-9 rounded-xl flex items-center justify-center font-syne font-bold text-base flex-shrink-0"
                style={{
                  background: 'linear-gradient(135deg, rgba(0,245,255,0.15), rgba(124,58,237,0.15))',
                  border: '1px solid var(--border-accent)',
                }}
                whileHover={{ rotate: 5, scale: 1.05 }}
              >
                <span className="gradient-text">AT</span>
              </motion.div>
              <div>
                <p className="font-syne font-bold text-sm leading-tight" style={{ color: 'var(--text-primary)' }}>
                  Ansh Tripathi
                </p>
                <p className="text-[11px] font-jetbrains" style={{ color: 'var(--accent-cyan)' }}>
                  AI/ML · Full Stack · Systems
                </p>
              </div>
            </div>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: 'var(--text-muted)' }}>
              Building intelligent systems, scalable software, and immersive web experiences.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-[10px] font-outfit font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--text-muted)' }}>
              Navigation
            </p>
            <ul className="space-y-2">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <button
                    onClick={() => scrollTo(item.href)}
                    className="group flex items-center gap-1.5 text-sm transition-colors duration-200 w-fit"
                    style={{ color: 'var(--text-muted)' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent-cyan)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
                  >
                    <span
                      className="w-1 h-1 rounded-full flex-shrink-0 transition-all duration-200 group-hover:w-3"
                      style={{ background: 'var(--accent-cyan)', opacity: 0.5 }}
                    />
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <p className="text-[10px] font-outfit font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--text-muted)' }}>
              Let&apos;s Connect
            </p>
            <div className="flex flex-col gap-1.5">
              {SOCIALS.map(({ href, icon: Icon, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-sm font-outfit w-fit"
                  style={{ color: 'var(--text-muted)', border: '1px solid transparent' }}
                  whileHover={{
                    color: 'var(--accent-cyan)',
                    borderColor: 'var(--border-accent)',
                    background: 'var(--bg-card)',
                    x: 3,
                  }}
                  transition={{ duration: 0.15 }}
                >
                  <Icon size={14} />
                  {label}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs"
          style={{ borderTop: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }}
        >
          <span className="flex items-center gap-1">
            Built with <Heart size={11} className="mx-1" style={{ color: 'var(--accent-rose)' }} fill="currentColor" />
            by Ansh Tripathi · 2026
          </span>
          <span style={{ opacity: 0.55 }}>MIT License · Open Source</span>
        </div>
      </div>
    </footer>
  );
}
