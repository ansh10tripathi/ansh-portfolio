'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

/** Gradient scroll progress bar fixed at top of viewport */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const [show, setShow] = useState(false);

  useEffect(() => {
    const unsub = scrollYProgress.on('change', (v) => setShow(v > 0.01));
    return unsub;
  }, [scrollYProgress]);

  return (
    <motion.div
      className="scroll-progress"
      style={{ scaleX, opacity: show ? 1 : 0 }}
    />
  );
}
