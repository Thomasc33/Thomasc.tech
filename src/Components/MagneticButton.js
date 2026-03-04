import React, { useRef, useState } from 'react';
import { Box } from '@mui/material';

const MagneticButton = ({ children, strength = 0.3, maxOffset = 8 }) => {
  const ref = useRef(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;

    setOffset({
      x: Math.max(-maxOffset, Math.min(maxOffset, deltaX)),
      y: Math.max(-maxOffset, Math.min(maxOffset, deltaY)),
    });
  };

  const handleMouseLeave = () => {
    setOffset({ x: 0, y: 0 });
  };

  return (
    <Box
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      sx={{
        display: 'inline-flex',
        transform: `translate(${offset.x}px, ${offset.y}px)`,
        transition: offset.x === 0 ? 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
      }}
    >
      {children}
    </Box>
  );
};

export default MagneticButton;
