'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';

const LazyParticles = ({ 
  particleCount = 15,
  particleSize = { min: 1, max: 4 },
  colors = ['primary/20', 'primary/30', 'primary/10'],
  animationDuration = { min: 3, max: 5 },
  movementDistance = 40
}) => {
  const particles = useMemo(() => 
    Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2,
      duration: animationDuration.min + Math.random() * (animationDuration.max - animationDuration.min),
      size: particleSize.min + Math.random() * (particleSize.max - particleSize.min),
      color: colors[Math.floor(Math.random() * colors.length)],
    }))
  , [particleCount, particleSize, colors, animationDuration]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className={`absolute rounded-full bg-${particle.color}`}
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, -movementDistance, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0, 1, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// Enhanced version with different shapes and behaviors
export const AdvancedLazyParticles = ({ 
  particleCount = 20,
  types = ['circle', 'square', 'triangle'],
  colors = ['#3B82F6', '#8B5CF6', '#06B6D4', '#10B981'],
  behaviors = ['float', 'pulse', 'drift']
}) => {
  const particles = useMemo(() => 
    Array.from({ length: particleCount }, (_, i) => {
      const type = types[Math.floor(Math.random() * types.length)];
      const behavior = behaviors[Math.floor(Math.random() * behaviors.length)];
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      return {
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 3,
        duration: 4 + Math.random() * 4,
        size: 2 + Math.random() * 4,
        type,
        behavior,
        color,
        rotation: Math.random() * 360,
      };
    })
  , [particleCount, types, colors, behaviors]);

  const getShapeClass = (type) => {
    switch (type) {
      case 'square': return 'rounded-sm';
      case 'triangle': return 'w-0 h-0 border-l-transparent border-r-transparent border-b-current';
      default: return 'rounded-full';
    }
  };

  const getAnimation = (behavior, rotation) => {
    switch (behavior) {
      case 'pulse':
        return {
          scale: [1, 1.5, 1],
          opacity: [0.3, 0.8, 0.3],
        };
      case 'drift':
        return {
          x: [0, 20, 0],
          y: [0, -30, -10],
          rotate: [rotation, rotation + 180, rotation + 360],
        };
      default: // float
        return {
          y: [0, -40, 0],
          opacity: [0, 1, 0],
          scale: [1, 1.3, 1],
        };
    }
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className={`absolute ${getShapeClass(particle.type)}`}
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.type === 'triangle' ? 0 : particle.size,
            height: particle.type === 'triangle' ? 0 : particle.size,
            borderBottomWidth: particle.type === 'triangle' ? particle.size : 0,
            borderLeftWidth: particle.type === 'triangle' ? particle.size / 2 : 0,
            borderRightWidth: particle.type === 'triangle' ? particle.size / 2 : 0,
            backgroundColor: particle.type !== 'triangle' ? particle.color : undefined,
            borderBottomColor: particle.type === 'triangle' ? particle.color : undefined,
          }}
          animate={getAnimation(particle.behavior, particle.rotation)}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// Export default with React.memo
export default LazyParticles;