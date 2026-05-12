'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

/** Full-screen loading screen shown only on first visit */
export function LoadingScreen() {
  const [show, setShow] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const hasLoaded = sessionStorage.getItem('portfolio_loaded');
    if (hasLoaded) return;

    setShow(true);
    sessionStorage.setItem('portfolio_loaded', 'true');

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
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mb-6"
            style={{
              filter:
                'drop-shadow(0 0 24px rgba(0,245,255,0.6)) drop-shadow(0 0 60px rgba(124,58,237,0.35))',
            }}
          >
            <Image
              src="/images/Logo.png"
              alt="Ansh Tripathi"
              width={80}
              height={80}
              priority
              style={{ width: 80, height: 80, objectFit: 'contain' }}
            />
          </motion.div>

          {/* Name */}
          <motion.p
            className="font-syne text-lg font-bold text-[var(--text-primary)] mb-6 tracking-widest"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
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
