import React from 'react';
import { Box, Typography } from '@mui/material';
import { Step } from '../types';

interface TimelineSectionProps {
  steps: Step[];
}

const TimelineSection: React.FC<TimelineSectionProps> = ({ steps }) => {
  return (
    <Box 
      sx={{ 
        py: { xs: 12, md: 16 },
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        px: { xs: 2, sm: 4, md: 6 },
        position: 'relative',
        bgcolor: 'transparent',
      }}
    >
      <Box sx={{ width: '100%', maxWidth: '1600px', position: 'relative', zIndex: 1 }}>
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: '2rem', md: '3rem' },
            fontWeight: 700,
            color: '#00A3FF',
            textAlign: 'center',
            mb: 3,
            textShadow: '0 0 20px rgba(0, 163, 255, 0.3)',
            pointerEvents: 'none',
          }}
        >
          How It Works: A Guided Path from Concept to Completion
        </Typography>
        <Typography
          sx={{
            color: 'rgba(255, 255, 255, 0.7)',
            textAlign: 'center',
            mb: 12,
            maxWidth: '800px',
            mx: 'auto',
            fontSize: '1.1rem',
            lineHeight: 1.7,
            pointerEvents: 'none',
          }}
        >
          Building something extraordinary doesn't have to be complicated. We've designed a step-by-step journey where your idea evolves effortlessly through AI-driven insights, user feedback loops, and intelligent orchestration.
        </Typography>

        <Box sx={{ position: 'relative' }}>
          {/* Timeline line */}
          <Box
            sx={{
              position: 'absolute',
              left: { xs: 20, md: '50%' },
              top: 0,
              bottom: 0,
              width: 2,
              background: 'linear-gradient(180deg, rgba(0, 163, 255, 0.3) 0%, rgba(0, 163, 255, 0.1) 100%)',
              transform: { xs: 'none', md: 'translateX(-50%)' },
              pointerEvents: 'none',
            }}
          />

          {/* Steps */}
          {steps.map((step, index) => (
            <Box
              key={index}
              sx={{
                position: 'relative',
                mb: 8,
                ml: { xs: 8, md: 0 },
                '&:last-child': { mb: 0 },
              }}
            >
              {/* Timeline dot */}
              <Box
                sx={{
                  position: 'absolute',
                  left: { xs: -28, md: '50%' },
                  top: 24,
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  bgcolor: '#00A3FF',
                  transform: { xs: 'none', md: 'translateX(-50%)' },
                  zIndex: 1,
                  boxShadow: '0 0 20px rgba(0, 163, 255, 0.5)',
                  border: '3px solid transparent',
                  pointerEvents: 'none',
                }}
              />

              {/* Content */}
              <Box
                sx={{
                  ml: { xs: 0, md: index % 2 === 0 ? 0 : '50%' },
                  mr: { xs: 0, md: index % 2 === 0 ? '50%' : 0 },
                  pl: { xs: 0, md: index % 2 === 0 ? 0 : 8 },
                  pr: { xs: 0, md: index % 2 === 0 ? 8 : 0 },
                  textAlign: { xs: 'left', md: index % 2 === 0 ? 'right' : 'left' },
                }}
              >
                <Box
                  sx={{
                    bgcolor: 'rgba(2, 9, 20, 0.4)',
                    backdropFilter: 'blur(10px)',
                    p: 4,
                    borderRadius: 3,
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    transition: 'all 0.3s ease-in-out',
                    pointerEvents: 'none',
                    '&:hover': {
                      borderColor: 'rgba(0, 163, 255, 0.3)',
                      boxShadow: '0 4px 20px rgba(0, 163, 255, 0.1)',
                      transform: 'translateY(-4px)',
                      bgcolor: 'rgba(2, 9, 20, 0.5)',
                    },
                  }}
                >
                  <Typography
                    sx={{
                      color: '#00A3FF',
                      fontWeight: 600,
                      fontSize: '1.25rem',
                      opacity: 0.8,
                      mb: 2,
                    }}
                  >
                    {step.number}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, justifyContent: { xs: 'flex-start', md: index % 2 === 0 ? 'flex-end' : 'flex-start' } }}>
                    <Box
                      sx={{
                        order: { xs: 0, md: index % 2 === 0 ? 1 : 0 },
                        ml: { xs: 0, md: index % 2 === 0 ? 2 : 0 },
                        mr: { xs: 2, md: index % 2 === 0 ? 0 : 2 },
                        bgcolor: 'rgba(0, 163, 255, 0.1)',
                        borderRadius: 1,
                        p: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {step.icon}
                    </Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        color: 'white',
                        fontSize: '1.1rem',
                      }}
                    >
                      {step.title}
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      color: 'rgba(255, 255, 255, 0.7)',
                      fontSize: '0.95rem',
                      lineHeight: 1.7,
                    }}
                  >
                    {step.description}
                  </Typography>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default TimelineSection;
