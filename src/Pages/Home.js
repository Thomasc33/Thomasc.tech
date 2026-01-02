import React from 'react';
import { 
    Box,
    Container,
    Typography,
    Card,
    CardContent,
    Avatar,
    Button,
    Stack
} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import {
    GitHub,
    LinkedIn,
    Mail,
    Download,
    Psychology,
    Code,
    School,
    Security,
} from '@mui/icons-material';
import createDarkTheme from '../theme';

const skills = [
    {
        icon: <Psychology />,
        title: 'Machine Learning',
        description: 'Deep learning, neural networks, and AI ethics research',
    },
    {
        icon: <Code />,
        title: 'Full-Stack Development',
        description: 'React, Node.js, Python, and modern web technologies',
    },
    {
        icon: <Security />,
        title: 'Privacy-Preserving ML',
        description: 'Federated learning, differential privacy, and secure computation',
    },
    {
        icon: <School />,
        title: 'Academic Research',
        description: 'Published papers, conference presentations, and peer review',
    },
];

const socialLinks = [
    {
        icon: <GitHub />,
        href: 'https://github.com/thomasc33',
        label: 'GitHub',
    },
    {
        icon: <LinkedIn />,
        href: 'https://www.linkedin.com/in/thomasc33/',
        label: 'LinkedIn',
    },
    {
        icon: <Mail />,
        href: 'mailto:tcarr23@uncc.edu',
        label: 'Email',
    },
];

function HomePage() {
    const accentColor = localStorage.getItem('accentColor') || '#2563eb';
    const theme = createDarkTheme(accentColor);

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
                {/* Hero Section */}
                <Container maxWidth="xl" sx={{ py: 8 }}>
                    <Box sx={{ textAlign: 'center', mb: 8 }}>
                        <Avatar
                            src="/profile.jpg"
                            sx={{
                                width: 120,
                                height: 120,
                                mb: 3,
                                mx: 'auto',
                                border: `3px solid ${accentColor}`,
                            }}
                        />
                        <Typography variant="h1" component="h1" gutterBottom>
                            Thomas Carr
                        </Typography>
                        <Typography variant="h4" color="text.secondary" gutterBottom>
                            AI Researcher & PhD Candidate
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto', mb: 4 }}>
                            Pioneering ethical machine learning and privacy-preserving technologies. 
                            Combining academic research with practical development to create responsible 
                            and transparent AI systems.
                        </Typography>
                        
                        <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 4 }}>
                            <Button variant="contained" size="large">
                                Download CV
                                <Download sx={{ ml: 1 }} />
                            </Button>
                            <Button variant="outlined" size="large">
                                Contact Me
                            </Button>
                        </Stack>

                        <Stack direction="row" spacing={2} justifyContent="center">
                            {socialLinks.map((link) => (
                                <Button
                                    key={link.label}
                                    component="a"
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    sx={{ 
                                        minWidth: 'auto', 
                                        p: 1,
                                        color: 'text.secondary',
                                        '&:hover': { color: accentColor }
                                    }}
                                >
                                    {link.icon}
                                </Button>
                            ))}
                        </Stack>
                    </Box>

                    {/* Skills Section */}
                    <Box sx={{ mb: 8 }}>
                        <Typography variant="h2" component="h2" gutterBottom textAlign="center">
                            Core Expertise
                        </Typography>
                        <Typography variant="body1" color="text.secondary" textAlign="center" sx={{ mb: 6 }}>
                            Specialized in the intersection of AI ethics, privacy, and machine learning
                        </Typography>
                        
                        <Box sx={{ 
                            display: 'grid',
                            gridTemplateColumns: {
                                xs: '1fr',
                                sm: 'repeat(2, 1fr)',
                                md: 'repeat(4, 1fr)'
                            },
                            gap: 3,
                            mb: 6
                        }}>
                            {skills.map((skill, index) => (
                                <Card key={skill.title} sx={{ height: '100%' }}>
                                        <CardContent sx={{ textAlign: 'center', py: 4 }}>
                                            <Box sx={{ 
                                                fontSize: 40, 
                                                color: accentColor, 
                                                mb: 2,
                                                display: 'flex',
                                                justifyContent: 'center'
                                            }}>
                                                {skill.icon}
                                            </Box>
                                            <Typography variant="h6" gutterBottom>
                                                {skill.title}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {skill.description}
                                            </Typography>
                                        </CardContent>
                                </Card>
                            ))}
                        </Box>
                    </Box>

                    {/* Call to Action */}
                    <Box sx={{ textAlign: 'center', py: 6 }}>
                        <Typography variant="h3" gutterBottom>
                            Interested in Collaboration?
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                            I'm always open to discussing research opportunities, 
                            collaborations, or speaking engagements.
                        </Typography>
                        <Button variant="contained" size="large">
                            Get in Touch
                        </Button>
                    </Box>
                </Container>
            </Box>
        </ThemeProvider>
    );
}

export default HomePage;
