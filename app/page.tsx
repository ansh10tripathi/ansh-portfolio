import { Suspense } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Skills } from '@/components/sections/Skills';
import { Projects } from '@/components/sections/Projects';
import { GitHubStats } from '@/components/sections/GitHubStats';
import { Experience } from '@/components/sections/Experience';
import { Certifications } from '@/components/sections/Certifications';
import { Achievements } from '@/components/sections/Achievements';
import { Contact } from '@/components/sections/Contact';
import { Resume } from '@/components/sections/Resume';
import { ScrollProgress } from '@/components/ui/ScrollProgress';
import { LoadingScreen } from '@/components/ui/LoadingScreen';

/** Main page — orchestrates all sections */
export default function Home() {
  return (
    <>
      <LoadingScreen />
      <ScrollProgress />
      <Navbar />

      <main>
        <Hero />

        <Suspense fallback={null}>
          <About />
          <Skills />
          <Projects />
          <GitHubStats />
          <Experience />
          <Certifications />
          {/* Section divider */}
          <div
            aria-hidden
            style={{
              height: '1px',
              margin: '0 auto',
              maxWidth: '80rem',
              background: 'linear-gradient(90deg, transparent, #00F5FF40, transparent)',
            }}
          />
          <Achievements />
          <Resume />
          <Contact />
        </Suspense>
      </main>

      <Footer />
    </>
  );
}
