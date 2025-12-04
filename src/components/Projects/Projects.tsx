import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Section, Card } from '../common';
import { AndroidIcon, ReactIcon } from '../icons';
import { projects } from '../../data/projects';
import { Project } from '../../types';
import './Projects.css';

type ProjectCategory = 'all' | 'android' | 'react';

export const Projects: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const categories: { value: ProjectCategory; label: string }[] = [
    { value: 'all', label: 'All Projects' },
    { value: 'android', label: 'Android Apps' },
    { value: 'react', label: 'React Projects' },
  ];

  const filteredProjects = projects.filter(
    project => activeCategory === 'all' || project.category === activeCategory
  );

  const getTechIcon = (tech: string): string => {
    const icons: Record<string, string> = {
      Kotlin: '🟣',
      'Jetpack Compose': '🎨',
      React: '⚛️',
      TypeScript: '📘',
      Firebase: '🔥',
      'Material Design 3': '🎯',
      'Redux Toolkit': '🔄',
      'Framer Motion': '✨',
      GSAP: '🌀',
    };
    return icons[tech] || '💻';
  };

  return (
    <Section
      id="projects"
      title="Featured Projects"
      subtitle="A showcase of my work in Android and React development"
    >
      {/* Category Filter */}
      <motion.div
        className="projects__filters"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {categories.map(category => (
          <button
            key={category.value}
            className={`projects__filter-btn ${
              activeCategory === category.value ? 'projects__filter-btn--active' : ''
            }`}
            onClick={() => setActiveCategory(category.value)}
          >
            {category.label}
            {activeCategory === category.value && (
              <motion.div
                className="projects__filter-indicator"
                layoutId="filter-indicator"
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            )}
          </button>
        ))}
      </motion.div>

      {/* Projects Grid */}
      <motion.div 
        className="projects__grid" 
        layout 
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              totalCount={filteredProjects.length}
              isHovered={hoveredProject === project.id}
              onHover={() => setHoveredProject(project.id)}
              onLeave={() => setHoveredProject(null)}
              getTechIcon={getTechIcon}
              onVideoClick={(url) => setActiveVideo(url)}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Video Modal */}
      <VideoModal 
        videoUrl={activeVideo} 
        onClose={() => setActiveVideo(null)} 
      />
    </Section>
  );
};

interface ProjectCardProps {
  project: Project;
  index: number;
  totalCount: number;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  getTechIcon: (tech: string) => string;
  onVideoClick: (url: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  totalCount,
  isHovered,
  onHover,
  onLeave,
  getTechIcon,
  onVideoClick,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const visibleTechs = isExpanded ? project.technologies : project.technologies.slice(0, 4);
  const hasMoreTechs = project.technologies.length > 4;
  
  // Stagger delays for smoother animations
  const enterDelay = index * 0.08;
  const exitDelay = (totalCount - 1 - index) * 0.05; // Exit from last to first
  
  return (
    <motion.div
      layout="position"
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ 
        opacity: 1, 
        y: 0, 
        scale: 1,
        transition: {
          duration: 0.4,
          delay: enterDelay,
          ease: [0.4, 0, 0.2, 1]
        }
      }}
      exit={{ 
        opacity: 0, 
        scale: 0.95,
        transition: {
          duration: 0.25,
          delay: exitDelay,
          ease: [0.4, 0, 1, 1]
        }
      }}
      transition={{
        layout: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
      }}
      className="project-card"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <Card hoverable={false} className="project-card__inner">
        {/* Image */}
        <div className="project-card__image">
          {project.image ? (
            <img 
              src={project.image} 
              alt={project.title}
              className="project-card__img"
              onError={(e) => {
                // Fallback to placeholder if image fails to load
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling?.classList.add('project-card__image-placeholder--visible');
              }}
            />
          ) : null}
          <div className={`project-card__image-placeholder ${!project.image ? 'project-card__image-placeholder--visible' : ''}`}>
            {project.category === 'android' ? (
              <AndroidIcon size={64} color="#3DDC84" />
            ) : (
              <ReactIcon size={64} color="#61DAFB" />
            )}
          </div>
          <motion.div
            className="project-card__overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="project-card__links">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  className="project-card__link"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View source code"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  className="project-card__link"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View live demo"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                  </svg>
                </a>
              )}
              {project.playStoreUrl && (
                <a
                  href={project.playStoreUrl}
                  className="project-card__link"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View on Play Store"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                  </svg>
                </a>
              )}
              {project.videoUrl && (
                <button
                  className="project-card__link"
                  onClick={(e) => {
                    e.stopPropagation();
                    onVideoClick(project.videoUrl!);
                  }}
                  aria-label="Watch video demo"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
              )}
            </div>
          </motion.div>
          <span className="project-card__category">
            {project.category === 'android' ? (
              <><AndroidIcon size={14} color="#3DDC84" /> Android</>
            ) : (
              <><ReactIcon size={14} color="#61DAFB" /> React</>
            )}
          </span>
        </div>

        {/* Content */}
        <div className="project-card__content">
          <h3 className="project-card__title">{project.title}</h3>
          <p className="project-card__description">{project.description}</p>

          {/* Technologies */}
          <motion.div className="project-card__tech" layout>
            <AnimatePresence mode="popLayout">
              {visibleTechs.map((tech, index) => (
                <motion.span
                  key={tech}
                  className="project-card__tech-tag"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2, delay: index > 3 ? (index - 4) * 0.03 : 0 }}
                  layout
                >
                  {getTechIcon(tech)} {tech}
                </motion.span>
              ))}
            </AnimatePresence>
            {hasMoreTechs && (
              <motion.button
                className={`project-card__tech-toggle ${isExpanded ? 'project-card__tech-toggle--expanded' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsExpanded(!isExpanded);
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                layout
              >
                {isExpanded ? (
                  <>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 15l-6-6-6 6" />
                    </svg>
                    Less
                  </>
                ) : (
                  <>+{project.technologies.length - 4} more</>
                )}
              </motion.button>
            )}
          </motion.div>
        </div>
      </Card>
    </motion.div>
  );
};

// Video Modal Component
interface VideoModalProps {
  videoUrl: string | null;
  onClose: () => void;
}

const VideoModal: React.FC<VideoModalProps> = ({ videoUrl, onClose }) => {
  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (videoUrl) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [videoUrl, onClose]);

  // Convert YouTube URL to embed URL
  const getEmbedUrl = (url: string): string => {
    // YouTube
    const youtubeMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\s]+)/);
    if (youtubeMatch) {
      return `https://www.youtube.com/embed/${youtubeMatch[1]}?autoplay=1`;
    }
    
    // Vimeo
    const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
    if (vimeoMatch) {
      return `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1`;
    }
    
    // Direct video URL
    return url;
  };

  const isDirectVideo = (url: string): boolean => {
    return /\.(mp4|webm|ogg)$/i.test(url);
  };

  return (
    <AnimatePresence>
      {videoUrl && (
        <motion.div
          className="video-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="video-modal__content"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="video-modal__close" onClick={onClose} aria-label="Close video">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
            
            <div className="video-modal__player">
              {isDirectVideo(videoUrl) ? (
                <video
                  src={videoUrl}
                  controls
                  autoPlay
                  className="video-modal__video"
                />
              ) : (
                <iframe
                  src={getEmbedUrl(videoUrl)}
                  title="Video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="video-modal__iframe"
                />
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
