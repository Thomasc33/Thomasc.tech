import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Box } from '@mui/material';

/**
 * A horizontal line that draws itself as the user scrolls
 * into the section. Used as an elegant section divider.
 */

const MotionBox = motion.create(Box);

const ScrollLine = ({
  color = '#10b981',
  height = 2,
  width = 60,
  align = 'center',
  sx,
}) => {
  const ref = useRef(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'start 0.6'],
  });

  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  const alignSx =
    align === 'center' ? { mx: 'auto' } : align === 'right' ? { ml: 'auto' } : {};

  if (prefersReduced) {
    return (
      <Box
        sx={{
          width,
          height,
          background: color,
          borderRadius: 1,
          ...alignSx,
          ...sx,
        }}
      />
    );
  }

  return (
    <MotionBox
      ref={ref}
      style={{ scaleX, opacity }}
      sx={{
        width,
        height,
        background: color,
        borderRadius: 1,
        transformOrigin: 'left',
        ...alignSx,
        ...sx,
      }}
    />
  );
};

export default ScrollLine;
