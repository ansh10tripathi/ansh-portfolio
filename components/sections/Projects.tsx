'use client';

import { useRef, MouseEvent } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Github, ExternalLink } from 'lucide-react';
import { PROJECTS } from '@/lib/constants';
import type { Project } from '@/types';
import { fadeUp, staggerContainer } from '@/lib/animations';

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });
  const isEven = index % 2 === 0;

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || window.innerWidth < 768) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    cardRef.current.style.transform = `perspective(1000px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) scale(1.02)`;

    // Spotlight
    const spotlight = cardRef.current.querySelector('.spotlight') as HTMLElement;
    if (spotlight) {
      spotlight.style.background = `radial-gradient(circle at ${e.clientX - rect.left}px ${e.clientY - rect.top}px, rgba(255,255,255,0.06) 0%, transparent 60%)`;
    }
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)';
    const spotlight = cardRef.current.querySelector('.spotlight') as HTMLElement;
    if (spotlight) spotlight.style.background = 'transparent';
  };

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      transition={{ delay: index * 0.1 }}
      className="relative"
    >
      {/* Ghost number */}
      <span className="ghost-number">{String(index + 1).padStart(2, '0')}</span>

      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative rounded-2xl overflow-hidden transition-transform duration-200"
        style={{
          background: 'rgba(255,255,255,0.02)',
          border: `1px solid rgba(255,255,255,0.06)`,
          borderLeft: `4px solid ${project.color}`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Spotlight overlay */}
        <div className="spotlight absolute inset-0 pointer-events-none z-10 transition-all duration-100" />

        <div className={`flex flex-col md:flex-row ${!isEven ? 'md:flex-row-reverse' : ''} gap-0`}>
          {/* Text side */}
          <div className="flex-1 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              {/* Badge + Date */}
              <div className="flex items-center justify-between mb-4">
                <span
                  className="px-3 py-1 rounded-full text-xs font-outfit font-semibold"
                  style={{
                    background: `${project.color}20`,
                    border: `1px solid ${project.color}40`,
                    color: project.color,
                  }}
                >
                  {project.badge}
                </span>
                <span className="text-xs text-[var(--text-muted)] font-mono">{project.date}</span>
              </div>

              {/* Category */}
              <p className="text-xs font-outfit text-[var(--text-muted)] uppercase tracking-widest mb-2">
                {project.category}
              </p>

              {/* Title */}
              <h3 className="font-syne font-bold text-xl sm:text-2xl text-[var(--text-primary)] mb-2 leading-tight">
                {project.title}
              </h3>

              {/* Tagline */}
              <p className="text-sm font-medium mb-4" style={{ color: project.color }}>
                {project.tagline}
              </p>

              {/* Description */}
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
                {project.description}
              </p>

              {/* Tech stack */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded-md text-xs font-mono"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-outfit font-medium transition-all duration-200 hover:gap-3"
                style={{ color: project.color }}
                data-cursor="github"
              >
                <Github size={16} />
                View on GitHub
                <ExternalLink size={12} />
              </a>
              <p className="text-xs text-[var(--text-muted)] italic max-w-[200px] text-right hidden sm:block">
                &ldquo;{project.highlight}&rdquo;
              </p>
            </div>
          </div>

          {/* Visual side */}
          <div
            className="md:w-64 lg:w-80 flex items-center justify-center p-8 relative overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${project.color}08, ${project.color}03)`,
              borderLeft: isEven ? `1px solid ${project.color}15` : 'none',
              borderRight: !isEven ? `1px solid ${project.color}15` : 'none',
            }}
          >
            {/* Large icon */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="text-7xl sm:text-8xl"
              style={{ filter: `drop-shadow(0 0 20px ${project.color}60)` }}
            >
              {project.icon}
            </motion.div>

            {/* Decorative circles */}
            <div
              className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full opacity-20"
              style={{ background: `radial-gradient(circle, ${project.color}, transparent)` }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/** Projects showcase section */
export function Projects() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section id="projects" className="section-padding relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-14"
        >
          <p className="section-label mb-3">&lt; Projects /&gt;</p>
          <h2 className="font-syne font-bold text-3xl sm:text-4xl lg:text-5xl text-[var(--text-primary)]">
            Things I&apos;ve <span className="gradient-text">Built</span>
          </h2>
          <p className="mt-4 text-[var(--text-secondary)] max-w-xl mx-auto">
            Production-grade projects spanning ML optimization, systems programming, and modern web.
          </p>
        </motion.div>

        <div className="space-y-6">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
