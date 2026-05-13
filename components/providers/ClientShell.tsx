'use client';

import { useState, useCallback } from 'react';
import { LoadingScreen } from '@/components/ui/LoadingScreen';

export function ClientShell({ children }: { children: React.ReactNode }) {
  const [loaded, setLoaded] = useState(false);

  const handleDone = useCallback(() => setLoaded(true), []);

  return (
    <>
      <LoadingScreen onDone={handleDone} />
      <div style={{ overflow: loaded ? 'unset' : 'hidden', height: loaded ? 'auto' : '100vh' }}>
        {children}
      </div>
    </>
  );
}
