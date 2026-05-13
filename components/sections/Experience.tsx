'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { TIMELINE_ENTRIES } from '@/lib/constants';
import { fadeUp } from '@/lib/animations';

export function Experience() {
  const { ref: headingRef, inView } = useInView({ triggerOnce: true, threshold: 0.05 });
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: timelineRef, offset: ['start 80%', 'end 20%'] });
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="experience" className="section-padding relative" style={{ background: 'var(--bg-elevated)' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={headingRef}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-14"
        >
          <p className="section-label mb-2 sm:mb-3">&lt; Journey /&gt;</p>
          <h2 className="font-syne font-bold text-2xl sm:text-3xl lg:text-5xl" style={{ color: 'var(--text-primary)' }}>
            My <span className="gradient-text">Timeline</span>
          </h2>
        </motion.div>

        <div ref={timelineRef} className="relative">
          {/* Background line — left edge on mobile, center on sm+ */}
          <div
            className="absolute top-0 bottom-0 w-px"
            style={{ background: 'var(--border-subtle)', left: '8px' }}
          />
          <div className="sm:hidden" />
          <div
            className="hidden sm:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
            style={{ background: 'var(--border-subtle)' }}
          />
          {/* Scroll-linked gradient line */}
          <motion.div
            className="absolute top-0 w-px"
            style={{
              left: '8px',
              height: '100%',
              scaleY: lineScaleY,
              transformOrigin: 'top',
              background: 'var(--grad-accent)',
            }}
          />
          <motion.div
            className="hidden sm:block absolute left-1/2 top-0 w-px -translate-x-1/2"
            style={{
              height: '100%',
              scaleY: lineScaleY,
              transformOrigin: 'top',
              background: 'var(--grad-accent)',
            }}
          />

          <div className="space-y-8">
            {TIMELINE_ENTRIES.map((entry, i) => {
              const isLeft = i % 2 === 0;
              const cardVariants = {
                hidden: { opacity: 0, x: isLeft ? -60 : 60 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as [number,number,number,number] } },
              };

              return (
                <div key={i} className={`relative flex items-start sm:items-center ${isLeft ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}>
                  {/* Card — full width on mobile with left padding for the line */}
                  <div className={`flex-1 pl-6 sm:pl-0 ${isLeft ? 'sm:pr-12' : 'sm:pl-12'}`}>
                    <motion.div
                      variants={cardVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.2 }}
                      className="rounded-xl p-4 sm:p-5"
                      style={{
                        background: 'var(--bg-card)',
                        border: '1px solid var(--border-card)',
                        borderLeft: `3px solid ${entry.color}`,
                      }}
                      whileHover={{
                        background: `${entry.color}06`,
                        borderColor: `${entry.color}35`,
                        y: -2,
                        transition: { duration: 0.2 },
                      }}
                    >
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-xl leading-none">{entry.icon}</span>
                        <span
                          className="text-[10px] font-outfit font-semibold px-2 py-0.5 rounded-full flex-shrink-0"
                          style={{
                            background: `${entry.color}18`,
                            border: `1px solid ${entry.color}40`,
                            color: entry.color,
                          }}
                        >
                          {entry.type}
                        </span>
                      </div>

                      <h3 className="font-syne font-bold text-base mb-0.5 leading-snug" style={{ color: 'var(--text-primary)' }}>
                        {entry.title}
                      </h3>
                      {entry.subtitle && (
                        <p className="text-xs font-medium mb-1.5" style={{ color: entry.color }}>{entry.subtitle}</p>
                      )}
                      <p className="text-[11px] font-mono mb-2" style={{ color: 'var(--text-muted)' }}>
                        {entry.org} · {entry.date}
                      </p>
                      <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                        {entry.description}
                      </p>
                    </motion.div>
                  </div>

                  {/* Node — left edge on mobile, center on sm+ */}
                  <div className="absolute left-[2px] sm:left-1/2 sm:-translate-x-1/2 z-10">
                    <motion.div
                      className="w-4 h-4 rounded-full border-2 relative"
                      style={{ background: entry.color, borderColor: 'var(--bg-elevated)' }}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true, amount: 1 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 15, delay: 0.1 }}
                    >
                      <span className="absolute inset-0 rounded-full animate-ping opacity-30" style={{ background: entry.color }} />
                    </motion.div>
                  </div>

                  {/* Year label */}
                  <div className={`hidden sm:block flex-1 ${isLeft ? 'pl-12 text-left' : 'pr-12 text-right'}`}>
                    <span className="font-mono text-sm font-bold" style={{ color: entry.color }}>{entry.year}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
