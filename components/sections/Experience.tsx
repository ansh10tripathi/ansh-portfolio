'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { TIMELINE_ENTRIES } from '@/lib/constants';
import { fadeUp } from '@/lib/animations';

const TYPE_COLORS: Record<string, string> = {
  Education: '#4F46E5',
  Project: '#7C3AED',
  Achievement: '#F59E0B',
  Competition: '#10B981',
  Certification: '#F59E0B',
};

/** Vertical timeline of experience and activities */
export function Experience() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section id="experience" className="section-padding relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-14"
        >
          <p className="section-label mb-3">&lt; Journey /&gt;</p>
          <h2 className="font-syne font-bold text-3xl sm:text-4xl lg:text-5xl text-[var(--text-primary)]">
            My <span className="gradient-text">Timeline</span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-px"
            style={{
              background: 'linear-gradient(180deg, #00F5FF, #7C3AED, transparent)',
              transform: 'translateX(-50%)',
            }}
          />

          <div className="space-y-8">
            {TIMELINE_ENTRIES.map((entry, i) => {
              const isLeft = i % 2 === 0;
              const color = TYPE_COLORS[entry.type] ?? '#00F5FF';

              return (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ delay: i * 0.08 }}
                  className={`relative flex items-center gap-4 sm:gap-0 ${
                    isLeft ? 'sm:flex-row' : 'sm:flex-row-reverse'
                  }`}
                >
                  {/* Card */}
                  <div className={`flex-1 ml-14 sm:ml-0 ${isLeft ? 'sm:pr-12' : 'sm:pl-12'}`}>
                    <motion.div
                      className="rounded-xl p-5 transition-all duration-200"
                      style={{
                        background: 'rgba(255,255,255,0.02)',
                        border: '1px solid rgba(255,255,255,0.06)',
                        borderLeft: `3px solid ${color}`,
                      }}
                      whileHover={{
                        borderColor: `${color}40`,
                        background: `${color}05`,
                        y: -2,
                      }}
                    >
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <span className="text-xl">{entry.icon}</span>
                        <span
                          className="text-xs font-outfit px-2 py-0.5 rounded-full flex-shrink-0"
                          style={{ background: `${color}20`, color }}
                        >
                          {entry.type}
                        </span>
                      </div>
                      <h3 className="font-syne font-bold text-base text-[var(--text-primary)] mt-2 mb-1">
                        {entry.title}
                      </h3>
                      <p className="text-xs text-[var(--text-muted)] font-outfit mb-2">
                        {entry.org} · {entry.date}
                      </p>
                      <p className="text-sm text-[var(--text-secondary)]">{entry.description}</p>
                    </motion.div>
                  </div>

                  {/* Node */}
                  <div className="absolute left-6 sm:left-1/2 -translate-x-1/2 z-10">
                    <motion.div
                      className="w-4 h-4 rounded-full border-2 relative"
                      style={{ background: color, borderColor: 'var(--bg-primary)' }}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: 'spring', stiffness: 400, damping: 20, delay: i * 0.08 }}
                    >
                      {/* Pulse ring */}
                      <span
                        className="absolute inset-0 rounded-full animate-ping opacity-40"
                        style={{ background: color }}
                      />
                    </motion.div>
                  </div>

                  {/* Year label */}
                  <div className={`hidden sm:block flex-1 ${isLeft ? 'pl-12 text-left' : 'pr-12 text-right'}`}>
                    <span className="font-mono text-sm font-bold" style={{ color }}>
                      {entry.year}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
