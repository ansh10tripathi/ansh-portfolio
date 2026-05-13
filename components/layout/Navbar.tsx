'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Download } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { NAV_ITEMS, PERSONAL } from '@/lib/constants';
import { MagneticButton } from '@/components/ui/MagneticButton';

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
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); }); },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  const scrollTo = (href: string) => {
    document.getElementById(href.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={scrolled ? {
          background: 'var(--bg-nav)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid var(--border-subtle)',
        } : { background: 'transparent' }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Logo */}
            <button onClick={() => scrollTo('#hero')} className="relative group" aria-label="Scroll to top">
              <motion.div
                className="w-10 h-10 rounded-xl flex items-center justify-center font-syne font-bold text-lg"
                style={{
                  background: 'linear-gradient(135deg, rgba(0,245,255,0.15), rgba(124,58,237,0.15))',
                  border: '1px solid var(--border-accent)',
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
                    className="nav-link relative px-4 py-2 text-sm font-outfit font-medium transition-colors duration-200"
                    style={{ color: isActive ? 'var(--accent-cyan)' : 'var(--text-secondary)' }}
                  >
                    {item.label}
                    <span
                      className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full transition-opacity duration-300"
                      style={{ background: 'var(--accent-cyan)', opacity: isActive ? 1 : 0 }}
                    />
                  </button>
                );
              })}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              <ThemeToggle />
              <MagneticButton className="hidden sm:inline-flex" data-cursor="download">
                <a
                  href="/resume/Ansh_Tripathi_Resume.pdf"
                  download
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-outfit font-medium transition-[box-shadow] duration-300"
                  style={{
                    background: 'var(--grad-btn-primary)',
                    color: 'var(--text-inverse)',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.boxShadow = 'var(--glow-btn)')}
                  onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}
                >
                  <Download size={14} />
                  Download CV
                </a>
              </MagneticButton>

              <button
                className="md:hidden w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-lg"
                style={{ border: '1px solid var(--border-subtle)', background: 'var(--bg-glass)', color: 'var(--text-primary)' }}
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={16} /> : <Menu size={16} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 md:hidden"
            style={{ background: 'var(--bg-nav)', backdropFilter: 'blur(20px)' }}
          >
            <div className="flex flex-col items-center justify-center h-full gap-5 px-6">
              {NAV_ITEMS.map((item, i) => (
                <motion.button
                  key={item.href}
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  onClick={() => scrollTo(item.href)}
                  className="text-2xl sm:text-3xl font-syne font-bold transition-colors duration-200"
                  style={{ color: activeSection === item.href.replace('#', '') ? 'var(--accent-cyan)' : 'var(--text-primary)' }}
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
                className="mt-2 flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-outfit font-medium"
                style={{
                  background: 'var(--grad-btn-primary)',
                  color: 'var(--text-inverse)',
                }}
                onClick={() => setMobileOpen(false)}
              >
                <Download size={15} />
                Download CV
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
