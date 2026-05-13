import type { Metadata } from 'next';
import { Syne, DM_Sans, JetBrains_Mono, Outfit } from 'next/font/google';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { MotionProvider } from '@/components/providers/MotionProvider';
import { ClientShell } from '@/components/providers/ClientShell';
import { CursorTrail } from '@/components/ui/CursorTrail';
import { ScrollProgress } from '@/components/ui/ScrollProgress';
import { ScrollToTop } from '@/components/ui/ScrollToTop';
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

const BASE_URL = 'https://ansh-portfolio-mocha-two.vercel.app';

const TITLE = 'Ansh Tripathi — AI/ML Engineer & Full Stack Developer | LPU';
const DESCRIPTION =
  'Portfolio of Ansh Tripathi, B.Tech CSE (AI/ML) at Lovely Professional University. Building ML systems, real-time OS simulations, and modern web apps. LPUNEST Category 1 Scholar. Open to collaborations.';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    'AI Engineer', 'ML Engineer', 'Full Stack Developer', 'React Developer',
    'Python', 'Machine Learning', 'LPU', 'Lovely Professional University',
    'Ansh Tripathi', 'Portfolio', 'LPUNEST', 'Next.js',
  ],
  authors: [{ name: 'Ansh Tripathi', url: 'https://github.com/ansh10tripathi' }],
  creator: 'Ansh Tripathi',
  alternates: {
    canonical: BASE_URL,
  },
  icons: {
    icon: '/images/Logo.png',
    apple: '/images/Logo.png',
    shortcut: '/images/Logo.png',
  },
  other: {
    'theme-color': '#050508',
    'color-scheme': 'dark light',
    'msapplication-TileColor': '#050508',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: BASE_URL,
    siteName: 'Ansh Tripathi Portfolio',
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Ansh Tripathi — AI/ML Engineer & Full Stack Developer | LPU',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Ansh Tripathi',
  jobTitle: 'AI/ML Engineer & Full Stack Developer',
  url: BASE_URL,
  email: 'ansh10tripathi@gmail.com',
  sameAs: [
    'https://github.com/ansh10tripathi',
    'https://linkedin.com/in/ansh-tripathi10',
  ],
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'Lovely Professional University',
  },
  knowsAbout: [
    'Machine Learning', 'Python', 'React', 'Next.js',
    'Full Stack Development', 'Real-Time Systems', 'Data Science',
  ],
  description: DESCRIPTION,
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
      <body className="font-dm antialiased noise-bg">
        <ThemeProvider>
          <MotionProvider>
            {/* Skip to main content — visually hidden, visible on focus */}
            <a href="#main-content" className="skip-link">
              Skip to main content
            </a>
            <ScrollProgress />
            <ScrollToTop />
            <CursorTrail />
            <ClientShell>{children}</ClientShell>
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
