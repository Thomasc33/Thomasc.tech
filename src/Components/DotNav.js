import React from 'react';
import { Box, Tooltip, useMediaQuery } from '@mui/material';
import { motion } from 'framer-motion';

const DotNav = ({ sections, activeSection }) => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  if (isMobile) return null;

  const handleClick = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        right: 24,
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        alignItems: 'center',
      }}
    >
      {sections.map(({ id, label }) => {
        const isActive = activeSection === id;
        return (
          <Tooltip key={id} title={label} placement="left" arrow>
            <Box
              onClick={() => handleClick(id)}
              sx={{
                position: 'relative',
                width: 20,
                height: 20,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              {isActive && (
                <motion.div
                  layoutId="dot-indicator"
                  style={{
                    position: 'absolute',
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    background: '#10b981',
                    boxShadow: '0 0 12px rgba(16, 185, 129, 0.4)',
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                />
              )}
              {!isActive && (
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    border: '1.5px solid rgba(255, 255, 255, 0.3)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      borderColor: 'rgba(16, 185, 129, 0.5)',
                      transform: 'scale(1.3)',
                    },
                  }}
                />
              )}
            </Box>
          </Tooltip>
        );
      })}
    </Box>
  );
};

export default DotNav;
