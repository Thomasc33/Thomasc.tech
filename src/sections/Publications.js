import React, { useMemo } from 'react';
import { Box, Container, Typography, Chip, Link, Stack } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import LanguageIcon from '@mui/icons-material/Language';
import createDarkTheme from '../theme';
import ScrollReveal from '../Components/ScrollReveal';
import TextReveal from '../Components/TextReveal';
import ScrollLine from '../Components/ScrollLine';
import SectionKicker from '../Components/SectionKicker';
import GlowingEffect from '../Components/GlowingEffect';
import publicationsData from '../Data/publications.json';

const EMERALD = '#10b981';
const GOLD = '#d4a853';
const monoFamily = '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace';

const GLASS_CARD_SX = {
  background: 'rgba(12, 12, 20, 0.85)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  borderRadius: 3,
  p: { xs: 2.5, md: 3 },
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    background: 'rgba(14, 14, 24, 0.9)',
    border: '1px solid rgba(255, 255, 255, 0.12)',
    boxShadow: `0 16px 48px rgba(0, 0, 0, 0.4), 0 0 25px rgba(16, 185, 129, 0.12)`,
    transform: 'translateY(-2px)',
  },
};

const GOLD_CHIP_SX = {
  backgroundColor: 'rgba(212,168,83,0.12)',
  color: GOLD,
  border: '1px solid rgba(212,168,83,0.25)',
  fontSize: '0.72rem',
  height: 26,
  fontFamily: monoFamily,
  letterSpacing: '0.06em',
};

const groupByYear = (items) => {
  const groups = {};
  items.forEach((item) => {
    const year = item.year;
    if (!groups[year]) groups[year] = [];
    groups[year] = [...groups[year], item];
  });
  const sortedYears = Object.keys(groups).sort((a, b) => Number(b) - Number(a));
  return sortedYears.map((year) => ({ year: Number(year), items: groups[year] }));
};

const getAbstractPreview = (pub) => {
  const text = pub.abstract || pub.description || '';
  if (text.length <= 150) return text;
  return `${text.slice(0, 150)}...`;
};

const isPublishedStatus = (status) => status === 'Published';

const buildYearStats = () => {
  const counts = {};
  const allPubs = [...publicationsData.published, ...publicationsData.ongoing];
  allPubs.forEach((p) => {
    counts[p.year] = counts[p.year] || { published: 0, ongoing: 0 };
    if (isPublishedStatus(p.status)) {
      counts[p.year].published += 1;
    } else {
      counts[p.year].ongoing += 1;
    }
  });
  return Object.keys(counts)
    .sort((a, b) => Number(a) - Number(b))
    .map((year) => ({
      year: Number(year),
      published: counts[year].published,
      ongoing: counts[year].ongoing,
      total: counts[year].published + counts[year].ongoing,
    }));
};

const TimelineMiniViz = ({ stats }) => {
  const maxTotal = Math.max(...stats.map((s) => s.total), 1);
  return (
    <ScrollReveal direction="blur-slide" duration={0.8}>
      <Box
        aria-label="Publications per year"
        sx={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          gap: { xs: 1.5, md: 3 },
          mb: 6,
          py: 3,
          borderTop: '1px solid rgba(255,255,255,0.04)',
          borderBottom: '1px solid rgba(255,255,255,0.04)',
        }}
      >
        {stats.map(({ year, published, ongoing, total }) => {
          const heightPct = (total / maxTotal) * 100;
          return (
            <Box
              key={year}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 0.8,
                minWidth: { xs: 44, md: 56 },
              }}
            >
              <Typography
                sx={{
                  fontFamily: monoFamily,
                  fontSize: '0.7rem',
                  color: GOLD,
                  opacity: 0.85,
                }}
              >
                {total}
              </Typography>
              <Box
                sx={{
                  width: { xs: 14, md: 18 },
                  height: 56,
                  display: 'flex',
                  flexDirection: 'column-reverse',
                  borderRadius: 1,
                  overflow: 'hidden',
                  background: 'rgba(255,255,255,0.03)',
                }}
              >
                <Box
                  sx={{
                    height: `${(published / maxTotal) * 100}%`,
                    background: `linear-gradient(to top, ${EMERALD}, ${EMERALD}90)`,
                    transition: 'height 0.6s ease',
                  }}
                />
                <Box
                  sx={{
                    height: `${(ongoing / maxTotal) * 100}%`,
                    background: `repeating-linear-gradient(45deg, ${GOLD}55, ${GOLD}55 3px, transparent 3px, transparent 6px)`,
                    borderTop: ongoing > 0 ? `1px dashed ${GOLD}80` : 'none',
                  }}
                />
              </Box>
              <Typography
                sx={{
                  fontFamily: monoFamily,
                  fontSize: '0.65rem',
                  color: 'text.secondary',
                  letterSpacing: '0.05em',
                }}
              >
                {year}
              </Typography>
              <Box sx={{ display: 'none' }}>{heightPct}</Box>
            </Box>
          );
        })}

        {/* Legend */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 0.8,
            ml: { xs: 1, md: 3 },
            pl: { xs: 1.5, md: 3 },
            borderLeft: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ width: 10, height: 10, background: EMERALD, borderRadius: '2px' }} />
            <Typography sx={{ fontFamily: monoFamily, fontSize: '0.65rem', color: 'text.secondary', letterSpacing: '0.08em' }}>
              Published
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box
              sx={{
                width: 10,
                height: 10,
                background: `repeating-linear-gradient(45deg, ${GOLD}55, ${GOLD}55 2px, transparent 2px, transparent 4px)`,
                border: `1px dashed ${GOLD}80`,
                borderRadius: '2px',
              }}
            />
            <Typography sx={{ fontFamily: monoFamily, fontSize: '0.65rem', color: 'text.secondary', letterSpacing: '0.08em' }}>
              Ongoing
            </Typography>
          </Box>
        </Box>
      </Box>
    </ScrollReveal>
  );
};

const StatusChip = ({ status }) => {
  const isPublished = isPublishedStatus(status);
  if (isPublished) {
    return (
      <Chip
        label="Published"
        size="small"
        sx={{
          backgroundColor: 'rgba(16,185,129,0.12)',
          color: EMERALD,
          border: '1px solid rgba(16,185,129,0.25)',
          fontSize: '0.72rem',
          height: 26,
          fontFamily: monoFamily,
          letterSpacing: '0.08em',
        }}
      />
    );
  }
  return (
    <Chip
      label={status || 'In Progress'}
      size="small"
      variant="outlined"
      sx={{
        ...GOLD_CHIP_SX,
        backgroundColor: 'transparent',
      }}
    />
  );
};

const PublicationCard = ({ pub, delay }) => (
  <ScrollReveal direction="blur-slide" delay={delay}>
    <Box sx={{ position: 'relative', borderRadius: 3, p: '2px' }}>
      <GlowingEffect
        spread={40}
        glow
        disabled={false}
        proximity={64}
        inactiveZone={0.01}
        borderWidth={3}
      />
      <Box sx={GLASS_CARD_SX}>
        <Typography
          sx={{
            fontFamily: '"Inter", sans-serif',
            fontWeight: 600,
            fontSize: '1rem',
            color: 'text.primary',
            mb: 1,
          }}
        >
          {pub.title}
        </Typography>

        <Typography
          sx={{
            fontFamily: '"Inter", sans-serif',
            fontSize: '0.8rem',
            color: 'text.secondary',
            fontStyle: 'italic',
            mb: 1.5,
          }}
        >
          {pub.authors}
        </Typography>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 1.5 }}>
          <Chip
            label={`${pub.conference} · ${pub.year}`}
            size="small"
            sx={GOLD_CHIP_SX}
          />
          <StatusChip status={pub.status} />
        </Box>

        <Typography
          sx={{
            fontFamily: '"Inter", sans-serif',
            fontSize: '0.8rem',
            color: 'text.secondary',
            lineHeight: 1.6,
            mb: (pub.links && pub.links.length > 0) || pub.projectPage ? 2 : 0,
          }}
        >
          {getAbstractPreview(pub)}
        </Typography>

        <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
          {pub.links && pub.links.length > 0 && (
            <Link
              href={pub.links[0]}
              target="_blank"
              rel="noopener noreferrer"
              underline="none"
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0.5,
                color: EMERALD,
                fontFamily: monoFamily,
                fontSize: '0.78rem',
                letterSpacing: '0.06em',
                transition: 'opacity 0.2s ease',
                '&:hover': { opacity: 0.8 },
              }}
            >
              View Paper
              <ArrowOutwardIcon sx={{ fontSize: 14 }} />
            </Link>
          )}
          {pub.projectPage && (
            <Link
              href={pub.projectPage}
              target="_blank"
              rel="noopener noreferrer"
              underline="none"
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0.5,
                color: GOLD,
                fontFamily: monoFamily,
                fontSize: '0.78rem',
                letterSpacing: '0.06em',
                transition: 'opacity 0.2s ease',
                '&:hover': { opacity: 0.8 },
              }}
            >
              Project Page
              <LanguageIcon sx={{ fontSize: 14 }} />
            </Link>
          )}
        </Stack>
      </Box>
    </Box>
  </ScrollReveal>
);

const TimelineDot = () => (
  <Box
    sx={{
      position: 'absolute',
      left: { xs: 0, md: 7 },
      width: 12,
      height: 12,
      borderRadius: '50%',
      backgroundColor: EMERALD,
      border: '2px solid rgba(6, 6, 8, 1)',
      boxShadow: `0 0 8px ${EMERALD}60`,
      zIndex: 2,
    }}
  />
);

const YearLabel = ({ year }) => (
  <Box sx={{ position: 'relative', mb: 1 }}>
    <TimelineDot />
    <Box sx={{ pl: { xs: 4, md: 6 } }}>
      <Typography
        sx={{
          fontFamily: monoFamily,
          fontSize: '0.85rem',
          color: GOLD,
          letterSpacing: '0.1em',
        }}
      >
        {year}
      </Typography>
    </Box>
  </Box>
);

const TimelineSection = ({ groups, isDashed }) => (
  <Box
    sx={{
      position: 'relative',
      '&::before': {
        content: '""',
        position: 'absolute',
        left: { xs: '5px', md: '12px' },
        top: 0,
        bottom: 0,
        width: 0,
        ...(isDashed
          ? { borderLeft: '2px dashed rgba(16,185,129,0.3)' }
          : {
              width: 2,
              borderLeft: 'none',
              background: `linear-gradient(to bottom, ${EMERALD}80, ${EMERALD}20)`,
            }),
        zIndex: 1,
      },
    }}
  >
    {groups.map((group) => (
      <Box key={group.year} sx={{ mb: 4 }}>
        <YearLabel year={group.year} />
        <Box sx={{ pl: { xs: 4, md: 6 }, display: 'flex', flexDirection: 'column', gap: 2 }}>
          {group.items.map((pub, idx) => (
            <Box key={pub.title} sx={{ position: 'relative' }}>
              <PublicationCard pub={pub} delay={idx * 150} />
            </Box>
          ))}
        </Box>
      </Box>
    ))}
  </Box>
);

const theme = createDarkTheme();

const Publications = () => {
  const publishedGroups = useMemo(() => groupByYear(publicationsData.published), []);
  const ongoingGroups = useMemo(() => groupByYear(publicationsData.ongoing), []);
  const yearStats = useMemo(buildYearStats, []);

  return (
    <ThemeProvider theme={theme}>
      <Box id="publications" sx={{ py: { xs: 6, md: 12 }, position: 'relative', zIndex: 1 }}>
        <Container maxWidth="lg">
          <SectionKicker index={4} label="research output" />
          <TextReveal
            sx={{
              fontFamily: '"DM Serif Display", serif',
              fontSize: { xs: '2rem', md: '2.5rem' },
              textAlign: 'center',
              color: 'text.primary',
              mb: 1,
            }}
            component="h2"
          >
            Publications
          </TextReveal>
          <ScrollLine width={60} sx={{ mb: 4 }} />

          <TimelineMiniViz stats={yearStats} />

          <TimelineSection groups={publishedGroups} isDashed={false} />

          {publicationsData.ongoing.length > 0 && (
            <Box sx={{ mt: 6 }}>
              <ScrollReveal direction="blur-slide">
                <Typography
                  sx={{
                    fontFamily: monoFamily,
                    fontWeight: 500,
                    color: 'text.secondary',
                    mb: 3,
                    fontSize: '0.85rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                  }}
                >
                  {'// in progress'}
                </Typography>
              </ScrollReveal>
              <TimelineSection groups={ongoingGroups} isDashed={true} />
            </Box>
          )}
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Publications;
