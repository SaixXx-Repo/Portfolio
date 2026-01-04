import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeToggle } from '../ThemeToggle';
import { Theme } from '../../types';
import { personalInfo } from '../../data/projects';
import { useAnalytics } from '../../hooks/useAnalytics';
import './Navbar.css';

interface NavbarProps {
  theme: Theme;
  toggleTheme: () => void;
}

const navItems = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'certificates', label: 'Certificates' },
  { id: 'contact', label: 'Contact' },
];

export const Navbar: React.FC<NavbarProps> = ({ theme, toggleTheme }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const { trackContactClick } = useAnalytics();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 100;

      // Check if we're at the bottom of the page
      const isNearBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100;

      if (isNearBottom) {
        // If near bottom, highlight the last section (contact)
        setActiveSection('contact');
      } else {
        sections.forEach((section, index) => {
          if (section) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (
              scrollPosition >= sectionTop &&
              scrollPosition < sectionTop + sectionHeight
            ) {
              setActiveSection(navItems[index].id);
            }
          }
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    if (sectionId === 'contact') {
      trackContactClick();
    }
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.nav
      className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="navbar__container">
        {/* Logo */}
        <motion.button
          className="navbar__logo"
          onClick={() => scrollToSection('hero')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="navbar__logo-icon">{'</>'}</span>
          <span className="navbar__logo-text">{personalInfo.name.split(' ')[0]}</span>
        </motion.button>

        {/* Desktop Navigation */}
        <div className="navbar__nav">
          {navItems.map(item => (
            <button
              key={item.id}
              className={`navbar__nav-item ${activeSection === item.id ? 'navbar__nav-item--active' : ''
                }`}
              onClick={() => scrollToSection(item.id)}
            >
              {item.label}
              {activeSection === item.id && (
                <motion.div
                  className="navbar__nav-indicator"
                  layoutId="nav-indicator"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Actions */}
        <div className="navbar__actions">
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />

          {/* Mobile Menu Button */}
          <button
            className="navbar__mobile-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <motion.span
              animate={isMobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            />
            <motion.span
              animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
            />
            <motion.span
              animate={isMobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="navbar__mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {navItems.map((item, index) => (
              <motion.button
                key={item.id}
                className={`navbar__mobile-item ${activeSection === item.id ? 'navbar__mobile-item--active' : ''
                  }`}
                onClick={() => scrollToSection(item.id)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                {item.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

