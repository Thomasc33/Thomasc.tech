import React from 'react';
import {
    Box,
    Container,
    Typography,
    ThemeProvider,
    Fade
} from '@mui/material';
import ContactForm from '../Components/ContactForm'
import createHypermodernTheme from '../theme';
// Recaptcha
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

function ContactPage(props) {
    const accentColor = localStorage.getItem('accentColor') || '#aa00ff';
    const theme = createHypermodernTheme(accentColor);

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
                <Container maxWidth="md" sx={{ position: 'relative', zIndex: 10 }}>
                    {/* SEO Headers */}
                    <Box component="header" sx={{ position: 'absolute', left: '-9999px' }}>
                        <Typography variant="h1">Contact Thomas Carr</Typography>
                        <Typography variant="body1">Get in touch with Thomas Carr for research collaborations, speaking engagements, or academic inquiries.</Typography>
                    </Box>

                    {/* Page Title */}
                    <Fade in={true} timeout={1000}>
                        <Box sx={{ textAlign: 'center', mb: 6 }}>
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
                                Get In Touch
                            </Typography>
                            <Typography
                                variant="h5"
                                sx={{
                                    color: 'rgba(255, 255, 255, 0.9)',
                                    maxWidth: '600px',
                                    mx: 'auto',
                                    lineHeight: 1.6,
                                    fontWeight: 400,
                                }}
                            >
                                Ready to collaborate on research, discuss opportunities, or explore innovative AI solutions? Let's connect!
                            </Typography>
                        </Box>
                    </Fade>

                    {/* Contact Form */}
                    <Fade in={true} timeout={1500}>
                        <Box sx={{
                            background: 'rgba(30, 30, 40, 0.8)',
                            backdropFilter: 'blur(20px)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '20px',
                            p: 4,
                            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
                        }}>
                            <GoogleReCaptchaProvider reCaptchaKey="6LfeKHAnAAAAAEMhaDCTuwgrIT4HvxG3Ur3AXnjs">
                                <ContactForm />
                            </GoogleReCaptchaProvider>
                        </Box>
                    </Fade>
                </Container>
            </Box>
        </ThemeProvider>
    )
}

export default ContactPage
