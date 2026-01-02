import React, { useState } from 'react';
import { 
    Box,
    Container,
    Typography,
    Card,
    CardContent,
    CardActions,
    Avatar,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Chip
} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import {
    GitHub,
    Launch,
    Psychology,
    Security,
    Code,
    Biotech,
    Close,
} from '@mui/icons-material';
import createDarkTheme from '../theme';

const projects = [
    {
        title: 'Federated Learning for Healthcare',
        description: 'Developed privacy-preserving machine learning models that train on distributed hospital data without sharing sensitive patient information.',
        technologies: ['PyTorch', 'TensorFlow', 'Differential Privacy', 'Flower'],
        icon: <Psychology />,
        github: 'https://github.com/thomasc33/federated-healthcare',
        demo: 'https://demo.example.com',
        featured: true,
    },
    {
        title: 'AI Ethics Audit Framework',
        description: 'Created a comprehensive framework for auditing AI systems for bias, fairness, and transparency in decision-making processes.',
        technologies: ['Python', 'Scikit-learn', 'Pandas', 'Streamlit'],
        icon: <Security />,
        github: 'https://github.com/thomasc33/ethics-audit',
        featured: true,
    },
    {
        title: 'Privacy-Preserving Recommendation System',
        description: 'Built a recommendation engine using homomorphic encryption to protect user preferences while providing personalized suggestions.',
        technologies: ['React', 'Node.js', 'TenSEAL', 'MongoDB'],
        icon: <Biotech />,
        github: 'https://github.com/thomasc33/privacy-recsys',
        demo: 'https://privacy-recsys.example.com',
    },
    {
        title: 'ML Model Interpretability Toolkit',
        description: 'Developed an open-source toolkit for visualizing and interpreting complex machine learning model decisions.',
        technologies: ['Python', 'SHAP', 'LIME', 'Plotly'],
        icon: <Code />,
        github: 'https://github.com/thomasc33/ml-interpretability',
    },
    {
        title: 'Secure Multi-Party Computation Library',
        description: 'Implemented cryptographic protocols for secure computation among multiple parties without revealing private inputs.',
        technologies: ['C++', 'Python', 'MP-SPDZ', 'OpenSSL'],
        icon: <Security />,
        github: 'https://github.com/thomasc33/smpc-lib',
    },
    {
        title: 'Bias Detection in NLP Models',
        description: 'Research project identifying and mitigating gender and racial bias in large language models.',
        technologies: ['Python', 'Hugging Face', 'Transformers', 'NLTK'],
        icon: <Psychology />,
        github: 'https://github.com/thomasc33/nlp-bias-detection',
    },
];

function ProjectsPage() {
    const accentColor = localStorage.getItem('accentColor') || '#2563eb';
    const theme = createDarkTheme(accentColor);
    const [selectedProject, setSelectedProject] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleProjectClick = (project) => {
        setSelectedProject(project);
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
        setSelectedProject(null);
    };

    const getProjectIcon = (project) => {
        return project.icon;
    };

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', py: 8 }}>
                <Container maxWidth="xl" sx={{ py: 8 }}>
                    {/* Header */}
                    <Box sx={{ textAlign: 'center', mb: 8 }}>
                        <Typography variant="h1" component="h1" gutterBottom>
                            Projects
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto' }}>
                            A selection of my research and development projects in AI ethics, 
                            privacy-preserving machine learning, and innovative software solutions.
                        </Typography>
                    </Box>

                    {/* Projects Grid */}
                    <Box sx={{ 
                        display: 'grid',
                        gridTemplateColumns: {
                            xs: '1fr',
                            sm: 'repeat(2, 1fr)',
                            md: 'repeat(3, 1fr)'
                        },
                        gap: 3
                    }}>
                        {projects.map((project, index) => (
                            <Card 
                                key={project.title}
                                sx={{ 
                                    height: '100%', 
                                    display: 'flex', 
                                    flexDirection: 'column',
                                    cursor: 'pointer',
                                }}
                                onClick={() => handleProjectClick(project)}
                            >
                                    <CardContent sx={{ flexGrow: 1, p: 3 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                            <Avatar sx={{ bgcolor: accentColor, mr: 2 }}>
                                                {getProjectIcon(project)}
                                            </Avatar>
                                            <Typography variant="h6" component="h3">
                                                {project.title}
                                            </Typography>
                                        </Box>
                                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                            {project.description}
                                        </Typography>
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 'auto' }}>
                                            {project.technologies.slice(0, 3).map((tech) => (
                                                <Chip
                                                    key={tech}
                                                    label={tech}
                                                    size="small"
                                                    variant="outlined"
                                                    sx={{ fontSize: '0.75rem' }}
                                                />
                                            ))}
                                            {project.technologies.length > 3 && (
                                                <Chip
                                                    label={`+${project.technologies.length - 3}`}
                                                    size="small"
                                                    variant="outlined"
                                                    sx={{ fontSize: '0.75rem' }}
                                                />
                                            )}
                                        </Box>
                                    </CardContent>
                                    <CardActions sx={{ p: 2, pt: 0 }}>
                                        <Button
                                            size="small"
                                            startIcon={<GitHub />}
                                            href={project.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            Code
                                        </Button>
                                        {project.demo && (
                                            <Button
                                                size="small"
                                                startIcon={<Launch />}
                                                href={project.demo}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                Demo
                                            </Button>
                                        )}
                                    </CardActions>
                                </Card>
                            ))}
                        </Box>

                    {/* Project Detail Dialog */}
                    <Dialog 
                        open={dialogOpen} 
                        onClose={handleCloseDialog}
                        maxWidth="md"
                        fullWidth
                        PaperProps={{
                            sx: { borderRadius: 2 }
                        }}
                    >
                        {selectedProject && (
                            <>
                                <DialogTitle sx={{ 
                                    display: 'flex', 
                                    justifyContent: 'space-between', 
                                    alignItems: 'center',
                                    pb: 2
                                }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Avatar sx={{ bgcolor: accentColor, mr: 2 }}>
                                            {getProjectIcon(selectedProject)}
                                        </Avatar>
                                        <Typography variant="h5">
                                            {selectedProject.title}
                                        </Typography>
                                    </Box>
                                    <Button onClick={handleCloseDialog} sx={{ minWidth: 'auto', p: 1 }}>
                                        <Close />
                                    </Button>
                                </DialogTitle>
                                <DialogContent>
                                    <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                                        {selectedProject.description}
                                    </Typography>
                                    <Typography variant="h6" gutterBottom>
                                        Technologies Used
                                    </Typography>
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                                        {selectedProject.technologies.map((tech) => (
                                            <Chip
                                                key={tech}
                                                label={tech}
                                                variant="outlined"
                                            />
                                        ))}
                                    </Box>
                                </DialogContent>
                                <DialogActions sx={{ p: 3, pt: 0 }}>
                                    <Button
                                        variant="outlined"
                                        startIcon={<GitHub />}
                                        href={selectedProject.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        View on GitHub
                                    </Button>
                                    {selectedProject.demo && (
                                        <Button
                                            variant="contained"
                                            startIcon={<Launch />}
                                            href={selectedProject.demo}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            View Live Demo
                                        </Button>
                                    )}
                                </DialogActions>
                            </>
                        )}
                    </Dialog>
                </Container>
            </Box>
        </ThemeProvider>
    );
}

export default ProjectsPage;
