'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { CERTIFICATIONS } from '@/lib/constants';
import { fadeUp, staggerContainer } from '@/lib/animations';

const CERT_BORDER: Record<string, [string, string]> = {
  'Linux Fundamentals':  ['#F59E0B', '#D97706'],
  'AI Tools Workshop':   ['#00F5FF', '#0EA5E9'],
  'Trinetra Hackathon':  ['#7C3AED', '#6D28D9'],
  "Just In Case '25":    ['#10B981', '#059669'],
};

export function Certifications() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="certifications" className="relative" style={{ padding: '6rem 0 5rem', background: 'var(--bg-base)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div ref={ref} variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="text-center mb-12">
          <p className="section-label mb-3">&lt; Certifications /&gt;</p>
          <h2 className="font-syne font-bold text-3xl sm:text-4xl lg:text-5xl" style={{ color: 'var(--text-primary)' }}>
            Credentials &amp; <span className="gradient-text">Badges</span>
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {CERTIFICATIONS.map((cert) => {
            const [from, to] = CERT_BORDER[cert.title] ?? [cert.color, cert.color];
            return (
              <motion.div
                key={cert.title}
                variants={fadeUp}
                className="rounded-2xl p-px group"
                style={{ background: `linear-gradient(135deg, ${from}60, ${to}25, transparent)` }}
                whileHover={{ y: -4 }}
              >
                <div
                  className="relative rounded-2xl p-6 overflow-hidden h-full"
                  style={{ background: 'var(--bg-card)' }}
                >
                  {/* Shimmer sweep */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100"
                    style={{
                      background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 50%, transparent 100%)',
                      backgroundSize: '200% 100%',
                      backgroundPosition: '-100% 0',
                      transition: 'background-position 0.6s ease, opacity 0.2s',
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundPosition = '100% 0'; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundPosition = '-100% 0'; }}
                  />

                  <div
                    className="absolute top-3 right-3 text-[10px] font-outfit font-semibold px-2 py-0.5 rounded-full"
                    style={{ background: `${from}22`, border: `1px solid ${from}50`, color: from }}
                  >
                    Certificate
                  </div>

                  <div className="text-4xl mb-4 text-center" style={{ filter: `drop-shadow(0 0 10px ${cert.color}60)` }}>
                    {cert.icon}
                  </div>
                  <h3 className="font-syne font-bold text-base mb-1 text-center" style={{ color: 'var(--text-primary)' }}>
                    {cert.title}
                  </h3>
                  <p className="text-sm text-center mb-1.5" style={{ color: 'var(--text-secondary)' }}>
                    {cert.issuer}
                  </p>
                  <p className="text-[11px] text-center font-mono tracking-wide" style={{ color: 'var(--text-muted)' }}>
                    {cert.duration}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
