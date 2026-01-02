import React, { useState } from 'react';
import {
    Box,
    Container,
    Typography,
    Card,
    Button,
    ThemeProvider,
    Grid,
    Stack,
    TextField,
    Alert,
    CircularProgress,
} from '@mui/material';
import {
    Email,
    Send,
} from '@mui/icons-material';
import { GitHub, LinkedIn } from '@mui/icons-material';
import { Link } from '@mui/material';
import createDarkTheme from '../theme';
import { useForm, ValidationError } from '@formspree/react';
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

function ContactPage() {
    const accentColor = localStorage.getItem('accentColor') || '#8b5cf6';
    const theme = createDarkTheme(accentColor);
    const [loaded, setLoaded] = useState(false);
    const { executeRecaptcha } = useGoogleReCaptcha();
    const [state, handleSubmit] = useForm("xoqojdgv", {
        data: { "g-recaptcha-response": executeRecaptcha }
    });
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    React.useEffect(() => {
        setLoaded(true);
    }, []);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        await handleSubmit(event);
    };

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', py: 8, position: 'relative', overflow: 'hidden' }}>
                {/* Animated background gradient */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: `
                            radial-gradient(circle at 30% 25%, ${accentColor}08 0%, transparent 50%),
                            radial-gradient(circle at 70% 75%, ${theme.palette.secondary.main}08 0%, transparent 50%),
                            radial-gradient(circle at 50% 50%, ${theme.palette.tertiary.main}08 0%, transparent 50%)
                        `,
                        animation: 'float 35s ease-in-out infinite',
                        zIndex: 0,
                    }}
                />
                
                <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
                    {/* Header */}
                    <Box sx={{ textAlign: 'center', mb: 8 }}>
                        <Typography 
                            variant="h1" 
                            component="h1"
                            sx={{
                                background: `linear-gradient(135deg, ${accentColor}, ${theme.palette.secondary.main})`,
                                backgroundSize: '200% 200%',
                                animation: 'gradient 3s ease infinite',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                                fontWeight: 800,
                                opacity: loaded ? 1 : 0,
                                transform: loaded ? 'translateY(0)' : 'translateY(20px)',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            }}
                        >
                            Contact Me
                        </Typography>
                        <Typography 
                            variant="body1" 
                            color="text.secondary" 
                            sx={{ 
                                maxWidth: 800, 
                                mx: 'auto',
                                opacity: loaded ? 1 : 0,
                                transform: loaded ? 'translateY(0)' : 'translateY(20px)',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1) 0.1s',
                            }}
                        >
                            Let's connect and discuss opportunities in AI ethics, privacy-preserving ML, or collaborative research.
                        </Typography>
                    </Box>

                    {/* Contact Form */}
                    <Box sx={{ mb: 8 }}>
                        <Card
                            sx={{
                                background: 'linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                                backdropFilter: 'blur(20px)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                p: 4,
                                opacity: loaded ? 1 : 0,
                                transform: loaded ? 'translateY(0)' : 'translateY(20px)',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1) 0.2s',
                            }}
                        >
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
                                    mb: 3,
                                }}
                            >
                                Send a Message
                            </Typography>
                            {state.succeeded ? (
                                <Alert severity="success" sx={{ mb: 4 }}>
                                    <Typography variant="h6" sx={{ mb: 1 }}>
                                        Message Received!
                                    </Typography>
                                    <Typography variant="body2">
                                        Thank you for contacting Thomas Carr. Your message has been received and will be responded to promptly.
                                    </Typography>
                                </Alert>
                            ) : (
                                <>
                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                                        I'll get back to you as soon as possible.
                                    </Typography>
                                    
                                    <Box component="form" onSubmit={handleFormSubmit}>
                                        <Grid container spacing={3} direction="column">
                                            <Grid item xs={12}>
                                                <TextField
                                                    fullWidth
                                                    label="Name"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    required
                                                    sx={{
                                                        '& .MuiOutlinedInput-root': {
                                                            '& fieldset': {
                                                                borderColor: `${accentColor}30`,
                                                            },
                                                            '&:hover fieldset': {
                                                                borderColor: `${accentColor}50`,
                                                            },
                                                            '&.Mui-focused fieldset': {
                                                                borderColor: accentColor,
                                                            },
                                                        },
                                                        '& .MuiInputLabel-root': {
                                                            color: 'text.secondary',
                                                        },
                                                        '& .MuiInputLabel-root.Mui-focused': {
                                                            color: accentColor,
                                                        },
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    fullWidth
                                                    label="Email"
                                                    name="email"
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    required
                                                    sx={{
                                                        '& .MuiOutlinedInput-root': {
                                                            '& fieldset': {
                                                                borderColor: `${accentColor}30`,
                                                            },
                                                            '&:hover fieldset': {
                                                                borderColor: `${accentColor}50`,
                                                            },
                                                            '&.Mui-focused fieldset': {
                                                                borderColor: accentColor,
                                                            },
                                                        },
                                                        '& .MuiInputLabel-root': {
                                                            color: 'text.secondary',
                                                        },
                                                        '& .MuiInputLabel-root.Mui-focused': {
                                                            color: accentColor,
                                                        },
                                                    }}
                                                />
                                                <ValidationError 
                                                    prefix="Email" 
                                                    field="email"
                                                    errors={state.errors}
                                                    component={Alert}
                                                    severity="error"
                                                    sx={{ mt: 1 }}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    fullWidth
                                                    label="Subject"
                                                    name="subject"
                                                    value={formData.subject}
                                                    onChange={handleChange}
                                                    required
                                                    sx={{
                                                        '& .MuiOutlinedInput-root': {
                                                            '& fieldset': {
                                                                borderColor: `${accentColor}30`,
                                                            },
                                                            '&:hover fieldset': {
                                                                borderColor: `${accentColor}50`,
                                                            },
                                                            '&.Mui-focused fieldset': {
                                                                borderColor: accentColor,
                                                            },
                                                        },
                                                        '& .MuiInputLabel-root': {
                                                            color: 'text.secondary',
                                                        },
                                                        '& .MuiInputLabel-root.Mui-focused': {
                                                            color: accentColor,
                                                        },
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    fullWidth
                                                    label="Message"
                                                    name="message"
                                                    multiline
                                                    rows={5}
                                                    value={formData.message}
                                                    onChange={handleChange}
                                                    required
                                                    sx={{
                                                        '& .MuiOutlinedInput-root': {
                                                            '& fieldset': {
                                                                borderColor: `${accentColor}30`,
                                                            },
                                                            '&:hover fieldset': {
                                                                borderColor: `${accentColor}50`,
                                                            },
                                                            '&.Mui-focused fieldset': {
                                                                borderColor: accentColor,
                                                            },
                                                        },
                                                        '& .MuiInputLabel-root': {
                                                            color: 'text.secondary',
                                                        },
                                                        '& .MuiInputLabel-root.Mui-focused': {
                                                            color: accentColor,
                                                        },
                                                    }}
                                                />
                                                <ValidationError 
                                                    prefix="Message" 
                                                    field="message"
                                                    errors={state.errors}
                                                    component={Alert}
                                                    severity="error"
                                                    sx={{ mt: 1 }}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Button
                                                    type="submit"
                                                    variant="contained"
                                                    size="large"
                                                    endIcon={state.submitting ? <CircularProgress size={20} color="inherit" /> : <Send />}
                                                    disabled={state.submitting}
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
                                                    {state.submitting ? 'Sending...' : 'Send Message'}
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </>
                            )}
                        </Card>
                    </Box>

                    {/* Alternative Contact Methods */}
                    <Box sx={{ mt: 6, textAlign: 'center' }}>
                        <Typography 
                            variant="h6" 
                            gutterBottom 
                            sx={{ 
                                color: 'text.secondary', 
                                mb: 3,
                                fontSize: '1.1rem',
                                opacity: loaded ? 1 : 0,
                                transform: loaded ? 'translateY(0)' : 'translateY(20px)',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1) 0.4s',
                            }}
                        >
                            Or reach out directly
                        </Typography>
                        <Stack 
                            direction="row" 
                            spacing={3} 
                            justifyContent="center" 
                            alignItems="center"
                            sx={{
                                flexWrap: 'wrap',
                            }}
                        >
                            <Link 
                                href="mailto:thomas@thomasc.tech" 
                                sx={{ 
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                    color: 'text.secondary',
                                    textDecoration: 'none',
                                    px: 2,
                                    py: 1,
                                    borderRadius: 2,
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    backdropFilter: 'blur(10px)',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        color: accentColor,
                                        background: `${accentColor}10`,
                                        border: `1px solid ${accentColor}30`,
                                        transform: 'translateY(-2px)',
                                    },
                                }}
                            >
                                <Email />
                                <Typography variant="body2" sx={{ fontWeight: 500 }}>thomas@thomasc.tech</Typography>
                            </Link>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>•</Typography>
                            <Link 
                                href="https://github.com/Thomasc33" 
                                target="_blank"
                                rel="noopener noreferrer"
                                sx={{ 
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                    color: 'text.secondary',
                                    textDecoration: 'none',
                                    px: 2,
                                    py: 1,
                                    borderRadius: 2,
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    backdropFilter: 'blur(10px)',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        color: accentColor,
                                        background: `${accentColor}10`,
                                        border: `1px solid ${accentColor}30`,
                                        transform: 'translateY(-2px)',
                                    },
                                }}
                            >
                                <GitHub />
                                <Typography variant="body2" sx={{ fontWeight: 500 }}>GitHub</Typography>
                            </Link>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>•</Typography>
                            <Link 
                                href="https://www.linkedin.com/in/thomasc33/" 
                                target="_blank"
                                rel="noopener noreferrer"
                                sx={{ 
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                    color: 'text.secondary',
                                    textDecoration: 'none',
                                    px: 2,
                                    py: 1,
                                    borderRadius: 2,
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    backdropFilter: 'blur(10px)',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        color: accentColor,
                                        background: `${accentColor}10`,
                                        border: `1px solid ${accentColor}30`,
                                        transform: 'translateY(-2px)',
                                    },
                                }}
                            >
                                <LinkedIn />
                                <Typography variant="body2" sx={{ fontWeight: 500 }}>LinkedIn</Typography>
                            </Link>
                        </Stack>
                    </Box>
                </Container>
            </Box>
        </ThemeProvider>
    );
}

export default ContactPage;
