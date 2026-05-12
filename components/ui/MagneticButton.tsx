'use client';

import { useRef, ReactNode, MouseEvent } from 'react';
import { motion, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  href?: string;
  target?: string;
  rel?: string;
  'data-cursor'?: string;
}

/**
 * Pure magnetic wrapper — applies cursor-tracking spring motion to any child.
 * Never renders its own button/anchor; pass your own interactive element as children.
 * For link usage, pass href and the child can be a <span> or <div>.
 */
export function MagneticButton({
  children,
  className,
  href,
  target,
  rel,
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(0, { stiffness: 300, damping: 25 });
  const y = useSpring(0, { stiffness: 300, damping: 25 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.4);
    y.set((e.clientY - cy) * 0.4);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const motionChild = (
    <motion.div style={{ x, y }} className="inline-flex">
      {children}
    </motion.div>
  );

  if (href) {
    return (
      <div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={cn('inline-flex', className)}
      >
        <a href={href} target={target} rel={rel} data-cursor={props['data-cursor']}>
          {motionChild}
        </a>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn('inline-flex', className)}
    >
      {motionChild}
    </div>
  );
}
