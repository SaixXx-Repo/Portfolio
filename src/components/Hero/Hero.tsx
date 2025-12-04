import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { Button, AnimatedText } from '../common';
import { personalInfo } from '../../data/projects';
import './Hero.css';

export const Hero: React.FC = () => {
  const particlesRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // GSAP Particle Animation
    if (particlesRef.current) {
      const particles = particlesRef.current.querySelectorAll('.particle');
      
      particles.forEach((particle, index) => {
        gsap.set(particle, {
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
        });

        gsap.to(particle, {
          y: '-=100',
          x: `+=${Math.random() * 100 - 50}`,
          opacity: Math.random() * 0.5 + 0.2,
          duration: Math.random() * 10 + 10,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: index * 0.2,
        });
      });
    }

    // GSAP text scramble effect for tagline
    if (heroRef.current) {
      const tagline = heroRef.current.querySelector('.hero__tagline');
      if (tagline) {
        gsap.fromTo(
          tagline,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1, delay: 1.5, ease: 'power3.out' }
        );
      }
    }
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={heroRef} className="hero" id="hero">
      {/* Animated Background */}
      <div className="hero__background">
        <div className="hero__gradient"></div>
        <div ref={particlesRef} className="hero__particles">
          {Array.from({ length: 50 }).map((_, i) => (
            <div key={i} className="particle" />
          ))}
        </div>
        <div className="hero__grid"></div>
      </div>

      <div className="hero__content">
        <motion.div
          className="hero__badge"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <span className="hero__badge-dot"></span>
          Available for opportunities
        </motion.div>

        <h1 className="hero__title">
          <AnimatedText
            text="Hi, I'm"
            variant="reveal"
            delay={0.2}
            className="hero__greeting"
          />
          <br />
          <AnimatedText
            text={personalInfo.name}
            variant="gradient"
            delay={0.6}
            className="hero__name"
          />
        </h1>

        <motion.h2
          className="hero__role"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <span className="hero__role-icon">📱</span> {personalInfo.title}
        </motion.h2>

        <p className="hero__tagline">{personalInfo.tagline}</p>

        <motion.div
          className="hero__cta"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2 }}
        >
          <Button
            variant="primary"
            size="lg"
            onClick={() => scrollToSection('projects')}
            icon={
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            }
          >
            View My Work
          </Button>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => scrollToSection('contact')}
            icon={
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            }
          >
            Get In Touch
          </Button>
        </motion.div>

        {/* Scroll Indicator - positioned under buttons */}
        <motion.div
          className="hero__scroll-indicator"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 0.5 }}
          onClick={() => scrollToSection('about')}
        >
          <span>Scroll to explore</span>
          <motion.div
            className="hero__scroll-arrow"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="hero__decorations">
        <motion.div
          className="hero__decoration hero__decoration--1"
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
            scale: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
          }}
        />
        <motion.div
          className="hero__decoration hero__decoration--2"
          animate={{
            rotate: -360,
            y: [0, 20, 0],
          }}
          transition={{
            rotate: { duration: 25, repeat: Infinity, ease: 'linear' },
            y: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
          }}
        />
        <motion.div
          className="hero__decoration hero__decoration--3"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>
    </section>
  );
};

