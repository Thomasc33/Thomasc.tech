import React from 'react';
import {
    Box,
    Container,
    Typography,
    Card,
    CardContent,
    Chip,
    Grid,
    IconButton,
    ThemeProvider,
    Fade,
    Zoom
} from '@mui/material';
import { styled } from '@mui/material/styles';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkIcon from '@mui/icons-material/Link';
import createHypermodernTheme from '../theme';
import '../css/Projects.css'

const projects = require('../Data/projects.json')

// Styled components
const ProjectCard = styled(Card)(({ accentcolor }) => ({
    background: 'rgba(30, 30, 40, 0.8)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '20px',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    position: 'relative',
    overflow: 'hidden',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: `linear-gradient(135deg, ${accentcolor}20, transparent)`,
        zIndex: 0,
    },
    '&:hover': {
        transform: 'translateY(-8px)',
        boxShadow: '0 30px 60px rgba(0, 0, 0, 0.4)',
        border: `1px solid ${accentcolor}40`,
    },
}));

const ModernIconButton = styled(IconButton)(({ accentcolor }) => ({
    background: `linear-gradient(135deg, ${accentcolor}40, ${accentcolor}20)`,
    color: 'white',
    border: `1px solid ${accentcolor}60`,
    transition: 'all 0.3s ease',
    '&:hover': {
        background: `linear-gradient(135deg, ${accentcolor}60, ${accentcolor}40)`,
        transform: 'scale(1.1)',
        boxShadow: `0 8px 20px ${accentcolor}40`,
    },
}));

function ProjectPage(props) {
    const accentColor = localStorage.getItem('accentColor') || '#aa00ff';
    const theme = createHypermodernTheme(accentColor);

    function renderProject(project, index) {
        return (
            <Zoom in={true} style={{ transitionDelay: `${index * 200}ms` }} key={project.title}>
                <Grid item xs={12} md={6} lg={4}>
                    <ProjectCard accentcolor={accentColor}>
                        <CardContent sx={{ p: 3, position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column' }}>
                            {/* Header with date */}
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                <Typography variant="h5" sx={{ color: 'white', fontWeight: 700, flex: 1, pr: 2 }}>
                                    {project.title}
                                </Typography>
                                <Chip
                                    label={project.timeframe}
                                    size="small"
                                    sx={{
                                        background: accentColor,
                                        color: 'white',
                                        fontWeight: 600,
                                        fontSize: '0.75rem',
                                    }}
                                />
                            </Box>

                            <Typography variant="subtitle1" sx={{ color: accentColor, mb: 1, fontWeight: 500 }}>
                                {project.subtitle}
                            </Typography>

                            <Typography variant="body2" sx={{ color: accentColor, mb: 2, fontWeight: 500, opacity: 0.8 }}>
                                {project.organization}
                            </Typography>

                            <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.9)', mb: 3, lineHeight: 1.6, flex: 1 }}>
                                {project.description}
                            </Typography>

                            {/* Skills */}
                            <Box sx={{ mb: 3 }}>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                    {project.langauge_framework.slice(0, 6).map(skill => (
                                        <Chip
                                            key={skill.label}
                                            label={skill.label}
                                            size="small"
                                            sx={{
                                                background: `${accentColor}${Math.min(skill.stars * 15, 80).toString(16).padStart(2, '0')}`,
                                                border: `1px solid ${accentColor}60`,
                                                color: 'white',
                                                fontSize: '0.75rem',
                                                '&:hover': {
                                                    background: `${accentColor}${Math.min(skill.stars * 20, 100).toString(16).padStart(2, '0')}`,
                                                },
                                            }}
                                        />
                                    ))}
                                    {project.langauge_framework.length > 6 && (
                                        <Chip
                                            label={`+${project.langauge_framework.length - 6} more`}
                                            size="small"
                                            sx={{
                                                background: 'rgba(255,255,255,0.1)',
                                                color: 'white',
                                                fontSize: '0.75rem',
                                            }}
                                        />
                                    )}
                                </Box>
                            </Box>

                            {/* Links */}
                            <Box sx={{ display: 'flex', gap: 1, mt: 'auto' }}>
                                {project.links.map((link, linkIndex) => (
                                    <ModernIconButton
                                        key={linkIndex}
                                        href={link.href}
                                        target="_blank"
                                        rel="noreferrer"
                                        aria-label={link.icon}
                                        accentcolor={accentColor}
                                    >
                                        {link.icon === 'GitHub' ? <GitHubIcon /> : <LinkIcon />}
                                    </ModernIconButton>
                                ))}
                            </Box>
                        </CardContent>
                    </ProjectCard>
                </Grid>
            </Zoom>
        );
    }

    return (
        <ThemeProvider theme={theme}>
            <Box
                component="section"
                sx={{
                    minHeight: 'calc(100vh - 80px)',
                    background: 'linear-gradient(135deg, rgba(10, 10, 15, 0.95), rgba(20, 20, 30, 0.9))',
                    position: 'relative',
                    pt: '80px',
                    py: 8,
                    zIndex: 0,
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: `radial-gradient(circle at 20% 50%, ${accentColor}20 0%, transparent 50%), radial-gradient(circle at 80% 20%, ${accentColor}15 0%, transparent 50%)`,
                        zIndex: -1,
                    }
                }}
            >
                <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 10 }}>
                    {/* SEO Headers */}
                    <Box component="header" sx={{ position: 'absolute', left: '-9999px' }}>
                        <Typography variant="h1">Thomas Carr's Projects and Portfolio</Typography>
                        <Typography variant="body1">Explore my projects in AI, machine learning, privacy research, and full-stack development.</Typography>
                    </Box>

                    {/* Page Title */}
                    <Fade in={true} timeout={1000}>
                        <Box sx={{ textAlign: 'center', mb: 8 }}>
                            <Typography
                                variant="h1"
                                sx={{
                                    mb: 3,
                                    background: `linear-gradient(135deg, ${accentColor}, #ffffff)`,
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                                    fontWeight: 800,
                                    letterSpacing: '-0.02em',
                                }}
                            >
                                Projects & Portfolio
                            </Typography>
                            <Typography
                                variant="h5"
                                sx={{
                                    color: 'rgba(255, 255, 255, 0.9)',
                                    maxWidth: '800px',
                                    mx: 'auto',
                                    lineHeight: 1.6,
                                    fontWeight: 400,
                                }}
                            >
                                Explore my projects in AI, machine learning, privacy research, and full-stack development.
                            </Typography>
                        </Box>
                    </Fade>

                    {/* Projects Grid */}
                    <Grid container spacing={4}>
                        {projects.map((project, index) => renderProject(project, index))}
                    </Grid>
                </Container>
            </Box>
        </ThemeProvider>
    )
}

export default ProjectPage
