import React from 'react';
import { motion } from 'framer-motion';
import './Section.css';

interface SectionProps {
  id: string;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  fullHeight?: boolean;
}

export const Section: React.FC<SectionProps> = ({
  id,
  title,
  subtitle,
  children,
  className = '',
  fullHeight = false,
}) => {
  return (
    <section
      id={id}
      className={`section ${fullHeight ? 'section--full-height' : ''} ${className}`}
    >
      <div className="section__container">
        {(title || subtitle) && (
          <motion.div
            className="section__header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            {title && (
              <h2 className="section__title">
                <span className="gradient-text">{title}</span>
              </h2>
            )}
            {subtitle && <p className="section__subtitle">{subtitle}</p>}
          </motion.div>
        )}
        <div className="section__content">{children}</div>
      </div>
    </section>
  );
};

