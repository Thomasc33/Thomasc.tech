import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Typography } from '@mui/material';

/**
 * Splits text into words and reveals each with a staggered
 * fade-up + de-blur animation on scroll.
 */

const MotionSpan = motion.create('span');

const containerVariants = {
  hidden: {},
  visible: (stagger) => ({
    transition: {
      staggerChildren: stagger,
      delayChildren: 0.1,
    },
  }),
};

const wordVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    filter: 'blur(8px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const TextReveal = ({
  children,
  stagger = 0.06,
  threshold = 0.3,
  once = true,
  sx = {},
  component = 'h2',
}) => {
  const prefersReduced = useReducedMotion();
  const text = typeof children === 'string' ? children : '';
  const words = text.split(' ');

  if (prefersReduced || !text) {
    return (
      <Typography component={component} sx={sx}>
        {children}
      </Typography>
    );
  }

  return (
    <Typography
      component={motion[component] || motion.create(component)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: threshold }}
      custom={stagger}
      variants={containerVariants}
      sx={{
        ...sx,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: sx.textAlign === 'center' ? 'center' : 'flex-start',
        gap: '0 0.3em',
      }}
    >
      {words.map((word, i) => (
        <MotionSpan
          key={`${word}-${i}`}
          variants={wordVariants}
          style={{ display: 'inline-block', willChange: 'opacity, transform, filter' }}
        >
          {word}
        </MotionSpan>
      ))}
    </Typography>
  );
};

export default TextReveal;
