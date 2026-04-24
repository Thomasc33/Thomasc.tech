import React from 'react';
import { Box, Container, Grid } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import createDarkTheme from '../theme';
import ScrollReveal from '../Components/ScrollReveal';
import TextReveal from '../Components/TextReveal';
import ScrollLine from '../Components/ScrollLine';
import ParallaxSection from '../Components/ParallaxSection';
import TimelineDrawing from '../Components/TimelineDrawing';
import SkillTicker from '../Components/SkillTicker';
import experienceData from '../Data/experience.json';
import skillsData from '../Data/skills.json';

const EDUCATION_ITEMS = [
  {
    year: '2023 \u2013 Spring 2026',
    title: 'Ph.D. Computing and Information Systems',
    subtitle: 'UNC Charlotte',
    details:
      'Dissertation: Preserving User Privacy on Skeleton-Based Motion Data',
  },
  {
    year: '2022',
    title: 'M.S. Computer Science',
    subtitle: 'UNC Charlotte',
  },
  {
    year: '2019 \u2013 2021',
    title: 'B.S. Computer Science',
    subtitle: 'UNC Charlotte',
  },
];

const TARGET_EXPERIENCE_TITLES = [
  'AI & Software Engineer',
  'Founding AI & Software Engineer',
  'Graduate Research Assistant',
  'Full-Stack Developer / Systems Engineer',
];

const experienceItems = experienceData
  .filter((item) => TARGET_EXPERIENCE_TITLES.includes(item.title))
  .slice(0, 4)
  .map((item) => ({
    year: item.timeframe,
    title: item.title,
    subtitle: item.organization,
    details: item.responsibilities[0],
  }));

const tickerRow1Skills = [
  ...skillsData.machineLearning.map((s) => s.label),
  ...skillsData.languages.map((s) => s.label),
];

const tickerRow2Skills = [
  ...skillsData.frameworks.map((s) => s.label),
  ...skillsData.webServices.map((s) => s.label),
];

const theme = createDarkTheme();

const sectionHeaderSx = {
  fontFamily: '"DM Serif Display", serif',
  fontSize: { xs: '2rem', md: '2.5rem' },
  textAlign: 'center',
  color: 'text.primary',
  mb: 1,
};

const columnHeadingSx = {
  fontFamily: '"Inter", sans-serif',
  fontWeight: 600,
  color: 'text.secondary',
  mb: 3,
  fontSize: '1.1rem',
};

const About = () => (
  <ThemeProvider theme={theme}>
    <Box id="about" sx={{ py: { xs: 6, md: 12 }, position: 'relative', zIndex: 1 }}>
      <Container maxWidth="lg">
        {/* Section Header — word-by-word reveal */}
        <TextReveal sx={sectionHeaderSx} component="h2">
          About
        </TextReveal>
        <ScrollLine width={60} sx={{ mb: 6 }} />

        {/* Education + Experience — staggered columns */}
        <Grid container spacing={{ xs: 4, md: 6 }}>
          {/* Left Column - Education */}
          <Grid size={{ xs: 12, md: 6 }}>
            <ScrollReveal direction="blur-slide">
              <Box component="h3" sx={columnHeadingSx}>
                Education
              </Box>
            </ScrollReveal>
            <TimelineDrawing items={EDUCATION_ITEMS} side="left" />
          </Grid>

          {/* Right Column - Experience */}
          <Grid size={{ xs: 12, md: 6 }}>
            <ScrollReveal direction="blur-slide" delay={200}>
              <Box component="h3" sx={columnHeadingSx}>
                Experience
              </Box>
            </ScrollReveal>
            <TimelineDrawing items={experienceItems} side="right" />
          </Grid>
        </Grid>

        {/* Skills Ticker — with parallax float */}
        <ParallaxSection speed={0.08} sx={{ mt: 8 }}>
          <ScrollReveal direction="blur" duration={1}>
            <SkillTicker skills={tickerRow1Skills} direction="left" />
            <Box sx={{ mt: 1.5 }}>
              <SkillTicker skills={tickerRow2Skills} direction="right" />
            </Box>
          </ScrollReveal>
        </ParallaxSection>
      </Container>
    </Box>
  </ThemeProvider>
);

export default About;
