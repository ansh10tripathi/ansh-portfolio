'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ACHIEVEMENTS } from '@/lib/constants';
import { fadeUp, staggerContainer } from '@/lib/animations';

/** Achievement highlight cards */
export function Achievements() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="achievements" className="relative" style={{ padding: '5rem 0 6rem' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-12"
        >
          <p className="section-label mb-3">&lt; Achievements /&gt;</p>
          <h2 className="font-syne font-bold text-3xl sm:text-4xl lg:text-5xl text-[var(--text-primary)]">
            Milestones &amp; <span className="gradient-text">Wins</span>
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {ACHIEVEMENTS.map((achievement) => (
            <motion.div
              key={achievement.title}
              variants={fadeUp}
              className="relative rounded-2xl p-6 overflow-hidden group"
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderLeft: `3px solid ${achievement.color}`,
              }}
              whileHover={{
                scale: 1.02,
                boxShadow: `0 0 30px ${achievement.color}20`,
                borderColor: `${achievement.color}40`,
              }}
            >
              {/* Icon with glow halo */}
              <div className="relative inline-block mb-4">
                <motion.span
                  className="text-4xl block"
                  whileHover={{
                    scale: 1.3,
                    rotate: 10,
                    transition: { duration: 0.2 },
                  }}
                  style={{ filter: `drop-shadow(0 0 12px ${achievement.color}80)` }}
                >
                  {achievement.icon}
                </motion.span>
                {/* Pulse ring */}
                <span
                  className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    background: `radial-gradient(circle, ${achievement.color}20, transparent)`,
                    animation: 'ringPulse 1.5s ease-out infinite',
                  }}
                />
              </div>

              <h3 className="font-syne font-bold text-base text-[var(--text-primary)] mb-2">
                {achievement.title}
              </h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                {achievement.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
