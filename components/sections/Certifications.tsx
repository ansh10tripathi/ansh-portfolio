'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { CERTIFICATIONS } from '@/lib/constants';
import { fadeUp, staggerContainer } from '@/lib/animations';

/** Certification cards grid */
export function Certifications() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="certifications" className="section-padding relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-12"
        >
          <p className="section-label mb-3">&lt; Certifications /&gt;</p>
          <h2 className="font-syne font-bold text-3xl sm:text-4xl lg:text-5xl text-[var(--text-primary)]">
            Credentials &amp; <span className="gradient-text">Badges</span>
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {CERTIFICATIONS.map((cert) => (
            <motion.div
              key={cert.title}
              variants={fadeUp}
              className="relative rounded-2xl p-6 overflow-hidden group"
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
              whileHover={{
                borderColor: `${cert.color}40`,
                background: `${cert.color}05`,
                y: -4,
              }}
            >
              {/* Certificate badge */}
              <div
                className="absolute top-3 right-3 text-xs font-outfit px-2 py-0.5 rounded-full"
                style={{ background: `${cert.color}20`, color: cert.color }}
              >
                Certificate
              </div>

              {/* Shimmer on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none shimmer-bg"
              />

              <div className="text-4xl mb-4 text-center">{cert.icon}</div>
              <h3 className="font-syne font-bold text-base text-[var(--text-primary)] mb-1 text-center">
                {cert.title}
              </h3>
              <p className="text-sm text-[var(--text-secondary)] text-center mb-1">{cert.issuer}</p>
              <p className="text-xs text-[var(--text-muted)] text-center font-mono">{cert.duration}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
