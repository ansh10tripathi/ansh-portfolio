'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { fadeUp } from '@/lib/animations';

const TABS = [
  { key: 'languages',  label: 'Languages',          accent: 'var(--accent-cyan)'    },
  { key: 'ml',         label: 'ML & Data Science',  accent: 'var(--accent-emerald)' },
  { key: 'web',        label: 'Web & Frameworks',   accent: 'var(--accent-violet)'  },
  { key: 'tools',      label: 'Tools & Databases',  accent: 'var(--accent-amber)'   },
] as const;

type TabKey = typeof TABS[number]['key'];

const SKILL_DATA: Record<TabKey, { name: string; icon: string; level: number }[]> = {
  languages: [
    { name: 'Python',     icon: 'python',     level: 90 },
    { name: 'C++',        icon: 'cplusplus',  level: 82 },
    { name: 'JavaScript', icon: 'javascript', level: 80 },
    { name: 'TypeScript', icon: 'typescript', level: 72 },
    { name: 'Java',       icon: 'java',       level: 70 },
    { name: 'C',          icon: 'c',          level: 75 },
  ],
  ml: [
    { name: 'NumPy',        icon: 'numpy',       level: 88 },
    { name: 'Pandas',       icon: 'pandas',      level: 85 },
    { name: 'Scikit-learn', icon: 'scikitlearn', level: 78 },
    { name: 'Matplotlib',   icon: 'matplotlib',  level: 82 },
    { name: 'Jupyter',      icon: 'jupyter',     level: 88 },
    { name: 'Google Colab', icon: 'googlecolab', level: 85 },
  ],
  web: [
    { name: 'React',      icon: 'react',      level: 82 },
    { name: 'TailwindCSS',icon: 'tailwindcss',level: 88 },
    { name: 'Flask',      icon: 'flask',      level: 75 },
    { name: 'FastAPI',    icon: 'fastapi',    level: 72 },
    { name: 'HTML/CSS',   icon: 'html5',      level: 90 },
    { name: 'Next.js',    icon: 'nextjs',     level: 70 },
  ],
  tools: [
    { name: 'Git',        icon: 'git',        level: 85 },
    { name: 'GitHub',     icon: 'github',     level: 90 },
    { name: 'PostgreSQL', icon: 'postgresql', level: 72 },
    { name: 'VS Code',    icon: 'vscode',     level: 92 },
    { name: 'Linux',      icon: 'linux',      level: 70 },
  ],
};

const ICON_VARIANT: Record<string, string> = {
  javascript: 'plain', typescript: 'plain', cplusplus: 'plain', c: 'plain',
  nextjs: 'plain', flask: 'original', fastapi: 'plain', googlecolab: 'plain',
  scikitlearn: 'plain', matplotlib: 'plain', vscode: 'plain', github: 'original',
};

function deviconUrl(icon: string) {
  const variant = ICON_VARIANT[icon] ?? 'original';
  return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${icon}/${icon}-${variant}.svg`;
}

const CORE_CONCEPTS = [
  'Data Structures & Algorithms', 'OOP', 'Operating Systems',
  'DBMS', 'RESTful APIs', 'Real-Time Systems', 'Discrete Mathematics',
];

function useCounter(target: number, active: boolean, duration = 1200) {
  const [count, setCount] = useState(0);
  const raf = useRef<number>(0);
  useEffect(() => {
    if (!active) { setCount(0); return; }
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      setCount(Math.round(p * target));
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [target, active, duration]);
  return count;
}

const SIZE = 48;
const SW   = 4;
const R    = (SIZE - SW) / 2;
const CIRC = 2 * Math.PI * R;

function SkillCard({ skill, accent, animate }: {
  skill: { name: string; icon: string; level: number };
  accent: string;
  animate: boolean;
}) {
  const offset = CIRC - (skill.level / 100) * CIRC;
  const count  = useCounter(skill.level, animate);
  const [imgErr, setImgErr] = useState(false);
  useEffect(() => setImgErr(false), [skill.icon]);

  return (
    <motion.div
      variants={fadeUp}
      className="flex flex-col items-center gap-2.5 p-4 rounded-xl cursor-default transition-all duration-150"
      style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)' }}
      whileHover={{ borderColor: 'var(--border-accent)', boxShadow: 'var(--glow-card-hover)', y: -3 }}
    >
      <div className="relative" style={{ width: SIZE, height: SIZE }}>
        <svg width={SIZE} height={SIZE} style={{ transform: 'rotate(-90deg)' }}>
          <circle cx={SIZE/2} cy={SIZE/2} r={R} fill="none" stroke="var(--border-subtle)" strokeWidth={SW} />
          <motion.circle
            cx={SIZE/2} cy={SIZE/2} r={R}
            fill="none" stroke={accent} strokeWidth={SW} strokeLinecap="round"
            strokeDasharray={CIRC}
            initial={{ strokeDashoffset: CIRC }}
            animate={{ strokeDashoffset: animate ? offset : CIRC }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          {!imgErr ? (
            <img src={deviconUrl(skill.icon)} alt={skill.name} width={22} height={22}
              style={{ objectFit: 'contain' }} onError={() => setImgErr(true)} />
          ) : (
            <span className="font-mono font-bold" style={{ fontSize: '10px', color: accent }}>
              {skill.name.slice(0, 3).toUpperCase()}
            </span>
          )}
        </div>
      </div>

      <p className="font-outfit text-center leading-tight" style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-primary)' }}>
        {skill.name}
      </p>
      <p className="font-mono font-bold" style={{ fontSize: '12px', color: accent }}>
        {count}%
      </p>
    </motion.div>
  );
}

export function Skills() {
  const [activeTab, setActiveTab] = useState<TabKey>('languages');
  const [prevTab,   setPrevTab]   = useState<TabKey>('languages');
  const [arcActive, setArcActive] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.15 });
  const tabKeys = TABS.map(t => t.key);
  const direction = tabKeys.indexOf(activeTab) >= tabKeys.indexOf(prevTab) ? 1 : -1;

  const switchTab = (key: TabKey) => {
    if (key === activeTab) return;
    setPrevTab(activeTab);
    setArcActive(false);
    setActiveTab(key);
  };

  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => setArcActive(true), 80);
    return () => clearTimeout(t);
  }, [activeTab, inView]);

  const accent = TABS.find(t => t.key === activeTab)!.accent;

  return (
    <section id="skills" className="section-padding relative" style={{ background: 'var(--bg-base)' }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={sectionRef}>
          <motion.div variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="text-center mb-8 sm:mb-12">
            <p className="section-label mb-2 sm:mb-3">&lt; Skills /&gt;</p>
            <h2 className="font-syne font-bold text-2xl sm:text-3xl lg:text-5xl" style={{ color: 'var(--text-primary)' }}>
              Technical <span className="gradient-text">Arsenal</span>
            </h2>
          </motion.div>

          {/* Tabs */}
          <div className="skills-tabs-scroll flex justify-start sm:justify-center gap-0 mb-6 sm:mb-10 relative">
            {TABS.map((tab) => {
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => switchTab(tab.key)}
                  className="relative px-3 sm:px-5 py-2 rounded-t-lg transition-colors duration-200 whitespace-nowrap"
                  style={{
                    fontFamily: 'var(--font-outfit), sans-serif',
                    fontSize: 'clamp(11px, 2.5vw, 14px)',
                    fontWeight: 500,
                    color: isActive ? tab.accent : 'var(--text-muted)',
                    background: 'transparent',
                    border: 'none',
                  }}
                >
                  {tab.label}
                  {isActive && (
                    <motion.div
                      layoutId="tab-underline"
                      className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full"
                      style={{ background: tab.accent }}
                      transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                    />
                  )}
                </button>
              );
            })}
            <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'var(--border-subtle)' }} />
          </div>

          {/* Skills grid */}
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activeTab}
              custom={direction}
              variants={{
                hidden:  (d: number) => ({ opacity: 0, x: d * 40 }),
                visible: { opacity: 1, x: 0, transition: { duration: 0.28, ease: 'easeOut', staggerChildren: 0.05 } },
                exit:    (d: number) => ({ opacity: 0, x: d * -40, transition: { duration: 0.2, ease: 'easeIn' } }),
              }}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3"
            >
              {SKILL_DATA[activeTab].map((skill) => (
                <SkillCard key={skill.name} skill={skill} accent={accent} animate={arcActive} />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Core CS Concepts */}
          <motion.div
            variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} transition={{ delay: 0.5 }}
            className="mt-12 text-center"
          >
            <p className="text-xs font-outfit font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--text-muted)' }}>
              Core CS Concepts
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {CORE_CONCEPTS.map((concept) => (
                <span
                  key={concept}
                  className="px-3 py-1 rounded-full text-xs font-outfit"
                  style={{ background: 'var(--bg-glass)', border: '1px solid var(--border-subtle)', color: 'var(--text-secondary)' }}
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
