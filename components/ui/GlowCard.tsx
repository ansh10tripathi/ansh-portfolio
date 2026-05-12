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

/** Glassmorphism card with optional glow border on hover */
export function GlowCard({
  children,
  glowColor = '#00F5FF',
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
        'rounded-2xl border border-white/5 bg-white/[0.03] backdrop-blur-sm relative overflow-hidden',
        'transition-all duration-300',
        hoverEffect && 'hover:border-opacity-40 group',
        className
      )}
      style={
        hoverEffect
          ? {
              ['--glow-color' as string]: glowColor,
            }
          : {}
      }
      whileHover={
        hoverEffect
          ? {
              boxShadow: `0 0 30px ${glowColor}20, 0 0 60px ${glowColor}10`,
              borderColor: `${glowColor}40`,
            }
          : {}
      }
    >
      {children}
    </motion.div>
  );
}
