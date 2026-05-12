import type { Metadata } from 'next';
import { Syne, DM_Sans, JetBrains_Mono, Outfit } from 'next/font/google';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import './globals.css';

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-syne',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-outfit',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Ansh Tripathi — AI/ML Engineer & Full Stack Developer',
  description:
    'Portfolio of Ansh Tripathi, B.Tech CSE (AI/ML) at LPU. Building ML systems, real-time applications, and modern web experiences. Open to collaborations and opportunities.',
  keywords: [
    'AI Engineer', 'ML Engineer', 'Full Stack Developer', 'React Developer',
    'Python', 'Machine Learning', 'LPU', 'Ansh Tripathi',
  ],
  authors: [{ name: 'Ansh Tripathi', url: 'https://github.com/ansh10tripathi' }],
  creator: 'Ansh Tripathi',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://anshtripathi.dev',
    title: 'Ansh Tripathi — AI/ML Engineer',
    description: 'Building at the intersection of ML, systems, and modern web.',
    images: [{ url: '/images/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ansh Tripathi — AI/ML Engineer',
    description: 'Building ML systems and modern web at LPU.',
    images: ['/images/og-image.png'],
  },
  robots: { index: true, follow: true },
  metadataBase: new URL('https://anshtripathi.dev'),
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Ansh Tripathi',
  jobTitle: 'AI/ML Engineer',
  url: 'https://anshtripathi.dev',
  sameAs: [
    'https://github.com/ansh10tripathi',
    'https://linkedin.com/in/ansh-tripathi10',
  ],
  alumniOf: 'Lovely Professional University',
  knowsAbout: ['Machine Learning', 'Python', 'React', 'Full Stack Development', 'Real-Time Systems'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${syne.variable} ${dmSans.variable} ${jetbrains.variable} ${outfit.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-dm antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
