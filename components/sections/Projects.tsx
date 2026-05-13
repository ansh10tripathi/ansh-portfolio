'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Github, ExternalLink, Lock } from 'lucide-react';
import { PROJECTS } from '@/lib/constants';
import type { Project } from '@/types';
import { fadeUp } from '@/lib/animations';

function TechPills({ techs, color }: { techs: string[]; color: string }) {
  return (
    <div className="flex flex-wrap gap-1.5 justify-center mt-4">
      {techs.map((t) => (
        <span
          key={t}
          className="px-2 py-0.5 rounded-full text-[10px] font-mono"
          style={{ background: `${color}18`, border: `1px solid ${color}35`, color }}
        >
          {t}
        </span>
      ))}
    </div>
  );
}

function SmartGridVisual({ color }: { color: string }) {
  const nodes: [number, number][] = [];
  for (let r = 0; r < 5; r++)
    for (let c = 0; c < 5; c++)
      nodes.push([c * 28 + 14, r * 28 + 14]);
  const edges: [number, number, number, number][] = [];
  for (let r = 0; r < 5; r++)
    for (let c = 0; c < 5; c++) {
      if (c < 4) edges.push([c * 28 + 14, r * 28 + 14, (c + 1) * 28 + 14, r * 28 + 14]);
      if (r < 4) edges.push([c * 28 + 14, r * 28 + 14, c * 28 + 14, (r + 1) * 28 + 14]);
    }
  return (
    <div className="flex flex-col items-center">
      <svg width="154" height="154" viewBox="0 0 154 154">
        <defs><style>{`@keyframes flow{0%{stroke-dashoffset:40}100%{stroke-dashoffset:0}}`}</style></defs>
        {edges.map(([x1, y1, x2, y2], i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
            stroke={color} strokeWidth="0.8" strokeOpacity="0.25" strokeDasharray="4 4"
            style={{ animation: `flow ${1.2 + (i % 5) * 0.3}s linear infinite` }} />
        ))}
        {nodes.map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r={i === 12 ? 5 : 3}
            fill={i === 12 ? color : `${color}80`}
            style={i === 12 ? { filter: `drop-shadow(0 0 4px ${color})` } : undefined} />
        ))}
      </svg>
      <TechPills techs={['Python', 'ML', 'GOA']} color={color} />
    </div>
  );
}

function SolubilityVisual({ color }: { color: string }) {
  const points: [number, number][] = [[18,88],[32,72],[50,58],[68,44],[85,32],[102,20]];
  return (
    <div className="flex flex-col items-center">
      <svg width="130" height="110" viewBox="0 0 130 110">
        <line x1="14" y1="8" x2="14" y2="96" stroke="var(--border-subtle)" strokeWidth="1" />
        <line x1="14" y1="96" x2="118" y2="96" stroke="var(--border-subtle)" strokeWidth="1" />
        <text x="2" y="55" fill="var(--text-muted)" fontSize="7" transform="rotate(-90,8,55)">LogS</text>
        <text x="50" y="108" fill="var(--text-muted)" fontSize="7">Prediction</text>
        <line x1="18" y1="88" x2="102" y2="20" stroke={color} strokeWidth="1.5" strokeOpacity="0.7"
          strokeDasharray="200" strokeDashoffset="200">
          <animate attributeName="stroke-dashoffset" from="200" to="0" dur="1.4s" fill="freeze" />
        </line>
        {points.map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="3.5" fill={color} fillOpacity="0.85"
            style={{ filter: `drop-shadow(0 0 3px ${color})` }} />
        ))}
      </svg>
      <TechPills techs={['Scikit-learn', 'Pandas', 'Jupyter']} color={color} />
    </div>
  );
}

function PriorityVisual({ color }: { color: string }) {
  const tasks = [
    { label: 'High', w: '85%', c: '#F43F5E' },
    { label: 'Med',  w: '55%', c: '#F59E0B' },
    { label: 'Low',  w: '35%', c: '#10B981' },
  ];
  return (
    <div className="flex flex-col items-center gap-1 w-full px-2">
      <div className="w-full space-y-2">
        {tasks.map((t, i) => (
          <div key={t.label} className="flex items-center gap-2">
            <span className="text-[9px] font-mono w-7 text-right" style={{ color: t.c }}>{t.label}</span>
            <div className="flex-1 h-5 rounded-sm overflow-hidden" style={{ background: 'var(--border-subtle)' }}>
              <motion.div
                className="h-full rounded-sm flex items-center px-1.5"
                style={{ background: `${t.c}30`, border: `1px solid ${t.c}50`, width: t.w }}
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 1.6, delay: i * 0.4, repeat: Infinity }}
              >
                <span className="text-[8px] font-mono" style={{ color: t.c }}>PID-{i + 1}</span>
              </motion.div>
            </div>
            {i === 1 && (
              <motion.div animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 0.8, repeat: Infinity }}>
                <Lock size={10} color={color} />
              </motion.div>
            )}
          </div>
        ))}
      </div>
      <TechPills techs={['Python', 'RTOS', 'Mutex']} color={color} />
    </div>
  );
}

function BidWiseVisual({ color }: { color: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="text-[10px] font-outfit uppercase tracking-widest" style={{ color: `${color}80` }}>Live Bid</div>
      <motion.div
        className="font-mono font-bold"
        style={{ fontSize: '2.4rem', color, textShadow: `0 0 20px ${color}80` }}
        animate={{ opacity: [0.75, 1, 0.75] }}
        transition={{ duration: 1.2, repeat: Infinity }}
      >
        $4,872
      </motion.div>
      <motion.div
        className="text-[9px] font-mono flex gap-3"
        style={{ color: `${color}70` }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 1.4 }}
      >
        <span>DSP ▲</span><span>2nd-price</span><span>ROI ✓</span>
      </motion.div>
      <TechPills techs={['TypeScript', 'AI', 'Auction']} color={color} />
    </div>
  );
}

function KanbanVisual({ color }: { color: string }) {
  const cols = [
    { title: 'To Do',       dot: 'var(--text-muted)', cards: ['Design UI', 'API docs'] },
    { title: 'In Progress', dot: '#F59E0B',            cards: ['Auth flow'] },
    { title: 'Done',        dot: '#10B981',            cards: ['Setup', 'DB schema'] },
  ];
  return (
    <div className="flex flex-col items-center gap-2 w-full px-1">
      <div className="flex gap-1.5 w-full">
        {cols.map((col) => (
          <div key={col.title} className="flex-1 rounded-md overflow-hidden"
            style={{ background: 'var(--bg-card-hover)', border: '1px solid var(--border-card)' }}
          >
            <div className="flex items-center gap-1 px-1.5 py-1" style={{ borderBottom: '1px solid var(--border-card)' }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: col.dot }} />
              <span className="text-[8px] font-outfit font-semibold truncate" style={{ color: 'var(--text-muted)' }}>{col.title}</span>
            </div>
            <div className="p-1 space-y-1">
              {col.cards.map((c) => (
                <div key={c} className="rounded px-1.5 py-1 text-[7px] font-outfit"
                  style={{ background: 'var(--bg-glass)', color: 'var(--text-secondary)' }}>
                  {c}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <TechPills techs={['React', 'Tailwind', 'JS']} color={color} />
    </div>
  );
}

function ProjectVisual({ project }: { project: Project }) {
  const { id, color } = project;
  return (
    <div className="relative flex flex-col items-center justify-center w-full h-full">
      <div className="absolute w-40 h-40 rounded-full blur-xl pointer-events-none" style={{ background: color, opacity: 0.15 }} />
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="relative z-10 w-full flex justify-center"
      >
        {id === 'smartgrid'          && <SmartGridVisual color={color} />}
        {id === 'solubility'         && <SolubilityVisual color={color} />}
        {id === 'priority-inversion' && <PriorityVisual color={color} />}
        {id === 'bidwise'            && <BidWiseVisual color={color} />}
        {id === 'productivity-hub'   && <KanbanVisual color={color} />}
      </motion.div>
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });
  const isEven = index % 2 === 0;

  const rotateX = useSpring(useMotionValue(0), { stiffness: 300, damping: 20 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 300, damping: 20 });
  const scale   = useSpring(useMotionValue(1), { stiffness: 300, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia('(hover: none)').matches) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    rotateX.set(((mouseY - rect.height / 2) / rect.height) * -15);
    rotateY.set(((mouseX - rect.width  / 2) / rect.width)  *  15);
    scale.set(1.02);
    if (spotlightRef.current) {
      spotlightRef.current.style.background =
        `radial-gradient(circle at ${mouseX}px ${mouseY}px, ${project.color}12 0%, transparent 60%)`;
    }
  };

  const handleMouseLeave = () => {
    rotateX.set(0); rotateY.set(0); scale.set(1);
    if (spotlightRef.current) spotlightRef.current.style.background = 'transparent';
  };

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      transition={{ delay: index * 0.1 }}
      className="relative"
      style={{ perspective: '1000px' }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative rounded-2xl overflow-hidden tilt-card"
        style={{
          background: 'var(--bg-card)',
          border: `1px solid var(--border-card)`,
          borderLeft: `4px solid ${project.color}`,
          transformStyle: 'preserve-3d',
          willChange: 'transform',
          rotateX, rotateY, scale,
        }}
        whileHover={{ boxShadow: 'var(--glow-card-hover)' }}
      >
        {/* Ghost number */}
        <span
          aria-hidden
          style={{
            fontFamily: 'var(--font-syne), sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(5rem, 12vw, 9rem)',
            color: 'var(--text-primary)',
            opacity: 0.03,
            position: 'absolute',
            right: '20px',
            top: '50%',
            transform: 'translateY(-50%)',
            lineHeight: 1,
            zIndex: 0,
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>
        <div ref={spotlightRef} className="absolute inset-0 pointer-events-none z-10" />

        <div className={`flex flex-col md:flex-row ${!isEven ? 'md:flex-row-reverse' : ''} gap-0`}>
          {/* Text side */}
          <div className="flex-1 p-4 sm:p-6 lg:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span
                  className="px-3 py-1 rounded-full text-xs font-outfit font-semibold"
                  style={{ background: `${project.color}20`, border: `1px solid ${project.color}40`, color: project.color }}
                >
                  {project.badge}
                </span>
                <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>{project.date}</span>
              </div>

              <p className="text-xs font-outfit uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)' }}>
                {project.category}
              </p>
              <h3 className="font-syne font-bold text-xl sm:text-2xl mb-2 leading-tight" style={{ color: 'var(--text-primary)' }}>
                {project.title}
              </h3>
              <p className="text-sm font-medium mb-4" style={{ color: project.color }}>
                {project.tagline}
              </p>
              <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded-md text-xs font-mono"
                    style={{ background: 'var(--bg-glass)', border: '1px solid var(--border-subtle)', color: 'var(--text-secondary)' }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-outfit font-medium transition-all duration-200 hover:gap-3"
                style={{ color: 'var(--accent-cyan)' }}
                onMouseEnter={e => (e.currentTarget.style.textDecoration = 'underline')}
                onMouseLeave={e => (e.currentTarget.style.textDecoration = 'none')}
                data-cursor="github"
              >
                <Github size={16} />
                View on GitHub
                <ExternalLink size={12} />
              </a>
            </div>
          </div>

          {/* Visual side — hidden on mobile to save space */}
          <div
            className="hidden sm:flex md:w-56 lg:w-80 items-center justify-center p-4 sm:p-6 relative overflow-hidden min-h-[180px]"
            style={{
              background: `linear-gradient(135deg, ${project.color}08, ${project.color}03)`,
              borderLeft: isEven ? `1px solid ${project.color}15` : 'none',
              borderRight: !isEven ? `1px solid ${project.color}15` : 'none',
            }}
          >
            <ProjectVisual project={project} />
            <p
              className="absolute bottom-3 right-3 hidden sm:block"
              style={{
                fontSize: '13px',
                color: `${project.color}B3`,
                fontStyle: 'italic',
                maxWidth: '180px',
                textAlign: 'right',
                lineHeight: 1.4,
                zIndex: 1,
              }}
            >
              &ldquo;{project.highlight}&rdquo;
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Projects() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section id="projects" className="section-padding relative" style={{ background: 'var(--bg-elevated)' }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-14"
        >
          <p className="section-label mb-2 sm:mb-3">&lt; Projects /&gt;</p>
          <h2 className="font-syne font-bold text-2xl sm:text-3xl lg:text-5xl" style={{ color: 'var(--text-primary)' }}>
            Things I&apos;ve <span style={{ color: 'var(--accent-violet)' }} className="gradient-text">Built</span>
          </h2>
          <p className="mt-4 max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Production-grade projects spanning ML optimization, systems programming, and modern web.
          </p>
        </motion.div>

        <div className="space-y-4 sm:space-y-6">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
