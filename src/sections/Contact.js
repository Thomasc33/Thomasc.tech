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
import { motion, AnimatePresence } from 'framer-motion';
import { useForm, ValidationError } from '@formspree/react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import createDarkTheme from '../theme';
import TextReveal from '../Components/TextReveal';
import ScrollReveal from '../Components/ScrollReveal';
import MagneticButton from '../Components/MagneticButton';

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

const directLinkSx = {
  color: 'text.secondary',
  textDecoration: 'none',
  display: 'flex',
  alignItems: 'center',
  gap: 1,
  fontSize: '0.9rem',
  transition: 'color 0.3s ease',
  '&:hover': {
    color: '#10b981',
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
    href: 'https://github.com/thomascarr',
  },
  {
    icon: <LinkedInIcon fontSize="small" />,
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/thomascarr',
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
    spacing={{ xs: 2, sm: 3 }}
    sx={{ mt: 5, justifyContent: 'center', alignItems: 'center' }}
  >
    {DIRECT_LINKS.map((link, index) => (
      <ScrollReveal key={link.label} direction="scale" delay={index * 100}>
        <MagneticButton>
          <Link
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            sx={directLinkSx}
          >
            {link.icon}
            {link.label}
          </Link>
        </MagneticButton>
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
          {/* Header — word-by-word reveal */}
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

          <ScrollReveal direction="blur" delay={200}>
            <Typography
              sx={{
                mt: 8,
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
