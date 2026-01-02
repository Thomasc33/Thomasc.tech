import { createTheme, keyframes } from '@mui/material/styles';

// Dark theme with particles support
const createDarkTheme = (accentColor = '#8b5cf6') => {
  // Animation keyframes
  const fadeInUp = keyframes`
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  `;

  const float = keyframes`
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-10px);
    }
  `;

  const glow = keyframes`
    0%, 100% {
      box-shadow: 0 0 20px ${accentColor}40;
    }
    50% {
      box-shadow: 0 0 40px ${accentColor}60;
    }
  `;

  const gradient = keyframes`
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

  return createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: accentColor,
        light: `${accentColor}CC`,
        dark: `${accentColor}99`,
      },
      secondary: {
        main: '#ec4899',
        light: '#ec4899CC',
        dark: '#ec489999',
      },
      tertiary: {
        main: '#f59e0b',
        light: '#f59e0bCC',
        dark: '#f59e0b99',
      },
      background: {
        default: '#0a0a0f',
        paper: 'rgba(15, 15, 25, 0.9)',
        glass: 'rgba(255, 255, 255, 0.05)',
        glassHover: 'rgba(255, 255, 255, 0.08)',
        gradient1: `linear-gradient(135deg, ${accentColor}20, transparent)`,
        gradient2: `linear-gradient(45deg, ${accentColor}10, transparent)`,
        gradient3: `linear-gradient(225deg, rgba(236, 72, 153, 0.1), transparent)`,
      },
      text: {
        primary: '#ffffff',
        secondary: '#b0b0c0',
      },
      divider: 'rgba(255, 255, 255, 0.1)',
    },
    typography: {
      fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
      h1: {
        fontSize: '2.5rem',
        fontWeight: 700,
        lineHeight: 1.2,
        letterSpacing: '-0.025em',
      },
      h2: {
        fontSize: '2rem',
        fontWeight: 600,
        lineHeight: 1.3,
        letterSpacing: '-0.025em',
      },
      h3: {
        fontSize: '1.5rem',
        fontWeight: 600,
        lineHeight: 1.4,
      },
      h4: {
        fontSize: '1.25rem',
        fontWeight: 600,
        lineHeight: 1.4,
      },
      h5: {
        fontSize: '1.125rem',
        fontWeight: 500,
        lineHeight: 1.5,
      },
      h6: {
        fontSize: '1rem',
        fontWeight: 500,
        lineHeight: 1.5,
      },
      body1: {
        fontSize: '1rem',
        lineHeight: 1.6,
      },
      body2: {
        fontSize: '0.875rem',
        lineHeight: 1.6,
      },
    },
    shape: {
      borderRadius: 8,
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            background: 'rgba(20, 20, 35, 0.9)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
            borderRadius: 16,
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '1px',
              background: `linear-gradient(90deg, transparent, ${accentColor}40, transparent)`,
              opacity: 0,
              transition: 'opacity 0.3s ease',
            },
            '&:hover': {
              background: 'rgba(25, 25, 40, 0.95)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              boxShadow: `0 16px 48px rgba(0, 0, 0, 0.4), 0 0 20px ${accentColor}20`,
              transform: 'translateY(-4px) scale(1.02)',
              '&::before': {
                opacity: 1,
              },
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: 600,
            borderRadius: 12,
            padding: '10px 24px',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            position: 'relative',
            overflow: 'hidden',
            '&::after': {
              content: '""',
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: 0,
              height: 0,
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.1)',
              transform: 'translate(-50%, -50%)',
              transition: 'width 0.6s, height 0.6s',
            },
            '&:active::after': {
              width: '300px',
              height: '300px',
            },
          },
          contained: {
            background: `linear-gradient(135deg, ${accentColor}, ${accentColor}DD)`,
            boxShadow: `0 4px 16px ${accentColor}40`,
            '&:hover': {
              background: `linear-gradient(135deg, ${accentColor}DD, ${accentColor})`,
              boxShadow: `0 8px 24px ${accentColor}60`,
              transform: 'translateY(-2px)',
            },
          },
          outlined: {
            borderColor: `${accentColor}40`,
            color: accentColor,
            background: 'rgba(255, 255, 255, 0.02)',
            backdropFilter: 'blur(10px)',
            '&:hover': {
              borderColor: `${accentColor}60`,
              background: `${accentColor}10`,
              transform: 'translateY(-2px)',
              boxShadow: `0 4px 16px ${accentColor}20`,
            },
          },
          text: {
            color: accentColor,
            '&:hover': {
              background: `${accentColor}10`,
            },
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            background: 'rgba(10, 10, 15, 0.9)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            color: '#ffffff',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(10px)',
            fontWeight: 500,
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.12)',
              borderColor: `${accentColor}40`,
              transform: 'translateY(-1px)',
            },
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
              backdropFilter: 'blur(10px)',
              borderRadius: 12,
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
              },
              '&.Mui-focused': {
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                boxShadow: `0 0 0 2px ${accentColor}30`,
              },
            },
          },
        },
      },
    },
    animations: {
      fadeInUp,
      float,
      glow,
      gradient,
    },
  });
};

export default createDarkTheme;
