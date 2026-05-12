import { NextResponse } from 'next/server';
import { fetchGitHubStats } from '@/lib/github';
import { GITHUB_FALLBACK } from '@/lib/constants';

/** GitHub stats API proxy with 1-hour cache */
export async function GET() {
  try {
    const stats = await fetchGitHubStats();
    return NextResponse.json(stats, {
      headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400' },
    });
  } catch (err) {
    // Return static fallback so the UI never breaks — avoids 500 on rate-limit or network issues
    console.error('[/api/github]', err instanceof Error ? err.message : err);
    return NextResponse.json(
      {
        user: { login: 'ansh10tripathi', public_repos: GITHUB_FALLBACK.publicRepos, followers: GITHUB_FALLBACK.followers, following: 0, avatar_url: '' },
        repos: [],
        totalStars: GITHUB_FALLBACK.totalStars,
        totalForks: GITHUB_FALLBACK.totalForks,
      },
      { status: 200, headers: { 'Cache-Control': 'no-store' } }
    );
  }
}
