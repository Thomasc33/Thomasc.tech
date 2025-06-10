import React from 'react';
import {
    Box,
    Container,
    Typography,
    Chip,
    Grid,
    Stack,
    ThemeProvider,
    Fade,
    Zoom,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    IconButton,
    Avatar
} from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import CloseIcon from '@mui/icons-material/Close';
import InfoIcon from '@mui/icons-material/Info';
import createHypermodernTheme from '../theme';
import '../css/About.css';
const { languages, frameworks, webServices, ide, operatingSystems, misc, machineLearning } = require('../Data/skills.json');
const experiences = require('../Data/experience.json');

// Styled components for modern effects
const pulseAnimation = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(170, 0, 255, 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(170, 0, 255, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(170, 0, 255, 0);
  }
`;

const floatAnimation = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const ModernCard = styled(Box)(({ accentcolor }) => ({
  background: `linear-gradient(135deg, rgba(30, 30, 40, 0.9), rgba(40, 40, 50, 0.8))`,
  backdropFilter: 'blur(20px)',
  border: `1px solid ${accentcolor}30`,
  borderRadius: '16px',
  padding: '2rem',
  boxShadow: `0 20px 40px rgba(0, 0, 0, 0.3), 0 0 20px ${accentcolor}20`,
  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '4px',
    height: '100%',
    background: `linear-gradient(180deg, ${accentcolor}, ${accentcolor}80)`,
    borderRadius: '0 2px 2px 0',
  },
  '&:hover': {
    transform: 'translateY(-8px) scale(1.02)',
    boxShadow: `0 30px 60px rgba(0, 0, 0, 0.4), 0 0 40px ${accentcolor}40`,
    border: `1px solid ${accentcolor}60`,
    '&::before': {
      width: '6px',
      boxShadow: `0 0 20px ${accentcolor}60`,
    },
  },
}));

const SkillCard = styled(Box)(({ theme, accentcolor }) => ({
  background: 'rgba(30, 30, 40, 0.8)',
  backdropFilter: 'blur(15px)',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  borderRadius: '16px',
  padding: '2rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: `linear-gradient(135deg, ${accentcolor || '#aa00ff'}15, transparent)`,
    zIndex: -1,
  },
  '&:hover': {
    transform: 'translateY(-10px) scale(1.02)',
    boxShadow: `0 25px 50px rgba(0, 0, 0, 0.4), 0 0 30px ${accentcolor || '#aa00ff'}30`,
    border: `1px solid ${accentcolor || '#aa00ff'}60`,
    animation: `${floatAnimation} 3s ease-in-out infinite`,
  },
}));



function AboutPage(props) {
    // Get the accent color for skill level calculations
    const accentColor = localStorage.getItem('accentColor') || '#aa00ff';
    const theme = createHypermodernTheme(accentColor);

    // State for dialogs
    const [openDialog, setOpenDialog] = React.useState(false);
    const [selectedExperience, setSelectedExperience] = React.useState(null);

    const handleOpenDialog = (experience) => {
        setSelectedExperience(experience);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedExperience(null);
    };

    // Function to calculate a random skill level between 3-5 stars for demo purposes
    // In a real app, you would have actual skill levels in your data
    const getSkillLevel = () => {
        return Math.floor(Math.random() * 3) + 3; // Random number between 3-5
    };

    // Modern star rating component using MUI icons
    const renderStarRating = (level) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <Box
                    key={i}
                    component={i <= level ? StarIcon : StarBorderIcon}
                    sx={{
                        color: i <= level ? accentColor : 'rgba(255, 255, 255, 0.3)',
                        fontSize: '1.5rem',
                        transition: 'all 0.3s ease',
                        filter: i <= level ? `drop-shadow(0 0 8px ${accentColor})` : 'none',
                        '&:hover': {
                            transform: 'scale(1.2)',
                            filter: `drop-shadow(0 0 12px ${accentColor})`,
                        },
                    }}
                />
            );
        }
        return (
            <Stack direction="row" spacing={0.5} justifyContent="center" sx={{ my: 2 }}>
                {stars}
            </Stack>
        );
    };

    // Compact skill chip component
    const renderSkillChip = (skill, index) => {
        const level = getSkillLevel();
        return (
            <Zoom in={true} style={{ transitionDelay: `${index * 50}ms` }} key={`${skill.label}-${index}`}>
                <Chip
                    avatar={
                        skill.icon ? (
                            <Avatar src={skill.icon} sx={{ width: 24, height: 24 }} />
                        ) : (
                            <Avatar sx={{
                                background: `linear-gradient(135deg, ${accentColor}, ${accentColor}cc)`,
                                width: 24,
                                height: 24,
                                fontSize: '0.7rem',
                                fontWeight: 700
                            }}>
                                {skill.label.charAt(0)}
                            </Avatar>
                        )
                    }
                    label={skill.label}
                    sx={{
                        background: `rgba(30, 30, 40, 0.8)`,
                        backdropFilter: 'blur(10px)',
                        border: `1px solid ${accentColor}40`,
                        color: 'white',
                        fontWeight: 500,
                        fontSize: '0.9rem',
                        height: '40px',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            background: `linear-gradient(135deg, ${accentColor}30, ${accentColor}20)`,
                            border: `1px solid ${accentColor}60`,
                            transform: 'translateY(-2px) scale(1.05)',
                            boxShadow: `0 8px 20px ${accentColor}30`,
                            cursor: 'pointer',
                        },
                    }}
                />
            </Zoom>
        );
    };

    return (
        <ThemeProvider theme={theme}>
            <Box
                component="section"
                className='about-page'
                sx={{
                    minHeight: 'calc(100vh - 80px)',
                    background: 'linear-gradient(135deg, rgba(10, 10, 15, 0.95), rgba(20, 20, 30, 0.9))',
                    position: 'relative',
                    pt: '80px',
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
                <Container
                    component="article"
                    maxWidth="xl"
                    sx={{
                        py: 4,
                        px: { xs: 2, md: 4 },
                        position: 'relative',
                        zIndex: 10,
                    }}
                >
                    {/* SEO Headers */}
                    <Box component="header" sx={{ position: 'absolute', left: '-9999px' }}>
                        <Typography variant="h1">Thomas Carr - Resume and Skills</Typography>
                        <Typography variant="body1">Computer Science Ph.D. researcher at UNC Charlotte specializing in ethical machine learning, privacy, and fairness.</Typography>
                    </Box>

                    {/* Introduction Section */}
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
                                Resume
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
                                Computer Science Ph.D. researcher specializing in ethical machine learning, privacy, and fairness.
                                Passionate about solving real-world problems with ethical and privacy-conscious solutions.
                            </Typography>
                        </Box>
                    </Fade>

                    {/* Education Section */}
                    <Fade in={true} timeout={1500}>
                        <Box sx={{ mb: 8 }}>
                            <Typography
                                variant="h2"
                                sx={{
                                    textAlign: 'center',
                                    mb: 4,
                                    color: 'white',
                                    fontWeight: 700,
                                    position: 'relative',
                                    '&::after': {
                                        content: '""',
                                        position: 'absolute',
                                        bottom: '-10px',
                                        left: '50%',
                                        transform: 'translateX(-50%)',
                                        width: '80px',
                                        height: '4px',
                                        background: accentColor,
                                        borderRadius: '2px',
                                        boxShadow: `0 0 10px ${accentColor}50`,
                                    }
                                }}
                            >
                                Education
                            </Typography>
                            <Stack
                                direction={{ xs: 'column', md: 'row' }}
                                spacing={3}
                                sx={{
                                    justifyContent: 'center',
                                    alignItems: 'stretch',
                                    mt: 4
                                }}
                            >
                                {[
                                    {
                                        date: "Spring 2023 - Present",
                                        title: "Ph.D. Computer Science",
                                        subtitle: "University of North Carolina at Charlotte",
                                        text: "Software and Information Systems with focus on Ethical Machine Learning"
                                    },
                                    {
                                        date: "Spring 2022 - Fall 2022",
                                        title: "M.S. Computer Science",
                                        subtitle: "University of North Carolina at Charlotte",
                                        text: "AI, Robotics, and Gaming concentration with a 3.8 GPA"
                                    },
                                    {
                                        date: "Fall 2019 - Fall 2021",
                                        title: "B.S. Computer Science",
                                        subtitle: "University of North Carolina at Charlotte",
                                        text: "AI, Robotics, and Gaming concentration with a 3.714 GPA"
                                    }
                                ].map((edu, index) => (
                                    <Zoom in={true} style={{ transitionDelay: `${(index + 1) * 200}ms` }} key={index}>
                                        <ModernCard accentcolor={accentColor} sx={{ flex: 1 }}>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                                <Typography
                                                    variant="h4"
                                                    sx={{
                                                        background: `linear-gradient(135deg, ${accentColor}, #ffffff)`,
                                                        WebkitBackgroundClip: 'text',
                                                        WebkitTextFillColor: 'transparent',
                                                        backgroundClip: 'text',
                                                        fontWeight: 700,
                                                        flex: 1,
                                                        pr: 2
                                                    }}
                                                >
                                                    {edu.title}
                                                </Typography>
                                                <Chip
                                                    label={edu.date}
                                                    sx={{
                                                        background: `linear-gradient(135deg, ${accentColor}, ${accentColor}cc)`,
                                                        color: 'white',
                                                        fontWeight: 600,
                                                        fontSize: '0.8rem',
                                                        boxShadow: `0 4px 12px ${accentColor}40`,
                                                    }}
                                                />
                                            </Box>
                                            <Typography variant="h6" sx={{ color: accentColor, mb: 2, fontWeight: 600 }}>
                                                {edu.subtitle}
                                            </Typography>
                                            <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.9)', lineHeight: 1.6 }}>
                                                {edu.text}
                                            </Typography>
                                        </ModernCard>
                                    </Zoom>
                                ))}
                            </Stack>
                        </Box>
                    </Fade>

                    {/* Work Experience Section */}
                    <Fade in={true} timeout={2000}>
                        <Box sx={{ mb: 8 }}>
                            <Typography
                                variant="h2"
                                sx={{
                                    textAlign: 'center',
                                    mb: 4,
                                    color: 'white',
                                    fontWeight: 700,
                                    position: 'relative',
                                    '&::after': {
                                        content: '""',
                                        position: 'absolute',
                                        bottom: '-10px',
                                        left: '50%',
                                        transform: 'translateX(-50%)',
                                        width: '80px',
                                        height: '4px',
                                        background: accentColor,
                                        borderRadius: '2px',
                                        boxShadow: `0 0 10px ${accentColor}50`,
                                    }
                                }}
                            >
                                Work Experience
                            </Typography>
                            <Grid container spacing={3} sx={{ maxWidth: '900px', mx: 'auto', mt: 4 }}>
                                {experiences.map((exp, index) => (
                                    <Grid item xs={12} md={6} key={index}>
                                        <Zoom in={true} style={{ transitionDelay: `${(index + 1) * 200}ms` }}>
                                            <ModernCard
                                                accentcolor={accentColor}
                                                sx={{
                                                    height: '100%',
                                                    cursor: 'pointer',
                                                    '&:hover': {
                                                        transform: 'translateY(-8px) scale(1.02)',
                                                        '& .view-details': {
                                                            opacity: 1,
                                                            transform: 'translateY(0)',
                                                        }
                                                    }
                                                }}
                                                onClick={() => handleOpenDialog(exp)}
                                            >
                                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                                    <Typography
                                                        variant="h5"
                                                        sx={{
                                                            background: `linear-gradient(135deg, ${accentColor}, #ffffff)`,
                                                            WebkitBackgroundClip: 'text',
                                                            WebkitTextFillColor: 'transparent',
                                                            backgroundClip: 'text',
                                                            fontWeight: 700,
                                                            flex: 1,
                                                            pr: 2
                                                        }}
                                                    >
                                                        {exp.title}
                                                    </Typography>
                                                    <Chip
                                                        label={exp.timeframe}
                                                        size="small"
                                                        sx={{
                                                            background: `linear-gradient(135deg, ${accentColor}, ${accentColor}cc)`,
                                                            color: 'white',
                                                            fontWeight: 600,
                                                            fontSize: '0.75rem',
                                                            boxShadow: `0 4px 12px ${accentColor}40`,
                                                        }}
                                                    />
                                                </Box>
                                                <Typography variant="subtitle1" sx={{ color: accentColor, mb: 2, fontWeight: 600 }}>
                                                    {exp.organization}
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        color: 'rgba(255, 255, 255, 0.8)',
                                                        mb: 2,
                                                        lineHeight: 1.5
                                                    }}
                                                >
                                                    {exp.responsibilities[0]}
                                                </Typography>
                                                <Box
                                                    className="view-details"
                                                    sx={{
                                                        opacity: 0,
                                                        transform: 'translateY(10px)',
                                                        transition: 'all 0.3s ease',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: 1,
                                                        mt: 'auto'
                                                    }}
                                                >
                                                    <InfoIcon sx={{ color: accentColor, fontSize: '1rem' }} />
                                                    <Typography variant="body2" sx={{ color: accentColor, fontWeight: 500 }}>
                                                        Click to view all responsibilities
                                                    </Typography>
                                                </Box>
                                            </ModernCard>
                                        </Zoom>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    </Fade>

                    {/* Skills Section */}
                    <Fade in={true} timeout={2500}>
                        <Box sx={{ mb: 8 }}>
                            <Typography
                                variant="h2"
                                sx={{
                                    textAlign: 'center',
                                    mb: 2,
                                    color: 'white',
                                    fontWeight: 700,
                                    position: 'relative',
                                    '&::after': {
                                        content: '""',
                                        position: 'absolute',
                                        bottom: '-10px',
                                        left: '50%',
                                        transform: 'translateX(-50%)',
                                        width: '80px',
                                        height: '4px',
                                        background: accentColor,
                                        borderRadius: '2px',
                                        boxShadow: `0 0 10px ${accentColor}50`,
                                    }
                                }}
                            >
                                Technical Skills
                            </Typography>
                            <Typography
                                variant="h6"
                                sx={{
                                    textAlign: 'center',
                                    color: 'rgba(255, 255, 255, 0.8)',
                                    maxWidth: '800px',
                                    mx: 'auto',
                                    mb: 6,
                                    lineHeight: 1.6,
                                }}
                            >
                                A comprehensive overview of my technical expertise and proficiency levels across various domains.
                            </Typography>

                            {[
                                { title: "Programming Languages", skills: languages },
                                { title: "Frameworks & Libraries", skills: frameworks },
                                { title: "Machine Learning & AI", skills: machineLearning },
                                { title: "Cloud & Services", skills: webServices },
                                { title: "Development Tools", skills: ide },
                                { title: "Operating Systems", skills: operatingSystems },
                                { title: "Additional Skills", skills: misc }
                            ].map((category, categoryIndex) => (
                                <Box key={category.title} sx={{ mb: 4 }}>
                                    <Typography
                                        variant="h5"
                                        sx={{
                                            textAlign: 'center',
                                            mb: 3,
                                            color: 'white',
                                            fontWeight: 600,
                                            position: 'relative',
                                            '&::after': {
                                                content: '""',
                                                position: 'absolute',
                                                bottom: '-8px',
                                                left: '50%',
                                                transform: 'translateX(-50%)',
                                                width: '60px',
                                                height: '3px',
                                                background: accentColor,
                                                borderRadius: '2px',
                                            }
                                        }}
                                    >
                                        {category.title}
                                    </Typography>
                                    <Box sx={{
                                        display: 'flex',
                                        flexWrap: 'wrap',
                                        gap: 1.5,
                                        justifyContent: 'center',
                                        maxWidth: '800px',
                                        mx: 'auto'
                                    }}>
                                        {category.skills.map((skill, index) =>
                                            renderSkillChip(skill, index + categoryIndex * 10)
                                        )}
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                    </Fade>

                    {/* Footer */}
                    <Box component="footer" sx={{ position: 'absolute', left: '-9999px' }}>
                        <Typography variant="body2">Contact Thomas Carr for research collaborations, speaking engagements, or academic inquiries.</Typography>
                    </Box>
                </Container>

                {/* Experience Details Dialog */}
                <Dialog
                    open={openDialog}
                    onClose={handleCloseDialog}
                    maxWidth="md"
                    fullWidth
                    slotProps={{
                        paper: {
                            sx: {
                                background: `linear-gradient(135deg, rgba(30, 30, 40, 0.95), rgba(40, 40, 50, 0.9))`,
                                backdropFilter: 'blur(20px)',
                                border: `1px solid ${accentColor}40`,
                                borderRadius: '16px',
                                boxShadow: `0 20px 40px rgba(0, 0, 0, 0.5), 0 0 40px ${accentColor}20`,
                            }
                        }
                    }}
                >
                    {selectedExperience && (
                        <>
                            <DialogTitle sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                pb: 1
                            }}>
                                <Box>
                                    <Typography
                                        variant="h4"
                                        sx={{
                                            background: `linear-gradient(135deg, ${accentColor}, #ffffff)`,
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                            backgroundClip: 'text',
                                            fontWeight: 700,
                                            mb: 1
                                        }}
                                    >
                                        {selectedExperience.title}
                                    </Typography>
                                    <Typography variant="h6" sx={{ color: accentColor, fontWeight: 600 }}>
                                        {selectedExperience.organization}
                                    </Typography>
                                    <Chip
                                        label={selectedExperience.timeframe}
                                        sx={{
                                            background: `linear-gradient(135deg, ${accentColor}, ${accentColor}cc)`,
                                            color: 'white',
                                            fontWeight: 600,
                                            mt: 1
                                        }}
                                    />
                                </Box>
                                <IconButton onClick={handleCloseDialog} sx={{ color: 'white' }}>
                                    <CloseIcon />
                                </IconButton>
                            </DialogTitle>
                            <DialogContent>
                                <Typography variant="h6" sx={{ color: 'white', mb: 2, fontWeight: 600 }}>
                                    Key Responsibilities:
                                </Typography>
                                <Box component="ul" sx={{ pl: 2, m: 0 }}>
                                    {selectedExperience.responsibilities.map((resp, i) => (
                                        <Typography
                                            component="li"
                                            key={i}
                                            variant="body1"
                                            sx={{
                                                color: 'rgba(255, 255, 255, 0.9)',
                                                mb: 1.5,
                                                lineHeight: 1.6,
                                                listStyleType: 'disc',
                                                ml: 2
                                            }}
                                        >
                                            {resp}
                                        </Typography>
                                    ))}
                                </Box>
                            </DialogContent>
                            <DialogActions sx={{ p: 3, pt: 0 }}>
                                <Button
                                    onClick={handleCloseDialog}
                                    sx={{
                                        background: `linear-gradient(135deg, ${accentColor}, ${accentColor}cc)`,
                                        color: 'white',
                                        fontWeight: 600,
                                        px: 3,
                                        py: 1,
                                        borderRadius: '12px',
                                        '&:hover': {
                                            background: `linear-gradient(135deg, ${accentColor}dd, ${accentColor})`,
                                        }
                                    }}
                                >
                                    Close
                                </Button>
                            </DialogActions>
                        </>
                    )}
                </Dialog>
            </Box>
        </ThemeProvider>
    );
}



export default AboutPage;
