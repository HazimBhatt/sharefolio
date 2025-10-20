'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

const LazyTypewriter = ({ 
  text, 
  speed = 50, 
  className = "", 
  cursor = true,
  onComplete,
  delay = 0 
}) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const animationRef = useRef(null);

  const startTyping = useCallback(() => {
    setIsStarted(true);
  }, []);

  useEffect(() => {
    if (delay > 0) {
      const timeout = setTimeout(startTyping, delay);
      return () => clearTimeout(timeout);
    } else {
      startTyping();
    }
  }, [delay, startTyping]);

  useEffect(() => {
    if (!isStarted || !text) return;

    if (currentIndex < text.length) {
      animationRef.current = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => {
        if (animationRef.current) {
          clearTimeout(animationRef.current);
        }
      };
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, text, speed, isStarted, onComplete]);

  // Reset when text changes
  useEffect(() => {
    setDisplayText('');
    setCurrentIndex(0);
    setIsStarted(false);
  }, [text]);

  return (
    <span className={className}>
      {displayText}
      {cursor && (
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="ml-0.5"
        >
          |
        </motion.span>
      )}
    </span>
  );
};

export default LazyTypewriter;