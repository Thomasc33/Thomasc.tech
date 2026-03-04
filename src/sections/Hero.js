import React from 'react';
import { Box, Container, Typography, IconButton, Stack } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { GitHub, LinkedIn, Email, KeyboardArrowDown } from '@mui/icons-material';
import { motion } from 'framer-motion';
import createDarkTheme from '../theme';
import TypingAnimation from '../Components/TypingAnimation';
import MagneticButton from '../Components/MagneticButton';
import ScrollReveal from '../Components/ScrollReveal';

const theme = createDarkTheme();

const TYPING_WORDS = ['Ethical AI', 'Privacy', 'Machine Learning', 'Fairness'];

const SOCIAL_LINKS = [
  { icon: GitHub, href: 'https://github.com/thomasc33', label: 'GitHub' },
  { icon: LinkedIn, href: 'https://www.linkedin.com/in/thomasc33/', label: 'LinkedIn' },
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

const NAME = 'Thomas Carr';

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
      }}
    >
      <Container maxWidth="md" sx={{ textAlign: 'center', px: { xs: 3, md: 2 } }}>
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
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </Typography>

        {/* Emerald underline — draws in */}
        <MotionBox
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          sx={{
            width: 80,
            height: 2,
            background: '#10b981',
            mx: 'auto',
            mt: 1,
            transformOrigin: 'left',
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
            Computer Science Ph.D. Researcher
          </Typography>
        </ScrollReveal>

        {/* Typing line — blur in */}
        <ScrollReveal direction="blur" delay={700} duration={0.8}>
          <Box sx={{ color: '#10b981', mt: 2, fontSize: { xs: '0.95rem', md: '1.1rem' } }}>
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

      {/* Scroll indicator — bouncing + fade in */}
      <MotionBox
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        sx={{
          position: 'absolute',
          bottom: { xs: 20, md: 40 },
          left: '50%',
          transform: 'translateX(-50%)',
          color: 'rgba(255,255,255,0.3)',
          animation: 'bounceDown 2s ease-in-out infinite',
        }}
      >
        <KeyboardArrowDown fontSize="large" />
      </MotionBox>
    </Box>
  </ThemeProvider>
);

export default Hero;
