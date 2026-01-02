import React from 'react';
import {
    Box,
    Container,
    Typography,
    Card,
    CardContent,
    ThemeProvider,
    List,
    ListItem,
    ListItemText,
} from '@mui/material';
import {
    School,
    Work,
} from '@mui/icons-material';
import createDarkTheme from '../theme';

const education = [
    {
        degree: 'Ph.D. in Computer Science',
        school: 'University of North Carolina at Charlotte',
        period: '2023 - 2026',
        description: 'Focus on AI ethics and privacy-preserving machine learning',
    },
    {
        degree: 'M.S. in Computer Science',
        school: 'University of North Carolina at Charlotte',
        period: '2022 - 2022',
        description: 'Specialization in machine learning and data mining',
    },
    {
        degree: 'B.S. in Computer Science',
        school: 'University of North Carolina at Charlotte',
        period: '2019 - 2021',
        description: 'Summa Cum Laude, Minor in Mathematics',
    },
];

const experience = [
    {
        title: 'AI Research Assistant',
        organization: 'UNC Charlotte',
        period: '2020 - Present',
        description: 'Research on federated learning and differential privacy in healthcare applications',
    },
    {
        title: 'Software Engineer Intern',
        organization: 'Red Ventures',
        period: 'Summer 2019',
        description: 'Developed machine learning pipelines for marketing analytics',
    },
];

const skills = {
    'Machine Learning': ['PyTorch', 'TensorFlow', 'Scikit-learn', 'Keras'],
    'Programming': ['Python', 'JavaScript', 'React', 'Node.js', 'SQL'],
    'Research': ['Statistical Analysis', 'Experimental Design', 'Technical Writing'],
    'Languages': ['English (Native)', 'Spanish (Basic)'],
};

function AboutPage() {
    const accentColor = localStorage.getItem('accentColor') || '#2563eb';
    const theme = createDarkTheme(accentColor);

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', py: 8 }}>
                <Container maxWidth="xl" sx={{ py: 8 }}>
                    {/* Header */}
                    <Box sx={{ textAlign: 'center', mb: 8 }}>
                        <Typography variant="h1" component="h1" gutterBottom>
                            About Me
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto' }}>
                            Computer Science Ph.D. researcher specializing in ethical AI and privacy-preserving technologies. 
                            Passionate about creating machine learning systems that are transparent, fair, and respectful of user privacy.
                        </Typography>
                    </Box>

                    {/* Education & Experience */}
                    <Box sx={{ 
                        display: 'grid',
                        gridTemplateColumns: {
                            xs: '1fr',
                            md: '1fr 1fr'
                        },
                        gap: 4,
                        mb: 8
                    }}>
                        {/* Education Card */}
                        <Card sx={{ height: '100%', background: 'linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)' }}>
                                <CardContent sx={{ p: 4 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                                        <School sx={{ fontSize: 28, color: accentColor, mr: 2 }} />
                                        <Typography variant="h4">Education</Typography>
                                    </Box>
                                    <List>
                                        {education.map((edu, index) => (
                                            <ListItem key={index} sx={{ px: 0, pb: 3 }}>
                                                <ListItemText
                                                    primary={edu.degree}
                                                    secondary={
                                                        <>
                                                            <Typography component="span" variant="body2" color="text.primary">
                                                                {edu.school}
                                                            </Typography>
                                                            <br />
                                                            <Typography component="span" variant="body2" color="text.secondary">
                                                                {edu.period}
                                                            </Typography>
                                                            <br />
                                                            <Typography component="span" variant="body2" color="text.secondary">
                                                                {edu.description}
                                                            </Typography>
                                                        </>
                                                    }
                                                />
                                            </ListItem>
                                        ))}
                                    </List>
                                </CardContent>
                            </Card>

                        {/* Experience Card */}
                        <Card sx={{ height: '100%', background: 'linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)' }}>
                                <CardContent sx={{ p: 4 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                                        <Work sx={{ fontSize: 28, color: accentColor, mr: 2 }} />
                                        <Typography variant="h4">Experience</Typography>
                                    </Box>
                                    <List>
                                        {experience.map((exp, index) => (
                                            <ListItem key={index} sx={{ px: 0, pb: 3 }}>
                                                <ListItemText
                                                    primary={exp.title}
                                                    secondary={
                                                        <>
                                                            <Typography component="span" variant="body2" color="text.primary">
                                                                {exp.organization}
                                                            </Typography>
                                                            <br />
                                                            <Typography component="span" variant="body2" color="text.secondary">
                                                                {exp.period}
                                                            </Typography>
                                                            <br />
                                                            <Typography component="span" variant="body2" color="text.secondary">
                                                                {exp.description}
                                                            </Typography>
                                                        </>
                                                    }
                                                />
                                            </ListItem>
                                        ))}
                                    </List>
                                </CardContent>
                            </Card>
                    </Box>

                    {/* Skills */}
                    <Card sx={{ background: 'linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)' }}>
                        <CardContent sx={{ p: 4 }}>
                            <Typography variant="h3" gutterBottom textAlign="center">
                                Technical Skills
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                {Object.entries(skills).map(([category, items]) => (
                                    <Box key={category}>
                                        <Typography variant="h6" gutterBottom sx={{ color: accentColor, fontWeight: 600 }}>
                                            {category}
                                        </Typography>
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                            {items.map((skill) => (
                                                <Box
                                                    key={skill}
                                                    sx={{
                                                        px: 2,
                                                        py: 0.5,
                                                        bgcolor: 'rgba(255,255,255,0.1)',
                                                        borderRadius: 1,
                                                        fontSize: '0.875rem',
                                                        color: 'text.secondary',
                                                        border: '1px solid rgba(255,255,255,0.2)'
                                                    }}
                                                >
                                                    {skill}
                                                </Box>
                                            ))}
                                        </Box>
                                    </Box>
                                ))}
                            </Box>
                        </CardContent>
                    </Card>
                </Container>
            </Box>
        </ThemeProvider>
    );
}

export default AboutPage;
