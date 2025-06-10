import React, { useState } from 'react';
import { 
    Box, 
    Container, 
    Typography, 
    Card,
    CardContent,
    Chip, 
    Grid, 
    Button,
    ThemeProvider,
    Fade,
    Zoom,
    Avatar,
    IconButton,
    Divider
} from '@mui/material';
import { styled } from '@mui/material/styles';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import createHypermodernTheme from '../theme';

const blogData = require('../Data/blog.json');

// Styled components
const BlogCard = styled(Card)(({ accentcolor, featured }) => ({
    background: `linear-gradient(135deg, rgba(30, 30, 40, 0.9), rgba(40, 40, 50, 0.8))`,
    backdropFilter: 'blur(20px)',
    border: featured ? `2px solid ${accentcolor}60` : `1px solid ${accentcolor}30`,
    borderRadius: '20px',
    boxShadow: featured 
        ? `0 25px 50px rgba(0, 0, 0, 0.4), 0 0 30px ${accentcolor}30`
        : `0 20px 40px rgba(0, 0, 0, 0.3), 0 0 20px ${accentcolor}20`,
    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    position: 'relative',
    overflow: 'hidden',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: featured ? '6px' : '4px',
        background: `linear-gradient(90deg, ${accentcolor}, ${accentcolor}80)`,
    },
    '&:hover': {
        transform: 'translateY(-8px) scale(1.02)',
        boxShadow: `0 30px 60px rgba(0, 0, 0, 0.4), 0 0 40px ${accentcolor}40`,
        border: `2px solid ${accentcolor}60`,
    },
}));

const CategoryChip = styled(Chip)(({ accentcolor, category }) => {
    const colors = {
        'Research': `${accentcolor}`,
        'Technical': '#4CAF50',
        'Development': '#2196F3',
        'Opinion': '#FF9800'
    };
    
    return {
        background: `linear-gradient(135deg, ${colors[category] || accentcolor}, ${colors[category] || accentcolor}cc)`,
        color: 'white',
        fontWeight: 600,
        fontSize: '0.75rem',
        '&:hover': {
            background: `linear-gradient(135deg, ${colors[category] || accentcolor}dd, ${colors[category] || accentcolor})`,
        },
    };
});

function BlogPage() {
    const accentColor = localStorage.getItem('accentColor') || '#aa00ff';
    const theme = createHypermodernTheme(accentColor);
    const [selectedCategory, setSelectedCategory] = useState('All');

    const categories = ['All', 'Research', 'Technical', 'Development', 'Opinion'];
    
    const filteredArticles = selectedCategory === 'All' 
        ? blogData.articles 
        : blogData.articles.filter(article => article.category === selectedCategory);

    const renderArticle = (article, index) => {
        return (
            <Zoom in={true} style={{ transitionDelay: `${index * 150}ms` }} key={article.id}>
                <Grid item xs={12} md={6} lg={4}>
                    <BlogCard accentcolor={accentColor} featured={article.featured}>
                        <CardContent sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
                            {/* Header */}
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                <CategoryChip 
                                    label={article.category}
                                    size="small"
                                    accentcolor={accentColor}
                                    category={article.category}
                                />
                                {article.featured && (
                                    <Chip
                                        label="Featured"
                                        size="small"
                                        sx={{
                                            background: `linear-gradient(135deg, ${accentColor}, ${accentColor}cc)`,
                                            color: 'white',
                                            fontWeight: 600,
                                            fontSize: '0.7rem',
                                        }}
                                    />
                                )}
                            </Box>

                            {/* Title */}
                            <Typography 
                                variant="h5" 
                                sx={{ 
                                    background: `linear-gradient(135deg, ${accentColor}, #ffffff)`,
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                    fontWeight: 700, 
                                    mb: 2, 
                                    lineHeight: 1.3,
                                    cursor: 'pointer',
                                    '&:hover': {
                                        background: `linear-gradient(135deg, ${accentColor}dd, #ffffff)`,
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        backgroundClip: 'text',
                                    }
                                }}
                            >
                                {article.title}
                            </Typography>

                            {/* Excerpt */}
                            <Typography 
                                variant="body2" 
                                sx={{ 
                                    color: 'rgba(255, 255, 255, 0.8)', 
                                    mb: 3, 
                                    lineHeight: 1.6,
                                    flex: 1
                                }}
                            >
                                {article.excerpt}
                            </Typography>

                            {/* Meta Info */}
                            <Box sx={{ mb: 2 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                        <CalendarTodayIcon sx={{ fontSize: '0.9rem', color: accentColor }} />
                                        <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                                            {new Date(article.publishDate).toLocaleDateString()}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                        <AccessTimeIcon sx={{ fontSize: '0.9rem', color: accentColor }} />
                                        <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                                            {article.readTime}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>

                            {/* Tags */}
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
                                {article.tags.slice(0, 3).map((tag, tagIndex) => (
                                    <Chip
                                        key={tagIndex}
                                        label={tag}
                                        size="small"
                                        sx={{
                                            background: `${accentColor}20`,
                                            border: `1px solid ${accentColor}40`,
                                            color: 'white',
                                            fontSize: '0.7rem',
                                            height: '24px',
                                        }}
                                    />
                                ))}
                            </Box>

                            {/* Footer */}
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 'auto' }}>
                                <Box sx={{ display: 'flex', gap: 2 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                        <IconButton size="small" sx={{ color: '#ff4757' }}>
                                            <FavoriteIcon fontSize="small" />
                                        </IconButton>
                                        <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                                            {article.likes}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                        <IconButton size="small" sx={{ color: accentColor }}>
                                            <CommentIcon fontSize="small" />
                                        </IconButton>
                                        <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                                            {article.comments}
                                        </Typography>
                                    </Box>
                                </Box>
                                <Button
                                    size="small"
                                    sx={{
                                        background: `linear-gradient(135deg, ${accentColor}30, ${accentColor}20)`,
                                        color: accentColor,
                                        fontWeight: 600,
                                        fontSize: '0.8rem',
                                        px: 2,
                                        py: 0.5,
                                        borderRadius: '8px',
                                        border: `1px solid ${accentColor}40`,
                                        '&:hover': {
                                            background: `linear-gradient(135deg, ${accentColor}40, ${accentColor}30)`,
                                            color: 'white',
                                        }
                                    }}
                                >
                                    Read More
                                </Button>
                            </Box>
                        </CardContent>
                    </BlogCard>
                </Grid>
            </Zoom>
        );
    };

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
                <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 10 }}>
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
                                Blog & Articles
                            </Typography>
                            <Typography 
                                variant="h5" 
                                sx={{ 
                                    color: 'rgba(255, 255, 255, 0.9)',
                                    maxWidth: '800px',
                                    mx: 'auto',
                                    lineHeight: 1.6,
                                    fontWeight: 400,
                                }}
                            >
                                Insights on AI ethics, privacy research, and cutting-edge technology developments.
                            </Typography>
                        </Box>
                    </Fade>

                    {/* Category Filter */}
                    <Fade in={true} timeout={1500}>
                        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 6 }}>
                            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
                                {categories.map((category) => (
                                    <Button
                                        key={category}
                                        onClick={() => setSelectedCategory(category)}
                                        sx={{
                                            background: selectedCategory === category 
                                                ? `linear-gradient(135deg, ${accentColor}, ${accentColor}cc)`
                                                : 'rgba(255, 255, 255, 0.1)',
                                            color: selectedCategory === category ? 'white' : 'rgba(255, 255, 255, 0.8)',
                                            fontWeight: 600,
                                            px: 3,
                                            py: 1,
                                            borderRadius: '25px',
                                            border: selectedCategory === category 
                                                ? `1px solid ${accentColor}60`
                                                : '1px solid rgba(255, 255, 255, 0.2)',
                                            '&:hover': {
                                                background: selectedCategory === category 
                                                    ? `linear-gradient(135deg, ${accentColor}dd, ${accentColor})`
                                                    : `${accentColor}20`,
                                                color: 'white',
                                            }
                                        }}
                                    >
                                        {category}
                                    </Button>
                                ))}
                            </Box>
                        </Box>
                    </Fade>

                    {/* Articles Grid */}
                    <Grid container spacing={4}>
                        {filteredArticles.map((article, index) => renderArticle(article, index))}
                    </Grid>
                </Container>
            </Box>
        </ThemeProvider>
    );
}

export default BlogPage;
