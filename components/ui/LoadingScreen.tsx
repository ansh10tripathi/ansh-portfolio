'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/** Full-screen loading screen shown only on first visit */
export function LoadingScreen() {
  const [show, setShow] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const hasLoaded = sessionStorage.getItem('portfolio_loaded');
    if (hasLoaded) return;

    setShow(true);
    sessionStorage.setItem('portfolio_loaded', 'true');

    // Animate progress
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => setShow(false), 400);
          return 100;
        }
        return p + Math.random() * 15 + 5;
      });
    }, 120);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="loading-screen"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* SVG Monogram */}
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none" className="mb-8">
            <motion.path
              d="M10 70 L30 10 L40 40 L50 10 L70 70"
              stroke="url(#grad)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
            />
            <defs>
              <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00F5FF" />
                <stop offset="100%" stopColor="#7C3AED" />
              </linearGradient>
            </defs>
          </svg>

          {/* Name */}
          <motion.p
            className="font-syne text-lg font-bold text-[var(--text-primary)] mb-6 tracking-widest"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            ANSH TRIPATHI
          </motion.p>

          {/* Progress bar */}
          <div className="w-48 h-0.5 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{
                background: 'linear-gradient(90deg, #00F5FF, #7C3AED)',
                width: `${Math.min(progress, 100)}%`,
              }}
              transition={{ duration: 0.1 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
