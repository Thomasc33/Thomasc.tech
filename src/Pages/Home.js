import React, { useState, useEffect } from 'react';
import {
    Box,
    Container,
    Typography,
    Avatar,
    Button,
    Stack,
    Grid,
    ThemeProvider,
    Card,
    CardContent,
    Fade,
} from '@mui/material';
import {
    Email,
    GitHub,
    LinkedIn,
    School,
    Code,
    Psychology,
    Biotech,
    Terminal,
    Science,
    AutoAwesome,
    RocketLaunch,
} from '@mui/icons-material';
import TypingAnimation from '../Components/TypingAnimation';
import ParticleBackground from '../Components/ParticleBackground';
import FloatingText, { StaggeredFloatingText, HoverFloatText } from '../Components/FloatingText';
import createDarkTheme from '../theme';
import skillsData from '../Data/skills.json';

const floatingIcons = [
    { icon: <Terminal />, sx: { top: '10%', left: '5%', animationDelay: '0s' } },
    { icon: <Science />, sx: { top: '20%', right: '10%', animationDelay: '2s' } },
    { icon: <AutoAwesome />, sx: { bottom: '30%', left: '8%', animationDelay: '4s' } },
    { icon: <RocketLaunch />, sx: { bottom: '15%', right: '5%', animationDelay: '6s' } },
];

const socialLinks = [
    {
        icon: <GitHub />,
        href: 'https://github.com/thomasc33',
        label: 'GitHub',
    },
    {
        icon: <LinkedIn />,
        href: 'https://www.linkedin.com/in/thomasc33/',
        label: 'LinkedIn',
    },
    {
        icon: <Email />,
        href: 'mailto:thomas@thomasc.tech',
        label: 'Email',
    },
];

function HomePage() {
    const accentColor = localStorage.getItem('accentColor') || '#8b5cf6';
    const theme = createDarkTheme(accentColor);
    const [loaded, setLoaded] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [skills, setSkills] = useState([]);

    useEffect(() => {
        // Transform skills data for display
        const transformedSkills = [
            {
                icon: <Psychology />,
                title: 'Machine Learning',
                description: skillsData.machineLearning.slice(0, 4).map(s => s.label).join(', '),
                color: '#8b5cf6',
            },
            {
                icon: <Code />,
                title: 'Programming',
                description: skillsData.languages.slice(0, 5).map(s => s.label).join(', '),
                color: '#ec4899',
            },
            {
                icon: <Biotech />,
                title: 'Frameworks',
                description: skillsData.frameworks.slice(0, 4).map(s => s.label).join(', '),
                color: '#f59e0b',
            },
            {
                icon: <School />,
                title: 'Cloud & Services',
                description: skillsData.webServices.slice(0, 4).map(s => s.label).join(', '),
                color: '#10b981',
            },
        ];
        setSkills(transformedSkills);
        setLoaded(true);
        
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', position: 'relative', overflow: 'hidden' }}>
                {/* Particle Background */}
                <ParticleBackground />
                
                {/* Animated background gradient */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: `
                            radial-gradient(circle at ${20 + mousePosition.x * 0.02}% ${30 + mousePosition.y * 0.02}%, ${accentColor}08 0%, transparent 50%),
                            radial-gradient(circle at ${80 - mousePosition.x * 0.02}% ${70 - mousePosition.y * 0.02}%, ${theme.palette.secondary.main}08 0%, transparent 50%),
                            radial-gradient(circle at 50% 10%, ${theme.palette.tertiary.main}08 0%, transparent 50%)
                        `,
                        animation: 'float 20s ease-in-out infinite',
                        zIndex: 0,
                        transition: 'background 0.3s ease-out',
                    }}
                />
                
                {/* Floating icons animation */}
                {floatingIcons.map((item, index) => (
                    <Box
                        key={index}
                        sx={{
                            position: 'absolute',
                            ...item.sx,
                            fontSize: 30,
                            color: `${accentColor}20`,
                            animation: 'floatIcon 15s ease-in-out infinite',
                            animationDelay: item.sx.animationDelay,
                            zIndex: 0,
                        }}
                    >
                        {item.icon}
                    </Box>
                ))}
                
                {/* Hero Section */}
                <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
                    <Box sx={{ py: 8, textAlign: 'center' }}>
                        <Box sx={{ mb: 4, position: 'relative' }}>
                            {/* Glowing orb effect behind avatar */}
                            <Box
                                sx={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    width: 200,
                                    height: 200,
                                    background: `radial-gradient(circle, ${accentColor}20 0%, transparent 70%)`,
                                    filter: 'blur(40px)',
                                    animation: 'pulse 4s ease-in-out infinite',
                                    zIndex: -1,
                                }}
                            />
                            <Avatar
                                src="/profile.jpg"
                                sx={{
                                    width: 150,
                                    height: 150,
                                    mx: 'auto',
                                    mb: 3,
                                    border: `3px solid ${accentColor}`,
                                    boxShadow: `0 0 30px ${accentColor}40`,
                                    opacity: loaded ? 1 : 0,
                                    transform: loaded ? 'scale(1)' : 'scale(0.9)',
                                    transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                                    '&:hover': {
                                        transform: 'scale(1.05)',
                                        boxShadow: `0 0 40px ${accentColor}60`,
                                    },
                                }}
                            />
                            <FloatingText
                                variant="h1"
                                component="h1"
                                gutterBottom
                                animation="text"
                                sx={{
                                    background: `linear-gradient(135deg, ${accentColor}, ${theme.palette.secondary.main})`,
                                    backgroundSize: '200% 200%',
                                    animation: 'gradient 4s ease infinite, floatText 6s ease-in-out infinite',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                    fontWeight: 800,
                                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                                    opacity: loaded ? 1 : 0,
                                    transform: loaded ? 'translateY(0)' : 'translateY(20px)',
                                    transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                                    textShadow: `0 0 30px ${accentColor}30`,
                                }}
                            >
                                Thomas Carr
                            </FloatingText>
                            <Typography
                                variant="h4"
                                sx={{
                                    color: 'text.secondary',
                                    mb: 2,
                                    fontSize: { xs: '1.25rem', md: '1.5rem' },
                                    opacity: loaded ? 1 : 0,
                                    transform: loaded ? 'translateY(0)' : 'translateY(20px)',
                                    transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.2s',
                                }}
                            >
                                <TypingAnimation
                                    words={['Computer Science Ph.D.', 'AI Ethics Researcher', 'Privacy-Preserving ML Expert']}
                                    speed={50}
                                    deleteSpeed={25}
                                    pauseDuration={1000}
                                />
                            </Typography>
                            <FloatingText
                                variant="body1"
                                color="text.secondary"
                                animation="gentle"
                                delay={2}
                                sx={{
                                    maxWidth: 600,
                                    mx: 'auto',
                                    fontSize: { xs: '0.95rem', md: '1rem' },
                                    lineHeight: 1.7,
                                    opacity: loaded ? 1 : 0,
                                    transform: loaded ? 'translateY(0)' : 'translateY(20px)',
                                    transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.3s',
                                }}
                            >
                                <StaggeredFloatingText
                                    text="Passionate about creating ethical AI systems that respect user privacy while delivering powerful insights."
                                    variant="inherit"
                                    animation="gentle"
                                    staggerType="word"
                                />
                                <br />
                                <StaggeredFloatingText
                                    text="Specializing in federated learning and differential privacy to enable secure machine learning solutions."
                                    variant="inherit"
                                    animation="gentle"
                                    staggerType="word"
                                />
                            </FloatingText>
                            
                            {/* Social Links */}
                            <Stack
                                direction="row"
                                spacing={2}
                                justifyContent="center"
                                sx={{
                                    opacity: loaded ? 1 : 0,
                                    transform: loaded ? 'translateY(0)' : 'translateY(20px)',
                                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1) 0.5s',
                                }}
                            >
                            {socialLinks.map((link, index) => (
                                <Button
                                    key={index}
                                    component="a"
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    startIcon={link.icon}
                                    sx={{
                                        color: 'text.secondary',
                                        borderColor: `${accentColor}30`,
                                        background: `${accentColor}05`,
                                        '&:hover': {
                                            color: accentColor,
                                            background: `${accentColor}10`,
                                            borderColor: `${accentColor}50`,
                                            transform: 'translateY(-2px)',
                                        },
                                        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                                    }}
                                >
                                    {link.label}
                                </Button>
                            ))}
                        </Stack>
                        </Box>
                    </Box>

                    {/* Skills Section */}
                    <Box sx={{ py: 8 }}>
                        <FloatingText
                            variant="h3"
                            gutterBottom
                            textAlign="center"
                            animation="wave"
                            sx={{
                                background: `linear-gradient(135deg, ${accentColor}, ${theme.palette.secondary.main})`,
                                backgroundSize: '200% 200%',
                                animation: 'gradient 3s ease infinite, floatWave 5s ease-in-out infinite',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                                fontWeight: 700,
                                mb: 6,
                                opacity: loaded ? 1 : 0,
                                transform: loaded ? 'translateY(0)' : 'translateY(20px)',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1) 0.6s',
                            }}
                        >
                            Expertise Areas
                        </FloatingText>
                        <Grid container spacing={3} justifyContent="center">
                            {skills.map((skill, index) => (
                                <Grid item xs={12} sm={6} md={3} key={skill.title}>
                                    <Fade in={loaded} timeout={1000} style={{ transitionDelay: `${700 + index * 100}ms` }}>
                                        <Card
                                            sx={{
                                                minWidth: 280,
                                                maxWidth: 320,
                                                height: 220,
                                                background: 'linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                                                backdropFilter: 'blur(20px)',
                                                border: '1px solid rgba(255,255,255,0.1)',
                                                borderRadius: 3,
                                                textAlign: 'center',
                                                cursor: 'pointer',
                                                position: 'relative',
                                                overflow: 'hidden',
                                                '&::before': {
                                                    content: '""',
                                                    position: 'absolute',
                                                    top: -50,
                                                    left: -50,
                                                    width: 200,
                                                    height: 200,
                                                    background: `radial-gradient(circle, ${skill.color}20 0%, transparent 70%)`,
                                                    animation: 'pulse 3s ease-in-out infinite',
                                                },
                                                '&:hover': {
                                                    background: 'linear-gradient(145deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.04) 100%)',
                                                    transform: 'translateY(-8px) scale(1.02)',
                                                    boxShadow: `0 20px 40px rgba(0, 0, 0, 0.4), 0 0 30px ${skill.color}30`,
                                                    '& .skill-icon': {
                                                        transform: 'scale(1.1) rotate(5deg)',
                                                    },
                                                    '& .skill-title': {
                                                        background: `linear-gradient(135deg, ${skill.color}, ${skill.color}DD)`,
                                                        WebkitBackgroundClip: 'text',
                                                        WebkitTextFillColor: 'transparent',
                                                    },
                                                },
                                                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                            }}
                                        >
                                            <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
                                                <Box
                                                    className="skill-icon"
                                                    sx={{
                                                        fontSize: 50,
                                                        color: skill.color,
                                                        mb: 2,
                                                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                                        filter: `drop-shadow(0 0 10px ${skill.color}40)`,
                                                    }}
                                                >
                                                    {skill.icon}
                                                </Box>
                                                <HoverFloatText 
                                                    className="skill-title" 
                                                    variant="h6" 
                                                    gutterBottom 
                                                    sx={{ 
                                                        fontWeight: 600, 
                                                        transition: 'all 0.4s ease',
                                                        cursor: 'pointer'
                                                    }}
                                                >
                                                    {skill.title}
                                                </HoverFloatText>
                                                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem', lineHeight: 1.4 }}>
                                                    {skill.description}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Fade>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>

                    {/* Call to Action */}
                    <Box sx={{ py: 8, textAlign: 'center' }}>
                        <Box
                            sx={{
                                p: 4,
                                background: `linear-gradient(135deg, ${accentColor}10, ${theme.palette.secondary.main}10)`,
                                backdropFilter: 'blur(20px)',
                                border: `1px solid ${accentColor}20`,
                                borderRadius: 3,
                                opacity: loaded ? 1 : 0,
                                transform: loaded ? 'translateY(0)' : 'translateY(20px)',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1) 1.1s',
                            }}
                        >
                            <FloatingText
                                variant="h4"
                                gutterBottom
                                animation="drift"
                                delay={1}
                                sx={{
                                    background: `linear-gradient(135deg, ${accentColor}, ${theme.palette.secondary.main})`,
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                    fontWeight: 700,
                                    mb: 2,
                                }}
                            >
                                Interested in Collaboration?
                            </FloatingText>
                            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                                I'm always open to discussing research opportunities and collaborations.
                            </Typography>
                            <Button
                                variant="contained"
                                size="large"
                                component="a"
                                href="/contact"
                                sx={{
                                    background: `linear-gradient(135deg, ${accentColor}, ${theme.palette.secondary.main})`,
                                    '&:hover': {
                                        background: `linear-gradient(135deg, ${accentColor}DD, ${theme.palette.secondary.main})`,
                                        transform: 'translateY(-2px)',
                                        boxShadow: `0 8px 24px ${accentColor}60`,
                                    },
                                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                                }}
                            >
                                Get in Touch <Email sx={{ ml: 1 }} />
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </Box>
        </ThemeProvider>
    );
}

export default HomePage;
