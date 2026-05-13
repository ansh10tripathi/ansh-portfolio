'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';

interface GlowCardProps {
  children: ReactNode;
  glowColor?: string;
  className?: string;
  hoverEffect?: boolean;
  animate?: boolean;
}

export function GlowCard({
  children,
  glowColor = 'var(--accent-cyan)',
  className,
  hoverEffect = true,
  animate = false,
}: GlowCardProps) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={animate ? { opacity: 0, y: 20 } : false}
      animate={animate && inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className={cn(
        'rounded-2xl relative overflow-hidden transition-all duration-300',
        hoverEffect && 'group',
        className
      )}
      style={{
        background: 'var(--glass-bg)',
        backdropFilter: `blur(var(--glass-blur))`,
        WebkitBackdropFilter: `blur(var(--glass-blur))`,
        border: '1px solid var(--glass-border)',
        boxShadow: 'var(--glass-shadow)',
      }}
      whileHover={
        hoverEffect
          ? { boxShadow: 'var(--glow-card-hover)', borderColor: 'var(--border-accent)' }
          : {}
      }
    >
      {children}
    </motion.div>
  );
}
