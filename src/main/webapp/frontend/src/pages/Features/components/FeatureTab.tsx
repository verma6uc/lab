import React from 'react';
import { Box, Grid, Typography, Fade } from '@mui/material';
import { keyframes } from '@mui/system';
import { FeatureTab as IFeatureTab } from '../types';
import FeatureCard from './FeatureCard';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

interface FeatureTabProps {
  tab: IFeatureTab;
  isActive: boolean;
}

const FeatureTab: React.FC<FeatureTabProps> = ({ tab, isActive }) => {
  return (
    <Fade in={isActive} timeout={500}>
      <Box 
        sx={{ 
          display: isActive ? 'block' : 'none',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '100vw',
            height: '100%',
            zIndex: -1,
            pointerEvents: 'none',
          }
        }}
      >
        <Box sx={{ 
          mb: 6, 
          textAlign: 'center',
          animation: `${fadeIn} 0.5s ease-out`,
        }}>
          <Typography
            variant="h3"
            sx={{
              fontSize: { xs: '1.75rem', md: '2.5rem' },
              fontWeight: 700,
              color: '#00A3FF',
              mb: 2,
              textShadow: '0 0 20px rgba(0, 163, 255, 0.3)',
              position: 'relative',
              display: 'inline-block',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: '-10px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '60px',
                height: '2px',
                background: 'linear-gradient(90deg, rgba(0, 163, 255, 0) 0%, rgba(0, 163, 255, 0.5) 50%, rgba(0, 163, 255, 0) 100%)',
              },
            }}
          >
            {tab.category.title}
          </Typography>
          <Typography
            sx={{
              color: 'rgba(255, 255, 255, 0.7)',
              maxWidth: '800px',
              mx: 'auto',
              fontSize: '1.1rem',
              lineHeight: 1.7,
              mt: 4,
              animation: `${fadeIn} 0.5s ease-out 0.2s both`,
            }}
          >
            {tab.category.description}
          </Typography>
        </Box>

        <Grid 
          container 
          spacing={4}
          sx={{
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: -24,
              right: -24,
              bottom: 0,
              background: 'radial-gradient(circle at 50% 50%, rgba(0, 163, 255, 0.05) 0%, rgba(0, 163, 255, 0) 70%)',
              pointerEvents: 'none',
            }
          }}
        >
          {tab.features.map((feature, index) => (
            <Grid item xs={12} md={6} lg={4} key={feature.id}>
              <FeatureCard feature={feature} index={index} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Fade>
  );
};

export default FeatureTab;
