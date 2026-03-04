import React from 'react';
import { Box, ThemeProvider } from '@mui/material';
import createDarkTheme from './theme';
import useScrollSpy from './hooks/useScrollSpy';
import useMouseGlow from './hooks/useMouseGlow';
import DotNav from './Components/DotNav';
import Hero from './sections/Hero';
import About from './sections/About';
import Stats from './sections/Stats';
import Projects from './sections/Projects';
import Publications from './sections/Publications';
import Contact from './sections/Contact';

const sections = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'publications', label: 'Publications' },
  { id: 'contact', label: 'Contact' },
];

const sectionIds = sections.map((s) => s.id);

const Portfolio = () => {
  const theme = createDarkTheme();
  const activeSection = useScrollSpy(sectionIds);
  useMouseGlow();

  return (
    <ThemeProvider theme={theme}>
      {/* Mouse glow background effect */}
      <Box
        sx={{
          position: 'fixed',
          inset: 0,
          background: 'radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(16, 185, 129, 0.04), transparent 40%)',
          pointerEvents: 'none',
          zIndex: 0,
          transition: 'background 0.1s ease',
          display: { xs: 'none', md: 'block' },
        }}
      />

      <DotNav sections={sections} activeSection={activeSection} />

      <Box component="main" sx={{ position: 'relative', zIndex: 1 }}>
        <Hero />
        <About />
        <Stats />
        <Projects />
        <Publications />
        <Contact />
      </Box>
    </ThemeProvider>
  );
};

export default Portfolio;
