'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { TerminalText } from '@/components/ui/TerminalText';
import { CounterAnim } from '@/components/ui/CounterAnim';
import { slideLeft, slideRight } from '@/lib/animations';
import { PERSONAL } from '@/lib/constants';

const STATS = [
  { value: 10, suffix: '+', label: 'Public GitHub Repos' },
  { value: 7.4, suffix: '', label: 'Current CGPA', decimals: 1 },
  { value: 5, suffix: '+', label: 'Projects Shipped' },
  { value: 4, suffix: '', label: 'Hackathons Entered' },
];

const INTERESTS = [
  { icon: '🤖', label: 'Machine Learning' },
  { icon: '⚙️', label: 'Systems Programming' },
  { icon: '🌐', label: 'Web Development' },
  { icon: '📊', label: 'Data Science' },
  { icon: '🔬', label: 'Research' },
  { icon: '🏃', label: 'Athletics' },
];

/** About section with terminal card and animated stats */
export function About() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="about" className="section-padding relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-center">

          {/* Left — 3/5 */}
          <motion.div
            variants={slideLeft}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="lg:col-span-3"
          >
            <p className="section-label mb-3">&lt; About Me /&gt;</p>
            <h2 className="font-syne font-bold text-3xl sm:text-4xl lg:text-5xl mb-6 text-[var(--text-primary)]">
              The Mind Behind{' '}
              <span className="gradient-text">the Machine</span>
            </h2>

            <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed">
              <p>
                I&apos;m <span className="text-[var(--text-primary)] font-medium">Ansh Tripathi</span>, a B.Tech CSE (AI/ML) student at Lovely Professional University with a deep passion for building systems that think. I work at the intersection of machine learning algorithms, real-time computing, and modern web engineering.
              </p>
              <p>
                Currently pursuing my degree with a{' '}
                <span className="text-[#00F5FF] font-medium">LPUNEST Category 1 Scholarship</span> (top merit tier, 30% tuition waiver), I focus on translating complex ML concepts into production-grade software — from bio-inspired optimization algorithms to real-time bidding engines.
              </p>
              <p>
                Beyond code, I&apos;m a{' '}
                <span className="text-[#10B981] font-medium">district-level athlete</span> — competing in Shot Put, Javelin, Volleyball, and Football. I believe the same discipline that wins on the field drives engineering excellence.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
              {STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl p-4 text-center"
                  style={{
                    background: 'rgba(0,245,255,0.04)',
                    border: '1px solid rgba(0,245,255,0.1)',
                  }}
                >
                  <div className="font-syne font-bold text-2xl sm:text-3xl gradient-text">
                    <CounterAnim
                      target={stat.value}
                      suffix={stat.suffix}
                      decimals={stat.decimals ?? 0}
                    />
                  </div>
                  <div className="text-xs text-[var(--text-muted)] mt-1 font-outfit">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — 2/5 */}
          <motion.div
            variants={slideRight}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="lg:col-span-2 space-y-4"
          >
            <TerminalText />

            {/* Interest chips */}
            <div className="flex flex-wrap gap-2 mt-4">
              {INTERESTS.map((item) => (
                <motion.span
                  key={item.label}
                  whileHover={{ scale: 1.05, borderColor: 'rgba(0,245,255,0.4)' }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-outfit transition-all duration-200"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: 'var(--text-secondary)',
                  }}
                >
                  <span>{item.icon}</span>
                  {item.label}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
