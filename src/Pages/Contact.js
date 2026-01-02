import React from 'react';
import {
    Box,
    Container,
    Typography,
    Card,
    CardContent,
    Button,
    TextField,
    ThemeProvider,
    Link,
    Stack,
} from '@mui/material';
import {
    Send,
    Email,
    GitHub,
    LinkedIn,
} from '@mui/icons-material';
import createDarkTheme from '../theme';

function ContactPage() {
    const accentColor = localStorage.getItem('accentColor') || '#2563eb';
    const theme = createDarkTheme(accentColor);

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission here
        console.log('Form submitted');
    };

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', py: 8 }}>
                <Container maxWidth="xl" sx={{ py: 8 }}>
                    {/* Header */}
                    <Box sx={{ textAlign: 'center', mb: 8 }}>
                        <Typography variant="h1" component="h1" gutterBottom>
                            Get in Touch
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto' }}>
                            I'm always interested in discussing research opportunities, collaborations, 
                            or any questions about AI ethics and privacy-preserving machine learning.
                        </Typography>
                    </Box>

                    {/* Contact Form */}
                    <Box sx={{ maxWidth: '700px', mx: 'auto' }}>
                        <Card sx={{ 
                            p: { xs: 4, md: 6 },
                            background: 'linear-gradient(145deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
                            backdropFilter: 'blur(20px)',
                            border: '1px solid rgba(255,255,255,0.08)',
                            boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
                        }}>
                            <CardContent sx={{ p: 0 }}>
                                <Typography variant="h3" gutterBottom sx={{ textAlign: 'center', mb: 4, fontWeight: 600 }}>
                                    Send Message
                                </Typography>
                                <Box component="form" onSubmit={handleSubmit}>
                                    <Stack spacing={3}>
                                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
                                            <TextField
                                                fullWidth
                                                label="First Name"
                                                variant="outlined"
                                                required
                                                sx={{
                                                    '& .MuiOutlinedInput-root': {
                                                        backgroundColor: 'rgba(255,255,255,0.02)',
                                                        '&:hover fieldset': {
                                                            borderColor: accentColor,
                                                        },
                                                        '&.Mui-focused fieldset': {
                                                            borderColor: accentColor,
                                                        },
                                                    },
                                                }}
                                            />
                                            <TextField
                                                fullWidth
                                                label="Last Name"
                                                variant="outlined"
                                                required
                                                sx={{
                                                    '& .MuiOutlinedInput-root': {
                                                        backgroundColor: 'rgba(255,255,255,0.02)',
                                                        '&:hover fieldset': {
                                                            borderColor: accentColor,
                                                        },
                                                        '&.Mui-focused fieldset': {
                                                            borderColor: accentColor,
                                                        },
                                                    },
                                                }}
                                            />
                                        </Stack>
                                        <TextField
                                            fullWidth
                                            label="Email"
                                            type="email"
                                            variant="outlined"
                                            required
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    backgroundColor: 'rgba(255,255,255,0.02)',
                                                    '&:hover fieldset': {
                                                        borderColor: accentColor,
                                                    },
                                                    '&.Mui-focused fieldset': {
                                                        borderColor: accentColor,
                                                    },
                                                },
                                            }}
                                        />
                                        <TextField
                                            fullWidth
                                            label="Subject"
                                            variant="outlined"
                                            required
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    backgroundColor: 'rgba(255,255,255,0.02)',
                                                    '&:hover fieldset': {
                                                        borderColor: accentColor,
                                                    },
                                                    '&.Mui-focused fieldset': {
                                                        borderColor: accentColor,
                                                    },
                                                },
                                            }}
                                        />
                                        <TextField
                                            fullWidth
                                            label="Message"
                                            multiline
                                            rows={5}
                                            required
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    backgroundColor: 'rgba(255,255,255,0.02)',
                                                    '&:hover fieldset': {
                                                        borderColor: accentColor,
                                                    },
                                                    '&.Mui-focused fieldset': {
                                                        borderColor: accentColor,
                                                    },
                                                },
                                            }}
                                        />
                                        <Button 
                                            type="submit" 
                                            variant="contained" 
                                            size="large"
                                            endIcon={<Send />}
                                            sx={{ 
                                                py: 1.5,
                                                px: 4,
                                                fontSize: '1.1rem',
                                                fontWeight: 600,
                                                background: `linear-gradient(45deg, ${accentColor}, ${accentColor}dd)`,
                                                '&:hover': {
                                                    background: `linear-gradient(45deg, ${accentColor}dd, ${accentColor})`,
                                                    transform: 'translateY(-2px)',
                                                    boxShadow: `0 10px 25px ${accentColor}40`,
                                                },
                                                transition: 'all 0.3s ease',
                                            }}
                                        >
                                            Send Message
                                        </Button>
                                    </Stack>
                                </Box>
                            </CardContent>
                        </Card>

                        {/* Alternative Contact Methods */}
                        <Box sx={{ mt: 6, textAlign: 'center' }}>
                            <Typography variant="h6" gutterBottom sx={{ color: 'text.secondary', mb: 3 }}>
                                Or reach out directly
                            </Typography>
                            <Stack direction="row" spacing={3} justifyContent="center" alignItems="center">
                                <Link 
                                    href="mailto:thomas@example.com" 
                                    sx={{ 
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1,
                                        color: 'text.secondary',
                                        textDecoration: 'none',
                                        '&:hover': {
                                            color: accentColor,
                                        },
                                    }}
                                >
                                    <Email />
                                    <Typography variant="body2">thomas@example.com</Typography>
                                </Link>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>•</Typography>
                                <Link 
                                    href="https://github.com/thomasc33" 
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    sx={{ 
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1,
                                        color: 'text.secondary',
                                        textDecoration: 'none',
                                        '&:hover': {
                                            color: accentColor,
                                        },
                                    }}
                                >
                                    <GitHub />
                                    <Typography variant="body2">GitHub</Typography>
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
                                        '&:hover': {
                                            color: accentColor,
                                        },
                                    }}
                                >
                                    <LinkedIn />
                                    <Typography variant="body2">LinkedIn</Typography>
                                </Link>
                            </Stack>
                        </Box>
                    </Box>
                </Container>
            </Box>
        </ThemeProvider>
    );
}

export default ContactPage;
