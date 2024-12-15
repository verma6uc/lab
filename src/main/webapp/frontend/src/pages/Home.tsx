import React from 'react';
import { Box } from '@mui/material';
import {
  HeroSection,
  FeatureGrid,
  WorkflowSection,
  CallToAction,
} from './Home/components';

const Home: React.FC = () => {
  return (
    <Box 
      sx={{ 
        minHeight: '100vh', 
        bgcolor: '#0A1929',
        position: 'relative',
        '& > *': {
          position: 'relative',
          zIndex: 1,
        },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 50% 50%, rgba(0, 163, 255, 0.05) 0%, rgba(0, 163, 255, 0) 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }
      }}
    >
      <Box sx={{ width: '98%', mx: 'auto' }}>
        <HeroSection />
        <Box sx={{ position: 'relative' }}>
          <FeatureGrid />
          <WorkflowSection />
          <CallToAction />
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
