import React, { useState, useCallback } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Stack,
  Alert,
  CircularProgress,
  ThemeProvider,
  Link,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import SchoolIcon from '@mui/icons-material/School';
import SvgIcon from '@mui/material/SvgIcon';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm, ValidationError } from '@formspree/react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import createDarkTheme from '../theme';
import TextReveal from '../Components/TextReveal';
import ScrollReveal from '../Components/ScrollReveal';
import MagneticButton from '../Components/MagneticButton';
import SectionKicker from '../Components/SectionKicker';
import SiteFooterNav from '../Components/SiteFooterNav';

const OrcidIcon = (props) => (
  <SvgIcon {...props} viewBox="0 0 24 24" fontSize="small">
    <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947s-.422.947-.947.947a.95.95 0 01-.947-.947c0-.525.422-.947.947-.947zm-.722 3.038h1.444v10.041H6.647V7.416zm3.562 0h3.9c3.712 0 5.344 2.653 5.344 5.025 0 2.578-2.016 5.016-5.325 5.016h-3.919V7.416zm1.444 1.303v7.444h2.297c2.359 0 3.738-1.359 3.738-3.722 0-2.473-1.29-3.722-3.56-3.722h-2.475z" />
  </SvgIcon>
);

const theme = createDarkTheme();

const GOLD_GRADIENT = 'linear-gradient(135deg, #d4a853, #c49b48)';
const GOLD_HOVER_SHADOW = '0 0 25px rgba(212,168,83,0.3)';

const goldButtonSx = {
  background: GOLD_GRADIENT,
  color: '#060608',
  padding: '12px 32px',
  fontSize: '1rem',
  fontWeight: 600,
  borderRadius: 3,
  textTransform: 'none',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    background: GOLD_GRADIENT,
    boxShadow: GOLD_HOVER_SHADOW,
    transform: 'translateY(-2px)',
  },
};

const monoFamily = '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace';

const directLinkSx = {
  color: 'rgba(240, 240, 245, 0.7)',
  textDecoration: 'none',
  display: 'inline-flex',
  alignItems: 'center',
  gap: 1.2,
  px: 2,
  py: 1,
  fontFamily: monoFamily,
  fontSize: '0.78rem',
  letterSpacing: '0.08em',
  borderRadius: 1,
  border: '1px solid rgba(255, 255, 255, 0.06)',
  background: 'rgba(255, 255, 255, 0.015)',
  transition: 'color 200ms ease, border-color 200ms ease, background 200ms ease',
  '& .MuiSvgIcon-root': {
    color: 'rgba(212, 168, 83, 0.75)',
    transition: 'color 200ms ease',
  },
  '&:hover': {
    color: '#f0f0f5',
    borderColor: 'rgba(16, 185, 129, 0.35)',
    background: 'rgba(16, 185, 129, 0.06)',
  },
  '&:hover .MuiSvgIcon-root': {
    color: '#10b981',
  },
  '&:focus-visible': {
    outline: '2px solid rgba(16, 185, 129, 0.6)',
    outlineOffset: '2px',
  },
};

const FORM_FIELDS = [
  { name: 'name', label: 'Name', required: true },
  { name: 'email', label: 'Email', required: true, type: 'email' },
  { name: 'subject', label: 'Subject', required: false },
  {
    name: 'message',
    label: 'Message',
    required: true,
    multiline: true,
    rows: 4,
  },
];

const DIRECT_LINKS = [
  {
    icon: <EmailIcon fontSize="small" />,
    label: 'thomas@thomasc.tech',
    href: 'mailto:thomas@thomasc.tech',
  },
  {
    icon: <GitHubIcon fontSize="small" />,
    label: 'GitHub',
    href: 'https://github.com/thomasc33',
  },
  {
    icon: <LinkedInIcon fontSize="small" />,
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/thomasc33/',
  },
  {
    icon: <SchoolIcon fontSize="small" />,
    label: 'Google Scholar',
    href: 'https://scholar.google.com/citations?user=a1uc2zEAAAAJ',
  },
  {
    icon: <OrcidIcon />,
    label: 'ORCID',
    href: 'https://orcid.org/0009-0006-6039-0209',
  },
];

const ContactForm = () => {
  const [formState, handleFormspreeSubmit] = useForm('xoqojdgv');
  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      if (!executeRecaptcha) {
        return;
      }

      const token = await executeRecaptcha('contact');
      const formData = new FormData(e.target);
      formData.append('g-recaptcha-response', token);

      await handleFormspreeSubmit(formData);
    },
    [executeRecaptcha, handleFormspreeSubmit]
  );

  if (formState.succeeded) {
    return (
      <Box sx={{ mt: 4, maxWidth: { xs: '100%', sm: 500 }, mx: 'auto', px: { xs: 1, sm: 0 } }}>
        <Alert severity="success">
          Message sent! I'll get back to you soon.
        </Alert>
      </Box>
    );
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ mt: 4, maxWidth: { xs: '100%', sm: 500 }, mx: 'auto', px: { xs: 1, sm: 0 } }}
    >
      <Stack spacing={2.5}>
        {FORM_FIELDS.map((field) => (
          <React.Fragment key={field.name}>
            <TextField
              name={field.name}
              label={field.label}
              required={field.required}
              type={field.type || 'text'}
              multiline={field.multiline || false}
              rows={field.rows}
              fullWidth
              variant="outlined"
            />
            <ValidationError
              prefix={field.label}
              field={field.name}
              errors={formState.errors}
            />
          </React.Fragment>
        ))}
        <Button
          type="submit"
          disabled={formState.submitting}
          fullWidth
          sx={goldButtonSx}
        >
          {formState.submitting ? (
            <CircularProgress size={24} sx={{ color: '#060608' }} />
          ) : (
            'Send Message'
          )}
        </Button>
      </Stack>
    </Box>
  );
};

const DirectLinks = () => (
  <Stack
    direction={{ xs: 'column', sm: 'row' }}
    spacing={{ xs: 1.5, sm: 2 }}
    sx={{ mt: 5, justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}
  >
    {DIRECT_LINKS.map((link, index) => (
      <ScrollReveal key={link.label} direction="up" delay={index * 100}>
        <Link
          href={link.href}
          target={link.href.startsWith('mailto:') ? undefined : '_blank'}
          rel={link.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
          sx={directLinkSx}
        >
          {link.icon}
          {link.label}
        </Link>
      </ScrollReveal>
    ))}
  </Stack>
);

const Contact = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <Box id="contact" sx={{ py: { xs: 6, md: 12 }, position: 'relative', zIndex: 1 }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <SectionKicker index={5} label="get in touch" />
          <TextReveal
            sx={{
              fontFamily: '"DM Serif Display", serif',
              fontSize: { xs: '2rem', md: '2.5rem' },
              textAlign: 'center',
              color: 'text.primary',
            }}
            component="h2"
          >
            Let's Connect
          </TextReveal>

          <ScrollReveal direction="blur" delay={200}>
            <Typography
              sx={{
                fontFamily: '"Inter", sans-serif',
                color: 'text.secondary',
                textAlign: 'center',
                mt: 2,
              }}
            >
              Interested in collaboration, research, or just want to chat?
            </Typography>
          </ScrollReveal>

          <ScrollReveal direction="scale" delay={400}>
            <Box sx={{ mt: 4 }}>
              <MagneticButton>
                <Button onClick={() => setShowForm((prev) => !prev)} sx={goldButtonSx}>
                  Get in Touch
                </Button>
              </MagneticButton>
            </Box>
          </ScrollReveal>

          <AnimatePresence>
            {showForm && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                style={{ overflow: 'hidden' }}
              >
                <ContactForm />
              </motion.div>
            )}
          </AnimatePresence>

          <DirectLinks />

          <SiteFooterNav />

          <ScrollReveal direction="blur" delay={200}>
            <Typography
              sx={{
                mt: 3,
                textAlign: 'center',
                color: 'text.secondary',
                fontSize: '0.8rem',
              }}
            >
              &copy; 2026 Thomas Carr
            </Typography>
          </ScrollReveal>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Contact;
