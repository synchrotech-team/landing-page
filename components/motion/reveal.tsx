'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ReactNode } from 'react';

interface MotionRevealProps {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  className?: string;
}

export function MotionReveal({
  children,
  delay = 0,
  direction = 'up',
  className = '',
}: MotionRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const getVariants = () => {
    switch (direction) {
      case 'up':
        return { hidden: { opacity: 0, y: 24, filter: 'blur(6px)' }, visible: { opacity: 1, y: 0, filter: 'blur(0px)' } };
      case 'down':
        return { hidden: { opacity: 0, y: -24, filter: 'blur(6px)' }, visible: { opacity: 1, y: 0, filter: 'blur(0px)' } };
      case 'left':
        return { hidden: { opacity: 0, x: 24, filter: 'blur(6px)' }, visible: { opacity: 1, x: 0, filter: 'blur(0px)' } };
      case 'right':
        return { hidden: { opacity: 0, x: -24, filter: 'blur(6px)' }, visible: { opacity: 1, x: 0, filter: 'blur(0px)' } };
      default:
        return { hidden: { opacity: 0, filter: 'blur(6px)' }, visible: { opacity: 1, filter: 'blur(0px)' } };
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      variants={getVariants()}
      className={className}
    >
      {children}
    </motion.div>
  );
}
