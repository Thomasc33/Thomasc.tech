import React from 'react';
import { Box, Container, ThemeProvider } from '@mui/material';
import AnimatedCounter from '../Components/AnimatedCounter';
import StaggerGrid from '../Components/StaggerGrid';
import createDarkTheme from '../theme';

const stats = [
  { end: 6, suffix: '+', label: 'Publications' },
  { end: 7, suffix: '', label: 'Projects' },
  { end: 3, suffix: '+', label: 'Years Research' },
  { end: 5, suffix: '', label: 'Top Venues' },
];

const theme = createDarkTheme();

const DottedDivider = () => (
  <Box
    aria-hidden="true"
    sx={{
      display: { xs: 'none', md: 'flex' },
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: 1,
      height: 48,
      flexShrink: 0,
      gap: 0.6,
    }}
  >
    {[0, 1, 2, 3, 4].map((i) => (
      <Box
        key={i}
        sx={{
          width: 2,
          height: 2,
          borderRadius: '50%',
          background: i === 2 ? '#d4a853' : 'rgba(212, 168, 83, 0.35)',
        }}
      />
    ))}
  </Box>
);

const Stats = () => (
  <ThemeProvider theme={theme}>
    <Box
      id="stats"
      sx={{
        py: { xs: 5, md: 8 },
        position: 'relative',
        zIndex: 1,
        background: 'linear-gradient(180deg, transparent, rgba(16, 185, 129, 0.03) 50%, transparent)',
        overflowX: 'hidden',
      }}
    >
      <Container maxWidth="md">
        <StaggerGrid stagger={0.12} direction="blur-up">
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: 'repeat(2, 1fr)',
                md: '1fr auto 1fr auto 1fr auto 1fr',
              },
              alignItems: 'center',
              justifyItems: 'center',
              gap: { xs: 3, md: 1 },
              width: '100%',
              maxWidth: '100%',
            }}
          >
            {stats.map((stat, idx) => (
              <React.Fragment key={stat.label}>
                <AnimatedCounter
                  end={stat.end}
                  suffix={stat.suffix}
                  label={stat.label}
                  duration={2000}
                  index={idx + 1}
                />
                {idx < stats.length - 1 && <DottedDivider />}
              </React.Fragment>
            ))}
          </Box>
        </StaggerGrid>
      </Container>
    </Box>
  </ThemeProvider>
);

export default Stats;
