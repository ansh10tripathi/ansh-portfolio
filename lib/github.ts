import type { GitHubStats, GitHubRepo, GitHubUser } from '@/types';

const GITHUB_API = 'https://api.github.com';
const USERNAME = 'ansh10tripathi';

export async function fetchGitHubStats(): Promise<GitHubStats> {
  const headers: HeadersInit = { Accept: 'application/vnd.github.v3+json' };
  if (process.env.GITHUB_TOKEN) {
    headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const [userRes, reposRes] = await Promise.all([
    fetch(`${GITHUB_API}/users/${USERNAME}`, { headers, cache: 'no-store' }),
    fetch(`${GITHUB_API}/users/${USERNAME}/repos?per_page=100&sort=updated`, { headers, cache: 'no-store' }),
  ]);

  if (!userRes.ok || !reposRes.ok) {
    const status = !userRes.ok ? userRes.status : reposRes.status;
    const body = !userRes.ok ? await userRes.text() : await reposRes.text();
    throw new Error(`GitHub API ${status}: ${body.slice(0, 200)}`);
  }

  const user: GitHubUser = await userRes.json();
  const repos: GitHubRepo[] = await reposRes.json();

  const totalStars = repos.reduce((sum, r) => sum + r.stargazers_count, 0);
  const totalForks = repos.reduce((sum, r) => sum + r.forks_count, 0);

  return { user, repos: repos.slice(0, 6), totalStars, totalForks };
}
