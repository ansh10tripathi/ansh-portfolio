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

const BASE_URL = 'https://ansh-portfolio-mocha-two.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: 'Ansh Tripathi — AI/ML Engineer & Full Stack Developer',
  description:
    'Futuristic AI/ML engineer portfolio showcasing scalable software projects, optimization systems, modern web applications, and real-time simulations.',
  keywords: [
    'AI Engineer', 'ML Engineer', 'Full Stack Developer', 'React Developer',
    'Python', 'Machine Learning', 'LPU', 'Ansh Tripathi', 'Portfolio',
  ],
  authors: [{ name: 'Ansh Tripathi', url: 'https://github.com/ansh10tripathi' }],
  creator: 'Ansh Tripathi',
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
    title: 'Ansh Tripathi — AI/ML Engineer & Full Stack Developer',
    description:
      'Futuristic AI/ML engineer portfolio showcasing scalable software projects, optimization systems, modern web applications, and real-time simulations.',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Ansh Tripathi — AI/ML Engineer & Full Stack Developer',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ansh Tripathi — AI/ML Engineer & Full Stack Developer',
    description:
      'Futuristic AI/ML engineer portfolio showcasing scalable software projects, optimization systems, modern web applications, and real-time simulations.',
    images: ['/images/og-image.png'],
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
  jobTitle: 'AI/ML Engineer',
  url: BASE_URL,
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
