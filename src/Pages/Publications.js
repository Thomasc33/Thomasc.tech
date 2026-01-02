import React from 'react';
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
} from '@mui/material';
import {
    Article,
    School,
    Psychology,
    Biotech,
    Launch,
} from '@mui/icons-material';
import createDarkTheme from '../theme';

const publications = {
    published: [
        {
            title: 'Federated Learning for Privacy-Preserving Healthcare Analytics',
            authors: 'Thomas Carr, Jane Smith, John Doe',
            venue: 'Nature Machine Intelligence',
            year: '2024',
            type: 'Journal',
            link: 'https://doi.org/example123',
            status: 'Published',
        },
        {
            title: 'Differential Privacy in Deep Learning: A Comprehensive Survey',
            authors: 'Thomas Carr, Alice Johnson',
            venue: 'IEEE Transactions on Pattern Analysis and Machine Intelligence',
            year: '2023',
            type: 'Journal',
            link: 'https://doi.org/example456',
            status: 'Published',
        },
        {
            title: 'Bias Detection and Mitigation in Large Language Models',
            authors: 'Thomas Carr, Robert Wilson, Sarah Lee',
            venue: 'International Conference on Machine Learning (ICML)',
            year: '2023',
            type: 'Conference',
            link: 'https://arxiv.org/abs/2301.00000',
            status: 'Published',
        },
        {
            title: 'Secure Multi-Party Computation for Collaborative AI',
            authors: 'Thomas Carr, Michael Brown',
            venue: 'Neural Information Processing Systems (NeurIPS)',
            year: '2022',
            type: 'Conference',
            link: 'https://arxiv.org/abs/2212.00000',
            status: 'Published',
        },
    ],
    ongoing: [
        {
            title: 'Explainable AI for Medical Diagnosis',
            authors: 'Thomas Carr, Dr. Emily Chen',
            venue: 'Under Review - Journal of Medical AI',
            year: '2024',
            type: 'Journal',
            status: 'Under Review',
        },
        {
            title: 'Privacy-Preserving Federated Learning for IoT Devices',
            authors: 'Thomas Carr, David Kim',
            venue: 'In Preparation',
            year: '2024',
            type: 'Workshop',
            status: 'In Preparation',
        },
    ],
};

function PublicationsPage() {
    const accentColor = localStorage.getItem('accentColor') || '#2563eb';
    const theme = createDarkTheme(accentColor);

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
            case 'In Preparation': return 'info';
            default: return 'default';
        }
    };

    const renderPublication = (publication, index) => (
        <Card 
            key={publication.title}
            sx={{ 
                mb: 3,
                background: 'linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.1)',
                transition: 'all 0.3s ease',
                '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
                }
            }}
        >
            <CardContent sx={{ p: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 3 }}>
                    <Avatar sx={{ bgcolor: accentColor, width: 56, height: 56, flexShrink: 0 }}>
                        {getTypeIcon(publication.type)}
                    </Avatar>
                    <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                            {publication.title}
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ mb: 2, fontSize: '1rem' }}>
                            {publication.authors}
                        </Typography>
                        <Typography variant="body2" color="text.primary" sx={{ mb: 3, fontWeight: 500 }}>
                            <strong>{publication.venue}</strong> • {publication.year}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                            <Chip
                                label={publication.status}
                                size="medium"
                                color={getStatusColor(publication.status)}
                                sx={{ fontWeight: 600, px: 2 }}
                            />
                            <Chip
                                label={publication.type}
                                size="medium"
                                variant="outlined"
                                sx={{ borderColor: accentColor, color: accentColor }}
                            />
                            {publication.link && (
                                <Button
                                    size="small"
                                    href={publication.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    startIcon={<Launch />}
                                    sx={{ ml: 'auto' }}
                                >
                                    View Paper
                                </Button>
                            )}
                        </Box>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', py: 8 }}>
                <Container maxWidth="xl" sx={{ py: 8 }}>
                    {/* Header */}
                    <Box sx={{ textAlign: 'center', mb: 8 }}>
                        <Typography variant="h1" component="h1" gutterBottom>
                            Publications
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto' }}>
                            Academic publications and ongoing research in ethical machine learning, 
                            privacy-preserving technologies, and artificial intelligence.
                        </Typography>
                    </Box>

                    {/* Published Works */}
                    <Box sx={{ mb: 8 }}>
                        <Typography variant="h3" gutterBottom>
                            Published Works
                        </Typography>
                        <Box>
                            {publications.published.map((publication, index) => 
                                renderPublication(publication, index)
                            )}
                        </Box>
                    </Box>

                    {/* Ongoing Works */}
                    <Box>
                        <Typography variant="h3" gutterBottom>
                            Ongoing Research
                        </Typography>
                        <Box>
                            {publications.ongoing.map((publication, index) => 
                                renderPublication(publication, index)
                            )}
                        </Box>
                    </Box>
                </Container>
            </Box>
        </ThemeProvider>
    );
}

export default PublicationsPage;
