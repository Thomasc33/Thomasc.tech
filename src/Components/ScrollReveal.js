import React, { useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Box } from '@mui/material';

/**
 * Animation presets for scroll-triggered reveals.
 *
 * Variants:
 *   'up' | 'down' | 'left' | 'right' — classic slide + fade
 *   'blur'       — fades in while de-blurring
 *   'scale'      — grows from 90% with fade
 *   'clip'       — wipes open via clip-path (bottom-to-top)
 *   'rotate'     — subtle 3D rotation entrance
 *   'blur-slide' — combines blur + slide-up (hero-grade)
 */

const PRESETS = {
  up:    { hidden: { opacity: 0, y: 40 },  visible: { opacity: 1, y: 0 } },
  down:  { hidden: { opacity: 0, y: -40 }, visible: { opacity: 1, y: 0 } },
  left:  { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 40 },  visible: { opacity: 1, x: 0 } },
  blur: {
    hidden:  { opacity: 0, filter: 'blur(12px)' },
    visible: { opacity: 1, filter: 'blur(0px)' },
  },
  scale: {
    hidden:  { opacity: 0, scale: 0.88 },
    visible: { opacity: 1, scale: 1 },
  },
  clip: {
    hidden:  { opacity: 0, clipPath: 'inset(100% 0% 0% 0%)' },
    visible: { opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' },
  },
  rotate: {
    hidden:  { opacity: 0, rotateX: 15, y: 30, transformPerspective: 800 },
    visible: { opacity: 1, rotateX: 0, y: 0, transformPerspective: 800 },
  },
  'blur-slide': {
    hidden:  { opacity: 0, y: 50, filter: 'blur(10px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
  },
};

const MotionBox = motion.create(Box);

const ScrollReveal = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.7,
  threshold = 0.15,
  once = true,
  easing = [0.25, 0.46, 0.45, 0.94],
  sx,
}) => {
  const prefersReduced = useReducedMotion();

  const preset = PRESETS[direction] || PRESETS.up;

  const variants = useMemo(
    () => ({
      hidden: preset.hidden,
      visible: {
        ...preset.visible,
        transition: {
          duration: prefersReduced ? 0 : duration,
          delay: delay / 1000,
          ease: easing,
        },
      },
    }),
    [preset, duration, delay, easing, prefersReduced]
  );

  if (prefersReduced) {
    return <Box sx={sx}>{children}</Box>;
  }

  return (
    <MotionBox
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: threshold }}
      variants={variants}
      sx={{ willChange: 'opacity, transform, filter', ...sx }}
    >
      {children}
    </MotionBox>
  );
};

export default ScrollReveal;
