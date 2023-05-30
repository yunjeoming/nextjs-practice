'use client';

import { useState, useEffect, useMemo } from 'react';

export default function DarkModeToggleButton() {
  const mode = useMemo(() => document.cookie.split(';')[0].split('=')[1], []);
  const [isDarkMode, setIsDarkMode] = useState(mode === 'dark' ? true : false);

  useEffect(() => {
    if (isDarkMode) {
      document.cookie = `mode=dark; max-age=10000`;
    } else {
      document.cookie = `mode=light; max-age=10000`;
    }
    document.body.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <button className="text-2xl p-0" onClick={toggleDarkMode}>
      {isDarkMode ? '🌕' : '🌞'}
    </button>
  );
}
