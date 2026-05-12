'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

/** Custom cursor — desktop only, hidden until first mousemove */
export function CursorTrail() {
  const [mounted, setMounted] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // Dot follows cursor exactly — high stiffness = no perceptible lag
  const dotX = useSpring(0, { stiffness: 1000, damping: 50 });
  const dotY = useSpring(0, { stiffness: 1000, damping: 50 });

  // Ring follows with spring delay
  const ringX = useSpring(0, { stiffness: 150, damping: 15 });
  const ringY = useSpring(0, { stiffness: 150, damping: 15 });

  const visibleRef = useRef(false);

  useEffect(() => {
    setMounted(true);
    if ('ontouchstart' in window) {
      setIsTouch(true);
      return;
    }

    const onMove = (e: MouseEvent) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      ringX.set(e.clientX);
      ringY.set(e.clientY);
      if (!visibleRef.current) {
        visibleRef.current = true;
        setVisible(true);
      }
    };

    const onOver = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest('a, button, .magnetic');
      setIsHovering(!!el);
    };

    const onTouch = () => setIsTouch(true);

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    window.addEventListener('touchstart', onTouch, { once: true });

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      window.removeEventListener('touchstart', onTouch);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!mounted || isTouch) return null;

  return (
    <>
      {/* Inner dot — 12px, follows exactly */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 12,
          height: 12,
          borderRadius: '50%',
          backgroundColor: '#ffffff',
          pointerEvents: 'none',
          zIndex: 9999,
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: visible ? 1 : 0,
          mixBlendMode: 'difference',
        }}
        animate={{
          width: isHovering ? 4 : 12,
          height: isHovering ? 20 : 12,
          borderRadius: isHovering ? '2px' : '50%',
        }}
        transition={{ duration: 0.15 }}
      />

      {/* Outer ring — 28px, spring-lagged */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 9998,
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: visible ? 1 : 0,
          border: '1px solid #00F5FF',
          borderRadius: '50%',
          boxShadow: '0 0 10px rgba(0,245,255,0.3)',
        }}
        animate={{
          width: isHovering ? 44 : 28,
          height: isHovering ? 44 : 28,
        }}
        transition={{ duration: 0.2 }}
      />
    </>
  );
}
