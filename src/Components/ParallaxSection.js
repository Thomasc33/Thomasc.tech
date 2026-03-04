import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Box } from '@mui/material';

/**
 * Subtle parallax wrapper — children move at a slower rate
 * than the scroll, creating gentle depth.
 *
 * `speed` controls the intensity:
 *   0   = no parallax (moves with page)
 *   0.1 = gentle float
 *   0.3 = noticeable depth
 */

const MotionBox = motion.create(Box);

const ParallaxSection = ({ children, speed = 0.15, sx }) => {
  const ref = useRef(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [speed * 100, speed * -100]);

  if (prefersReduced) {
    return <Box sx={sx}>{children}</Box>;
  }

  return (
    <Box ref={ref} sx={{ overflow: 'hidden', ...sx }}>
      <MotionBox style={{ y }}>
        {children}
      </MotionBox>
    </Box>
  );
};

export default ParallaxSection;
