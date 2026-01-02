import React, { useState, useEffect, useRef } from 'react';
import {
    Box,
    Container,
    Typography,
    Card,
    CardContent,
    CardActions,
    Avatar,
    Button,
    ThemeProvider,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Chip,
    Fab,
    Tooltip,
    Zoom,
    Grow,
    Fade,
} from '@mui/material';
import {
    GitHub,
    Launch,
    Timeline,
} from '@mui/icons-material';
import createDarkTheme from '../theme';
import projectsData from '../Data/projects.json';

function ProjectsPage() {
    const accentColor = localStorage.getItem('accentColor') || '#8b5cf6';
    const theme = createDarkTheme(accentColor);
    const [selectedProject, setSelectedProject] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [projects, setProjects] = useState([]);
    const [hoveredCard, setHoveredCard] = useState(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const containerRef = useRef(null);

    useEffect(() => {
        setProjects(projectsData);
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

    const handleOpenDialog = (project) => {
        setSelectedProject(project);
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
        setSelectedProject(null);
    };

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
                            radial-gradient(circle at 40% 20%, ${accentColor}08 0%, transparent 50%),
                            radial-gradient(circle at 60% 80%, ${theme.palette.secondary.main}08 0%, transparent 50%),
                            radial-gradient(circle at 50% 50%, ${theme.palette.tertiary.main}08 0%, transparent 50%)
                        `,
                        animation: 'float 25s ease-in-out infinite',
                        zIndex: 0,
                    }}
                />
                
                {/* Floating particles */}
                <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0 }}>
                    {[...Array(20)].map((_, i) => (
                        <Box
                            key={i}
                            sx={{
                                position: 'absolute',
                                width: Math.random() * 4 + 2,
                                height: Math.random() * 4 + 2,
                                background: accentColor,
                                borderRadius: '50%',
                                opacity: Math.random() * 0.3 + 0.1,
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animation: `float ${Math.random() * 20 + 10}s ease-in-out infinite`,
                                animationDelay: `${Math.random() * 5}s`,
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
                                Projects
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
                                A collection of my work in machine learning, web development, and academic research.
                            </Typography>
                        </Fade>
                        
                        {/* Animated GitHub link */}
                        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 2 }}>
                            <Zoom in={loaded} timeout={500}>
                                <Tooltip title="View my GitHub" arrow>
                                    <Fab
                                        component="a"
                                        href="https://github.com/Thomasc33"
                                        target="_blank"
                                        rel="noopener noreferrer"
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
                                        <GitHub />
                                    </Fab>
                                </Tooltip>
                            </Zoom>
                        </Box>
                    </Box>

                    {/* Projects Grid with enhanced animations */}
                    <Box sx={{ mb: 8 }}>
                        <Grow in={loaded} timeout={600}>
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
                                <Timeline />
                                Featured Projects
                            </Typography>
                        </Grow>
                        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }, gap: 3 }}>
                            {projects.map((project, index) => (
                                <Zoom in={loaded} timeout={700 + index * 100} key={project.title}>
                                    <Card
                                        onMouseEnter={() => setHoveredCard(project.title)}
                                        onMouseLeave={() => setHoveredCard(null)}
                                        sx={{
                                            background: 'linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                                            backdropFilter: 'blur(20px)',
                                            border: '1px solid rgba(255,255,255,0.1)',
                                            height: '100%',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            position: 'relative',
                                            overflow: 'visible',
                                            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                            transform: hoveredCard === project.title ? 'translateY(-8px) scale(1.02)' : 'translateY(0)',
                                            boxShadow: hoveredCard === project.title 
                                                ? `0 20px 60px rgba(0, 0, 0, 0.4), 0 0 30px ${accentColor}30` 
                                                : '0 8px 32px rgba(0, 0, 0, 0.3)',
                                            '&::before': {
                                                content: '""',
                                                position: 'absolute',
                                                top: -2,
                                                left: -2,
                                                right: -2,
                                                bottom: -2,
                                                background: `linear-gradient(45deg, ${accentColor}, ${theme.palette.secondary.main}, ${theme.palette.tertiary.main})`,
                                                borderRadius: 'inherit',
                                                opacity: hoveredCard === project.title ? 0.5 : 0,
                                                zIndex: -1,
                                                transition: 'opacity 0.3s ease',
                                            },
                                        }}
                                    >
                                        <CardContent sx={{ flexGrow: 1, p: 3 }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                                <Avatar
                                                    sx={{
                                                        background: `linear-gradient(135deg, ${accentColor}, ${theme.palette.secondary.main})`,
                                                        width: 48,
                                                        height: 48,
                                                        mr: 2,
                                                        transition: 'all 0.3s ease',
                                                        transform: hoveredCard === project.title ? 'rotate(10deg) scale(1.1)' : 'rotate(0)',
                                                    }}
                                                >
                                                    {project.title.charAt(0)}
                                                </Avatar>
                                                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                                    {project.title}
                                                </Typography>
                                            </Box>
                                            <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.6 }}>
                                                {project.description}
                                            </Typography>
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 'auto' }}>
                                                {project.langauge_framework && project.langauge_framework.slice(0, 4).map((tech, techIndex) => (
                                                    <Chip
                                                        key={tech.label}
                                                        label={tech.label}
                                                        size="small"
                                                        sx={{
                                                            background: `${accentColor}15`,
                                                            color: accentColor,
                                                            border: `1px solid ${accentColor}30`,
                                                            transition: 'all 0.2s ease',
                                                            '&:hover': {
                                                                background: `${accentColor}25`,
                                                                transform: 'translateY(-2px)',
                                                            },
                                                        }}
                                                    />
                                                ))}
                                            </Box>
                                        </CardContent>
                                        <CardActions sx={{ p: 2, pt: 0, gap: 1 }}>
                                            <Button
                                                size="small"
                                                onClick={() => handleOpenDialog(project)}
                                                sx={{
                                                    color: accentColor,
                                                    background: `${accentColor}10`,
                                                    '&:hover': {
                                                        background: `${accentColor}20`,
                                                        transform: 'translateY(-2px)',
                                                    },
                                                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                                                }}
                                            >
                                                Learn More
                                            </Button>
                                            {project.links && project.links.map((link, linkIndex) => (
                                                link.icon === 'GitHub' ? (
                                                    <Tooltip title="View Source Code" arrow key={linkIndex}>
                                                        <Button
                                                            size="small"
                                                            href={link.href}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            startIcon={<GitHub />}
                                                            sx={{
                                                                color: 'white',
                                                                background: 'linear-gradient(135deg, #24292e, #404448)',
                                                                '&:hover': {
                                                                    background: 'linear-gradient(135deg, #404448, #24292e)',
                                                                    transform: 'translateY(-2px)',
                                                                },
                                                                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                                                            }}
                                                        >
                                                            Code
                                                        </Button>
                                                    </Tooltip>
                                                ) : (
                                                    <Tooltip title="View Live Demo" arrow key={linkIndex}>
                                                        <Button
                                                            size="small"
                                                            href={link.href}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            startIcon={<Launch />}
                                                            sx={{
                                                                color: accentColor,
                                                                background: `${accentColor}10`,
                                                                '&:hover': {
                                                                    background: `${accentColor}20`,
                                                                    transform: 'translateY(-2px)',
                                                                },
                                                                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                                                            }}
                                                        >
                                                            Live Demo
                                                        </Button>
                                                    </Tooltip>
                                                )
                                            ))}
                                        </CardActions>
                                    </Card>
                                </Zoom>
                            ))}
                        </Box>
                    </Box>

                    {/* Project Dialog */}
                    <Dialog
                        open={dialogOpen}
                        onClose={handleCloseDialog}
                        maxWidth="md"
                        fullWidth
                        PaperProps={{
                            sx: {
                                background: 'linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                                backdropFilter: 'blur(20px)',
                                border: '1px solid rgba(255,255,255,0.1)',
                            },
                        }}
                    >
                        {selectedProject && (
                            <>
                                <DialogTitle
                                    sx={{
                                        background: `linear-gradient(135deg, ${accentColor}, ${theme.palette.secondary.main})`,
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        backgroundClip: 'text',
                                        fontWeight: 700,
                                        pb: 1,
                                    }}
                                >
                                    {selectedProject.title}
                                </DialogTitle>
                                <DialogContent>
                                    <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
                                        {selectedProject.description}
                                    </Typography>
                                    <Typography variant="h6" gutterBottom>
                                        Technologies Used:
                                    </Typography>
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                                        {selectedProject.langauge_framework && selectedProject.langauge_framework.map((tech, techIndex) => (
                                            <Chip
                                                key={tech.label}
                                                label={tech.label}
                                                sx={{
                                                    background: `${accentColor}15`,
                                                    color: accentColor,
                                                    border: `1px solid ${accentColor}30`,
                                                }}
                                            />
                                        ))}
                                    </Box>
                                    {selectedProject.features && (
                                        <>
                                            <Typography variant="h6" gutterBottom>
                                                Key Features:
                                            </Typography>
                                            <Box component="ul" sx={{ pl: 2, mb: 2 }}>
                                                {selectedProject.features.map((feature, index) => (
                                                    <Typography component="li" key={index} variant="body2" sx={{ mb: 1 }}>
                                                        {feature}
                                                    </Typography>
                                                ))}
                                            </Box>
                                        </>
                                    )}
                                </DialogContent>
                                <DialogActions sx={{ p: 3 }}>
                                    <Button
                                        onClick={handleCloseDialog}
                                        sx={{
                                            color: 'text.secondary',
                                            '&:hover': {
                                                background: 'rgba(255,255,255,0.05)',
                                            },
                                            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                                        }}
                                    >
                                        Close
                                    </Button>
                                    {selectedProject.links && selectedProject.links.map((link, linkIndex) => (
                                        link.icon === 'GitHub' ? (
                                            <Button
                                                key={linkIndex}
                                                href={link.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                startIcon={<GitHub />}
                                                sx={{
                                                    color: accentColor,
                                                    '&:hover': {
                                                        background: `${accentColor}10`,
                                                    },
                                                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                                                }}
                                            >
                                                View Code
                                            </Button>
                                        ) : (
                                            <Button
                                                key={linkIndex}
                                                href={link.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                startIcon={<Launch />}
                                                sx={{
                                                    color: accentColor,
                                                    '&:hover': {
                                                        background: `${accentColor}10`,
                                                    },
                                                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                                                }}
                                            >
                                                Live Demo
                                            </Button>
                                        )
                                    ))}
                                </DialogActions>
                            </>
                        )}
                    </Dialog>
                </Container>
            </Box>
        </ThemeProvider>
    );
}

export default ProjectsPage;
