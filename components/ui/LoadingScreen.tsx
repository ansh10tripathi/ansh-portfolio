'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/** Full-screen loading screen shown only on first visit per session */
export function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [show, setShow] = useState(false);
  const [filled, setFilled] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('portfolio_loaded')) {
      onDone();
      return;
    }
    setShow(true);

    // Fill letters after stroke draw (1.2s) + small buffer
    const fillTimer = setTimeout(() => setFilled(true), 1300);

    // Fade out at 2.2s, unmount + unlock after fade (0.4s)
    const hideTimer = setTimeout(() => {
      setShow(false);
      setTimeout(() => {
        sessionStorage.setItem('portfolio_loaded', 'true');
        onDone();
      }, 400);
    }, 2200);

    return () => { clearTimeout(fillTimer); clearTimeout(hideTimer); };
  }, [onDone]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10000,
            background: '#050508',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '2rem',
          }}
        >
          {/* SVG monogram — "A" and "T" stroke-draw then fill */}
          <svg
            viewBox="0 0 140 90"
            width="140"
            height="90"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="lg-fill" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00F5FF" />
                <stop offset="100%" stopColor="#7C3AED" />
              </linearGradient>
            </defs>

            {/* Letter "A" — left half, viewBox x: 0–65 */}
            {/* Outline: two diagonal strokes + crossbar */}
            <motion.path
              d="M10 80 L38 8 L66 80"
              stroke="#00F5FF"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              initial={{ pathLength: 0, opacity: 1 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
            />
            <motion.path
              d="M22 52 L54 52"
              stroke="#00F5FF"
              strokeWidth="5"
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0, opacity: 1 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.4, ease: 'easeInOut', delay: 1.0 }}
            />

            {/* Gradient fill overlay for "A" — fades in after draw */}
            <motion.path
              d="M10 80 L38 8 L66 80"
              stroke="url(#lg-fill)"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              initial={{ opacity: 0 }}
              animate={{ opacity: filled ? 1 : 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            />
            <motion.path
              d="M22 52 L54 52"
              stroke="url(#lg-fill)"
              strokeWidth="5"
              strokeLinecap="round"
              fill="none"
              initial={{ opacity: 0 }}
              animate={{ opacity: filled ? 1 : 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            />

            {/* Letter "T" — right half, viewBox x: 74–140 */}
            <motion.path
              d="M74 14 L130 14"
              stroke="#00F5FF"
              strokeWidth="5"
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0, opacity: 1 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: 'easeInOut', delay: 0.2 }}
            />
            <motion.path
              d="M102 14 L102 80"
              stroke="#00F5FF"
              strokeWidth="5"
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0, opacity: 1 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.7, ease: 'easeInOut', delay: 0.6 }}
            />

            {/* Gradient fill overlay for "T" */}
            <motion.path
              d="M74 14 L130 14"
              stroke="url(#lg-fill)"
              strokeWidth="5"
              strokeLinecap="round"
              fill="none"
              initial={{ opacity: 0 }}
              animate={{ opacity: filled ? 1 : 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            />
            <motion.path
              d="M102 14 L102 80"
              stroke="url(#lg-fill)"
              strokeWidth="5"
              strokeLinecap="round"
              fill="none"
              initial={{ opacity: 0 }}
              animate={{ opacity: filled ? 1 : 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            />
          </svg>

          {/* Progress bar */}
          <div
            style={{
              width: '200px',
              height: '2px',
              borderRadius: '1px',
              background: '#111128',
              overflow: 'hidden',
            }}
          >
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.8, ease: 'easeInOut' }}
              style={{
                height: '100%',
                borderRadius: '1px',
                background: 'linear-gradient(90deg, #00F5FF, #7C3AED)',
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
