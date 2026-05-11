import React from 'react';
import { Box, Typography } from '@mui/material';
import useCountUp from '../hooks/useCountUp';

const monoFamily = '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace';

const AnimatedCounter = ({ end, suffix = '', label, duration = 2000, index }) => {
  const { ref, count } = useCountUp({ end, duration });

  return (
    <Box ref={ref} sx={{ textAlign: 'center', minWidth: 0, position: 'relative' }}>
      {index && (
        <Typography
          sx={{
            fontFamily: monoFamily,
            fontSize: '0.62rem',
            letterSpacing: '0.25em',
            color: 'rgba(212, 168, 83, 0.55)',
            mb: 0.75,
          }}
        >
          {String(index).padStart(2, '0')}
        </Typography>
      )}
      <Typography
        sx={{
          fontFamily: monoFamily,
          fontSize: { xs: '1.9rem', sm: '2.2rem', md: '2.4rem' },
          fontWeight: 500,
          color: '#d4a853',
          lineHeight: 1,
          mb: 1,
          fontVariantNumeric: 'tabular-nums',
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
          fontSize: { xs: '0.65rem', md: '0.72rem' },
          whiteSpace: 'nowrap',
        }}
      >
        {label}
      </Typography>
    </Box>
  );
};

export default AnimatedCounter;
