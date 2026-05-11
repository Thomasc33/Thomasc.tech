import React from 'react';
import { Box, Container, Typography, IconButton, Stack } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { GitHub, LinkedIn, Email, School } from '@mui/icons-material';
import { motion } from 'framer-motion';
import createDarkTheme from '../theme';
import TypingAnimation from '../Components/TypingAnimation';
import MagneticButton from '../Components/MagneticButton';
import ScrollReveal from '../Components/ScrollReveal';
import SkeletonFigure from '../Components/SkeletonFigure';

const theme = createDarkTheme();

const TYPING_WORDS = ['Ethical AI', 'Privacy', 'Machine Learning', 'Fairness'];

const SOCIAL_LINKS = [
  { icon: GitHub, href: 'https://github.com/thomasc33', label: 'GitHub' },
  { icon: LinkedIn, href: 'https://www.linkedin.com/in/thomasc33/', label: 'LinkedIn' },
  { icon: School, href: 'https://scholar.google.com/citations?user=a1uc2zEAAAAJ', label: 'Google Scholar' },
  { icon: Email, href: 'mailto:thomas@thomasc.tech', label: 'Email' },
];

const socialIconSx = {
  color: 'rgba(255,255,255,0.6)',
  border: '1px solid rgba(255,255,255,0.1)',
  transition: 'all 0.3s ease',
  '&:hover': {
    color: '#d4a853',
    borderColor: 'rgba(212,168,83,0.3)',
    boxShadow: '0 0 20px rgba(212,168,83,0.2)',
  },
};

const monoFamily = '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace';

const MotionBox = motion.create(Box);

const nameVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.04, delayChildren: 0.2 },
  },
};

const letterVariants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(12px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const NAME = 'Thomas Carr, Ph.D.';

const ScrollIndicator = () => (
  <MotionBox
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 1.8, duration: 1 }}
    sx={{
      position: 'absolute',
      bottom: { xs: 24, md: 48 },
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 1.2,
      color: 'rgba(255,255,255,0.4)',
    }}
  >
    <Typography
      sx={{
        fontFamily: monoFamily,
        fontSize: '0.7rem',
        letterSpacing: '0.25em',
        textTransform: 'uppercase',
      }}
    >
      Scroll
    </Typography>
    <Box
      sx={{
        width: '1px',
        height: 36,
        background: 'linear-gradient(to bottom, rgba(16,185,129,0.6), rgba(16,185,129,0))',
        animation: 'scrollLineCycle 2.4s ease-in-out infinite',
      }}
    />
  </MotionBox>
);

const Hero = () => (
  <ThemeProvider theme={theme}>
    <Box
      id="hero"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 1,
        overflow: 'hidden',
      }}
    >
      {/* Signature skeleton — sits behind hero text */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 0,
        }}
      >
        <Box
          sx={{
            width: { xs: 240, sm: 320, md: 420 },
            height: { xs: 312, sm: 416, md: 546 },
            position: 'relative',
          }}
        >
          <SkeletonFigure opacity={0.14} size="100%" />
        </Box>
      </Box>

      <Container maxWidth="md" sx={{ textAlign: 'center', px: { xs: 3, md: 2 }, position: 'relative', zIndex: 1 }}>
        {/* Mono kicker */}
        <ScrollReveal direction="blur" delay={0} duration={0.6}>
          <Typography
            component="span"
            sx={{
              fontFamily: monoFamily,
              fontSize: { xs: '0.7rem', md: '0.78rem' },
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: '#10b981',
              opacity: 0.8,
              display: 'inline-block',
              mb: 2,
            }}
          >
            {'// ai researcher · privacy + ml'}
          </Typography>
        </ScrollReveal>

        {/* Name — letter-by-letter blur-in reveal */}
        <Typography
          component={motion.h1}
          variants={nameVariants}
          initial="hidden"
          animate="visible"
          sx={{
            fontFamily: '"DM Serif Display", serif',
            fontSize: { xs: '2.2rem', md: '3.5rem' },
            letterSpacing: '0.06em',
            color: 'text.primary',
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          {NAME.split('').map((char, i) => (
            <motion.span
              key={i}
              variants={letterVariants}
              style={{
                display: 'inline-block',
                willChange: 'opacity, transform, filter',
                whiteSpace: char === ' ' ? 'pre' : 'normal',
              }}
            >
              {char === ' ' ? ' ' : char}
            </motion.span>
          ))}
        </Typography>

        {/* Iridescent gold underline — draws in */}
        <MotionBox
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          sx={{
            width: 96,
            height: 2,
            background: 'linear-gradient(90deg, #d4a853 0%, #e8c075 50%, #d4a853 100%)',
            backgroundSize: '200% auto',
            animation: 'shimmerGold 5s linear infinite',
            mx: 'auto',
            mt: 1.5,
            transformOrigin: 'left',
            borderRadius: 1,
          }}
        />

        {/* Subtitle — blur-slide */}
        <ScrollReveal direction="blur-slide" delay={500} duration={0.8}>
          <Typography
            sx={{
              fontFamily: '"Inter", sans-serif',
              color: 'text.secondary',
              fontSize: { xs: '0.95rem', md: '1.1rem' },
              mt: 2,
            }}
          >
            AI Researcher & Software Engineer
          </Typography>
        </ScrollReveal>

        {/* Typing line — blur in */}
        <ScrollReveal direction="blur" delay={650} duration={0.8}>
          <Box sx={{ color: '#10b981', mt: 3, fontSize: { xs: '0.95rem', md: '1.1rem' } }}>
            <Typography component="span" sx={{ color: 'inherit', fontSize: 'inherit' }}>
              Specializing in{' '}
            </Typography>
            <TypingAnimation words={TYPING_WORDS} />
          </Box>
        </ScrollReveal>

        {/* Social icons — staggered scale-in */}
        <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 4 }}>
          {SOCIAL_LINKS.map((link, index) => (
            <ScrollReveal key={link.label} direction="scale" delay={800 + index * 120}>
              <MagneticButton>
                <IconButton
                  component="a"
                  href={link.href}
                  target={link.href.startsWith('mailto:') ? undefined : '_blank'}
                  rel={link.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                  aria-label={link.label}
                  sx={socialIconSx}
                >
                  <link.icon />
                </IconButton>
              </MagneticButton>
            </ScrollReveal>
          ))}
        </Stack>
      </Container>

      <ScrollIndicator />
    </Box>
  </ThemeProvider>
);

export default Hero;
