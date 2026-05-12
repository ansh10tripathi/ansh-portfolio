'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Download, ExternalLink } from 'lucide-react';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { PERSONAL } from '@/lib/constants';
import { fadeUp } from '@/lib/animations';

/** Resume download CTA banner */
export function Resume() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section id="resume" className="section-padding relative overflow-hidden">
      {/* Animated gradient background */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: 'linear-gradient(135deg, rgba(0,245,255,0.08) 0%, rgba(124,58,237,0.08) 50%, rgba(79,70,229,0.08) 100%)',
        }}
      />
      <div className="orb-cyan" style={{ top: '-20%', left: '20%', opacity: 0.5 }} />
      <div className="orb-violet" style={{ bottom: '-20%', right: '20%', opacity: 0.5 }} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center"
        >
          <p className="section-label mb-4">&lt; Resume /&gt;</p>
          <h2 className="font-syne font-bold text-3xl sm:text-4xl lg:text-5xl text-[var(--text-primary)] mb-4">
            Ready to <span className="gradient-text">Collaborate?</span>
          </h2>
          <p className="text-[var(--text-secondary)] max-w-xl mx-auto mb-10 text-lg">
            Download my resume for a complete overview of my skills, projects, and education.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <MagneticButton data-cursor="download">
              <a
                href="/resume/Ansh_Tripathi_Resume.pdf"
                download
                className="flex items-center gap-3 px-8 py-4 rounded-xl font-outfit font-semibold text-base transition-all duration-200 hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, rgba(0,245,255,0.2), rgba(124,58,237,0.2))',
                  border: '1px solid rgba(0,245,255,0.4)',
                  color: '#00F5FF',
                  boxShadow: '0 0 40px rgba(0,245,255,0.15)',
                }}
              >
                <Download size={18} />
                Download CV
              </a>
            </MagneticButton>

            <MagneticButton
              href={`https://${PERSONAL.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="linkedin"
            >
              <span
                className="flex items-center gap-3 px-8 py-4 rounded-xl font-outfit font-semibold text-base transition-all duration-200 hover:scale-105"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'var(--text-primary)',
                }}
              >
                <ExternalLink size={18} />
                View LinkedIn
              </span>
            </MagneticButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
