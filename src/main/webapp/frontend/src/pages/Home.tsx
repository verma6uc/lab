import React from 'react';
import { Box } from '@mui/material';
import { HeroSection, FeatureGrid, TimelineSection, CallToAction } from './Home/components';
import { features, bottomFeatures, steps } from './Home/data';

const Home: React.FC = () => {
  return (
    <Box sx={{ 
      minHeight: '100vh', 
      position: 'relative',
      overflow: 'hidden',
      bgcolor: 'transparent',
    }}>
      {/* Content Layer */}
      <Box sx={{ 
        position: 'relative', 
        zIndex: 1,
        '& > section': {
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            pointerEvents: 'none',
          }
        }
      }}>
        <Box component="section">
          <HeroSection />
        </Box>
        
        <Box 
          component="section"
          sx={{ 
            width: '100%', 
            px: { xs: 2, sm: 4, md: 6 },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            '& button': {
              pointerEvents: 'auto',
            },
          }}
        >
          <Box sx={{ width: '100%', maxWidth: '1600px' }}>
            <FeatureGrid features={features} variant="main" />
            <FeatureGrid features={bottomFeatures} variant="bottom" />
          </Box>
        </Box>

        <Box component="section">
          <TimelineSection steps={steps} />
        </Box>

        <Box 
          component="section" 
          sx={{ 
            '& button': {
              pointerEvents: 'auto',
            },
          }}
        >
          <CallToAction />
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
