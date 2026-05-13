'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp } from 'lucide-react';
import { MagneticButton } from '@/components/ui/MagneticButton';

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY >= 500);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <MagneticButton className="fixed bottom-6 right-5 sm:bottom-8 sm:right-8 z-[9000]">
          <motion.button
            aria-label="Scroll to top"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: 1,
              boxShadow: ['0 0 0 0 rgba(0,245,255,0.4)', '0 0 0 12px rgba(0,245,255,0)', '0 0 0 0 rgba(0,245,255,0.4)'],
            }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{
              opacity: { duration: 0.25 },
              scale:   { duration: 0.25 },
              boxShadow: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
            }}
            whileHover={{ scale: 1.1, boxShadow: '0 0 20px rgba(0,245,255,0.6)' }}
            whileTap={{ scale: 0.95 }}
            style={{
              width: 48,
              height: 48,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #00F5FF, #7C3AED)',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ChevronUp size={20} color="#fff" strokeWidth={2.5} />
          </motion.button>
        </MagneticButton>
      )}
    </AnimatePresence>
  );
}
