'use client';

import dynamic from 'next/dynamic';
import { useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Github, ArrowDown } from 'lucide-react';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { staggerContainer, charReveal, fadeUp } from '@/lib/animations';

const ParticleField = dynamic(() => import('@/components/ui/ParticleField').then(m => ({ default: m.ParticleField })), {
  ssr: false,
});

const SPRING = { stiffness: 80, damping: 30 };

export function Hero() {
  const name = 'Ansh Tripathi';

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const pX = useSpring(rawX, SPRING);
  const pY = useSpring(rawY, SPRING);
  const loX = useSpring(useMotionValue(0), SPRING);
  const loY = useSpring(useMotionValue(0), SPRING);
  const roX = useSpring(useMotionValue(0), SPRING);
  const roY = useSpring(useMotionValue(0), SPRING);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (window.matchMedia('(hover: none)').matches) return;
    const normX = (e.clientX / window.innerWidth  - 0.5) * 2;
    const normY = (e.clientY / window.innerHeight - 0.5) * 2;
    rawX.set(normX * 15);
    rawY.set(normY * 10);
    loX.set(normX *  25);
    loY.set(normY *  20);
    roX.set(normX * -20);
    roY.set(normY * -15);
  }, [rawX, rawY, loX, loY, roX, roY]);

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'var(--grad-hero)' }}
      onMouseMove={handleMouseMove}
    >
      {/* Light mode blueprint grid */}
      <div className="hero-grid-overlay" />

      {/* Particle canvas */}
      <motion.div
        className="absolute z-0 pointer-events-none"
        style={{ width: '130%', height: '130%', top: '-15%', left: '-15%', x: pX, y: pY }}
      >
        <ParticleField className="w-full h-full" />
      </motion.div>

      {/* Left orb */}
      <motion.div
        className="orb-cyan pointer-events-none"
        style={{ top: '10%', left: '-10%', x: loX, y: loY }}
      />

      {/* Right orb */}
      <motion.div
        className="orb-violet pointer-events-none"
        style={{ bottom: '10%', right: '-10%', x: roX, y: roY }}
      />

      {/* Noise overlay */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        {/* Pre-title */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
          className="flex items-center justify-center gap-1.5 mb-6"
        >
          <span
            style={{
              fontFamily: 'var(--font-jetbrains), monospace',
              fontSize: '0.8rem',
              letterSpacing: '0.3em',
              fontVariant: 'small-caps',
              color: 'var(--accent-cyan)',
            }}
          >
            &lt; Hello, World. I&apos;m &gt;
          </span>
          <span
            className="animate-blink"
            style={{ color: 'var(--accent-cyan)', fontSize: '1rem', lineHeight: 1 }}
            aria-hidden
          >
            ▋
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          transition={{ delayChildren: 0.5, staggerChildren: 0.04 }}
          aria-label={name}
          className="font-syne font-extrabold leading-[1.05] mb-6 flex items-baseline justify-center gap-[0.25em] flex-nowrap whitespace-nowrap"
          style={{ fontSize: 'clamp(2.2rem, 8vw, 7rem)', perspective: '800px' }}
        >
          <span className="inline-flex flex-nowrap">
            {'Ansh'.split('').map((char, i) => (
              <motion.span
                key={i}
                variants={charReveal}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.04, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="inline-block"
                style={{ color: 'var(--text-primary)' }}
              >
                {char}
              </motion.span>
            ))}
          </span>

          <span className="inline-flex flex-nowrap">
            {'Tripathi'.split('').map((char, i) => (
              <motion.span
                key={i}
                variants={charReveal}
                transition={{ duration: 0.5, delay: 0.5 + (i + 4) * 0.04, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="inline-block"
                style={{
                  background: 'var(--grad-text)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {char}
              </motion.span>
            ))}
          </span>
        </motion.h1>

        {/* Role rotator */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6, ease: 'easeOut' }}
          className="text-xl sm:text-2xl font-outfit font-bold mb-6 h-10 flex items-center justify-center"
        >
          <TypeAnimation
            sequence={[
              'AI/ML Engineer', 2000,
              'Full Stack Developer', 2000,
              'Problem Solver', 2000,
              'Systems Thinker', 2000,
              'Open Source Builder', 2000,
            ]}
            wrapper="span"
            speed={50}
            deletionSpeed={30}
            repeat={Infinity}
            cursor={true}
            style={{
              background: 'var(--grad-accent)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            } as React.CSSProperties}
          />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1.5 }}
          className="text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{ color: 'var(--text-secondary)' }}
        >
          Building at the intersection of machine learning, real-time systems, and modern web.{' '}
          <span style={{ color: 'var(--text-primary)' }}>B.Tech CSE (AI/ML) @ LPU</span>{' '}
          · LPUNEST Scholar.
        </motion.p>

        {/* CTA Buttons */}
        <div className="hero-cta flex flex-col sm:flex-row items-center justify-center gap-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.6 }}
          >
            <MagneticButton data-cursor="explore">
              <button
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="flex items-center gap-2 px-8 py-4 rounded-xl font-outfit font-semibold text-base"
                style={{
                  background: 'var(--grad-btn-primary)',
                  color: 'var(--text-inverse)',
                  boxShadow: 'var(--glow-btn)',
                  transition: 'box-shadow 0.3s ease',
                }}
                onMouseEnter={e => (e.currentTarget.style.filter = 'brightness(1.1)')}
                onMouseLeave={e => (e.currentTarget.style.filter = 'none')}
              >
                View My Work
                <ArrowDown size={16} />
              </button>
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.9, duration: 0.6 }}
          >
            <MagneticButton
              href="https://github.com/ansh10tripathi"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="github"
            >
              <span
                className="flex items-center gap-2 px-8 py-4 rounded-xl font-outfit font-semibold text-base"
                style={{
                  background: 'transparent',
                  border: '1px solid var(--border-accent)',
                  color: 'var(--text-primary)',
                  transition: 'background 0.2s ease, box-shadow 0.3s ease',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.background = 'var(--bg-card)';
                  (e.currentTarget as HTMLElement).style.boxShadow = 'var(--glow-cyan)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.background = 'transparent';
                  (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                }}
              >
                <Github size={16} />
                GitHub ↗
              </span>
            </MagneticButton>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="text-xs font-outfit tracking-widest uppercase" style={{ color: 'var(--text-muted)' }}>
          scroll to explore
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={16} style={{ color: 'var(--accent-cyan)' }} />
        </motion.div>
      </motion.div>
    </section>
  );
}
