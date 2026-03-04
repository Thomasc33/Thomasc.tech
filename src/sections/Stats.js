import React from 'react';
import { Box, Container, Stack, ThemeProvider } from '@mui/material';
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
      <Container maxWidth="xs">
        <StaggerGrid stagger={0.12} direction="blur-up">
          <Stack
            direction="row"
            spacing={0}
            sx={{
              justifyContent: 'center',
              alignItems: 'center',
              flexWrap: { xs: 'wrap', md: 'nowrap' },
            }}
          >
            {stats.map((stat, index) => (
              <React.Fragment key={stat.label}>
                <Box sx={{
                  flex: { xs: '0 0 50%', md: 'unset' },
                  py: { xs: 2, md: 0 },
                  display: 'flex',
                  justifyContent: 'center',
                }}>
                  <AnimatedCounter
                    end={stat.end}
                    suffix={stat.suffix}
                    label={stat.label}
                    duration={2000}
                  />
                </Box>
                {index < stats.length - 1 && (
                  <Box
                    sx={{
                      display: { xs: 'none', md: 'block' },
                      width: 1,
                      height: 40,
                      background: 'rgba(212, 168, 83, 0.2)',
                      mx: 1,
                      flexShrink: 0,
                    }}
                  />
                )}
              </React.Fragment>
            ))}
          </Stack>
        </StaggerGrid>
      </Container>
    </Box>
  </ThemeProvider>
);

export default Stats;
