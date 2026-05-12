'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { SKILLS } from '@/lib/constants';
import type { Skill } from '@/types';
import { staggerContainer, fadeUp } from '@/lib/animations';

const TABS = [
  { key: 'languages', label: 'Languages' },
  { key: 'ml', label: 'ML & Data Science' },
  { key: 'web', label: 'Web & Frameworks' },
  { key: 'tools', label: 'Tools' },
] as const;

const CORE_CONCEPTS = [
  'Data Structures & Algorithms', 'OOP', 'Operating Systems', 'DBMS',
  'RESTful APIs', 'Real-Time Systems', 'Discrete Mathematics',
];

const SKILL_ICONS: Record<string, string> = {
  python: '🐍', cplusplus: '⚡', javascript: '🟨', typescript: '🔷',
  java: '☕', c: '🔵', numpy: '🔢', pandas: '🐼', scikitlearn: '🤖',
  matplotlib: '📊', jupyter: '📓', googlecolab: '🔬', react: '⚛️',
  nextdotjs: '▲', tailwindcss: '🎨', flask: '🌶️', fastapi: '⚡',
  html5: '🌐', git: '🌿', github: '🐙', postgresql: '🐘',
  vscode: '💙', linux: '🐧',
};

function SkillArc({ skill, inView }: { skill: Skill; inView: boolean }) {
  const size = 80;
  const strokeWidth = 5;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (skill.level / 100) * circumference;

  return (
    <motion.div
      variants={fadeUp}
      className="flex flex-col items-center gap-3 p-4 rounded-xl transition-all duration-200 group"
      style={{
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.05)',
      }}
      whileHover={{
        background: 'rgba(0,245,255,0.04)',
        borderColor: 'rgba(0,245,255,0.2)',
        y: -2,
      }}
    >
      {/* Arc */}
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2} cy={size / 2} r={radius}
            fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={strokeWidth}
          />
          <motion.circle
            cx={size / 2} cy={size / 2} r={radius}
            fill="none"
            stroke="url(#skillGrad)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={inView ? { strokeDashoffset: offset } : { strokeDashoffset: circumference }}
            transition={{ duration: 1.2, ease: 'easeInOut', delay: 0.1 }}
          />
          <defs>
            <linearGradient id="skillGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00F5FF" />
              <stop offset="100%" stopColor="#7C3AED" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl">{SKILL_ICONS[skill.icon] ?? '💡'}</span>
        </div>
      </div>

      <div className="text-center">
        <p className="text-sm font-outfit font-medium text-[var(--text-primary)]">{skill.name}</p>
        <p className="text-xs text-[#00F5FF] font-mono mt-0.5">{skill.level}%</p>
      </div>
    </motion.div>
  );
}

/** Interactive skills section with tab system and animated arcs */
export function Skills() {
  const [activeTab, setActiveTab] = useState<typeof TABS[number]['key']>('languages');
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const tabRef = useRef<HTMLDivElement>(null);

  const skills = SKILLS[activeTab];

  return (
    <section id="skills" className="section-padding relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref}>
          {/* Header */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="text-center mb-12"
          >
            <p className="section-label mb-3">&lt; Skills /&gt;</p>
            <h2 className="font-syne font-bold text-3xl sm:text-4xl lg:text-5xl text-[var(--text-primary)]">
              Technical <span className="gradient-text">Arsenal</span>
            </h2>
          </motion.div>

          {/* Tabs */}
          <div ref={tabRef} className="flex flex-wrap justify-center gap-2 mb-10">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className="relative px-5 py-2.5 rounded-full text-sm font-outfit font-medium transition-all duration-200"
                style={{
                  color: activeTab === tab.key ? '#00F5FF' : 'var(--text-secondary)',
                  background: activeTab === tab.key ? 'rgba(0,245,255,0.1)' : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${activeTab === tab.key ? 'rgba(0,245,255,0.3)' : 'rgba(255,255,255,0.06)'}`,
                }}
              >
                {tab.label}
                {activeTab === tab.key && (
                  <motion.div
                    layoutId="tab-indicator"
                    className="absolute inset-0 rounded-full"
                    style={{ background: 'rgba(0,245,255,0.05)' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Skills Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, x: -20 }}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3"
            >
              {skills.map((skill) => (
                <SkillArc key={skill.name} skill={skill} inView={inView} />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Core Concepts */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            transition={{ delay: 0.4 }}
            className="mt-12 text-center"
          >
            <p className="text-xs font-outfit font-semibold text-[var(--text-muted)] uppercase tracking-widest mb-4">
              Core CS Concepts
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {CORE_CONCEPTS.map((concept) => (
                <span
                  key={concept}
                  className="px-3 py-1.5 rounded-full text-sm font-outfit"
                  style={{
                    background: 'rgba(124,58,237,0.08)',
                    border: '1px solid rgba(124,58,237,0.2)',
                    color: 'var(--text-secondary)',
                  }}
                >
                  {concept}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
