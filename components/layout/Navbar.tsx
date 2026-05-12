'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Download } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { NAV_ITEMS, PERSONAL } from '@/lib/constants';

/** Sticky navigation with blur, active section detection, and mobile menu */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const ids = NAV_ITEMS.map((item) => item.href.replace('#', ''));
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const scrollTo = (href: string) => {
    const id = href.replace('#', '');
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'backdrop-blur-xl bg-[var(--bg-primary)]/80 border-b border-white/5 shadow-lg shadow-black/20'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button
              onClick={() => scrollTo('#hero')}
              className="relative group"
              aria-label="Scroll to top"
            >
              <motion.div
                className="w-10 h-10 rounded-xl flex items-center justify-center font-syne font-bold text-lg animate-pulse-glow"
                style={{
                  background: 'linear-gradient(135deg, rgba(0,245,255,0.15), rgba(124,58,237,0.15))',
                  border: '1px solid rgba(0,245,255,0.3)',
                }}
                whileHover={{ rotate: 5, scale: 1.05 }}
              >
                <span className="gradient-text">AT</span>
              </motion.div>
            </button>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.href.replace('#', '');
                return (
                  <button
                    key={item.href}
                    onClick={() => scrollTo(item.href)}
                    className="relative px-4 py-2 text-sm font-outfit font-medium transition-colors duration-200"
                    style={{ color: isActive ? '#00F5FF' : 'var(--text-secondary)' }}
                  >
                    {item.label}
                    <span
                      className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full transition-opacity duration-300"
                      style={{
                        background: 'linear-gradient(90deg, #00F5FF, #7C3AED)',
                        opacity: isActive ? 1 : 0,
                      }}
                    />
                  </button>
                );
              })}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <a
                href="/resume/Ansh_Tripathi_Resume.pdf"
                download
                className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-outfit font-medium transition-all duration-200 hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, rgba(0,245,255,0.15), rgba(124,58,237,0.15))',
                  border: '1px solid rgba(0,245,255,0.3)',
                  color: '#00F5FF',
                }}
                data-cursor="download"
              >
                <Download size={14} />
                Download CV
              </a>

              {/* Mobile hamburger */}
              <button
                className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg border border-white/10 bg-white/5"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 md:hidden"
            style={{ background: 'rgba(5,5,8,0.97)', backdropFilter: 'blur(20px)' }}
          >
            <div className="flex flex-col items-center justify-center h-full gap-6">
              {NAV_ITEMS.map((item, i) => (
                <motion.button
                  key={item.href}
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  onClick={() => scrollTo(item.href)}
                  className="text-3xl font-syne font-bold transition-colors duration-200 hover:text-[#00F5FF]"
                  style={{ color: activeSection === item.href.replace('#', '') ? '#00F5FF' : 'var(--text-primary)' }}
                >
                  {item.label}
                </motion.button>
              ))}
              <motion.a
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: NAV_ITEMS.length * 0.07 }}
                href="/resume/Ansh_Tripathi_Resume.pdf"
                download
                className="mt-4 flex items-center gap-2 px-6 py-3 rounded-xl text-base font-outfit font-medium"
                style={{
                  background: 'linear-gradient(135deg, rgba(0,245,255,0.15), rgba(124,58,237,0.15))',
                  border: '1px solid rgba(0,245,255,0.3)',
                  color: '#00F5FF',
                }}
                onClick={() => setMobileOpen(false)}
              >
                <Download size={16} />
                Download CV
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
