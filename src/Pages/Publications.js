import React, { useState, useEffect, useRef } from 'react';
import {
    Box,
    Container,
    Typography,
    Card,
    CardContent,
    Avatar,
    Chip,
    Button,
    ThemeProvider,
    Fab,
    Tooltip,
    Grow,
    Fade,
    Zoom,
} from '@mui/material';
import {
    Article,
    School,
    Psychology,
    Biotech,
    Launch,
    GitHub,
    Timeline,
    Star,
} from '@mui/icons-material';
import createDarkTheme from '../theme';
import publicationsData from '../Data/publications.json';

function PublicationsPage() {
    const accentColor = localStorage.getItem('accentColor') || '#8b5cf6';
    const theme = createDarkTheme(accentColor);
    const [loaded, setLoaded] = useState(false);
    const [publications, setPublications] = useState({ published: [], ongoing: [] });
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const containerRef = useRef(null);

    React.useEffect(() => {
        setPublications(publicationsData);
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

    const getTypeIcon = (type) => {
        switch(type) {
            case 'Journal': return <Article />;
            case 'Conference': return <Psychology />;
            case 'Workshop': return <Biotech />;
            default: return <School />;
        }
    };

    const getStatusColor = (status) => {
        switch(status) {
            case 'Published': return 'success';
            case 'Under Review': return 'warning';
            case 'In Writing': return 'info';
            case 'In Preparation': return 'info';
            default: return 'default';
        }
    };

    const renderPublication = (publication, index) => {
        const link = publication.links ? publication.links[0] : null;
        return (
            <Card 
                key={publication.title}
                sx={{ 
                    mb: 3,
                    background: 'linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '2px',
                        background: `linear-gradient(90deg, ${accentColor}, ${theme.palette.secondary.main})`,
                    },
                    '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: `0 16px 48px rgba(0,0,0,0.4), 0 0 20px ${accentColor}20`,
                    }
                }}
            >
                <CardContent sx={{ p: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 3 }}>
                        <Avatar 
                            sx={{ 
                                background: `linear-gradient(135deg, ${accentColor}, ${theme.palette.secondary.main})`,
                                width: 56, 
                                height: 56, 
                                flexShrink: 0,
                                boxShadow: `0 4px 12px ${accentColor}30`,
                            }}
                        >
                            {getTypeIcon(publication.publicationType || 'Conference')}
                        </Avatar>
                        <Box sx={{ flexGrow: 1 }}>
                            <Typography 
                                variant="h5" 
                                gutterBottom 
                                sx={{ 
                                    fontWeight: 600,
                                    color: 'text.primary',
                                }}
                            >
                                {publication.title}
                            </Typography>
                            <Typography 
                                variant="body1" 
                                color="text.secondary" 
                                sx={{ 
                                    mb: 1, 
                                    fontSize: '1.05rem',
                                    lineHeight: 1.6,
                                }}
                            >
                                {publication.authors}
                            </Typography>
                            <Typography 
                                variant="h6" 
                                color="text.primary" 
                                sx={{ 
                                    mb: 1, 
                                    fontWeight: 500,
                                    color: `${theme.palette.secondary.main}`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                }}
                            >
                                {publication.conference || publication.venue}
                                {publication.year && (
                                    <Chip
                                        label={publication.year}
                                        size="small"
                                        sx={{
                                            background: `${accentColor}20`,
                                            color: accentColor,
                                            border: `1px solid ${accentColor}40`,
                                            fontSize: '0.75rem',
                                            height: 24,
                                        }}
                                    />
                                )}
                            </Typography>
                            {(publication.abstract || publication.description) && (
                                <Typography 
                                    variant="body2" 
                                    color="text.secondary" 
                                    sx={{ 
                                        mb: 2, 
                                        lineHeight: 1.6,
                                    }}
                                >
                                    {publication.abstract || publication.description}
                                </Typography>
                            )}
                            {publication.citations !== undefined && (
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                    Citations: {publication.citations}
                                </Typography>
                            )}
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                                <Chip
                                    label={publication.status}
                                    size="medium"
                                    color={getStatusColor(publication.status)}
                                    sx={{ 
                                        fontWeight: 600, 
                                        px: 2,
                                        background: publication.status === 'Published' 
                                            ? `${theme.palette.success.main}20` 
                                            : publication.status === 'Under Review'
                                            ? `${theme.palette.warning.main}20`
                                            : `${theme.palette.info.main}20`,
                                    }}
                                />
                                <Chip
                                    label={publication.publicationType || 'Conference'}
                                    size="medium"
                                    variant="outlined"
                                    sx={{ 
                                        borderColor: `${accentColor}40`, 
                                        color: accentColor,
                                        background: `${accentColor}10`,
                                    }}
                                />
                                <Button
                                    size="small"
                                    href={link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    startIcon={<Launch />}
                                    sx={{ 
                                        ml: 'auto',
                                        borderColor: `${accentColor}40`,
                                        color: accentColor,
                                        '&:hover': {
                                            background: `${accentColor}10`,
                                            borderColor: `${accentColor}60`,
                                        },
                                    }}
                                >
                                    View Paper
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        );
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
                            radial-gradient(circle at 35% 25%, ${accentColor}08 0%, transparent 50%),
                            radial-gradient(circle at 65% 75%, ${theme.palette.secondary.main}08 0%, transparent 50%),
                            radial-gradient(circle at 50% 50%, ${theme.palette.tertiary.main}08 0%, transparent 50%)
                        `,
                        animation: 'float 40s ease-in-out infinite',
                        zIndex: 0,
                    }}
                />
                
                {/* Floating particles */}
                <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0 }}>
                    {[...Array(15)].map((_, i) => (
                        <Box
                            key={i}
                            sx={{
                                position: 'absolute',
                                width: Math.random() * 3 + 1,
                                height: Math.random() * 3 + 1,
                                background: `linear-gradient(45deg, ${accentColor}, ${theme.palette.secondary.main})`,
                                borderRadius: '50%',
                                opacity: Math.random() * 0.2 + 0.05,
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animation: `float ${Math.random() * 25 + 15}s ease-in-out infinite`,
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
                                Publications
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
                                Academic publications and ongoing research in ethical machine learning, 
                                privacy-preserving technologies, and artificial intelligence.
                            </Typography>
                        </Fade>
                        
                        {/* Animated GitHub and Google Scholar links */}
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
                                <Tooltip title="View my Google Scholar" arrow>
                                    <Fab
                                        component="a"
                                        href="https://scholar.google.com/citations?user=YOUR_ID"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        sx={{
                                            background: 'linear-gradient(135deg, #4285f4, #34a853)',
                                            color: 'white',
                                            '&:hover': {
                                                background: 'linear-gradient(135deg, #34a853, #4285f4)',
                                                transform: 'scale(1.1) rotate(-5deg)',
                                            },
                                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                        }}
                                    >
                                        <School />
                                    </Fab>
                                </Tooltip>
                            </Zoom>
                        </Box>
                    </Box>

                    {/* Published Works */}
                    <Box sx={{ mb: 8 }}>
                        <Grow in={loaded} timeout={700}>
                            <Typography 
                                variant="h3" 
                                gutterBottom
                                sx={{
                                    background: `linear-gradient(135deg, ${accentColor}, ${theme.palette.secondary.main})`,
                                    backgroundSize: '200% 200%',
                                    animation: 'gradient 3s ease infinite',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                    fontWeight: 700,
                                    mb: 3,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 2,
                                }}
                            >
                                <Star />
                                Published Works
                            </Typography>
                        </Grow>
                        {/* Timeline indicator */}
                        <Box sx={{ position: 'relative', pl: 4 }}>
                            <Box
                                sx={{
                                    position: 'absolute',
                                    left: 0,
                                    top: 0,
                                    bottom: 0,
                                    width: 2,
                                    background: `linear-gradient(180deg, ${accentColor}40, transparent)`,
                                }}
                            />
                            {publications.published.map((publication, index) => (
                                <Fade in={loaded} timeout={800 + index * 50} key={publication.title}>
                                    <Box>
                                        <Box
                                            sx={{
                                                position: 'absolute',
                                                left: -5,
                                                top: 24,
                                                width: 12,
                                                height: 12,
                                                borderRadius: '50%',
                                                background: accentColor,
                                                border: '2px solid rgba(255,255,255,0.1)',
                                                boxShadow: `0 0 10px ${accentColor}40`,
                                            }}
                                        />
                                        {renderPublication(publication, index)}
                                    </Box>
                                </Fade>
                            ))}
                        </Box>
                    </Box>

                    {/* Ongoing Works */}
                    <Box sx={{ mt: 8 }}>
                        <Grow in={loaded} timeout={900}>
                            <Typography 
                                variant="h3" 
                                gutterBottom
                                sx={{
                                    background: `linear-gradient(135deg, ${theme.palette.warning.main}, ${theme.palette.secondary.main})`,
                                    backgroundSize: '200% 200%',
                                    animation: 'gradient 3s ease infinite',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                    fontWeight: 700,
                                    mb: 3,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 2,
                                }}
                            >
                                <Timeline />
                                Ongoing Work
                            </Typography>
                        </Grow>
                        <Box sx={{ position: 'relative', pl: 4 }}>
                            <Box
                                sx={{
                                    position: 'absolute',
                                    left: 0,
                                    top: 0,
                                    bottom: 0,
                                    width: 2,
                                    background: `linear-gradient(180deg, ${theme.palette.warning.main}40, transparent)`,
                                }}
                            />
                            {publications.ongoing.map((publication, index) => (
                                <Fade in={loaded} timeout={1000 + index * 50} key={publication.title}>
                                    <Box>
                                        <Box
                                            sx={{
                                                position: 'absolute',
                                                left: -5,
                                                top: 24,
                                                width: 12,
                                                height: 12,
                                                borderRadius: '50%',
                                                background: theme.palette.warning.main,
                                                border: '2px solid rgba(255,255,255,0.1)',
                                                boxShadow: `0 0 10px ${theme.palette.warning.main}40`,
                                            }}
                                        />
                                        {renderPublication(publication, index)}
                                    </Box>
                                </Fade>
                            ))}
                        </Box>
                    </Box>

                </Container>
            </Box>
        </ThemeProvider>
    );
}

export default PublicationsPage;
