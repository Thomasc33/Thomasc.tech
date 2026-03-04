import React from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Chip,
  IconButton,
  Stack,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { ThemeProvider } from '@mui/material/styles';
import { GitHub, Launch } from '@mui/icons-material';
import createDarkTheme from '../theme';
import TextReveal from '../Components/TextReveal';
import ScrollLine from '../Components/ScrollLine';
import StaggerGrid from '../Components/StaggerGrid';
import GlowingEffect from '../Components/GlowingEffect';
import projectsData from '../Data/projects.json';

const theme = createDarkTheme();

const TAG_COUNT = 4;
const DESCRIPTION_LIMIT = 150;

const truncateDescription = (text) =>
  text.length > DESCRIPTION_LIMIT
    ? `${text.slice(0, DESCRIPTION_LIMIT)}...`
    : text;

const goldBadgeSx = {
  backgroundColor: 'rgba(212,168,83,0.15)',
  color: '#d4a853',
  border: '1px solid rgba(212,168,83,0.3)',
  fontSize: '0.7rem',
  height: 24,
};

const tagChipSx = {
  fontSize: '0.7rem',
  height: 22,
  backgroundColor: 'rgba(255,255,255,0.04)',
  color: '#f0f0f5',
  border: '1px solid rgba(255,255,255,0.08)',
  backdropFilter: 'blur(10px)',
};

const linkIconSx = {
  color: 'rgba(255,255,255,0.5)',
  transition: 'all 0.3s ease',
  '&:hover': {
    color: '#10b981',
  },
};

const featuredCardSx = {
  background: 'rgba(12, 12, 20, 0.85)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: 4,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 0 25px rgba(16,185,129,0.12)',
    borderColor: 'rgba(16,185,129,0.2)',
  },
};

const getLinkIcon = (iconType) =>
  iconType === 'GitHub' ? <GitHub fontSize="small" /> : <Launch fontSize="small" />;

const LinkButtons = ({ links }) => {
  if (!links || links.length === 0) return null;

  return (
    <Stack direction="row" spacing={1}>
      {links.map((link) => (
        <IconButton
          key={link.href}
          component="a"
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          size="small"
          aria-label={link.icon}
          sx={linkIconSx}
        >
          {getLinkIcon(link.icon)}
        </IconButton>
      ))}
    </Stack>
  );
};

const TagChips = ({ tags, max }) => (
  <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
    {tags.slice(0, max).map((tag) => (
      <Chip key={tag.label} label={tag.label} size="small" sx={tagChipSx} />
    ))}
  </Stack>
);

const ProjectCard = ({ project }) => (
  <Box sx={{ position: 'relative', height: '100%', borderRadius: 4, p: '2px' }}>
    <GlowingEffect
      spread={40}
      glow
      disabled={false}
      proximity={64}
      inactiveZone={0.01}
      borderWidth={3}
    />
    <Card sx={featuredCardSx} elevation={0}>
      <CardContent sx={{ p: 3, display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Typography
            sx={{
              fontFamily: '"Inter", sans-serif',
              fontWeight: 600,
              fontSize: '1rem',
              color: 'text.primary',
              pr: 1,
            }}
          >
            {project.title}
          </Typography>
          <Chip label={project.subtitle} size="small" sx={goldBadgeSx} />
        </Box>

        <Typography
          sx={{
            color: 'text.secondary',
            fontSize: '0.85rem',
            lineHeight: 1.6,
            mb: 2,
            flexGrow: 1,
          }}
        >
          {truncateDescription(project.description)}
        </Typography>

        <Box sx={{ mt: 'auto' }}>
          <Box sx={{ mb: 2 }}>
            <TagChips tags={project.langauge_framework} max={TAG_COUNT} />
          </Box>
          <LinkButtons links={project.links} />
        </Box>
      </CardContent>
    </Card>
  </Box>
);

const Projects = () => (
  <ThemeProvider theme={theme}>
    <Box id="projects" sx={{ py: { xs: 6, md: 12 }, position: 'relative', zIndex: 1 }}>
      <Container maxWidth="lg">
        {/* Section Header — word reveal + scroll-drawn line */}
        <TextReveal
          sx={{
            fontFamily: '"DM Serif Display", serif',
            fontSize: { xs: '2rem', md: '2.5rem' },
            color: 'text.primary',
            textAlign: 'center',
          }}
          component="h2"
        >
          Projects
        </TextReveal>
        <ScrollLine width={60} sx={{ mt: 1, mb: 6 }} />

        {/* Projects Grid — staggered blur-up cascade */}
        <StaggerGrid stagger={0.1} direction="blur-up">
          <Grid container spacing={{ xs: 2, md: 3 }}>
            {projectsData.map((project) => (
              <Grid key={project.title} size={{ xs: 12, sm: 6, md: 4 }}>
                <ProjectCard project={project} />
              </Grid>
            ))}
          </Grid>
        </StaggerGrid>
      </Container>
    </Box>
  </ThemeProvider>
);

export default Projects;
