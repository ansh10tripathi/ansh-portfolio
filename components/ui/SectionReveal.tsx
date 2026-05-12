'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { fadeUp } from '@/lib/animations';

interface SectionRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

/** Wraps sections with scroll-triggered fade+slide animation */
export function SectionReveal({ children, delay = 0, className }: SectionRevealProps) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
