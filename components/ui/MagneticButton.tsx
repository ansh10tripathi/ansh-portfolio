'use client';

import { useRef, ReactNode, useCallback } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { cn } from '@/lib/utils';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  href?: string;
  target?: string;
  rel?: string;
  'data-cursor'?: string;
}

const SPRING = { stiffness: 200, damping: 20 };
const PROXIMITY = 60; // px outside bounding box that activates the effect

export function MagneticButton({
  children,
  className,
  strength = 0.4,
  href,
  target,
  rel,
  ...props
}: MagneticButtonProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Outer (button) motion values
  const x = useSpring(useMotionValue(0), SPRING);
  const y = useSpring(useMotionValue(0), SPRING);

  // Inner (content) motion values — 60% of outer for parallax depth
  const ix = useSpring(useMotionValue(0), SPRING);
  const iy = useSpring(useMotionValue(0), SPRING);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = wrapperRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width  / 2;
    const cy = rect.top  + rect.height / 2;

    // Check proximity — expand rect by PROXIMITY px on all sides
    const inZone =
      e.clientX >= rect.left   - PROXIMITY &&
      e.clientX <= rect.right  + PROXIMITY &&
      e.clientY >= rect.top    - PROXIMITY &&
      e.clientY <= rect.bottom + PROXIMITY;

    if (!inZone) {
      x.set(0); y.set(0); ix.set(0); iy.set(0);
      el.style.cursor = '';
      return;
    }

    const dx = (e.clientX - cx) * strength;
    const dy = (e.clientY - cy) * strength;
    x.set(dx);
    y.set(dy);
    ix.set(dx * 0.6);
    iy.set(dy * 0.6);
    el.style.cursor = 'none';
  }, [x, y, ix, iy, strength]);

  const handleMouseLeave = useCallback(() => {
    x.set(0); y.set(0); ix.set(0); iy.set(0);
    if (wrapperRef.current) wrapperRef.current.style.cursor = '';
  }, [x, y, ix, iy]);

  const inner = (
    <motion.div style={{ x, y }} className="inline-flex">
      <motion.div style={{ x: ix, y: iy }} className="inline-flex">
        {children}
      </motion.div>
    </motion.div>
  );

  if (href) {
    return (
      <div
        ref={wrapperRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={cn('inline-flex', className)}
      >
        <a href={href} target={target} rel={rel} data-cursor={props['data-cursor']}>
          {inner}
        </a>
      </div>
    );
  }

  return (
    <div
      ref={wrapperRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn('inline-flex', className)}
    >
      {inner}
    </div>
  );
}
