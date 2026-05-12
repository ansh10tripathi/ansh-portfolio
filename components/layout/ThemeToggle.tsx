'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

/** Animated dark/light theme toggle */
export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="w-9 h-9" />;

  const isDark = theme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="relative w-9 h-9 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center hover:border-[#00F5FF]/40 transition-colors duration-200"
      aria-label="Toggle theme"
      data-cursor="theme"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={theme}
          initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.2 }}
        >
          {isDark ? (
            <Sun size={16} className="text-[#F59E0B]" />
          ) : (
            <Moon size={16} className="text-[#7C3AED]" />
          )}
        </motion.div>
      </AnimatePresence>
    </button>
  );
}
