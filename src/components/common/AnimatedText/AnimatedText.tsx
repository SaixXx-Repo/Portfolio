import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import './AnimatedText.css';

interface AnimatedTextProps {
  text: string;
  className?: string;
  variant?: 'typewriter' | 'scramble' | 'reveal' | 'gradient';
  delay?: number;
  duration?: number;
  tag?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className = '',
  variant = 'reveal',
  delay = 0,
  duration = 0.8,
  tag: Tag = 'span',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [displayText, setDisplayText] = useState(variant === 'typewriter' ? '' : text);
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';

  useEffect(() => {
    if (!isInView || !ref.current) return;

    if (variant === 'typewriter') {
      let currentIndex = 0;
      const timeout = setTimeout(() => {
        const interval = setInterval(() => {
          if (currentIndex <= text.length) {
            setDisplayText(text.slice(0, currentIndex));
            currentIndex++;
          } else {
            clearInterval(interval);
          }
        }, 50);
        return () => clearInterval(interval);
      }, delay * 1000);
      return () => clearTimeout(timeout);
    }

    if (variant === 'scramble') {
      let iteration = 0;
      const finalText = text;
      
      const timeout = setTimeout(() => {
        const interval = setInterval(() => {
          setDisplayText(
            finalText
              .split('')
              .map((char, index) => {
                if (char === ' ') return ' ';
                if (index < iteration) return finalText[index];
                return chars[Math.floor(Math.random() * chars.length)];
              })
              .join('')
          );

          if (iteration >= finalText.length) {
            clearInterval(interval);
          }

          iteration += 1 / 3;
        }, 30);
        return () => clearInterval(interval);
      }, delay * 1000);
      return () => clearTimeout(timeout);
    }
  }, [isInView, text, variant, delay, chars]);

  if (variant === 'reveal') {
    const words = text.split(' ');
    return (
      <span ref={ref} className={`animated-text animated-text--reveal ${className}`}>
        {words.map((word, wordIndex) => (
          <span key={wordIndex} className="animated-text__word">
            {word.split('').map((char, charIndex) => (
              <motion.span
                key={charIndex}
                className="animated-text__char"
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{
                  duration: 0.5,
                  delay: delay + (wordIndex * word.length + charIndex) * 0.03,
                  ease: [0.215, 0.61, 0.355, 1],
                }}
              >
                {char}
              </motion.span>
            ))}
            {wordIndex < words.length - 1 && <span>&nbsp;</span>}
          </span>
        ))}
      </span>
    );
  }

  if (variant === 'gradient') {
    return (
      <motion.span
        ref={ref}
        className={`animated-text animated-text--gradient gradient-text ${className}`}
        initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
        animate={isInView ? { opacity: 1, scale: 1, filter: 'blur(0px)' } : {}}
        transition={{ duration, delay, ease: 'easeOut' }}
      >
        {text}
      </motion.span>
    );
  }

  // Typewriter and scramble variants
  return (
    <span
      ref={ref}
      className={`animated-text animated-text--${variant} ${className}`}
    >
      {displayText}
      {variant === 'typewriter' && displayText.length < text.length && (
        <span className="animated-text__cursor">|</span>
      )}
    </span>
  );
};
