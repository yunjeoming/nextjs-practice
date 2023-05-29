'use client'

import { useState, useEffect } from 'react';

export default function DarkModeToggleButton() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return <button onClick={toggleDarkMode}>darkMode is {isDarkMode.toString()}</button>;
}
