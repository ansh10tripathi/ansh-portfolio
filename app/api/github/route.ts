import { NextResponse } from 'next/server';
import { fetchGitHubStats } from '@/lib/github';
import { GITHUB_FALLBACK } from '@/lib/constants';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const stats = await fetchGitHubStats();
    return NextResponse.json(stats, {
      headers: { 'Cache-Control': 'no-store' },
    });
  } catch (err) {
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
