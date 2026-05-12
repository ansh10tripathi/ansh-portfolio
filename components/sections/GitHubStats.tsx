'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Star, GitFork, ExternalLink } from 'lucide-react';
import { fadeUp, staggerContainer } from '@/lib/animations';
import { GITHUB_FALLBACK, LANGUAGE_COLORS } from '@/lib/constants';
import type { GitHubStats } from '@/types';
import { CounterAnim } from '@/components/ui/CounterAnim';

const STAT_CARDS = (stats: GitHubStats | null) => [
  { label: 'Public Repos', value: stats?.user?.public_repos ?? GITHUB_FALLBACK.publicRepos, icon: '📦' },
  { label: 'Total Stars', value: stats?.totalStars ?? GITHUB_FALLBACK.totalStars, icon: '⭐' },
  { label: 'Total Forks', value: stats?.totalForks ?? GITHUB_FALLBACK.totalForks, icon: '🍴' },
  { label: 'Followers', value: stats?.user?.followers ?? GITHUB_FALLBACK.followers, icon: '👥' },
];

/** Returns true only when the API response is a valid GitHubStats shape */
function isValidStats(data: unknown): data is GitHubStats {
  return (
    typeof data === 'object' &&
    data !== null &&
    'user' in data &&
    typeof (data as GitHubStats).user?.public_repos === 'number'
  );
}

/** Live GitHub stats section */
export function GitHubStats() {
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(true);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    fetch('/api/github')
      .then((r) => r.json())
      .then((data) => {
        setStats(isValidStats(data) ? data : null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section id="github" className="section-padding relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-12"
        >
          <p className="section-label mb-3">&lt; GitHub /&gt;</p>
          <h2 className="font-syne font-bold text-3xl sm:text-4xl lg:text-5xl text-[var(--text-primary)]">
            Open Source <span className="gradient-text">Activity</span>
          </h2>
        </motion.div>

        {/* Stat Cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10"
        >
          {STAT_CARDS(stats).map((card) => (
            <motion.div
              key={card.label}
              variants={fadeUp}
              className="rounded-2xl p-6 text-center"
              style={{
                background: 'rgba(0,245,255,0.03)',
                border: '1px solid rgba(0,245,255,0.1)',
              }}
              whileHover={{ borderColor: 'rgba(0,245,255,0.3)', y: -2 }}
            >
              <div className="text-3xl mb-2">{card.icon}</div>
              <div className="font-syne font-bold text-3xl gradient-text">
                {loading ? (
                  <div className="h-8 w-12 mx-auto rounded bg-white/10 animate-pulse" />
                ) : (
                  <CounterAnim target={card.value} />
                )}
              </div>
              <div className="text-xs text-[var(--text-muted)] font-outfit mt-1">{card.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Repo Cards */}
        {!loading && stats?.repos && (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
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
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
                whileHover={{
                  borderColor: 'rgba(0,245,255,0.2)',
                  background: 'rgba(0,245,255,0.03)',
                  y: -2,
                }}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-outfit font-semibold text-sm text-[var(--text-primary)] group-hover:text-[#00F5FF] transition-colors truncate flex-1 mr-2">
                    {repo.name}
                  </h3>
                  <ExternalLink size={12} className="text-[var(--text-muted)] flex-shrink-0 mt-0.5" />
                </div>

                {repo.description && (
                  <p className="text-xs text-[var(--text-muted)] mb-3 line-clamp-2 leading-relaxed">
                    {repo.description}
                  </p>
                )}

                <div className="flex items-center gap-4 text-xs text-[var(--text-muted)]">
                  {repo.language && (
                    <span className="flex items-center gap-1.5">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ background: LANGUAGE_COLORS[repo.language] ?? '#888' }}
                      />
                      {repo.language}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Star size={11} />
                    {repo.stargazers_count}
                  </span>
                  <span className="flex items-center gap-1">
                    <GitFork size={11} />
                    {repo.forks_count}
                  </span>
                </div>
              </motion.a>
            ))}
          </motion.div>
        )}

        {/* GitHub Streak */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          transition={{ delay: 0.4 }}
          className="flex justify-center"
        >
          <div className="rounded-2xl overflow-hidden border border-white/5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://github-readme-streak-stats.herokuapp.com/?user=ansh10tripathi&theme=dark&background=0D0D1A&border=1a1a3e&ring=00F5FF&fire=7C3AED&currStreakLabel=00F5FF"
              alt="GitHub Streak Stats"
              className="max-w-full"
              loading="lazy"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
