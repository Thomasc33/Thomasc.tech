import React, { useState } from 'react';
import {
    Box,
    Container,
    Typography,
    Button,
    Stack,
    Chip,
    ThemeProvider,
    Fade,
    Zoom,
    Avatar
} from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import createHypermodernTheme from '../theme';
import '../css/Home.css';
const isUNCC = require('../isUNCC.json').isUNCC;

// Modern animations
const floatAnimation = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
`;

const pulseGlow = keyframes`
  0%, 100% {
    box-shadow: 0 0 20px rgba(170, 0, 255, 0.5);
  }
  50% {
    box-shadow: 0 0 40px rgba(170, 0, 255, 0.8);
  }
`;

// Styled components
const HeroContainer = styled(Box)(({ accentcolor }) => ({
  minHeight: 'calc(100vh - 80px)',
  display: 'flex',
  alignItems: 'center',
  background: `linear-gradient(135deg, rgba(10, 10, 15, 0.95), rgba(20, 20, 30, 0.9))`,
  position: 'relative',
  paddingTop: '80px',
  zIndex: 0,
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: `radial-gradient(circle at 30% 40%, ${accentcolor}25 0%, transparent 50%), radial-gradient(circle at 70% 80%, ${accentcolor}20 0%, transparent 50%)`,
    zIndex: -1,
  },
}));

const ModernButton = styled(Button)(({ accentcolor }) => ({
  borderRadius: '16px',
  textTransform: 'none',
  fontWeight: 600,
  fontSize: '1.1rem',
  padding: '16px 32px',
  background: `linear-gradient(135deg, ${accentcolor}, ${accentcolor}cc, #ffffff20)`,
  backgroundSize: '200% 200%',
  animation: `${floatAnimation} 6s ease-in-out infinite`,
  boxShadow: `0 8px 25px ${accentcolor}40, inset 0 1px 0 rgba(255,255,255,0.2)`,
  border: `1px solid ${accentcolor}60`,
  color: 'white',
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)`,
    transition: 'left 0.5s',
  },
  '&:hover': {
    transform: 'translateY(-6px) scale(1.05)',
    boxShadow: `0 20px 40px ${accentcolor}60, inset 0 1px 0 rgba(255,255,255,0.3)`,
    background: `linear-gradient(135deg, ${accentcolor}dd, ${accentcolor}, #ffffff30)`,
    backgroundPosition: '100% 0',
    '&::before': {
      left: '100%',
    },
  },
}));

const ProfileImage = styled(Avatar)(({ accentcolor }) => ({
  width: '300px',
  height: '300px',
  border: `4px solid ${accentcolor}60`,
  boxShadow: `0 20px 40px rgba(0, 0, 0, 0.3), 0 0 60px ${accentcolor}40`,
  animation: `${floatAnimation} 6s ease-in-out infinite`,
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: `0 25px 50px rgba(0, 0, 0, 0.4), 0 0 80px ${accentcolor}60`,
  },
}));

function HomePage(props) {
    // Get the accent color from localStorage or use the default color
    const accentColor = localStorage.getItem('accentColor') || '#aa00ff';
    const theme = createHypermodernTheme(accentColor);

    return (
        <ThemeProvider theme={theme}>
            <HeroContainer accentcolor={accentColor}>
                <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 10 }}>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            minHeight: 'calc(100vh - 160px)',
                            flexDirection: { xs: 'column', lg: 'row' },
                            gap: { xs: 3, lg: 6 },
                            py: { xs: 4, lg: 2 }
                        }}
                    >
                        {/* Content Section */}
                        <Box sx={{ flex: 1, textAlign: { xs: 'center', lg: 'left' } }}>
                            <Fade in={true} timeout={1000}>
                                <Typography
                                    variant="h1"
                                    sx={{
                                        mb: 2,
                                        background: `linear-gradient(135deg, ${accentColor}, #ffffff)`,
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        backgroundClip: 'text',
                                        fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4rem' },
                                        fontWeight: 800,
                                        letterSpacing: '-0.02em',
                                        lineHeight: 1.1,
                                    }}
                                >
                                    Thomas Carr
                                </Typography>
                            </Fade>

                            <Fade in={true} timeout={1500}>
                                <Typography
                                    variant="h3"
                                    sx={{
                                        mb: 3,
                                        color: 'white',
                                        fontWeight: 600,
                                        fontSize: { xs: '1.5rem', md: '2rem' },
                                        lineHeight: 1.3,
                                    }}
                                >
                                    Computer Science Ph.D. Researcher
                                </Typography>
                            </Fade>

                            <Fade in={true} timeout={2000}>
                                <Typography
                                    variant="h5"
                                    sx={{
                                        mb: 4,
                                        color: accentColor,
                                        fontWeight: 500,
                                        fontSize: { xs: '1.2rem', md: '1.5rem' },
                                    }}
                                >
                                    Specializing in Ethical Machine Learning, Privacy, and Fairness
                                </Typography>
                            </Fade>

                            <Fade in={true} timeout={2500}>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        mb: 4,
                                        color: 'rgba(255, 255, 255, 0.9)',
                                        fontSize: '1.1rem',
                                        lineHeight: 1.7,
                                        maxWidth: '600px',
                                        mx: { xs: 'auto', lg: 0 }
                                    }}
                                >
                                    With a strong foundation in full-stack development and academic expertise in privacy-preserving systems,
                                    I bring a balanced approach to AI research and software engineering at the University of North Carolina at Charlotte.
                                    Passionate about solving real-world problems with ethical and privacy-conscious solutions.
                                </Typography>
                            </Fade>

                            {/* Keywords */}
                            <Fade in={true} timeout={3000}>
                                <Stack
                                    direction="row"
                                    spacing={1}
                                    sx={{
                                        mb: 5,
                                        flexWrap: 'wrap',
                                        gap: 1,
                                        justifyContent: { xs: 'center', lg: 'flex-start' }
                                    }}
                                >
                                    {['AI Ethics', 'Privacy Research', 'Machine Learning', 'Data Privacy', 'Computer Science'].map((keyword, index) => (
                                        <Zoom in={true} style={{ transitionDelay: `${3000 + index * 200}ms` }} key={keyword}>
                                            <Chip
                                                label={keyword}
                                                sx={{
                                                    background: `linear-gradient(135deg, ${accentColor}30, ${accentColor}20)`,
                                                    color: 'white',
                                                    fontWeight: 600,
                                                    border: `1px solid ${accentColor}40`,
                                                    fontSize: '0.9rem',
                                                    '&:hover': {
                                                        background: `linear-gradient(135deg, ${accentColor}50, ${accentColor}30)`,
                                                        transform: 'translateY(-2px)',
                                                    },
                                                }}
                                            />
                                        </Zoom>
                                    ))}
                                </Stack>
                            </Fade>

                            {/* Action Buttons */}
                            <Fade in={true} timeout={3500}>
                                <Stack
                                    direction={{ xs: 'column', sm: 'row' }}
                                    spacing={2}
                                    sx={{ justifyContent: { xs: 'center', lg: 'flex-start' } }}
                                >
                                    <ModernButton
                                        component={Link}
                                        to={`${isUNCC ? '/tcarr23' : ''}/projects`}
                                        onClick={() => props.setPage(1)}
                                        accentcolor={accentColor}
                                    >
                                        Explore Projects
                                    </ModernButton>
                                    <ModernButton
                                        component={Link}
                                        to={`${isUNCC ? '/tcarr23' : ''}/publications`}
                                        onClick={() => props.setPage(3)}
                                        accentcolor={accentColor}
                                    >
                                        View Publications
                                    </ModernButton>
                                    <ModernButton
                                        component={Link}
                                        to={`${isUNCC ? '/tcarr23' : ''}/about`}
                                        onClick={() => props.setPage(2)}
                                        accentcolor={accentColor}
                                    >
                                        View Resume
                                    </ModernButton>
                                </Stack>
                            </Fade>
                        </Box>

                        {/* Profile Photo */}
                        <Box sx={{ flex: { xs: 'none', lg: 1 }, display: 'flex', justifyContent: 'center' }}>
                            <Zoom in={true} timeout={4000}>
                                <ProfileImage
                                    src={require('../Data/thomas.jpg')}
                                    alt="Thomas Carr"
                                    accentcolor={accentColor}
                                />
                            </Zoom>
                        </Box>
                    </Box>
                </Container>
            </HeroContainer>
        </ThemeProvider>
    );
}

export default HomePage;
