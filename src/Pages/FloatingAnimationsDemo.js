import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';
import FloatingText, { StaggeredFloatingText, HoverFloatText } from '../Components/FloatingText';

const FloatingAnimationsDemo = () => {
    const accentColor = '#8b5cf6';

    return (
        <Container maxWidth="lg" sx={{ py: 8 }}>
            <Typography variant="h2" gutterBottom sx={{ mb: 6, textAlign: 'center' }}>
                Floating Text Animations Showcase
            </Typography>

            {/* Gentle Float */}
            <Paper sx={{ p: 4, mb: 4, background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)' }}>
                <Typography variant="h4" gutterBottom sx={{ color: accentColor, mb: 3 }}>
                    Gentle Float
                </Typography>
                <FloatingText
                    variant="h6"
                    animation="gentle"
                    sx={{ mb: 2 }}
                >
                    This text floats gently up and down
                </FloatingText>
                <Typography variant="body2" color="text.secondary">
                    Perfect for subtle animations on headings and important text
                </Typography>
            </Paper>

            {/* Wave Float */}
            <Paper sx={{ p: 4, mb: 4, background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)' }}>
                <Typography variant="h4" gutterBottom sx={{ color: accentColor, mb: 3 }}>
                    Wave Float
                </Typography>
                <FloatingText
                    variant="h6"
                    animation="wave"
                    sx={{ mb: 2 }}
                >
                    This text floats in a wave pattern
                </FloatingText>
                <Typography variant="body2" color="text.secondary">
                    Creates a smooth ocean-wave effect
                </Typography>
            </Paper>

            {/* Bounce Float */}
            <Paper sx={{ p: 4, mb: 4, background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)' }}>
                <Typography variant="h4" gutterBottom sx={{ color: accentColor, mb: 3 }}>
                    Bounce Float
                </Typography>
                <FloatingText
                    variant="h6"
                    animation="bounce"
                    sx={{ mb: 2 }}
                >
                    This bouncy text catches attention
                </FloatingText>
                <Typography variant="body2" color="text.secondary">
                    Energetic animation for call-to-action elements
                </Typography>
            </Paper>

            {/* Drift Float */}
            <Paper sx={{ p: 4, mb: 4, background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)' }}>
                <Typography variant="h4" gutterBottom sx={{ color: accentColor, mb: 3 }}>
                    Drift Float
                </Typography>
                <FloatingText
                    variant="h6"
                    animation="drift"
                    sx={{ mb: 2 }}
                >
                    This text drifts around smoothly
                </FloatingText>
                <Typography variant="body2" color="text.secondary">
                    Creates a drifting effect with horizontal movement
                </Typography>
            </Paper>

            {/* Hover Float */}
            <Paper sx={{ p: 4, mb: 4, background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)' }}>
                <Typography variant="h4" gutterBottom sx={{ color: accentColor, mb: 3 }}>
                    Hover Float
                </Typography>
                <HoverFloatText
                    variant="h6"
                    sx={{ mb: 2, cursor: 'pointer' }}
                >
                    Hover over this text!
                </HoverFloatText>
                <Typography variant="body2" color="text.secondary">
                    Interactive animation that triggers on hover
                </Typography>
            </Paper>

            {/* Staggered Words */}
            <Paper sx={{ p: 4, mb: 4, background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)' }}>
                <Typography variant="h4" gutterBottom sx={{ color: accentColor, mb: 3 }}>
                    Staggered Words
                </Typography>
                <Box sx={{ mb: 2 }}>
                    <StaggeredFloatingText
                        text="Each word floats independently"
                        variant="h6"
                        staggerType="word"
                    />
                </Box>
                <Typography variant="body2" color="text.secondary">
                    Creates a cascading effect with staggered animations
                </Typography>
            </Paper>

            {/* Staggered Characters */}
            <Paper sx={{ p: 4, mb: 4, background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)' }}>
                <Typography variant="h4" gutterBottom sx={{ color: accentColor, mb: 3 }}>
                    Staggered Characters
                </Typography>
                <Box sx={{ mb: 2, fontSize: '1.25rem', fontWeight: 600 }}>
                    <StaggeredFloatingText
                        text="Hypermodern"
                        variant="inherit"
                        staggerType="character"
                    />
                </Box>
                <Typography variant="body2" color="text.secondary">
                    Each character animates independently for a dramatic effect
                </Typography>
            </Paper>

            {/* Combined Effects */}
            <Paper sx={{ p: 4, background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)' }}>
                <Typography variant="h4" gutterBottom sx={{ color: accentColor, mb: 3 }}>
                    Combined Effects
                </Typography>
                <Box sx={{ mb: 3 }}>
                    <FloatingText
                        variant="h3"
                        animation="text"
                        sx={{
                            background: `linear-gradient(135deg, ${accentColor}, #ec4899)`,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            fontWeight: 700,
                        }}
                    >
                        Gradient + Float
                    </FloatingText>
                </Box>
                <Typography variant="body2" color="text.secondary">
                    Combine floating animations with other effects like gradients for stunning results
                </Typography>
            </Paper>
        </Container>
    );
};

export default FloatingAnimationsDemo;
