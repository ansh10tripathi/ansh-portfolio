/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'avatars.githubusercontent.com' },
      { protocol: 'https', hostname: 'github-readme-streak-stats.herokuapp.com' },
      { protocol: 'https', hostname: 'opengraph.githubassets.com' },
    ],
  },
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react', 'react-icons'],
  },
};

module.exports = nextConfig;
