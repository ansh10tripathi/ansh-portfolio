'use client';

import Image from 'next/image';
import { motion, useSpring } from 'framer-motion';
import { useRef, MouseEvent } from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  /** px size of the logo image (square) */
  size?: number;
  /** Show "Ansh Tripathi" wordmark beside the logo */
  showWordmark?: boolean;
  /** Apply floating animation */
  float?: boolean;
  /** Apply magnetic cursor-tracking on hover */
  magnetic?: boolean;
  /** Extra classes on the root wrapper */
  className?: string;
  /** Glow intensity */
  glow?: 'subtle' | 'strong' | 'none';
}

/**
 * Reusable brand logo component.
 * Renders /public/images/Logo.png via next/image for retina-sharp, optimised output.
 * Supports floating animation, magnetic hover, and themed cyan/violet glow.
 */
export function Logo({
  size = 40,
  showWordmark = false,
  float = false,
  magnetic = false,
  className,
  glow = 'subtle',
}: LogoProps) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useSpring(0, { stiffness: 300, damping: 25 });
  const my = useSpring(0, { stiffness: 300, damping: 25 });

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!magnetic || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left - rect.width / 2) * 0.35);
    my.set((e.clientY - rect.top - rect.height / 2) * 0.35);
  };

  const onMouseLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const glowFilter =
    glow === 'strong'
      ? 'drop-shadow(0 0 18px rgba(0,245,255,0.7)) drop-shadow(0 0 40px rgba(124,58,237,0.4))'
      : glow === 'subtle'
      ? 'drop-shadow(0 0 8px rgba(0,245,255,0.35)) drop-shadow(0 0 20px rgba(124,58,237,0.2))'
      : 'none';

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={cn('inline-flex items-center gap-3', className)}
    >
      <motion.div
        style={{ x: magnetic ? mx : 0, y: magnetic ? my : 0 }}
        animate={float ? { y: [0, -10, 0] } : {}}
        transition={
          float
            ? { duration: 4, repeat: Infinity, ease: 'easeInOut' }
            : { type: 'spring', stiffness: 300, damping: 20 }
        }
        whileHover={{ scale: 1.06 }}
      >
        <Image
          src="/images/Logo.png"
          alt="Ansh Tripathi Logo"
          width={size}
          height={size}
          priority
          style={{
            width: size,
            height: size,
            objectFit: 'contain',
            filter: glowFilter,
          }}
        />
      </motion.div>

      {showWordmark && (
        <motion.span
          initial={{ opacity: 0, x: -6 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="font-syne font-bold text-[var(--text-primary)] leading-none"
          style={{ fontSize: Math.round(size * 0.4) }}
        >
          Ansh Tripathi
        </motion.span>
      )}
    </div>
  );
}
