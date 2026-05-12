'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Github, ArrowDown } from 'lucide-react';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { staggerContainer, charReveal, fadeUp } from '@/lib/animations';

const ParticleField = dynamic(() => import('@/components/ui/ParticleField').then(m => ({ default: m.ParticleField })), {
  ssr: false,
});

/** Cinematic hero section with particle field and animated text */
export function Hero() {
  const name = 'Ansh Tripathi';

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #050508 0%, #0D0D1A 50%, #12052e 100%)' }}
    >
      {/* Particle canvas */}
      <ParticleField className="absolute inset-0 z-0" />

      {/* Gradient orbs */}
      <div className="orb-cyan" style={{ top: '10%', left: '-10%' }} />
      <div className="orb-violet" style={{ bottom: '10%', right: '-10%' }} />

      {/* Noise overlay */}
      <div className="absolute inset-0 z-[1] pointer-events-none opacity-[0.03]"
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
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex items-center justify-center gap-1.5 mb-6"
        >
          <span
            style={{
              fontFamily: 'var(--font-jetbrains), monospace',
              fontSize: '0.8rem',
              letterSpacing: '0.3em',
              fontVariant: 'small-caps',
              color: '#00F5FF',
            }}
          >
            &lt; Hello, World. I&apos;m &gt;
          </span>
          <span
            className="animate-blink"
            style={{ color: '#00F5FF', fontSize: '1rem', lineHeight: 1 }}
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
          aria-label={name}
          className="font-syne font-extrabold leading-[1.05] mb-6 flex items-baseline justify-center gap-[0.25em] flex-nowrap whitespace-nowrap"
          style={{ fontSize: 'clamp(2.75rem, 7.5vw, 7rem)', perspective: '800px' }}
        >
          {/* "Ansh" — white */}
          <span className="inline-flex flex-nowrap">
            {'Ansh'.split('').map((char, i) => (
              <motion.span
                key={i}
                variants={charReveal}
                transition={{ duration: 0.5, delay: i * 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="inline-block"
                style={{ color: '#F0F4FF' }}
              >
                {char}
              </motion.span>
            ))}
          </span>

          {/* "Tripathi" — gradient */}
          <span className="inline-flex flex-nowrap">
            {'Tripathi'.split('').map((char, i) => (
              <motion.span
                key={i}
                variants={charReveal}
                transition={{ duration: 0.5, delay: (i + 5) * 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="inline-block"
                style={{
                  background: 'linear-gradient(90deg, #00F5FF, #7C3AED)',
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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-xl sm:text-2xl font-outfit font-medium mb-6 h-8"
          style={{ color: '#00F5FF' }}
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
            deletionSpeed={70}
            repeat={Infinity}
          />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1 }}
          className="text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{ color: 'var(--text-secondary)' }}
        >
          Building at the intersection of machine learning, real-time systems, and modern web.{' '}
          <span style={{ color: 'var(--text-primary)' }}>B.Tech CSE (AI/ML) @ LPU</span>{' '}
          · LPUNEST Scholar.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <MagneticButton data-cursor="explore">
            <button
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="flex items-center gap-2 px-8 py-4 rounded-xl font-outfit font-semibold text-base transition-all duration-200 hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #00F5FF20, #7C3AED20)',
                border: '1px solid rgba(0,245,255,0.4)',
                color: '#00F5FF',
                boxShadow: '0 0 30px rgba(0,245,255,0.15)',
              }}
            >
              View My Work
              <ArrowDown size={16} />
            </button>
          </MagneticButton>

          <MagneticButton
            href="https://github.com/ansh10tripathi"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="github"
          >
            <span
              className="flex items-center gap-2 px-8 py-4 rounded-xl font-outfit font-semibold text-base transition-all duration-200 hover:scale-105"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'var(--text-primary)',
              }}
            >
              <Github size={16} />
              GitHub ↗
            </span>
          </MagneticButton>
        </motion.div>
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
          <ArrowDown size={16} style={{ color: '#00F5FF' }} />
        </motion.div>
      </motion.div>
    </section>
  );
}
