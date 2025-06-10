import { createTheme } from '@mui/material/styles';
import { keyframes } from '@mui/material/styles';

// Animated gradient keyframes
const gradientShift = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const pulseGlow = keyframes`
  0%, 100% {
    box-shadow: 0 0 20px rgba(170, 0, 255, 0.3);
  }
  50% {
    box-shadow: 0 0 40px rgba(170, 0, 255, 0.6);
  }
`;

// Modern hypermodern theme with glassmorphism and gradients
const createHypermodernTheme = (accentColor = '#aa00ff') => {
  return createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: accentColor,
        light: `${accentColor}80`,
        dark: `${accentColor}cc`,
      },
      secondary: {
        main: '#ffffff',
        light: '#ffffff80',
        dark: '#ffffffcc',
      },
      background: {
        default: 'rgba(10, 10, 15, 0.95)',
        paper: 'rgba(20, 20, 30, 0.8)',
      },
      text: {
        primary: '#ffffff',
        secondary: 'rgba(255, 255, 255, 0.8)',
      },
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontSize: '3.5rem',
        fontWeight: 800,
        letterSpacing: '-0.02em',
        lineHeight: 1.1,
        background: `linear-gradient(-45deg, ${accentColor}, #ffffff, ${accentColor}cc, #ffffff)`,
        backgroundSize: '400% 400%',
        animation: `${gradientShift} 4s ease infinite`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      },
      h2: {
        fontSize: '2.5rem',
        fontWeight: 700,
        letterSpacing: '-0.01em',
        lineHeight: 1.2,
        background: `linear-gradient(135deg, #ffffff, ${accentColor}80)`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      },
      h3: {
        fontSize: '1.8rem',
        fontWeight: 600,
        letterSpacing: '0em',
        lineHeight: 1.3,
        background: `linear-gradient(135deg, #ffffff, ${accentColor}60)`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      },
      h4: {
        fontSize: '1.4rem',
        fontWeight: 600,
        letterSpacing: '0.01em',
        lineHeight: 1.4,
        color: '#ffffff',
      },
      h5: {
        fontSize: '1.2rem',
        fontWeight: 500,
        letterSpacing: '0.01em',
        lineHeight: 1.4,
        color: '#ffffff',
      },
      h6: {
        fontSize: '1rem',
        fontWeight: 500,
        letterSpacing: '0.02em',
        lineHeight: 1.5,
        color: '#ffffff',
      },
      body1: {
        fontSize: '1rem',
        fontWeight: 400,
        lineHeight: 1.6,
        color: 'rgba(255, 255, 255, 0.9)',
      },
      body2: {
        fontSize: '0.875rem',
        fontWeight: 400,
        lineHeight: 1.5,
        color: 'rgba(255, 255, 255, 0.8)',
      },
      subtitle1: {
        fontSize: '1.1rem',
        fontWeight: 500,
        lineHeight: 1.5,
        color: accentColor,
      },
      subtitle2: {
        fontSize: '0.95rem',
        fontWeight: 500,
        lineHeight: 1.4,
        color: 'rgba(255, 255, 255, 0.8)',
      },
    },
    components: {
      MuiBox: {
        styleOverrides: {
          root: {
            '&.glass-card': {
              background: `linear-gradient(135deg, rgba(30, 30, 40, 0.8), rgba(40, 40, 50, 0.6))`,
              backdropFilter: 'blur(20px)',
              border: `1px solid ${accentColor}20`,
              borderRadius: '20px',
              boxShadow: `0 20px 40px rgba(0, 0, 0, 0.3), 0 0 20px ${accentColor}10`,
              transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: `0 30px 60px rgba(0, 0, 0, 0.4), 0 0 40px ${accentColor}30`,
                border: `1px solid ${accentColor}40`,
                background: `linear-gradient(135deg, rgba(40, 40, 50, 0.9), rgba(50, 50, 60, 0.7))`,
              },
            },
            '&.gradient-bg': {
              background: `linear-gradient(135deg, ${accentColor}20, rgba(255, 255, 255, 0.05))`,
            },
            '&.skill-card': {
              background: 'rgba(30, 30, 40, 0.8)',
              backdropFilter: 'blur(15px)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '16px',
              padding: '2rem',
              transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              '&:hover': {
                transform: 'translateY(-10px) scale(1.02)',
                boxShadow: `0 25px 50px rgba(0, 0, 0, 0.4), 0 0 30px ${accentColor}30`,
                border: `1px solid ${accentColor}60`,
              },
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: '12px',
            textTransform: 'none',
            fontWeight: 600,
            fontSize: '1rem',
            padding: '12px 24px',
            transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            '&.modern-button': {
              background: `linear-gradient(135deg, ${accentColor}, ${accentColor}cc)`,
              boxShadow: `0 8px 25px ${accentColor}40`,
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: `0 12px 35px ${accentColor}60`,
                background: `linear-gradient(135deg, ${accentColor}dd, ${accentColor})`,
              },
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            background: 'rgba(30, 30, 40, 0.8)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '20px',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
            transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            '&:hover': {
              transform: 'translateY(-8px)',
              boxShadow: '0 30px 60px rgba(0, 0, 0, 0.4)',
              border: `1px solid ${accentColor}40`,
            },
          },
        },
      },
      MuiContainer: {
        styleOverrides: {
          root: {
            '&.main-container': {
              background: 'rgba(15, 15, 20, 0.6)',
              backdropFilter: 'blur(10px)',
              borderRadius: '24px',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              minHeight: '100vh',
              padding: '2rem',
            },
          },
        },
      },
    },
    shape: {
      borderRadius: 16,
    },
    spacing: 8,
  });
};

export default createHypermodernTheme;
