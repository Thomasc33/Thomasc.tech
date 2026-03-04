import React from 'react';
import { Box, Typography } from '@mui/material';
import ScrollReveal from './ScrollReveal';

const EMERALD = '#10b981';
const GOLD = '#d4a853';

const TimelineDrawing = ({ items, side = 'left' }) => {
  return (
    <Box sx={{ position: 'relative', pl: 3, py: 1 }}>
      {/* Timeline line */}
      <Box
        sx={{
          position: 'absolute',
          left: 3,
          top: 0,
          bottom: 0,
          width: 2,
          background: EMERALD,
          borderRadius: 1,
        }}
      />

      {items.map((item, index) => (
          <ScrollReveal key={index} direction={side} delay={index * 100}>
            <Box sx={{ position: 'relative', mb: 3.5, '&:last-child': { mb: 0 } }}>
              {/* Small dash marker */}
              <Box
                sx={{
                  position: 'absolute',
                  left: -24,
                  top: 10,
                  width: 8,
                  height: 2,
                  background: EMERALD,
                  borderRadius: 1,
                }}
              />

              {/* Year label */}
              <Typography
                sx={{
                  fontFamily: '"DM Serif Display", serif',
                  color: GOLD,
                  fontSize: '0.8rem',
                  mb: 0.25,
                  opacity: 0.85,
                }}
              >
                {item.year}
              </Typography>

              {/* Title */}
              <Typography
                sx={{
                  fontWeight: 600,
                  color: 'text.primary',
                  fontSize: '0.95rem',
                  lineHeight: 1.3,
                }}
              >
                {item.title}
              </Typography>

              {/* Subtitle */}
              {item.subtitle && (
                <Typography
                  variant="body2"
                  sx={{ color: 'text.secondary', fontSize: '0.82rem', mt: 0.25 }}
                >
                  {item.subtitle}
                </Typography>
              )}

              {/* Details */}
              {item.details && (
                <Typography
                  variant="body2"
                  sx={{ color: 'text.secondary', fontSize: '0.78rem', lineHeight: 1.5, mt: 0.5 }}
                >
                  {item.details}
                </Typography>
              )}
            </Box>
          </ScrollReveal>
      ))}
    </Box>
  );
};

export default TimelineDrawing;
