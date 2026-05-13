'use client';

import { useEffect, useRef, useState } from 'react';

interface TerminalLine {
  prompt: string;
  output: string;
  delay: number;
}

const LINES: TerminalLine[] = [
  { prompt: 'ansh@lpu:~$ whoami', output: '> AI/ML Engineer | Full Stack Developer', delay: 0 },
  { prompt: 'ansh@lpu:~$ status', output: '> Building cool things at LPU 🚀', delay: 1200 },
  { prompt: 'ansh@lpu:~$ interests', output: '> [ML, Systems, WebDev, Algorithms]', delay: 2400 },
  { prompt: 'ansh@lpu:~$ location', output: '> Punjab, India 📍', delay: 3600 },
];

export function TerminalText() {
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          LINES.forEach((line, i) => {
            setTimeout(() => setVisibleLines((prev) => [...prev, i]), line.delay);
          });
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="rounded-xl overflow-hidden"
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-card)',
      }}
    >
      {/* Terminal header */}
      <div
        className="flex items-center gap-2 px-4 py-3"
        style={{
          background: 'var(--bg-card-hover)',
          borderBottom: '1px solid var(--border-card)',
        }}
      >
        <div className="w-3 h-3 rounded-full bg-[#F43F5E]" />
        <div className="w-3 h-3 rounded-full bg-[#F59E0B]" />
        <div className="w-3 h-3 rounded-full bg-[#10B981]" />
        <span className="ml-2 text-xs font-mono" style={{ color: 'var(--text-muted)' }}>ansh@lpu — bash</span>
      </div>

      {/* Terminal body */}
      <div className="p-4 space-y-3 min-h-[200px]">
        {LINES.map((line, i) => (
          <div
            key={i}
            className={`transition-opacity duration-300 ${visibleLines.includes(i) ? 'opacity-100' : 'opacity-0'}`}
          >
            <TypewriterLine
              prompt={line.prompt}
              output={line.output}
              active={visibleLines.includes(i)}
              isLast={i === LINES.length - 1}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function TypewriterLine({
  prompt, output, active, isLast,
}: {
  prompt: string; output: string; active: boolean; isLast: boolean;
}) {
  const [promptText, setPromptText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [showOutput, setShowOutput] = useState(false);

  useEffect(() => {
    if (!active) return;
    let i = 0;
    const typePrompt = setInterval(() => {
      setPromptText(prompt.slice(0, ++i));
      if (i >= prompt.length) {
        clearInterval(typePrompt);
        setTimeout(() => {
          setShowOutput(true);
          let j = 0;
          const typeOutput = setInterval(() => {
            setOutputText(output.slice(0, ++j));
            if (j >= output.length) clearInterval(typeOutput);
          }, 25);
        }, 200);
      }
    }, 40);
    return () => clearInterval(typePrompt);
  }, [active, prompt, output]);

  return (
    <div className="font-mono text-sm space-y-1">
      <div style={{ color: 'var(--accent-cyan)' }}>
        {promptText}
        {active && promptText.length < prompt.length && <span className="animate-blink">▋</span>}
      </div>
      {showOutput && (
        <div className="pl-2" style={{ color: 'var(--text-secondary)' }}>
          {outputText}
          {isLast && outputText.length >= output.length && (
            <span className="animate-blink" style={{ color: 'var(--accent-cyan)' }}>▋</span>
          )}
        </div>
      )}
    </div>
  );
}
