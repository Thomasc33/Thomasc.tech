import React from 'react';
import { Box, Container, ThemeProvider } from '@mui/material';
import AnimatedCounter from '../Components/AnimatedCounter';
import StaggerGrid from '../Components/StaggerGrid';
import createDarkTheme from '../theme';
import publications from '../Data/publications.json';
import projects from '../Data/projects.json';

// Counted from the data rather than typed in. The hardcoded figures had gone
// stale in the direction that undersells: "5" venues when the record showed
// seven, and a publication count from before DisentangledTMR was accepted.
const RESEARCH_START_YEAR = 2023;

const countable = [...publications.published, ...publications.ongoing].filter(
  (p) => p.status === 'Published' || p.status === 'Accepted'
);

const peerReviewed = countable.filter((p) => p.publicationType !== 'Dissertation');

// Venue acronym, e.g. "European Conference on Computer Vision (ECCV)" -> "ECCV".
// The acronym is not always last: the ISMAR entry reads "... (ISMAR) — Demo
// Track", so anchoring to the end of the string would count it as its own
// venue. Falls back to the full name when there is no parenthesised acronym.
const venueOf = (conference = '') =>
  (conference.match(/\(([A-Z][A-Za-z-]{1,12})\)/)?.[1] || conference).trim();

const distinctVenues = new Set(peerReviewed.map((p) => venueOf(p.conference)));

const yearsResearching = new Date().getFullYear() - RESEARCH_START_YEAR;

const stats = [
  { end: peerReviewed.length, suffix: '+', label: 'Publications' },
  { end: projects.length, suffix: '', label: 'Projects' },
  { end: yearsResearching, suffix: '+', label: 'Years Research' },
  { end: distinctVenues.size, suffix: '', label: 'Top Venues' },
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
