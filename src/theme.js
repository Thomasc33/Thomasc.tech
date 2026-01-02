import { createTheme } from '@mui/material/styles';

// Dark theme with particles support
const createDarkTheme = (accentColor = '#aa00ff') => {
  return createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: accentColor,
      },
      secondary: {
        main: '#00D4FF',
      },
      background: {
        default: '#0a0a0f',
        paper: 'rgba(15, 15, 25, 0.9)',
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
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
            borderRadius: 12,
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              background: 'rgba(25, 25, 40, 0.95)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              boxShadow: '0 8px 12px rgba(0, 0, 0, 0.4)',
              transform: 'translateY(-2px)',
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: 500,
            borderRadius: 8,
            padding: '8px 16px',
          },
          contained: {
            background: `linear-gradient(135deg, ${accentColor}, ${accentColor}CC)`,
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
            '&:hover': {
              background: `linear-gradient(135deg, ${accentColor}DD, ${accentColor})`,
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
            },
          },
          outlined: {
            borderColor: 'rgba(255, 255, 255, 0.2)',
            color: '#ffffff',
            '&:hover': {
              borderColor: 'rgba(255, 255, 255, 0.3)',
              background: 'rgba(255, 255, 255, 0.05)',
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
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            color: '#ffffff',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
            },
          },
        },
      },
    },
  });
};

export default createDarkTheme;
