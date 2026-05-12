'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { TIMELINE_ENTRIES } from '@/lib/constants';
import { fadeUp } from '@/lib/animations';

/** Accent color and label for each entry type */
const TYPE_META: Record<string, { color: string; label: string }> = {
  Education:    { color: '#00F5FF', label: 'Education'    },
  Project:      { color: '#7C3AED', label: 'Project'      },
  Achievement:  { color: '#F43F5E', label: 'Achievement'  },
  Certification:{ color: '#F59E0B', label: 'Certification'},
  Activity:     { color: '#10B981', label: 'Activity'     },
  Competition:  { color: '#10B981', label: 'Competition'  },
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
          {/* Vertical gradient line — cyan at top, violet at bottom */}
          <div
            className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-px"
            style={{
              background: 'linear-gradient(180deg, #00F5FF 0%, #7C3AED 70%, transparent 100%)',
              transform: 'translateX(-50%)',
            }}
          />

          <div className="space-y-8">
            {TIMELINE_ENTRIES.map((entry, i) => {
              const meta = TYPE_META[entry.type] ?? { color: '#00F5FF', label: entry.type };
              const isLeft = i % 2 === 0;

              return (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ delay: i * 0.07 }}
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
                        borderLeft: `3px solid ${entry.color}`,
                      }}
                      whileHover={{
                        background: `${entry.color}06`,
                        borderColor: `${entry.color}35`,
                        y: -2,
                      }}
                    >
                      {/* Header row: icon + type chip */}
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-xl leading-none">{entry.icon}</span>
                        <span
                          className="text-[10px] font-outfit font-semibold px-2 py-0.5 rounded-full flex-shrink-0"
                          style={{
                            background: `${meta.color}18`,
                            border: `1px solid ${meta.color}40`,
                            color: meta.color,
                          }}
                        >
                          {meta.label}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="font-syne font-bold text-base text-[var(--text-primary)] mb-0.5 leading-snug">
                        {entry.title}
                      </h3>

                      {/* Subtitle */}
                      <p className="text-xs font-medium mb-1.5" style={{ color: entry.color }}>
                        {entry.subtitle}
                      </p>

                      {/* Org · Date */}
                      <p className="text-[11px] text-[var(--text-muted)] font-mono mb-2">
                        {entry.org} · {entry.date}
                      </p>

                      {/* Description */}
                      <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                        {entry.description}
                      </p>
                    </motion.div>
                  </div>

                  {/* Timeline node */}
                  <div className="absolute left-6 sm:left-1/2 -translate-x-1/2 z-10">
                    <motion.div
                      className="w-4 h-4 rounded-full border-2 relative"
                      style={{ background: entry.color, borderColor: 'var(--bg-primary)' }}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: 'spring', stiffness: 400, damping: 20, delay: i * 0.07 }}
                    >
                      <span
                        className="absolute inset-0 rounded-full animate-ping opacity-30"
                        style={{ background: entry.color }}
                      />
                    </motion.div>
                  </div>

                  {/* Year label — desktop only, opposite side */}
                  <div className={`hidden sm:block flex-1 ${isLeft ? 'pl-12 text-left' : 'pr-12 text-right'}`}>
                    <span className="font-mono text-sm font-bold" style={{ color: entry.color }}>
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
