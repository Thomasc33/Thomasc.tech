import React from 'react';
import { Box, Typography } from '@mui/material';
import useCountUp from '../hooks/useCountUp';

const AnimatedCounter = ({ end, suffix = '', label, duration = 2000 }) => {
  const { ref, count } = useCountUp({ end, duration });

  return (
    <Box ref={ref} sx={{ textAlign: 'center', px: { xs: 1, md: 2 }, minWidth: 0 }}>
      <Typography
        sx={{
          fontFamily: '"DM Serif Display", serif',
          fontSize: { xs: '2rem', md: '2.5rem' },
          fontWeight: 400,
          color: '#d4a853',
          lineHeight: 1,
          mb: 1,
        }}
      >
        {count}{suffix}
      </Typography>
      <Box
        sx={{
          width: 40,
          height: 2,
          background: '#10b981',
          mx: 'auto',
          mb: 1,
          borderRadius: 1,
        }}
      />
      <Typography
        variant="body2"
        sx={{
          color: 'text.secondary',
          fontWeight: 500,
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          fontSize: '0.75rem',
        }}
      >
        {label}
      </Typography>
    </Box>
  );
};

export default AnimatedCounter;
