'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Star, GitFork, ExternalLink, Package, Users } from 'lucide-react';
import { fadeUp, staggerContainer } from '@/lib/animations';
import { GITHUB_FALLBACK, LANGUAGE_COLORS } from '@/lib/constants';
import type { GitHubStats } from '@/types';
import { CounterAnim } from '@/components/ui/CounterAnim';

const STAT_CARDS = (stats: GitHubStats | null) => [
  { label: 'Public Repos',  value: stats?.user?.public_repos ?? GITHUB_FALLBACK.publicRepos,  icon: Package,  color: '#00F5FF', glow: 'rgba(0,245,255,0.5)' },
  { label: 'Total Stars',   value: stats?.totalStars ?? GITHUB_FALLBACK.totalStars,            icon: Star,     color: '#F59E0B', glow: 'rgba(245,158,11,0.5)' },
  { label: 'Total Forks',   value: stats?.totalForks ?? GITHUB_FALLBACK.totalForks,            icon: GitFork,  color: '#7C3AED', glow: 'rgba(124,58,237,0.5)' },
  { label: 'Followers',     value: stats?.user?.followers ?? GITHUB_FALLBACK.followers,        icon: Users,    color: '#10B981', glow: 'rgba(16,185,129,0.5)' },
];

function isValidStats(data: unknown): data is GitHubStats {
  return typeof data === 'object' && data !== null && 'user' in data &&
    typeof (data as GitHubStats).user?.public_repos === 'number';
}

export function GitHubStats() {
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(true);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    fetch('/api/github')
      .then((r) => r.json())
      .then((data) => { setStats(isValidStats(data) ? data : null); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section id="github" className="section-padding relative" style={{ background: 'var(--bg-base)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div ref={ref} variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="text-center mb-12">
          <p className="section-label mb-3">&lt; GitHub /&gt;</p>
          <h2 className="font-syne font-bold text-3xl sm:text-4xl lg:text-5xl" style={{ color: 'var(--text-primary)' }}>
            Open Source <span className="gradient-text">Activity</span>
          </h2>
        </motion.div>

        {/* Stat Cards */}
        <motion.div
          variants={staggerContainer} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10"
        >
          {STAT_CARDS(stats).map((card) => (
            <motion.div
              key={card.label}
              variants={fadeUp}
              className="group/card rounded-2xl p-6 text-center"
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-card)',
                ['--glow' as string]: card.glow,
              }}
              whileHover={{ borderColor: 'var(--border-accent)', y: -2, boxShadow: 'var(--glow-card-hover)' }}
            >
              <div className="mb-3 flex justify-center">
                <card.icon
                  size={32}
                  style={{ color: card.color }}
                  className="transition-all duration-300 group-hover/card:drop-shadow-[0_0_8px_var(--glow)]"
                />
              </div>
              <div className="font-syne font-bold text-3xl" style={{ color: 'var(--accent-cyan)' }}>
                {loading ? (
                  <div className="h-8 w-12 mx-auto rounded animate-pulse" style={{ background: 'var(--border-subtle)' }} />
                ) : (
                  <CounterAnim target={card.value} />
                )}
              </div>
              <div className="text-xs font-outfit mt-1" style={{ color: 'var(--text-muted)' }}>{card.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Repo Cards */}
        {!loading && stats?.repos && (
          <motion.div
            variants={staggerContainer} initial="hidden" animate={inView ? 'visible' : 'hidden'}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10"
          >
            {stats.repos.map((repo) => (
              <motion.a
                key={repo.id}
                variants={fadeUp}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-xl p-5 transition-all duration-200 group"
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)' }}
                whileHover={{ borderColor: 'var(--border-accent)', boxShadow: 'var(--glow-card-hover)', y: -2 }}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-outfit font-semibold text-sm truncate flex-1 mr-2 transition-colors"
                    style={{ color: 'var(--text-primary)' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent-cyan)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-primary)')}
                  >
                    {repo.name}
                  </h3>
                  <ExternalLink size={12} style={{ color: 'var(--text-muted)', flexShrink: 0, marginTop: 2 }} />
                </div>
                {repo.description && (
                  <p className="text-xs mb-3 line-clamp-2 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                    {repo.description}
                  </p>
                )}
                <div className="flex items-center gap-4 text-xs" style={{ color: 'var(--text-muted)' }}>
                  {repo.language && (
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ background: LANGUAGE_COLORS[repo.language] ?? '#888' }} />
                      {repo.language}
                    </span>
                  )}
                  <span className="flex items-center gap-1"><Star size={11} />{repo.stargazers_count}</span>
                  <span className="flex items-center gap-1"><GitFork size={11} />{repo.forks_count}</span>
                </div>
              </motion.a>
            ))}
          </motion.div>
        )}

        {/* GitHub Streak */}
        <motion.div
          variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} transition={{ delay: 0.4 }}
          className="flex justify-center"
        >
          <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid var(--border-card)' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://github-readme-streak-stats.herokuapp.com/?user=ansh10tripathi&theme=dark&background=0D0D1A&border=1a1a3e&ring=00F5FF&fire=7C3AED&currStreakLabel=00F5FF"
              alt="GitHub contribution streak statistics for Ansh Tripathi"
              className="max-w-full streak-img"
              loading="lazy"
              width={800}
              height={200}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
