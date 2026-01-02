import React from 'react';
import {
    Box,
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    Avatar,
    ThemeProvider,
} from '@mui/material';
import {
    EmojiEvents,
    School,
    WorkspacePremium,
    MilitaryTech,
} from '@mui/icons-material';
import createDarkTheme from '../theme';

const achievements = [
    {
        number: '5+',
        label: 'Published Papers',
        icon: <EmojiEvents />,
    },
    {
        number: '3',
        label: 'Best Paper Awards',
        icon: <WorkspacePremium />,
    },
    {
        number: '$50K+',
        label: 'Research Funding',
        icon: <MilitaryTech />,
    },
    {
        number: '10+',
        label: 'Conference Talks',
        icon: <School />,
    },
];

const awards = [
    {
        title: 'Best Paper Award',
        organization: 'International Conference on Machine Learning (ICML)',
        date: '2023',
        description: 'Recognized for outstanding research on differential privacy in deep learning systems.',
        type: 'Conference',
    },
    {
        title: 'Outstanding Research Assistant',
        organization: 'UNC Charlotte College of Computing',
        date: '2022',
        description: 'Awarded for exceptional contributions to AI ethics research and mentoring.',
        type: 'University',
    },
    {
        title: 'NSF Graduate Research Fellowship',
        organization: 'National Science Foundation',
        date: '2021',
        description: 'Three-year fellowship supporting research in privacy-preserving machine learning.',
        type: 'National',
    },
    {
        title: 'Google PhD Fellowship',
        organization: 'Google',
        date: '2021',
        description: 'Fellowship for research in machine learning and artificial intelligence ethics.',
        type: 'Industry',
    },
    {
        title: 'Best Student Paper',
        organization: 'Neural Information Processing Systems (NeurIPS)',
        date: '2020',
        description: 'Recognition for innovative work on federated learning in healthcare applications.',
        type: 'Conference',
    },
];

const certifications = [
    {
        title: 'TensorFlow Developer Certificate',
        organization: 'Google',
        date: '2023',
        description: 'Professional certification in TensorFlow and machine learning implementation.',
    },
    {
        title: 'AWS Certified Machine Learning Specialty',
        organization: 'Amazon Web Services',
        date: '2022',
        description: 'Expertise in deploying and managing ML models on AWS infrastructure.',
    },
    {
        title: 'Professional Data Scientist',
        organization: 'IBM',
        date: '2022',
        description: 'Certification in advanced data science methodologies and best practices.',
    },
];

function AwardsPage() {
    const accentColor = localStorage.getItem('accentColor') || '#2563eb';
    const theme = createDarkTheme(accentColor);

    const getAwardIcon = (type) => {
        switch(type) {
            case 'Conference': return <EmojiEvents />;
            case 'University': return <School />;
            case 'National': return <MilitaryTech />;
            case 'Industry': return <WorkspacePremium />;
            default: return <EmojiEvents />;
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', py: 8 }}>
                <Container maxWidth="lg">
                    {/* Header */}
                    <Box sx={{ textAlign: 'center', mb: 8 }}>
                        <Typography variant="h1" component="h1" gutterBottom>
                            Awards & Recognition
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto' }}>
                            Recognition for excellence in research, innovation, and academic achievement 
                            throughout my journey in AI ethics and machine learning.
                        </Typography>
                    </Box>

                    {/* Key Achievements */}
                    <Box sx={{ mb: 8 }}>
                        <Typography variant="h3" gutterBottom textAlign="center">
                            Key Achievements
                        </Typography>
                        <Grid container spacing={3}>
                            {achievements.map((achievement, index) => (
                                <Grid item xs={12} sm={6} md={3} key={index}>
                                    <Card sx={{ textAlign: 'center', py: 4 }}>
                                        <Avatar sx={{ 
                                            bgcolor: accentColor, 
                                            width: 64, 
                                            height: 64, 
                                            mx: 'auto', 
                                            mb: 2 
                                        }}>
                                            {achievement.icon}
                                        </Avatar>
                                        <Typography variant="h4" color="primary" gutterBottom>
                                            {achievement.number}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {achievement.label}
                                        </Typography>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>

                    {/* Awards */}
                    <Box sx={{ mb: 8 }}>
                        <Typography variant="h3" gutterBottom>
                            Awards & Honors
                        </Typography>
                        <Grid container spacing={3}>
                            {awards.map((award, index) => (
                                <Grid item xs={12} md={6} key={award.title}>
                                    <Card sx={{ p: 3 }}>
                                        <CardContent sx={{ p: 0 }}>
                                            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 3 }}>
                                                <Avatar sx={{ bgcolor: accentColor, width: 48, height: 48 }}>
                                                    {getAwardIcon(award.type)}
                                                </Avatar>
                                                <Box sx={{ flexGrow: 1 }}>
                                                    <Typography variant="h6" gutterBottom>
                                                        {award.title}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                                        <strong>{award.organization}</strong> • {award.date}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        {award.description}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>

                    {/* Certifications */}
                    <Box>
                        <Typography variant="h3" gutterBottom>
                            Professional Certifications
                        </Typography>
                        <Grid container spacing={3}>
                            {certifications.map((cert, index) => (
                                <Grid item xs={12} md={6} lg={4} key={cert.title}>
                                    <Card sx={{ p: 3, height: '100%' }}>
                                        <CardContent sx={{ p: 0, textAlign: 'center' }}>
                                            <Avatar sx={{ 
                                                bgcolor: accentColor, 
                                                width: 56, 
                                                height: 56, 
                                                mx: 'auto', 
                                                mb: 2 
                                            }}>
                                                <WorkspacePremium />
                                            </Avatar>
                                            <Typography variant="h6" gutterBottom>
                                                {cert.title}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                                <strong>{cert.organization}</strong>
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {cert.date}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </Container>
            </Box>
        </ThemeProvider>
    );
}

export default AwardsPage;
