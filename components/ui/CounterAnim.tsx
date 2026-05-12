'use client';

import { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

interface CounterAnimProps {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  decimals?: number;
}

/** Animates a number from 0 to target when it enters the viewport */
export function CounterAnim({
  target,
  suffix = '',
  prefix = '',
  duration = 1500,
  decimals = 0,
}: CounterAnimProps) {
  const spanRef = useRef<HTMLSpanElement>(null);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!inView || hasAnimated.current || !spanRef.current) return;
    hasAnimated.current = true;

    const start = performance.now();
    const step = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * target;

      if (spanRef.current) {
        spanRef.current.textContent = `${prefix}${current.toFixed(decimals)}${suffix}`;
      }

      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [inView, target, duration, suffix, prefix, decimals]);

  return (
    <span ref={ref}>
      <span ref={spanRef}>{prefix}0{suffix}</span>
    </span>
  );
}
