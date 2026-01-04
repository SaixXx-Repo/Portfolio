import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Section, Card } from '../common';
import { AndroidIcon, ReactIcon, AntigravityIcon, NodeJSIcon } from '../icons';
import { projects } from '../../data/projects';
import { Project } from '../../types';
import { useAnalytics } from '../../hooks/useAnalytics';
import './Projects.css';

type ProjectCategory = 'all' | 'android' | 'react' | 'other';

export const Projects: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const { trackProjectInteraction } = useAnalytics();

  const categories: { value: ProjectCategory; label: string }[] = [
    { value: 'all', label: 'All Projects' },
    { value: 'android', label: 'Android Apps' },
    { value: 'react', label: 'React Projects' },
    { value: 'other', label: 'AI & Other' },
  ];

  const filteredProjects = projects.filter(
    project => activeCategory === 'all' || project.category === activeCategory
  );

  const getTechIcon = (tech: string): React.ReactNode => {
    const iconSize = 14;
    const icons: Record<string, React.ReactNode> = {
      Kotlin: (
        <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="#7F52FF">
          <path d="M24 24H0V0h24L12 12z" />
        </svg>
      ),
      'Jetpack Compose': (
        <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="#4285F4">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      ),
      React: <ReactIcon size={iconSize} color="#61DAFB" />,
      TypeScript: (
        <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="#3178C6">
          <path d="M0 12v12h24V0H0v12zm19.341-.956c.61.152 1.074.423 1.501.865.221.236.549.666.575.77.008.03-1.036.73-1.668 1.123-.023.015-.115-.084-.217-.236-.31-.45-.633-.644-1.128-.678-.728-.05-1.196.331-1.192.967a.88.88 0 0 0 .102.45c.16.331.458.53 1.39.933 1.719.74 2.454 1.227 2.911 1.92.51.773.625 2.008.278 2.926-.38.998-1.325 1.676-2.655 1.9-.411.073-1.386.062-1.828-.018-.964-.172-1.878-.648-2.442-1.273-.221-.243-.652-.88-.625-.925.011-.016.11-.077.22-.141.108-.061.511-.294.892-.515l.69-.4.145.213c.201.31.643.732.91.872.766.404 1.817.347 2.335-.118a.883.883 0 0 0 .313-.72c0-.278-.035-.4-.18-.61-.186-.266-.567-.49-1.649-.96-1.238-.533-1.771-.864-2.259-1.39a3.165 3.165 0 0 1-.659-1.2c-.091-.339-.114-1.189-.042-1.531.255-1.197 1.158-2.03 2.461-2.278.423-.08 1.406-.05 1.821.053v.001zm-5.634 1.002l.008.983H10.59v8.876H8.38v-8.876H5.258v-.964c0-.534.011-.98.026-.99.012-.016 1.913-.024 4.217-.02l4.195.012v.979z" />
        </svg>
      ),
      JavaScript: (
        <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="#F7DF1E">
          <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z" />
        </svg>
      ),
      Firebase: (
        <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="#FFCA28">
          <path d="M3.89 15.672L6.255.461A.542.542 0 0 1 7.27.288l2.543 4.771zm16.794 3.692l-2.25-14a.54.54 0 0 0-.919-.295L3.316 19.365l7.856 4.427a1.621 1.621 0 0 0 1.588 0zM14.3 7.147l-1.82-3.482a.542.542 0 0 0-.96 0L3.53 17.984z" />
        </svg>
      ),
      Room: (
        <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="#3DDC84">
          <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" />
        </svg>
      ),
      Coroutines: (
        <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="#7F52FF">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
        </svg>
      ),
      Flow: (
        <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="#7F52FF">
          <path d="M12 6v6m0 0v6m0-6h6m-6 0H6" stroke="currentColor" strokeWidth="2" fill="none" />
        </svg>
      ),
      Hilt: (
        <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="#3DDC84">
          <path d="M12 2l-5.5 9h11L12 2zm0 3.84L13.93 9h-3.87L12 5.84zM17.5 13c-2.49 0-4.5 2.01-4.5 4.5s2.01 4.5 4.5 4.5 4.5-2.01 4.5-4.5-2.01-4.5-4.5-4.5zm0 7c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5zM3 21.5h8v-8H3v8zm2-6h4v4H5v-4z" />
        </svg>
      ),
      'Hilt/Dagger': (
        <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="#3DDC84">
          <path d="M12 2l-5.5 9h11L12 2zm0 3.84L13.93 9h-3.87L12 5.84z" />
        </svg>
      ),
      'Material Design': (
        <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="#757575">
          <path d="M12 2L2 12l10 10 10-10L12 2z" />
        </svg>
      ),
      WebView: (
        <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="#4285F4">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
        </svg>
      ),
      'Node.js': (
        <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="#339933">
          <path d="M11.998 24c-.321 0-.641-.084-.922-.247L8.14 22.016c-.438-.245-.224-.332-.08-.383.639-.222.768-.273 1.449-.659.072-.04.166-.025.24.019l2.259 1.341c.082.045.198.045.275 0l8.806-5.082c.084-.049.137-.142.137-.243V6.932c0-.1-.053-.195-.137-.243L12.276 1.61a.283.283 0 0 0-.277 0L3.199 6.689c-.085.048-.141.143-.141.243v10.076c0 .1.056.194.14.243l2.413 1.392c1.307.654 2.103-.116 2.103-.89V7.787c0-.142.114-.253.256-.253h1.115c.139 0 .254.111.254.253v9.967c0 1.743-.949 2.745-2.604 2.745-.508 0-.909 0-2.026-.551l-2.309-1.33A1.854 1.854 0 0 1 1.5 17.01V6.933c0-.675.366-1.305.95-1.64L11.252.21c.57-.32 1.325-.32 1.891 0l8.797 5.082c.59.337.956.965.956 1.64v10.076c0 .675-.366 1.303-.958 1.641l-8.795 5.082c-.28.163-.598.247-.92.247l-.225.022z" />
        </svg>
      ),
      HTML: (
        <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="#E34F26">
          <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z" />
        </svg>
      ),
      CSS: (
        <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="#1572B6">
          <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.414z" />
        </svg>
      ),
      MySQL: (
        <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="#4479A1">
          <path d="M16.405 5.609c-.115 0-.193.014-.274.033v.013h.014c.054.104.146.18.214.273.054.107.107.214.147.327.014-.014.033-.027.04-.047.054-.08.08-.18.08-.287 0-.073-.013-.127-.04-.193-.027-.054-.08-.107-.147-.147-.04-.033-.08-.06-.127-.073-.06-.007-.1-.007-.167-.007zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
        </svg>
      ),
      PHP: (
        <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="#777BB4">
          <path d="M7.01 10.207h-.944l-.515 2.648h.838c.556 0 .97-.099 1.242-.298.273-.2.463-.552.569-1.057.103-.503.042-.863-.183-1.08-.227-.214-.605-.213-.999-.213zm-.553 1.19c-.025.131-.084.258-.178.361-.094.107-.232.16-.41.16h-.155l.17-.852h.238c.16 0 .268.03.323.095.058.063.047.138.012.236zM12 5.688c-3.78 0-6.86 2.892-6.86 6.437 0 3.544 3.08 6.437 6.86 6.437 3.779 0 6.859-2.893 6.859-6.437 0-3.545-3.08-6.437-6.859-6.437z" />
        </svg>
      ),
      'Data Binding': (
        <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="#3DDC84">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-4h2v2h-2zm0-2h2V7h-2z" />
        </svg>
      ),
      'Framer Motion': (
        <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="#0055FF">
          <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z" />
        </svg>
      ),
      GSAP: (
        <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="#88CE02">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
        </svg>
      ),
      MVVM: (
        <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="#7F52FF">
          <path d="M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 5a5 5 0 1 0 0-10 5 5 0 0 0 0 10z" />
        </svg>
      ),
      Retrofit: (
        <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="#48B983">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      ),
      Vercel: (
        <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 22.525H0l12-21.05 12 21.05z" />
        </svg>
      ),
      'Gemini AI': (
        <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="#8E75B2">
          <path d="M12 2L9.19 9.19 2 12l7.19 2.81L12 22l2.81-7.19L22 12l-7.19-2.81L12 2z" />
        </svg>
      ),
      Antigravity: (
        <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="#6366F1">
          <path d="M12 2L4 20h3l1.5-4h7l1.5 4h3L12 2zm0 5l2.5 7h-5L12 7z" />
        </svg>
      ),
      'WhatsApp Web.js': <NodeJSIcon size={iconSize} color="#339933" />,
      'DeepL API': (
        <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="#0F2B46">
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
        </svg>
      ),
      'QRCode Terminal': (
        <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="currentColor">
          <path d="M3 3h6v6H3V3zm2 2v2h2V5H5zm8-2h6v6h-6V3zm2 2v2h2V5h-2zM3 13h6v6H3v-6zm2 2v2h2v-2H5zm13-2h3v2h-3v-2zm-3 2h2v2h-2v-2zm3 2h3v2h-3v-2zM3 21h6v-6H3v6zm13 0h3v-2h-3v2z" />
        </svg>
      ),
    };

    return icons[tech] || (
      <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="currentColor" opacity={0.5}>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
      </svg>
    );
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
            className={`projects__filter-btn ${activeCategory === category.value ? 'projects__filter-btn--active' : ''
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
              onInteraction={trackProjectInteraction}
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
  getTechIcon: (tech: string) => React.ReactNode;
  onVideoClick: (url: string) => void;
  onInteraction: (projectId: string) => void;
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
  onInteraction,
}) => {
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
            ) : project.category === 'react' ? (
              <ReactIcon size={64} color="#61DAFB" />
            ) : (
              <AntigravityIcon size={64} color="#6366F1" />
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
                  onClick={() => onInteraction(project.id)}
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
                  onClick={() => onInteraction(project.id)}
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
                  onClick={() => onInteraction(project.id)}
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
                    onInteraction(project.id);
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
            ) : project.category === 'react' ? (
              <><ReactIcon size={14} color="#61DAFB" /> React</>
            ) : (
              <><AntigravityIcon size={14} color="#6366F1" /> AI Agent</>
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
              {project.technologies.map((tech, index) => (
                <motion.span
                  key={tech}
                  className="project-card__tech-tag"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2, delay: index * 0.03 }}
                  layout
                >
                  {getTechIcon(tech)} {tech}
                </motion.span>
              ))}
            </AnimatePresence>
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
