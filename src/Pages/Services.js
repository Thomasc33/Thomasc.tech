import React from 'react';
import { 
    Box, 
    Container, 
    Typography, 
    Card,
    CardContent,
    Chip, 
    Grid, 
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    ThemeProvider,
    Fade,
    Zoom,
    Rating,
    Avatar,
    Stepper,
    Step,
    StepLabel,
    StepContent
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import createHypermodernTheme from '../theme';

const servicesData = require('../Data/services.json');

// Styled components
const ServiceCard = styled(Card)(({ accentcolor, featured }) => ({
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

const TestimonialCard = styled(Card)(({ accentcolor }) => ({
    background: `linear-gradient(135deg, rgba(30, 30, 40, 0.9), rgba(40, 40, 50, 0.8))`,
    backdropFilter: 'blur(20px)',
    border: `1px solid ${accentcolor}30`,
    borderRadius: '16px',
    boxShadow: `0 20px 40px rgba(0, 0, 0, 0.3), 0 0 20px ${accentcolor}20`,
    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    position: 'relative',
    overflow: 'hidden',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: `0 25px 50px rgba(0, 0, 0, 0.4), 0 0 30px ${accentcolor}30`,
        border: `1px solid ${accentcolor}50`,
    },
}));

function ServicesPage() {
    const accentColor = localStorage.getItem('accentColor') || '#aa00ff';
    const theme = createHypermodernTheme(accentColor);

    const getCategoryColor = (category) => {
        const colors = {
            'Consulting': accentColor,
            'Development': '#4CAF50',
            'Research': '#2196F3',
            'Education': '#FF9800'
        };
        return colors[category] || accentColor;
    };

    const renderService = (service, index) => {
        return (
            <Zoom in={true} style={{ transitionDelay: `${index * 150}ms` }} key={service.id}>
                <Grid item xs={12} md={6} lg={4}>
                    <ServiceCard accentcolor={accentColor} featured={service.featured}>
                        <CardContent sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
                            {/* Header */}
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                <Typography variant="h2" sx={{ fontSize: '2.5rem', mb: 0 }}>
                                    {service.icon}
                                </Typography>
                                <Box sx={{ display: 'flex', gap: 1, flexDirection: 'column', alignItems: 'flex-end' }}>
                                    <Chip
                                        label={service.category}
                                        size="small"
                                        sx={{
                                            background: `linear-gradient(135deg, ${getCategoryColor(service.category)}, ${getCategoryColor(service.category)}cc)`,
                                            color: 'white',
                                            fontWeight: 600,
                                            fontSize: '0.75rem',
                                        }}
                                    />
                                    {service.featured && (
                                        <Chip
                                            label="Popular"
                                            size="small"
                                            sx={{
                                                background: `linear-gradient(135deg, ${accentColor}, ${accentColor}cc)`,
                                                color: 'white',
                                                fontWeight: 600,
                                                fontSize: '0.7rem',
                                            }}
                                        />
                                    )}
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
                                    mb: 2, 
                                    lineHeight: 1.3
                                }}
                            >
                                {service.title}
                            </Typography>

                            {/* Description */}
                            <Typography 
                                variant="body2" 
                                sx={{ 
                                    color: 'rgba(255, 255, 255, 0.8)', 
                                    mb: 3, 
                                    lineHeight: 1.6
                                }}
                            >
                                {service.description}
                            </Typography>

                            {/* Features */}
                            <List dense sx={{ mb: 3, flex: 1 }}>
                                {service.features.slice(0, 4).map((feature, featureIndex) => (
                                    <ListItem key={featureIndex} sx={{ px: 0, py: 0.5 }}>
                                        <ListItemIcon sx={{ minWidth: 30 }}>
                                            <CheckCircleIcon sx={{ color: accentColor, fontSize: '1rem' }} />
                                        </ListItemIcon>
                                        <ListItemText 
                                            primary={feature}
                                            primaryTypographyProps={{
                                                variant: 'body2',
                                                sx: { color: 'rgba(255, 255, 255, 0.9)', fontSize: '0.85rem' }
                                            }}
                                        />
                                    </ListItem>
                                ))}
                                {service.features.length > 4 && (
                                    <Typography variant="caption" sx={{ color: accentColor, fontStyle: 'italic', pl: 4 }}>
                                        +{service.features.length - 4} more features...
                                    </Typography>
                                )}
                            </List>

                            {/* Footer */}
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 'auto' }}>
                                <Box sx={{ display: 'flex', gap: 2 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                        <AccessTimeIcon sx={{ fontSize: '0.9rem', color: accentColor }} />
                                        <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                                            {service.duration}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                        <AttachMoneyIcon sx={{ fontSize: '0.9rem', color: accentColor }} />
                                        <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                                            {service.pricing}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </CardContent>
                    </ServiceCard>
                </Grid>
            </Zoom>
        );
    };

    const renderTestimonial = (testimonial, index) => {
        return (
            <Zoom in={true} style={{ transitionDelay: `${index * 200}ms` }} key={testimonial.id}>
                <Grid item xs={12} md={4}>
                    <TestimonialCard accentcolor={accentColor}>
                        <CardContent sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <Rating value={testimonial.rating} readOnly sx={{ mb: 2, color: accentColor }} />
                            <Typography 
                                variant="body1" 
                                sx={{ 
                                    color: 'rgba(255, 255, 255, 0.9)', 
                                    mb: 3, 
                                    lineHeight: 1.6,
                                    fontStyle: 'italic',
                                    flex: 1
                                }}
                            >
                                "{testimonial.content}"
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Avatar 
                                    sx={{ 
                                        background: `linear-gradient(135deg, ${accentColor}, ${accentColor}cc)`,
                                        width: 40, 
                                        height: 40 
                                    }}
                                >
                                    {testimonial.name.charAt(0)}
                                </Avatar>
                                <Box>
                                    <Typography variant="subtitle2" sx={{ color: 'white', fontWeight: 600 }}>
                                        {testimonial.name}
                                    </Typography>
                                    <Typography variant="caption" sx={{ color: accentColor }}>
                                        {testimonial.title}, {testimonial.company}
                                    </Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </TestimonialCard>
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
                                Services & Consulting
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
                                Expert consulting and development services in AI ethics, privacy-preserving ML, and full-stack development.
                            </Typography>
                        </Box>
                    </Fade>

                    {/* Services Grid */}
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
                                Available Services
                            </Typography>
                            <Grid container spacing={4}>
                                {servicesData.services.map((service, index) => renderService(service, index))}
                            </Grid>
                        </Box>
                    </Fade>

                    {/* Testimonials */}
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
                                Client Testimonials
                            </Typography>
                            <Grid container spacing={4}>
                                {servicesData.testimonials.map((testimonial, index) => renderTestimonial(testimonial, index))}
                            </Grid>
                        </Box>
                    </Fade>
                </Container>
            </Box>
        </ThemeProvider>
    );
}

export default ServicesPage;
