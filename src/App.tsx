import React, { useEffect } from 'react';
import { Navbar, Hero, About, Projects, Skills, Certificates, Contact, ChatWidget } from './components';
import { useTheme } from './hooks/useTheme';
import { useAnalytics } from './hooks/useAnalytics';
import './styles/variables.css';
import './App.css';

function App() {
  const { theme, toggleTheme } = useTheme();
  const { trackPageView } = useAnalytics();

  useEffect(() => {
    trackPageView();
  }, []);

  return (
    <div className="app" data-theme={theme}>
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main className="main">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Certificates />
        <Contact />
      </main>
      <ChatWidget />
    </div>
  );
}

export default App;

