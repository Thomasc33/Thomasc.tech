import React from 'react';
import { 
    Box, 
    Container, 
    Typography, 
    Card,
    CardContent,
    Chip, 
    Grid, 
    ThemeProvider,
    Fade,
    Zoom,
    Divider
} from '@mui/material';
import { styled } from '@mui/material/styles';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SchoolIcon from '@mui/icons-material/School';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import createHypermodernTheme from '../theme';

const awardsData = require('../Data/awards.json');

// Styled components
const AwardCard = styled(Card)(({ accentcolor, featured }) => ({
    background: `linear-gradient(135deg, rgba(30, 30, 40, 0.9), rgba(40, 40, 50, 0.8))`,
    backdropFilter: 'blur(20px)',
    border: featured ? `2px solid ${accentcolor}60` : `1px solid ${accentcolor}30`,
    borderRadius: '20px',
    boxShadow: featured 
        ? `0 25px 50px rgba(0, 0, 0, 0.4), 0 0 30px ${accentcolor}30`
        : `0 20px 40px rgba(0, 0, 0, 0.3), 0 0 20px ${accentcolor}20`,
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
        height: featured ? '6px' : '4px',
        background: `linear-gradient(90deg, ${accentcolor}, ${accentcolor}80)`,
    },
    '&:hover': {
        transform: 'translateY(-8px) scale(1.02)',
        boxShadow: `0 30px 60px rgba(0, 0, 0, 0.4), 0 0 40px ${accentcolor}40`,
        border: `2px solid ${accentcolor}60`,
    },
}));

const AchievementCard = styled(Box)(({ accentcolor }) => ({
    background: `linear-gradient(135deg, rgba(30, 30, 40, 0.9), rgba(40, 40, 50, 0.8))`,
    backdropFilter: 'blur(20px)',
    border: `1px solid ${accentcolor}30`,
    borderRadius: '16px',
    padding: '2rem',
    textAlign: 'center',
    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    position: 'relative',
    overflow: 'hidden',
    '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '4px',
        background: `linear-gradient(90deg, ${accentcolor}, ${accentcolor}80)`,
    },
    '&:hover': {
        transform: 'translateY(-8px)',
        boxShadow: `0 25px 50px rgba(0, 0, 0, 0.4), 0 0 30px ${accentcolor}30`,
        border: `1px solid ${accentcolor}60`,
    },
}));

function AwardsPage() {
    const accentColor = localStorage.getItem('accentColor') || '#aa00ff';
    const theme = createHypermodernTheme(accentColor);

    const getCategoryColor = (category) => {
        const colors = {
            'Academic': accentColor,
            'Research': '#4CAF50',
            'Fellowship': '#2196F3',
            'Innovation': '#FF9800',
            'Teaching': '#9C27B0'
        };
        return colors[category] || accentColor;
    };

    const renderAward = (award, index) => {
        return (
            <Zoom in={true} style={{ transitionDelay: `${index * 150}ms` }} key={award.id}>
                <Grid item xs={12} md={6} lg={4}>
                    <AwardCard accentcolor={accentColor} featured={award.featured}>
                        <CardContent sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
                            {/* Header */}
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                <Typography variant="h2" sx={{ fontSize: '2rem', mb: 0 }}>
                                    {award.icon}
                                </Typography>
                                <Box sx={{ display: 'flex', gap: 1, flexDirection: 'column', alignItems: 'flex-end' }}>
                                    <Chip
                                        label={award.category}
                                        size="small"
                                        sx={{
                                            background: `linear-gradient(135deg, ${getCategoryColor(award.category)}, ${getCategoryColor(award.category)}cc)`,
                                            color: 'white',
                                            fontWeight: 600,
                                            fontSize: '0.75rem',
                                        }}
                                    />
                                    <Chip
                                        label={award.year}
                                        size="small"
                                        sx={{
                                            background: 'rgba(255, 255, 255, 0.1)',
                                            color: 'white',
                                            fontWeight: 500,
                                            fontSize: '0.7rem',
                                        }}
                                    />
                                </Box>
                            </Box>

                            {/* Title */}
                            <Typography 
                                variant="h5" 
                                sx={{ 
                                    background: `linear-gradient(135deg, ${accentColor}, #ffffff)`,
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                    fontWeight: 700, 
                                    mb: 1, 
                                    lineHeight: 1.3
                                }}
                            >
                                {award.title}
                            </Typography>

                            {/* Organization */}
                            <Typography 
                                variant="subtitle1" 
                                sx={{ 
                                    color: accentColor, 
                                    mb: 2, 
                                    fontWeight: 600
                                }}
                            >
                                {award.organization}
                            </Typography>

                            {/* Description */}
                            <Typography 
                                variant="body2" 
                                sx={{ 
                                    color: 'rgba(255, 255, 255, 0.8)', 
                                    lineHeight: 1.6,
                                    flex: 1
                                }}
                            >
                                {award.description}
                            </Typography>
                        </CardContent>
                    </AwardCard>
                </Grid>
            </Zoom>
        );
    };

    const renderCertification = (cert, index) => {
        return (
            <Zoom in={true} style={{ transitionDelay: `${index * 150}ms` }} key={cert.id}>
                <Grid item xs={12} md={6}>
                    <AwardCard accentcolor={accentColor}>
                        <CardContent sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                                <Typography variant="h3" sx={{ fontSize: '1.5rem', mb: 0 }}>
                                    {cert.icon}
                                </Typography>
                                <Box sx={{ flex: 1 }}>
                                    <Typography 
                                        variant="h6" 
                                        sx={{ 
                                            color: 'white', 
                                            fontWeight: 700,
                                            mb: 0.5
                                        }}
                                    >
                                        {cert.title}
                                    </Typography>
                                    <Typography 
                                        variant="body2" 
                                        sx={{ 
                                            color: accentColor, 
                                            fontWeight: 600
                                        }}
                                    >
                                        {cert.organization}
                                    </Typography>
                                </Box>
                                <Box sx={{ textAlign: 'right' }}>
                                    <Typography variant="body2" sx={{ color: 'white', fontWeight: 600 }}>
                                        {cert.year}
                                    </Typography>
                                    <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                                        Valid until {cert.validUntil}
                                    </Typography>
                                </Box>
                            </Box>
                            <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.6)', fontFamily: 'monospace' }}>
                                ID: {cert.credentialId}
                            </Typography>
                        </CardContent>
                    </AwardCard>
                </Grid>
            </Zoom>
        );
    };

    const renderAchievement = (achievement, index) => {
        return (
            <Zoom in={true} style={{ transitionDelay: `${index * 150}ms` }} key={achievement.id}>
                <Grid item xs={12} sm={6} md={3}>
                    <AchievementCard accentcolor={accentColor}>
                        <Typography variant="h2" sx={{ fontSize: '2.5rem', mb: 2 }}>
                            {achievement.icon}
                        </Typography>
                        <Typography 
                            variant="h3" 
                            sx={{ 
                                background: `linear-gradient(135deg, ${accentColor}, #ffffff)`,
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                                fontWeight: 800, 
                                mb: 1,
                                fontSize: '2rem'
                            }}
                        >
                            {achievement.metric}
                        </Typography>
                        <Typography 
                            variant="h6" 
                            sx={{ 
                                color: 'white', 
                                fontWeight: 600, 
                                mb: 1
                            }}
                        >
                            {achievement.title}
                        </Typography>
                        <Typography 
                            variant="body2" 
                            sx={{ 
                                color: 'rgba(255, 255, 255, 0.8)', 
                                lineHeight: 1.5
                            }}
                        >
                            {achievement.description}
                        </Typography>
                    </AchievementCard>
                </Grid>
            </Zoom>
        );
    };

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
                                Awards & Achievements
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
                                Recognition for excellence in research, innovation, and academic achievement.
                            </Typography>
                        </Box>
                    </Fade>

                    {/* Key Achievements */}
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
                                Key Achievements
                            </Typography>
                            <Grid container spacing={3}>
                                {awardsData.achievements.map((achievement, index) => renderAchievement(achievement, index))}
                            </Grid>
                        </Box>
                    </Fade>

                    {/* Awards */}
                    <Fade in={true} timeout={2000}>
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
                                Awards & Honors
                            </Typography>
                            <Grid container spacing={4}>
                                {awardsData.awards.map((award, index) => renderAward(award, index))}
                            </Grid>
                        </Box>
                    </Fade>

                    {/* Certifications */}
                    <Fade in={true} timeout={2500}>
                        <Box>
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
                                Professional Certifications
                            </Typography>
                            <Grid container spacing={4} sx={{ maxWidth: '800px', mx: 'auto' }}>
                                {awardsData.certifications.map((cert, index) => renderCertification(cert, index))}
                            </Grid>
                        </Box>
                    </Fade>
                </Container>
            </Box>
        </ThemeProvider>
    );
}

export default AwardsPage;
