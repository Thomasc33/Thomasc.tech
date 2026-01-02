import React, { useState, useEffect, useRef } from 'react';
import {
    Box,
    Container,
    Typography,
    Card,
    CardContent,
    Avatar,
    ThemeProvider,
    Grid,
    Fab,
    Tooltip,
    Grow,
    Fade,
    Zoom,
} from '@mui/material';
import {
    School,
    Work,
    Psychology,
    Code,
    Public,
    GitHub,
    LinkedIn,
    Email,
    Star,
} from '@mui/icons-material';
import createDarkTheme from '../theme';
import experienceData from '../Data/experience.json';
import skillsData from '../Data/skills.json';

function AboutPage() {
    const accentColor = localStorage.getItem('accentColor') || '#8b5cf6';
    const theme = createDarkTheme(accentColor);
    const [loaded, setLoaded] = useState(false);
    const [experience, setExperience] = useState([]);
    const [skills, setSkills] = useState([]);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const containerRef = useRef(null);
    const [education] = useState([
        {
            degree: 'Ph.D. in Computer Science',
            school: 'University of North Carolina at Charlotte',
            period: '2023 - 2026',
            description: 'Focus on AI ethics and privacy-preserving machine learning',
        },
        {
            degree: 'M.S. in Computer Science',
            school: 'University of North Carolina at Charlotte',
            period: '2022 - 2022',
            description: 'Specialization in machine learning and data mining',
        },
        {
            degree: 'B.S. in Computer Science',
            school: 'University of North Carolina at Charlotte',
            period: '2019 - 2021',
            description: 'Summa Cum Laude, Minor in Mathematics',
        },
    ]);
    const [interests] = useState([
        'AI Ethics',
        'Privacy-Preserving ML',
        'Federated Learning',
        'Differential Privacy',
        'Human-Centered Design',
        'Responsible AI',
    ]);

    useEffect(() => {
        setExperience(experienceData);
        
        // Transform skills data for display - show more skills
        const transformedSkills = [
            {
                title: 'Machine Learning',
                icon: <Psychology />,
                description: skillsData.machineLearning.slice(0, 6).map(s => s.label).join(', '),
            },
            {
                title: 'Programming Languages',
                icon: <Code />,
                description: skillsData.languages.slice(0, 6).map(s => s.label).join(', '),
            },
            {
                title: 'Frameworks & Tools',
                icon: <Code />,
                description: skillsData.frameworks.slice(0, 5).map(s => s.label).join(', '),
            },
            {
                title: 'Cloud & Services',
                icon: <Code />,
                description: skillsData.webServices.slice(0, 5).map(s => s.label).join(', '),
            },
            {
                title: 'Research Skills',
                icon: <Psychology />,
                description: 'Statistical Analysis, Experimental Design, Technical Writing',
            },
            {
                title: 'Languages',
                icon: <Public />,
                description: 'English (Native), Spanish (Basic)',
            },
        ];
        setSkills(transformedSkills);
        setTimeout(() => setLoaded(true), 50);
    }, []);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                setMousePosition({
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top,
                });
            }
        };

        const container = containerRef.current;
        if (container) {
            container.addEventListener('mousemove', handleMouseMove);
        }

        return () => {
            if (container) {
                container.removeEventListener('mousemove', handleMouseMove);
            }
        };
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', py: 8, position: 'relative', overflow: 'hidden' }} ref={containerRef}>
                {/* Animated background gradient with mouse follow */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: `
                            radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, ${accentColor}15 0%, transparent 50%),
                            radial-gradient(circle at 25% 20%, ${accentColor}08 0%, transparent 50%),
                            radial-gradient(circle at 75% 80%, ${theme.palette.secondary.main}08 0%, transparent 50%),
                            radial-gradient(circle at 50% 50%, ${theme.palette.tertiary.main}08 0%, transparent 50%)
                        `,
                        animation: 'float 30s ease-in-out infinite',
                        zIndex: 0,
                    }}
                />
                
                {/* Floating particles */}
                <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0 }}>
                    {[...Array(25)].map((_, i) => (
                        <Box
                            key={i}
                            sx={{
                                position: 'absolute',
                                width: Math.random() * 4 + 1,
                                height: Math.random() * 4 + 1,
                                background: `linear-gradient(45deg, ${accentColor}, ${theme.palette.secondary.main}, ${theme.palette.tertiary.main})`,
                                borderRadius: '50%',
                                opacity: Math.random() * 0.25 + 0.05,
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animation: `float ${Math.random() * 30 + 20}s ease-in-out infinite`,
                                animationDelay: `${Math.random() * 10}s`,
                            }}
                        />
                    ))}
                </Box>
                
                <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
                    {/* Header with animated gradient */}
                    <Box sx={{ textAlign: 'center', mb: 8 }}>
                        <Grow in={loaded} timeout={300}>
                            <Typography 
                                variant="h1" 
                                component="h1"
                                sx={{
                                    background: `linear-gradient(135deg, ${accentColor}, ${theme.palette.secondary.main}, ${theme.palette.tertiary.main})`,
                                    backgroundSize: '200% 200%',
                                    animation: 'gradient 3s ease infinite',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                    fontWeight: 800,
                                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                                    textShadow: `0 0 40px ${accentColor}40`,
                                    mb: 2,
                                }}
                            >
                                About Me
                            </Typography>
                        </Grow>
                        <Fade in={loaded} timeout={400}>
                            <Typography 
                                variant="body1" 
                                color="text.secondary" 
                                sx={{ 
                                    maxWidth: 800, 
                                    mx: 'auto',
                                    fontSize: '1.1rem',
                                    lineHeight: 1.7,
                                }}
                            >
                                Passionate about creating ethical AI systems that respect user privacy while delivering powerful insights.
                            </Typography>
                        </Fade>
                        
                        {/* Animated social links */}
                        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 2 }}>
                            <Zoom in={loaded} timeout={500}>
                                <Tooltip title="View my GitHub" arrow>
                                    <Fab
                                        component="a"
                                        href="https://github.com/Thomasc33"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        sx={{
                                            background: 'linear-gradient(135deg, #24292e, #404448)',
                                            color: 'white',
                                            '&:hover': {
                                                background: 'linear-gradient(135deg, #404448, #24292e)',
                                                transform: 'scale(1.1) rotate(5deg)',
                                            },
                                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                        }}
                                    >
                                        <GitHub />
                                    </Fab>
                                </Tooltip>
                            </Zoom>
                            <Zoom in={loaded} timeout={600}>
                                <Tooltip title="Connect on LinkedIn" arrow>
                                    <Fab
                                        component="a"
                                        href="https://linkedin.com/in/thomas-carr-"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        sx={{
                                            background: 'linear-gradient(135deg, #0077b5, #00a0dc)',
                                            color: 'white',
                                            '&:hover': {
                                                background: 'linear-gradient(135deg, #00a0dc, #0077b5)',
                                                transform: 'scale(1.1) rotate(-5deg)',
                                            },
                                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                        }}
                                    >
                                        <LinkedIn />
                                    </Fab>
                                </Tooltip>
                            </Zoom>
                            <Zoom in={loaded} timeout={700}>
                                <Tooltip title="Send me an email" arrow>
                                    <Fab
                                        component="a"
                                        href="mailto:tcarr73@uncc.edu"
                                        sx={{
                                            background: `linear-gradient(135deg, ${accentColor}, ${theme.palette.secondary.main})`,
                                            color: 'white',
                                            '&:hover': {
                                                background: `linear-gradient(135deg, ${theme.palette.secondary.main}, ${accentColor})`,
                                                transform: 'scale(1.1) rotate(5deg)',
                                            },
                                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                        }}
                                    >
                                        <Email />
                                    </Fab>
                                </Tooltip>
                            </Zoom>
                        </Box>
                    </Box>

                    {/* Bio Card with enhanced animations */}
                    <Box sx={{ mb: 8 }}>
                        <Grow in={loaded} timeout={800}>
                            <Card
                                sx={{
                                    background: 'linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                                    backdropFilter: 'blur(20px)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    p: 4,
                                    mb: 4,
                                    position: 'relative',
                                    overflow: 'hidden',
                                    '&::before': {
                                        content: '""',
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        height: '2px',
                                        background: `linear-gradient(90deg, ${accentColor}, ${theme.palette.secondary.main}, ${theme.palette.tertiary.main})`,
                                    },
                                }}
                            >
                            <Grid container spacing={4} alignItems="center">
                                <Grid item xs={12} md={3}>
                                    <Zoom in={loaded} timeout={900}>
                                        <Avatar
                                            src="/profile.jpg"
                                            sx={{
                                                width: 200,
                                                height: 200,
                                                mx: 'auto',
                                                border: `3px solid ${accentColor}`,
                                                boxShadow: `0 0 30px ${accentColor}40`,
                                                transition: 'all 0.3s ease',
                                                '&:hover': {
                                                    transform: 'scale(1.05) rotate(5deg)',
                                                    boxShadow: `0 0 40px ${accentColor}60`,
                                                },
                                            }}
                                        />
                                    </Zoom>
                                </Grid>
                                <Grid item xs={12} md={9}>
                                    <Fade in={loaded} timeout={1000}>
                                        <Box>
                                            <Typography 
                                                variant="h4" 
                                                gutterBottom
                                                sx={{
                                                    background: `linear-gradient(135deg, ${accentColor}, ${theme.palette.secondary.main})`,
                                                    backgroundSize: '200% 200%',
                                                    animation: 'gradient 3s ease infinite',
                                                    WebkitBackgroundClip: 'text',
                                                    WebkitTextFillColor: 'transparent',
                                                    backgroundClip: 'text',
                                                    fontWeight: 700,
                                                }}
                                            >
                                                Thomas Carr
                                            </Typography>
                                            <Typography variant="h6" color="text.secondary" gutterBottom>
                                                Computer Science Ph.D. Student | AI Ethics Researcher
                                            </Typography>
                                            <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
                                                I'm a passionate researcher and developer focused on creating ethical AI systems 
                                                that respect user privacy while delivering powerful insights. My work spans the 
                                                intersection of machine learning, privacy-preserving technologies, and human-centered design.
                                            </Typography>
                                            <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                                                Currently pursuing my Ph.D. at UNC Charlotte, I'm exploring novel approaches to 
                                                federated learning and differential privacy that enable collaborative AI without 
                                                compromising individual data rights.
                                            </Typography>
                                        </Box>
                                    </Fade>
                                </Grid>
                            </Grid>
                            </Card>
                        </Grow>
                    </Box>

                    {/* Education & Experience */}
                    <Box sx={{ 
                        display: 'grid',
                        gridTemplateColumns: {
                            xs: '1fr',
                            md: '1fr 1fr'
                        },
                        gap: 4,
                        mb: 8
                    }}>
                        {/* Education Card */}
                        <Grow in={loaded} timeout={1100}>
                            <Card sx={{ 
                                height: '100%', 
                                background: 'linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)', 
                                backdropFilter: 'blur(20px)', 
                                border: '1px solid rgba(255,255,255,0.1)',
                                position: 'relative',
                                overflow: 'hidden',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    transform: 'translateY(-4px)',
                                    boxShadow: `0 20px 60px rgba(0, 0, 0, 0.4), 0 0 30px ${accentColor}30`,
                                },
                                '&::before': {
                                    content: '""',
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    height: '2px',
                                    background: `linear-gradient(90deg, ${accentColor}, ${theme.palette.secondary.main})`,
                                },
                            }}>
                                <CardContent sx={{ p: 4 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                                        <School 
                                            sx={{ 
                                                fontSize: 32, 
                                                color: accentColor,
                                                mr: 2 
                                            }} 
                                        />
                                        <Typography 
                                            variant="h4"
                                            sx={{
                                                background: `linear-gradient(135deg, ${accentColor}, ${theme.palette.secondary.main})`,
                                                WebkitBackgroundClip: 'text',
                                                WebkitTextFillColor: 'transparent',
                                                backgroundClip: 'text',
                                                fontWeight: 700,
                                            }}
                                        >
                                            Education
                                        </Typography>
                                    </Box>
                                    <Box>
                                        {education.map((edu, index) => (
                                            <Box key={edu.degree} sx={{ mb: 3, pb: 3, borderBottom: index < education.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                                                <Typography variant="h6" sx={{ fontWeight: 600, color: accentColor }}>
                                                    {edu.degree}
                                                </Typography>
                                                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                                    {edu.school}
                                                </Typography>
                                                <Typography variant="body2" color={theme.palette.secondary.main} sx={{ fontWeight: 500 }}>
                                                    {edu.period}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                                    {edu.description}
                                                </Typography>
                                            </Box>
                                        ))}
                                    </Box>
                                </CardContent>
                            </Card>
                            </Grow>

                        {/* Experience Card */}
                        <Grow in={loaded} timeout={1200}>
                            <Card sx={{ 
                                height: '100%', 
                                background: 'linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)', 
                                backdropFilter: 'blur(20px)', 
                                border: '1px solid rgba(255,255,255,0.1)',
                                position: 'relative',
                                overflow: 'hidden',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    transform: 'translateY(-4px)',
                                    boxShadow: `0 20px 60px rgba(0, 0, 0, 0.4), 0 0 30px ${theme.palette.secondary.main}30`,
                                },
                                '&::before': {
                                    content: '""',
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    height: '2px',
                                    background: `linear-gradient(90deg, ${theme.palette.secondary.main}, ${theme.palette.tertiary.main})`,
                                },
                            }}>
                                <CardContent sx={{ p: 4 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                                        <Work 
                                            sx={{ 
                                                fontSize: 32, 
                                                color: theme.palette.secondary.main,
                                                mr: 2 
                                            }} 
                                        />
                                        <Typography 
                                            variant="h4"
                                            sx={{
                                                background: `linear-gradient(135deg, ${theme.palette.secondary.main}, ${theme.palette.tertiary.main})`,
                                                WebkitBackgroundClip: 'text',
                                                WebkitTextFillColor: 'transparent',
                                                backgroundClip: 'text',
                                                fontWeight: 700,
                                            }}
                                        >
                                            Experience
                                        </Typography>
                                    </Box>
                                    <Box>
                                        {experience.map((exp, index) => (
                                            <Box key={exp.title} sx={{ mb: 3, pb: 3, borderBottom: index < experience.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                                                <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
                                                    {exp.title}
                                                </Typography>
                                                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                                    {exp.organization}
                                                </Typography>
                                                <Typography variant="body2" color={theme.palette.secondary.main} sx={{ fontWeight: 500 }}>
                                                    {exp.timeframe}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                                    {exp.responsibilities && exp.responsibilities.length > 0 ? exp.responsibilities[0] : ''}
                                                </Typography>
                                            </Box>
                                        ))}
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grow>
                    </Box>

                    {/* Skills */}
                    <Box sx={{ mb: 8 }}>
                        <Grow in={loaded} timeout={1300}>
                            <Typography 
                                variant="h2" 
                                gutterBottom
                                sx={{
                                    background: `linear-gradient(135deg, ${accentColor}, ${theme.palette.secondary.main})`,
                                    backgroundSize: '200% 200%',
                                    animation: 'gradient 3s ease infinite',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                    fontWeight: 700,
                                    mb: 4,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 2,
                                }}
                            >
                                <Star />
                                Skills & Expertise
                            </Typography>
                        </Grow>
                        <Grid container spacing={3}>
                            {skills.map((skill, index) => (
                                <Grid item xs={12} sm={6} md={4} key={skill.title}>
                                    <Zoom in={loaded} timeout={1400 + index * 50}>
                                        <Box
                                            sx={{
                                                p: 3,
                                                maxWidth: { xs: '100%', sm: '350px', md: '380px' },
                                                width: '100%',
                                                mx: 'auto',
                                                background: 'linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                                                backdropFilter: 'blur(20px)',
                                                border: '1px solid rgba(255,255,255,0.1)',
                                                borderRadius: 2,
                                                textAlign: 'center',
                                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                                '&:hover': {
                                                    background: 'linear-gradient(145deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.04) 100%)',
                                                    transform: 'translateY(-8px) scale(1.02)',
                                                    boxShadow: `0 20px 60px rgba(0, 0, 0, 0.4), 0 0 30px ${accentColor}30`,
                                                },
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    fontSize: 40,
                                                    color: accentColor,
                                                    mb: 2,
                                                    transition: 'all 0.3s ease',
                                                }}
                                            >
                                                {skill.icon}
                                            </Box>
                                            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                                                {skill.title}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {skill.description}
                                            </Typography>
                                        </Box>
                                    </Zoom>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>

                    {/* Research Interests */}
                    <Box sx={{ mb: 8 }}>
                        <Grow in={loaded} timeout={1500}>
                            <Typography 
                                variant="h2" 
                                gutterBottom
                                sx={{
                                    background: `linear-gradient(135deg, ${accentColor}, ${theme.palette.secondary.main})`,
                                    backgroundSize: '200% 200%',
                                    animation: 'gradient 3s ease infinite',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                    fontWeight: 700,
                                    mb: 4,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 2,
                                }}
                            >
                                <Psychology />
                                Research Interests
                            </Typography>
                        </Grow>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                            {interests.map((interest, index) => (
                                <Zoom in={loaded} timeout={1600 + index * 50} key={interest}>
                                    <Box
                                        sx={{
                                            px: 3,
                                            py: 1.5,
                                            fontSize: '0.95rem',
                                            background: `${accentColor}15`,
                                            color: accentColor,
                                            border: `1px solid ${accentColor}30`,
                                            borderRadius: 2,
                                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                            cursor: 'default',
                                            '&:hover': {
                                                background: `${accentColor}25`,
                                                transform: 'translateY(-4px) scale(1.05)',
                                                boxShadow: `0 8px 24px ${accentColor}30`,
                                            },
                                        }}
                                    >
                                        {interest}
                                    </Box>
                                </Zoom>
                            ))}
                        </Box>
                    </Box>
                </Container>
            </Box>
        </ThemeProvider>
    );
}

export default AboutPage;
