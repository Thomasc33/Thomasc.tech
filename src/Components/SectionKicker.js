import React from 'react';
import { Typography } from '@mui/material';
import ScrollReveal from './ScrollReveal';

const monoFamily = '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace';

const SectionKicker = ({ index, label, sx }) => (
  <ScrollReveal direction="blur" duration={0.6}>
    <Typography
      component="div"
      sx={{
        fontFamily: monoFamily,
        fontSize: { xs: '0.7rem', md: '0.75rem' },
        letterSpacing: '0.32em',
        textTransform: 'uppercase',
        color: 'rgba(16, 185, 129, 0.75)',
        textAlign: 'center',
        mb: 1.5,
        ...sx,
      }}
    >
      {index && (
        <Typography
          component="span"
          sx={{
            fontFamily: monoFamily,
            color: '#d4a853',
            mr: 1.2,
            opacity: 0.85,
            fontSize: 'inherit',
            letterSpacing: 'inherit',
          }}
        >
          {String(index).padStart(2, '0')}
        </Typography>
      )}
      {'// '}{label}
    </Typography>
  </ScrollReveal>
);

export default SectionKicker;
