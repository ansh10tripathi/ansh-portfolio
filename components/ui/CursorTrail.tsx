'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useSpring } from 'framer-motion';
import { isTouchDevice } from '@/lib/utils';

/** Custom cursor with trailing ring — desktop only */
export function CursorTrail() {
  const [visible, setVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [label, setLabel] = useState('');
  const dotRef = useRef<HTMLDivElement>(null);

  const springOpts = { stiffness: 500, damping: 35, mass: 0.5 };
  const ringOpts = { stiffness: 120, damping: 20, mass: 0.8 };

  const dotX = useSpring(0, springOpts);
  const dotY = useSpring(0, springOpts);
  const ringX = useSpring(0, ringOpts);
  const ringY = useSpring(0, ringOpts);

  useEffect(() => {
    if (isTouchDevice()) return;

    const onMove = (e: MouseEvent) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      ringX.set(e.clientX);
      ringY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const onEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest('a, button, [data-cursor]');
      if (interactive) {
        setIsHovering(true);
        setLabel(interactive.getAttribute('data-cursor') || '');
      }
    };

    const onLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest('a, button, [data-cursor]');
      if (interactive) {
        setIsHovering(false);
        setLabel('');
      }
    };

    const onClick = () => {
      if (dotRef.current) {
        dotRef.current.animate(
          [{ transform: 'translate(-50%, -50%) scale(1)' }, { transform: 'translate(-50%, -50%) scale(2)', opacity: 0 }],
          { duration: 300, easing: 'ease-out' }
        );
      }
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onEnter);
    window.addEventListener('mouseout', onLeave);
    window.addEventListener('click', onClick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onEnter);
      window.removeEventListener('mouseout', onLeave);
      window.removeEventListener('click', onClick);
    };
  }, [dotX, dotY, ringX, ringY, visible]);

  if (typeof window !== 'undefined' && isTouchDevice()) return null;

  return (
    <>
      {/* Dot */}
      <motion.div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{ x: dotX, y: dotY, translateX: '-50%', translateY: '-50%' }}
        animate={{ opacity: visible ? 1 : 0 }}
      >
        <div className="w-3 h-3 rounded-full bg-white" />
      </motion.div>

      {/* Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          opacity: visible ? 1 : 0,
          width: isHovering ? 44 : 28,
          height: isHovering ? 44 : 28,
        }}
        transition={{ duration: 0.2 }}
      >
        <div
          className="w-full h-full rounded-full border border-[#00F5FF] flex items-center justify-center"
          style={{ boxShadow: '0 0 10px rgba(0,245,255,0.3)' }}
        >
          {label && (
            <span className="text-[8px] font-outfit text-[#00F5FF] font-medium leading-none">
              {label}
            </span>
          )}
        </div>
      </motion.div>
    </>
  );
}
