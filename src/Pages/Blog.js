import React, { useState } from 'react';
import {
    Box,
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    CardActions,
    Button,
    Chip,
    Avatar,
    ThemeProvider,
} from '@mui/material';
import {
    Article,
    CalendarToday,
    AccessTime,
    Comment,
    Favorite,
} from '@mui/icons-material';
import createDarkTheme from '../theme';

const blogPosts = [
    {
        title: 'The Future of Privacy in Machine Learning',
        excerpt: 'Exploring emerging techniques in differential privacy and federated learning that are reshaping how we approach data protection in AI systems.',
        category: 'Privacy',
        date: '2024-01-15',
        readTime: '8 min read',
        likes: 42,
        comments: 5,
        image: '/blog/privacy-ml.jpg',
    },
    {
        title: 'Building Ethical AI: A Practical Guide',
        excerpt: 'A comprehensive framework for implementing ethical considerations throughout the machine learning lifecycle, from data collection to deployment.',
        category: 'AI Ethics',
        date: '2024-01-10',
        readTime: '12 min read',
        likes: 68,
        comments: 12,
        image: '/blog/ethical-ai.jpg',
    },
    {
        title: 'Understanding Bias in Large Language Models',
        excerpt: 'Deep dive into the sources of bias in LLMs and practical strategies for detection and mitigation in real-world applications.',
        category: 'Bias & Fairness',
        date: '2024-01-05',
        readTime: '10 min read',
        likes: 55,
        comments: 8,
        image: '/blog/llm-bias.jpg',
    },
    {
        title: 'Federated Learning in Healthcare: Opportunities and Challenges',
        excerpt: 'Examining real-world applications of federated learning in medical settings and the unique privacy challenges they present.',
        category: 'Healthcare',
        date: '2023-12-28',
        readTime: '15 min read',
        likes: 73,
        comments: 15,
        image: '/blog/healthcare-fl.jpg',
    },
    {
        title: 'The Mathematics Behind Differential Privacy',
        excerpt: 'A gentle introduction to the mathematical foundations of differential privacy and its practical implications for data science.',
        category: 'Theory',
        date: '2023-12-20',
        readTime: '20 min read',
        likes: 38,
        comments: 6,
        image: '/blog/dp-math.jpg',
    },
    {
        title: 'Secure Multi-Party Computation: A Primer',
        excerpt: 'Understanding the basics of SMPC protocols and their role in enabling privacy-preserving collaborative computation.',
        category: 'Cryptography',
        date: '2023-12-15',
        readTime: '18 min read',
        likes: 45,
        comments: 9,
        image: '/blog/smpc-primer.jpg',
    },
];

const categories = ['All', 'Privacy', 'AI Ethics', 'Bias & Fairness', 'Healthcare', 'Theory', 'Cryptography'];

function BlogPage() {
    const accentColor = localStorage.getItem('accentColor') || '#2563eb';
    const theme = createDarkTheme(accentColor);
    const [selectedCategory, setSelectedCategory] = useState('All');

    const filteredPosts = selectedCategory === 'All' 
        ? blogPosts 
        : blogPosts.filter(post => post.category === selectedCategory);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    };

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', py: 8 }}>
                <Container maxWidth="lg">
                    {/* Header */}
                    <Box sx={{ textAlign: 'center', mb: 8 }}>
                        <Typography variant="h1" component="h1" gutterBottom>
                            Blog
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto' }}>
                            Thoughts on AI ethics, privacy research, and the future of machine learning. 
                            Sharing insights from my research journey and practical experiences.
                        </Typography>
                    </Box>

                    {/* Category Filter */}
                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 6 }}>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                            {categories.map((category) => (
                                <Button
                                    key={category}
                                    variant={selectedCategory === category ? 'contained' : 'outlined'}
                                    onClick={() => setSelectedCategory(category)}
                                    sx={{ borderRadius: 20 }}
                                >
                                    {category}
                                </Button>
                            ))}
                        </Box>
                    </Box>

                    {/* Blog Posts Grid */}
                    <Grid container spacing={3}>
                        {filteredPosts.map((post) => (
                            <Grid item xs={12} md={6} lg={4} key={post.title}>
                                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                    <CardContent sx={{ flexGrow: 1, p: 3 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                            <Avatar sx={{ bgcolor: accentColor, mr: 2 }}>
                                                <Article />
                                            </Avatar>
                                            <Chip 
                                                label={post.category} 
                                                size="small" 
                                                variant="outlined"
                                            />
                                        </Box>
                                        <Typography variant="h6" gutterBottom>
                                            {post.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                                            {post.excerpt}
                                        </Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 'auto' }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
                                                <CalendarToday sx={{ fontSize: 16, mr: 0.5 }} />
                                                <Typography variant="caption">
                                                    {formatDate(post.date)}
                                                </Typography>
                                            </Box>
                                            <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
                                                <AccessTime sx={{ fontSize: 16, mr: 0.5 }} />
                                                <Typography variant="caption">
                                                    {post.readTime}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </CardContent>
                                    <CardActions sx={{ px: 3, pb: 3, pt: 0 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mr: 'auto' }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
                                                <Favorite sx={{ fontSize: 16, mr: 0.5 }} />
                                                <Typography variant="caption">
                                                    {post.likes}
                                                </Typography>
                                            </Box>
                                            <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
                                                <Comment sx={{ fontSize: 16, mr: 0.5 }} />
                                                <Typography variant="caption">
                                                    {post.comments}
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <Button size="small">Read More</Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>
        </ThemeProvider>
    );
}

export default BlogPage;
