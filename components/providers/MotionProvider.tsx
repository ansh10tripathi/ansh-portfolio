'use client';

import { useReducedMotion, MotionConfig } from 'framer-motion';

export function MotionProvider({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <MotionConfig
      reducedMotion="user"
      transition={reduce ? { duration: 0.001 } : undefined}
    >
      {children}
    </MotionConfig>
  );
}
