'use client';

import { motion } from 'framer-motion';
import { charReveal, staggerContainer } from '@/lib/animations';
import { cn } from '@/lib/utils';

interface AnimatedTextProps {
  text: string;
  mode?: 'words' | 'chars' | 'lines';
  className?: string;
  staggerDelay?: number;
  once?: boolean;
}

/** Splits text and animates each unit with stagger */
export function AnimatedText({
  text,
  mode = 'words',
  className,
  staggerDelay = 0.05,
  once = true,
}: AnimatedTextProps) {
  const units = mode === 'chars' ? text.split('') : text.split(' ');

  return (
    <motion.span
      variants={{ ...staggerContainer, visible: { transition: { staggerChildren: staggerDelay } } }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
      className={cn('inline-flex flex-wrap gap-x-[0.25em]', className)}
      aria-label={text}
    >
      {units.map((unit, i) => (
        <motion.span
          key={i}
          variants={charReveal}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="inline-block"
          style={{ transformOrigin: 'bottom center' }}
        >
          {unit === ' ' ? '\u00A0' : unit}
        </motion.span>
      ))}
    </motion.span>
  );
}
