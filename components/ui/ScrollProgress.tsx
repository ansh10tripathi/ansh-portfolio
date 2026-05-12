'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValue } from 'framer-motion';

/** Gradient scroll progress bar fixed at top of viewport */
export function ScrollProgress() {
  const { scrollY, scrollYProgress } = useScroll();
  const width = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const [visible, setVisible] = useState(false);
  const [atBottom, setAtBottom] = useState(false);

  useEffect(() => {
    const unsubY = scrollY.on('change', (y) => setVisible(y > 100));
    const unsubP = scrollYProgress.on('change', (p) => setAtBottom(p >= 0.99));
    return () => { unsubY(); unsubP(); };
  }, [scrollY, scrollYProgress]);

  return (
    <motion.div
      style={{
        width,
        position: 'fixed',
        top: 0,
        left: 0,
        height: '3px',
        background: 'linear-gradient(90deg, #00F5FF 0%, #7C3AED 50%, #4F46E5 100%)',
        transformOrigin: 'left',
        zIndex: 9998,
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.3s ease, box-shadow 0.3s ease',
        boxShadow: atBottom ? '0 0 8px #00F5FF' : 'none',
      }}
    />
  );
}
