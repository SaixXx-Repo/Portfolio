import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { Section } from '../common';
import { 
  ReactIcon, 
  TypeScriptIcon, 
  KotlinIcon, 
  FirebaseIcon, 
  GitIcon, 
  VSCodeIcon, 
  AndroidIcon, 
  NodeJSIcon,
  RocketIcon 
} from '../icons';
import { skills } from '../../data/projects';
import { Skill } from '../../types';
import './Skills.css';

type SkillCategory = 'all' | 'frontend' | 'mobile' | 'tools' | 'languages';

export const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<SkillCategory>('all');
  const skillsRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(skillsRef, { once: true, margin: '-100px' });

  const categories: { value: SkillCategory; label: string; icon: string }[] = [
    { value: 'all', label: 'All Skills', icon: '🎯' },
    { value: 'frontend', label: 'Frontend', icon: '🖥️' },
    { value: 'mobile', label: 'Mobile', icon: '📱' },
    { value: 'languages', label: 'Languages', icon: '💻' },
    { value: 'tools', label: 'Tools', icon: '🛠️' },
  ];

  const filteredSkills = skills.filter(
    skill => activeCategory === 'all' || skill.category === activeCategory
  );

  return (
    <Section
      id="skills"
      title="Skills & Expertise"
      subtitle="Technologies and tools I work with"
    >
      {/* Category Tabs */}
      <motion.div
        className="skills__categories"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {categories.map(category => (
          <button
            key={category.value}
            className={`skills__category-btn ${
              activeCategory === category.value ? 'skills__category-btn--active' : ''
            }`}
            onClick={() => setActiveCategory(category.value)}
          >
            <span className="skills__category-icon">{category.icon}</span>
            <span>{category.label}</span>
          </button>
        ))}
      </motion.div>

      {/* Skills Grid */}
      <div ref={skillsRef} className="skills__grid">
        {filteredSkills.map((skill, index) => (
          <SkillBar
            key={skill.name}
            skill={skill}
            index={index}
            isInView={isInView}
          />
        ))}
      </div>

      {/* Tech Stack Orbit */}
      <TechOrbit />
    </Section>
  );
};

interface SkillBarProps {
  skill: Skill;
  index: number;
  isInView: boolean;
}

const SkillBar: React.FC<SkillBarProps> = ({ skill, index, isInView }) => {
  const barRef = useRef<HTMLDivElement>(null);
  const valueRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!isInView || !barRef.current || !valueRef.current) return;

    // GSAP animation for the progress bar
    gsap.fromTo(
      barRef.current,
      { width: '0%' },
      {
        width: `${skill.level}%`,
        duration: 1.2,
        delay: index * 0.1,
        ease: 'power3.out',
      }
    );

    // GSAP counter animation
    gsap.fromTo(
      valueRef.current,
      { textContent: '0' },
      {
        textContent: skill.level,
        duration: 1.2,
        delay: index * 0.1,
        ease: 'power3.out',
        snap: { textContent: 1 },
        onUpdate: function () {
          if (valueRef.current) {
            valueRef.current.textContent = Math.round(
              parseFloat(valueRef.current.textContent || '0')
            ).toString();
          }
        },
      }
    );
  }, [isInView, skill.level, index]);

  const getCategoryColor = (category: Skill['category']): string => {
    const colors: Record<Skill['category'], string> = {
      frontend: 'var(--color-accent-primary)',
      mobile: 'var(--color-accent-secondary)',
      languages: 'var(--color-accent-tertiary)',
      tools: 'var(--color-success)',
    };
    return colors[category];
  };

  return (
    <motion.div
      className="skill-bar"
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <div className="skill-bar__header">
        <span className="skill-bar__name">{skill.name}</span>
        <span className="skill-bar__value">
          <span ref={valueRef}>0</span>%
        </span>
      </div>
      <div className="skill-bar__track">
        <div
          ref={barRef}
          className="skill-bar__fill"
          style={{
            background: getCategoryColor(skill.category),
          }}
        />
      </div>
    </motion.div>
  );
};

const TechOrbit: React.FC = () => {
  const orbitRef = useRef<HTMLDivElement>(null);

  const techIcons = [
    { name: 'React', icon: <ReactIcon size={28} color="#61DAFB" /> },
    { name: 'TypeScript', icon: <TypeScriptIcon size={28} color="#3178C6" /> },
    { name: 'Kotlin', icon: <KotlinIcon size={28} color="#7F52FF" /> },
    { name: 'Firebase', icon: <FirebaseIcon size={28} color="#FFCA28" /> },
    { name: 'Git', icon: <GitIcon size={28} color="#F05032" /> },
    { name: 'VS Code', icon: <VSCodeIcon size={28} color="#007ACC" /> },
    { name: 'Android', icon: <AndroidIcon size={28} color="#3DDC84" /> },
    { name: 'Node.js', icon: <NodeJSIcon size={28} color="#339933" /> },
  ];

  useEffect(() => {
    if (!orbitRef.current) return;

    const items = orbitRef.current.querySelectorAll('.tech-orbit__item');
    const totalItems = items.length;

    items.forEach((item, index) => {
      const angle = (index / totalItems) * 360;
      
      gsap.set(item, {
        rotation: angle,
      });

      gsap.to(item, {
        rotation: angle + 360,
        duration: 30,
        repeat: -1,
        ease: 'none',
      });

      // Counter-rotate the inner content
      const content = item.querySelector('.tech-orbit__content');
      if (content) {
        gsap.to(content, {
          rotation: -angle - 360,
          duration: 30,
          repeat: -1,
          ease: 'none',
        });
      }
    });
  }, []);

  return (
    <motion.div
      className="tech-orbit"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="tech-orbit__center">
        <RocketIcon size={32} color="white" />
        <span className="tech-orbit__center-text">Tech Stack</span>
      </div>
      <div ref={orbitRef} className="tech-orbit__ring">
        {techIcons.map((tech) => (
          <div key={tech.name} className="tech-orbit__item">
            <div className="tech-orbit__content">
              <span className="tech-orbit__icon">{tech.icon}</span>
              <span className="tech-orbit__name">{tech.name}</span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

