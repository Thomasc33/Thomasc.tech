import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Box } from '@mui/material';

/**
 * Wraps children in a staggered reveal container.
 * Each direct child animates in with a cascading delay.
 *
 * Usage:
 *   <StaggerGrid stagger={0.12} direction="up">
 *     <div>Card 1</div>
 *     <div>Card 2</div>
 *   </StaggerGrid>
 *
 * Or wrap around a MUI Grid — it will animate each Grid item.
 */

const MotionBox = motion.create(Box);

const CHILD_PRESETS = {
  up:    { hidden: { opacity: 0, y: 50 },  visible: { opacity: 1, y: 0 } },
  down:  { hidden: { opacity: 0, y: -50 }, visible: { opacity: 1, y: 0 } },
  left:  { hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 50 },  visible: { opacity: 1, x: 0 } },
  scale: {
    hidden:  { opacity: 0, scale: 0.85, filter: 'blur(6px)' },
    visible: { opacity: 1, scale: 1, filter: 'blur(0px)' },
  },
  'blur-up': {
    hidden:  { opacity: 0, y: 40, filter: 'blur(8px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
  },
};

const StaggerGrid = ({
  children,
  stagger = 0.1,
  direction = 'up',
  duration = 0.6,
  threshold = 0.1,
  once = true,
  sx,
}) => {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <Box sx={sx}>{children}</Box>;
  }

  const childPreset = CHILD_PRESETS[direction] || CHILD_PRESETS.up;

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: childPreset.hidden,
    visible: {
      ...childPreset.visible,
      transition: {
        duration,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <MotionBox
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: threshold }}
      variants={containerVariants}
      sx={sx}
    >
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;
        return (
          <motion.div
            variants={itemVariants}
            style={{ willChange: 'opacity, transform, filter' }}
          >
            {child}
          </motion.div>
        );
      })}
    </MotionBox>
  );
};

export default StaggerGrid;
