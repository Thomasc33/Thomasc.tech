import { createTheme, keyframes } from '@mui/material/styles';

const createDarkTheme = (accentColor = '#10b981') => {
  const goldColor = '#d4a853';

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
        light: '#34d399',
        dark: '#059669',
      },
      secondary: {
        main: goldColor,
        light: '#e0bc6a',
        dark: '#c49b48',
      },
      background: {
        default: '#060608',
        paper: 'rgba(12, 12, 20, 0.85)',
        glass: 'rgba(255, 255, 255, 0.04)',
        glassHover: 'rgba(255, 255, 255, 0.07)',
        gradient1: `linear-gradient(135deg, ${accentColor}20, transparent)`,
        gradient2: `linear-gradient(45deg, ${accentColor}10, transparent)`,
        gradient3: `linear-gradient(225deg, ${goldColor}10, transparent)`,
      },
      text: {
        primary: '#f0f0f5',
        secondary: '#8a8a9a',
      },
      divider: 'rgba(255, 255, 255, 0.08)',
    },
    typography: {
      fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
      fontFamilyDisplay: '"DM Serif Display", serif',
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
            background: 'rgba(12, 12, 20, 0.85)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
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
              background: 'rgba(14, 14, 24, 0.9)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              boxShadow: `0 16px 48px rgba(0, 0, 0, 0.4), 0 0 25px rgba(16, 185, 129, 0.12)`,
              transform: 'translateY(-4px)',
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
            background: `linear-gradient(135deg, ${goldColor}, #c49b48)`,
            color: '#060608',
            boxShadow: `0 4px 16px ${goldColor}40`,
            '&:hover': {
              background: `linear-gradient(135deg, #c49b48, ${goldColor})`,
              boxShadow: `0 8px 24px ${goldColor}60`,
              transform: 'translateY(-2px)',
            },
          },
          outlined: {
            borderColor: `${accentColor}60`,
            color: accentColor,
            background: 'rgba(255, 255, 255, 0.02)',
            backdropFilter: 'blur(10px)',
            '&:hover': {
              borderColor: accentColor,
              background: `${accentColor}15`,
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
            background: 'rgba(6, 6, 8, 0.9)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            backgroundColor: 'rgba(255, 255, 255, 0.04)',
            color: '#f0f0f5',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(10px)',
            fontWeight: 500,
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.07)',
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
              backgroundColor: 'rgba(255, 255, 255, 0.04)',
              backdropFilter: 'blur(10px)',
              borderRadius: 12,
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.06)',
              },
              '&.Mui-focused': {
                backgroundColor: 'rgba(255, 255, 255, 0.06)',
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
