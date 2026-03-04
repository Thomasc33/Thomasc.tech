import React from 'react';
import { Box, Chip } from '@mui/material';

const SkillTicker = ({ skills, direction = 'left', speed = 30 }) => {
  const animationName = direction === 'left' ? 'tickerScroll' : 'tickerScrollReverse';

  // Duplicate the skills array for seamless loop
  const duplicatedSkills = [...skills, ...skills];

  return (
    <Box
      sx={{
        overflow: 'hidden',
        py: 1,
        maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
        '&:hover .ticker-track': {
          animationPlayState: 'paused',
        },
      }}
    >
      <Box
        className="ticker-track"
        sx={{
          display: 'flex',
          gap: 1.5,
          width: 'fit-content',
          animation: `${animationName} ${speed}s linear infinite`,
        }}
      >
        {duplicatedSkills.map((skill, index) => (
          <Chip
            key={`${skill}-${index}`}
            label={skill}
            size="small"
            sx={{
              flexShrink: 0,
              backgroundColor: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              color: '#f0f0f5',
              backdropFilter: 'blur(10px)',
              fontWeight: 500,
              fontSize: '0.8rem',
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                borderColor: 'rgba(16, 185, 129, 0.3)',
                boxShadow: '0 0 15px rgba(16, 185, 129, 0.15)',
                transform: 'scale(1.05)',
              },
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default SkillTicker;
