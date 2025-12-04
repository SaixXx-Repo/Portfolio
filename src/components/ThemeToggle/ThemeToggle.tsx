import React from 'react';
import { motion } from 'framer-motion';
import { Theme } from '../../types';
import './ThemeToggle.css';

interface ThemeToggleProps {
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, toggleTheme }) => {
  const isDark = theme === 'dark';

  return (
    <motion.button
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="toggle-track"
        animate={{
          backgroundColor: isDark ? '#1a1a2e' : '#e0e7ff',
        }}
      >
        <motion.div
          className="toggle-thumb"
          animate={{
            x: isDark ? 22 : 0,
            backgroundColor: isDark ? '#818cf8' : '#fbbf24',
          }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        >
          {/* Sun Icon */}
          <motion.svg
            className="toggle-icon sun-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            animate={{ opacity: isDark ? 0 : 1, rotate: isDark ? 90 : 0 }}
          >
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
          </motion.svg>
          
          {/* Moon Icon */}
          <motion.svg
            className="toggle-icon moon-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            animate={{ opacity: isDark ? 1 : 0, rotate: isDark ? 0 : -90 }}
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </motion.svg>
        </motion.div>
      </motion.div>
    </motion.button>
  );
};

