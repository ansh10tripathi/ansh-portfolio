import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Merge Tailwind classes safely */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Clamp a number between min and max */
export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

/** Map a value from one range to another */
export function mapRange(value: number, inMin: number, inMax: number, outMin: number, outMax: number) {
  return ((value - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin;
}

/** Check if device is touch-capable */
export function isTouchDevice() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(hover: none)').matches;
}

/** Check if user prefers reduced motion */
export function prefersReducedMotion() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Format large numbers (e.g. 1200 → 1.2k) */
export function formatNumber(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}
