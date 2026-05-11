import React from 'react';
import { Box } from '@mui/material';
import { useReducedMotion } from 'framer-motion';

const grainSvg = encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180">
  <filter id="n">
    <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="7" stitchTiles="stitch"/>
    <feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.55 0"/>
  </filter>
  <rect width="100%" height="100%" filter="url(#n)" opacity="0.9"/>
</svg>
`.trim());

const GrainOverlay = ({ opacity = 0.04 }) => {
  const prefersReduced = useReducedMotion();
  if (prefersReduced) return null;

  return (
    <Box
      aria-hidden="true"
      sx={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 2,
        opacity,
        mixBlendMode: 'overlay',
        backgroundImage: `url("data:image/svg+xml;utf8,${grainSvg}")`,
        backgroundSize: '180px 180px',
        backgroundRepeat: 'repeat',
        display: { xs: 'none', md: 'block' },
      }}
    />
  );
};

export default GrainOverlay;
