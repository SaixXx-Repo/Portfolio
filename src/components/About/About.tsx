import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Section, Button } from '../common';
import { AndroidIcon } from '../icons';
import { personalInfo } from '../../data/projects';
import './About.css';

export const About: React.FC = () => {
  const statsRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(statsRef, { once: true, margin: '-100px' });

  const stats = [
    { label: 'Years Experience', value: '8+' },
    { label: 'Projects Completed', value: '30+' },
    { label: 'Apps Published', value: '10+' },
    { label: 'Happy Clients', value: '20+' },
  ];

  const highlights = [
    {
      icon: <AndroidIcon size="2.5rem" color="#3DDC84" className="about__highlight-svg" />,
      title: 'Android Development',
      description: 'Expert in Kotlin, Jetpack Compose, and modern Android architecture patterns.',
    },
    {
      icon: '⚛️',
      title: 'React Development',
      description: 'Building responsive, performant web applications with React and TypeScript.',
    },
    {
      icon: '🎨',
      title: 'UI/UX Focus',
      description: 'Creating beautiful interfaces with attention to user experience and accessibility.',
    },
    {
      icon: '🚀',
      title: 'Performance',
      description: 'Optimizing applications for speed, efficiency, and seamless user experiences.',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <Section
      id="about"
      title="About Me"
      subtitle="Passionate about creating exceptional digital experiences"
    >
      <div className="about__grid">
        {/* Profile Card */}
        <motion.div
          className="about__profile"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="about__image-wrapper">
            <div className="about__image-placeholder">
              <span className="about__image-emoji">👨‍💻</span>
            </div>
            <div className="about__image-decoration"></div>
          </div>
          
          <div className="about__info">
            <h3 className="about__name">{personalInfo.name}</h3>
            <p className="about__title">{personalInfo.title}</p>
            <p className="about__location">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {personalInfo.location}
            </p>
          </div>

          <Button
            variant="primary"
            href={personalInfo.resumeUrl}
            icon={
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            }
          >
            Download Resume
          </Button>
        </motion.div>

        {/* Bio & Highlights */}
        <div className="about__content">
          <motion.div
            className="about__bio"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {personalInfo.bio.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </motion.div>

          <motion.div
            className="about__highlights"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {highlights.map((highlight, index) => (
              <motion.div
                key={index}
                className="about__highlight-card"
                variants={itemVariants}
              >
                <span className="about__highlight-icon">{highlight.icon}</span>
                <h4 className="about__highlight-title">{highlight.title}</h4>
                <p className="about__highlight-description">{highlight.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Stats */}
      <motion.div
        ref={statsRef}
        className="about__stats"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {stats.map((stat, index) => (
          <div key={index} className="about__stat">
            <motion.span
              className="about__stat-value gradient-text"
              initial={{ scale: 0.5 }}
              animate={isInView ? { scale: 1 } : { scale: 0.5 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {stat.value}
            </motion.span>
            <span className="about__stat-label">{stat.label}</span>
          </div>
        ))}
      </motion.div>
    </Section>
  );
};

