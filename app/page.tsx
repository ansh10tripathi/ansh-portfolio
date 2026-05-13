import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { SectionDivider } from '@/components/ui/SectionDivider';

// Lazy-load all below-fold sections — zero impact on initial render
const About         = dynamic(() => import('@/components/sections/About').then(m => ({ default: m.About })));
const Skills        = dynamic(() => import('@/components/sections/Skills').then(m => ({ default: m.Skills })));
const Projects      = dynamic(() => import('@/components/sections/Projects').then(m => ({ default: m.Projects })));
const GitHubStats   = dynamic(() => import('@/components/sections/GitHubStats').then(m => ({ default: m.GitHubStats })));
const Experience    = dynamic(() => import('@/components/sections/Experience').then(m => ({ default: m.Experience })));
const Certifications = dynamic(() => import('@/components/sections/Certifications').then(m => ({ default: m.Certifications })));
const Achievements  = dynamic(() => import('@/components/sections/Achievements').then(m => ({ default: m.Achievements })));
const Contact       = dynamic(() => import('@/components/sections/Contact').then(m => ({ default: m.Contact })));

/** Minimal section skeleton shown while lazy chunks load */
function SectionSkeleton() {
  return <div className="section-padding" aria-hidden />;
}

export default function Home() {
  return (
    <>
      <Navbar />

      <main id="main-content">
        <Hero />
        <SectionDivider />

        <Suspense fallback={<SectionSkeleton />}>
          <About />
          <SectionDivider />
          <Skills />
          <SectionDivider />
          <Projects />
          <SectionDivider />
          <GitHubStats />
          <SectionDivider />
          <Experience />
          <SectionDivider />
          <Certifications />
          <SectionDivider />
          <Achievements />
          <SectionDivider />
          <Contact />
        </Suspense>
      </main>

      <Footer />
    </>
  );
}
