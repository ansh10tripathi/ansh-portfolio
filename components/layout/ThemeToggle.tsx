'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return <div style={{ width: 52, height: 28 }} />;

  const isDark = theme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      style={{
        width: 52,
        height: 28,
        borderRadius: 14,
        padding: 3,
        display: 'flex',
        alignItems: 'center',
        background: isDark
          ? 'rgba(0, 245, 255, 0.15)'
          : 'rgba(109, 40, 217, 0.12)',
        border: isDark
          ? '1px solid rgba(0, 245, 255, 0.30)'
          : '1px solid rgba(109, 40, 217, 0.25)',
        transition: 'background 0.3s ease, border-color 0.3s ease',
        cursor: 'none',
        flexShrink: 0,
      }}
    >
      <motion.div
        layout
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        style={{
          width: 22,
          height: 22,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 12,
          marginLeft: isDark ? 0 : 'auto',
          background: isDark ? '#00F5FF' : '#6D28D9',
          boxShadow: isDark
            ? '0 0 8px rgba(0, 245, 255, 0.6)'
            : '0 0 8px rgba(109, 40, 217, 0.6)',
          flexShrink: 0,
        }}
        whileHover={{
          boxShadow: isDark
            ? '0 0 12px rgba(0, 245, 255, 0.85)'
            : '0 0 12px rgba(109, 40, 217, 0.85)',
        }}
      >
        {isDark ? '🌙' : '☀️'}
      </motion.div>
    </button>
  );
}
