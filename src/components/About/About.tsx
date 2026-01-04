import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Section, Button } from '../common';
import { AndroidIcon } from '../icons';
import { personalInfo, workExperience } from '../../data/projects';
import { useAnalytics } from '../../hooks/useAnalytics';
import './About.css';

export const About: React.FC = () => {
  const { trackResumeDownload } = useAnalytics();
  const [expandedJob, setExpandedJob] = useState<string | null>(null);
  const [isNavScrolling, setIsNavScrolling] = useState(false);

  // Listen for navigation scroll events (from Hero buttons only)
  useEffect(() => {
    const handleNavScrollStart = () => {
      setIsNavScrolling(true);
      setExpandedJob(null); // Close any expanded items during nav scroll
    };

    const handleNavScrollEnd = () => {
      setIsNavScrolling(false);
    };

    window.addEventListener('navScrollStart', handleNavScrollStart);
    window.addEventListener('navScrollEnd', handleNavScrollEnd);

    return () => {
      window.removeEventListener('navScrollStart', handleNavScrollStart);
      window.removeEventListener('navScrollEnd', handleNavScrollEnd);
    };
  }, []);

  const handleMouseEnter = (jobId: string) => {
    if (!isNavScrolling) {
      setExpandedJob(jobId);
    }
  };

  const handleMouseLeave = () => {
    if (!isNavScrolling) {
      setExpandedJob(null);
    }
  };

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
            <img
              src="/images/profile_picture.jpg"
              alt={personalInfo.name}
              className="about__image"
            />
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
            onClick={() => {
              window.open(personalInfo.resumeUrl, '_blank');
              trackResumeDownload();
            }}
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

      {/* Work Experience Timeline */}
      <motion.div
        className="about__timeline"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="about__timeline-title">Work Experience</h3>
        <div className="timeline">
          {workExperience.map((job, index) => (
            <motion.div
              key={job.id}
              className={`timeline__item ${expandedJob === job.id ? 'timeline__item--expanded' : ''}`}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onMouseEnter={() => handleMouseEnter(job.id)}
              onMouseLeave={handleMouseLeave}
            >
              <div className="timeline__marker">
                <div className="timeline__dot" />
                {index < workExperience.length - 1 && <div className="timeline__line" />}
              </div>

              <div className="timeline__content">
                <div className="timeline__header">
                  <div className="timeline__header-main">
                    <h4 className="timeline__company">{job.company}</h4>
                    <span className="timeline__role">{job.role}</span>
                  </div>
                  <div className="timeline__header-meta">
                    <span className="timeline__date">{job.startDate} - {job.endDate}</span>
                    <span className="timeline__location">{job.location}</span>
                  </div>
                </div>

                <p className="timeline__description">{job.description}</p>

                <AnimatePresence mode="wait">
                  {expandedJob === job.id && (
                    <motion.div
                      className="timeline__details"
                      initial={{ opacity: 0, height: 0, marginTop: 0, paddingTop: 0 }}
                      animate={{ opacity: 1, height: 'auto', marginTop: 16, paddingTop: 16 }}
                      exit={{ opacity: 0, height: 0, marginTop: 0, paddingTop: 0 }}
                      transition={{
                        duration: 0.3,
                        ease: [0.4, 0, 0.2, 1]
                      }}
                    >
                      <ul className="timeline__highlights">
                        {job.highlights.map((highlight, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.15 + i * 0.05 }}
                          >
                            {highlight}
                          </motion.li>
                        ))}
                      </ul>
                      <div className="timeline__technologies">
                        {job.technologies.map((tech, i) => (
                          <motion.span
                            key={i}
                            className="timeline__tech-tag"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 + i * 0.03 }}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Section>
  );
};

