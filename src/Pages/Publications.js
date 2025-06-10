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
    Zoom,
    Divider
} from '@mui/material';
import { styled } from '@mui/material/styles';
import LinkIcon from '@mui/icons-material/Link';
import createHypermodernTheme from '../theme';
import '../css/Projects.css';

const publications = require('../Data/publications.json');

// Styled components (reusing from Projects)
const PublicationCard = styled(Card)(({ accentcolor }) => ({
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

function PublicationPage() {
    const accentColor = localStorage.getItem('accentColor') || '#aa00ff';
    const theme = createHypermodernTheme(accentColor);

    function renderPublication(publication, index) {
        return (
            <Zoom in={true} style={{ transitionDelay: `${index * 200}ms` }} key={publication.title}>
                <Grid item xs={12} md={6} lg={4}>
                    <PublicationCard accentcolor={accentColor}>
                        <CardContent sx={{ p: 3, position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column' }}>
                            {/* Status Badge */}
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                <Chip
                                    label={publication.publicationType}
                                    size="small"
                                    sx={{
                                        background: `${accentColor}30`,
                                        color: 'white',
                                        fontWeight: 600,
                                        border: `1px solid ${accentColor}60`,
                                    }}
                                />
                                <Chip
                                    label={publication.status || 'Published'}
                                    size="small"
                                    sx={{
                                        background: accentColor,
                                        color: 'white',
                                        fontWeight: 600,
                                    }}
                                />
                            </Box>

                            <Typography variant="h5" sx={{ color: 'white', fontWeight: 700, mb: 2, lineHeight: 1.3 }}>
                                {publication.title}
                            </Typography>

                            <Typography variant="subtitle2" sx={{ color: accentColor, mb: 1, fontWeight: 600 }}>
                                Conference: {publication.conference}
                            </Typography>

                            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 2, fontStyle: 'italic' }}>
                                {publication.authors}
                            </Typography>

                            <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.9)', mb: 3, lineHeight: 1.6, flex: 1 }}>
                                {publication.abstract || publication.description}
                            </Typography>

                            {/* Keywords */}
                            {publication.keywords && (
                                <Box sx={{ mb: 3 }}>
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                        {publication.keywords.map((keyword, keywordIndex) => (
                                            <Chip
                                                key={keywordIndex}
                                                label={keyword}
                                                size="small"
                                                sx={{
                                                    background: `${accentColor}40`,
                                                    border: `1px solid ${accentColor}60`,
                                                    color: 'white',
                                                    fontSize: '0.75rem',
                                                    '&:hover': {
                                                        background: `${accentColor}60`,
                                                    },
                                                }}
                                            />
                                        ))}
                                    </Box>
                                </Box>
                            )}

                            {/* Links */}
                            {publication.links && (
                                <Box sx={{ display: 'flex', gap: 1, mt: 'auto' }}>
                                    {publication.links.map((link, linkIndex) => (
                                        <ModernIconButton
                                            key={linkIndex}
                                            href={link}
                                            target="_blank"
                                            rel="noreferrer"
                                            aria-label="Publication Link"
                                            accentcolor={accentColor}
                                        >
                                            <LinkIcon />
                                        </ModernIconButton>
                                    ))}
                                </Box>
                            )}
                        </CardContent>
                    </PublicationCard>
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
                        <Typography variant="h1">Thomas Carr's Academic Publications and Research</Typography>
                        <Typography variant="body1">Academic publications and ongoing research in ethical machine learning, privacy, and AI.</Typography>
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
                                Publications & Research
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
                                Academic publications and ongoing research in ethical machine learning, privacy, and AI.
                            </Typography>
                        </Box>
                    </Fade>

                    {/* Published Works */}
                    <Fade in={true} timeout={1500}>
                        <Box sx={{ mb: 8 }}>
                            <Typography
                                variant="h2"
                                sx={{
                                    textAlign: 'center',
                                    mb: 4,
                                    color: 'white',
                                    fontWeight: 700,
                                    position: 'relative',
                                    '&::after': {
                                        content: '""',
                                        position: 'absolute',
                                        bottom: '-10px',
                                        left: '50%',
                                        transform: 'translateX(-50%)',
                                        width: '80px',
                                        height: '4px',
                                        background: accentColor,
                                        borderRadius: '2px',
                                        boxShadow: `0 0 10px ${accentColor}50`,
                                    }
                                }}
                            >
                                Published Works
                            </Typography>
                            <Grid container spacing={4}>
                                {publications.published.map((publication, index) => renderPublication(publication, index))}
                            </Grid>
                        </Box>
                    </Fade>

                    {/* Ongoing Works */}
                    <Fade in={true} timeout={2000}>
                        <Box sx={{ maxWidth: '1200px', mx: 'auto' }}>
                            <Typography
                                variant="h2"
                                sx={{
                                    textAlign: 'center',
                                    mb: 4,
                                    color: 'white',
                                    fontWeight: 700,
                                    position: 'relative',
                                    '&::after': {
                                        content: '""',
                                        position: 'absolute',
                                        bottom: '-10px',
                                        left: '50%',
                                        transform: 'translateX(-50%)',
                                        width: '80px',
                                        height: '4px',
                                        background: accentColor,
                                        borderRadius: '2px',
                                        boxShadow: `0 0 10px ${accentColor}50`,
                                    }
                                }}
                            >
                                Ongoing Works
                            </Typography>
                            <Grid container spacing={4}>
                                {publications.ongoing.map((publication, index) => renderPublication(publication, index + publications.published.length))}
                            </Grid>
                        </Box>
                    </Fade>
                </Container>
            </Box>
        </ThemeProvider>
    );
}

export default PublicationPage;
