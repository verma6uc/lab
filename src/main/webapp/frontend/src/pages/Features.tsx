import React, { useState } from 'react';
import { Box, Tabs, Tab, Typography } from '@mui/material';
import { keyframes } from '@mui/system';
import { featureTabs } from './Features/data';
import FeatureTab from './Features/components/FeatureTab';
import FeaturesCallToAction from './Features/components/FeaturesCallToAction';

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

const Features: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ 
      minHeight: '100vh',
      position: 'relative',
      '& > *': {
        position: 'relative',
        zIndex: 1,
      },
    }}>
      {/* Hero Section */}
      <Box 
        sx={{ 
          pt: { xs: 12, md: 16 }, 
          pb: { xs: 8, md: 10 },
          px: { xs: 2, sm: 4, md: 6 },
          textAlign: 'center',
          animation: `${fadeIn} 0.5s ease-out`,
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 50% 50%, rgba(0, 163, 255, 0.05) 0%, rgba(0, 163, 255, 0) 70%)',
            pointerEvents: 'none',
          }
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: '2.5rem', md: '4rem' },
            fontWeight: 700,
            color: '#00A3FF',
            mb: 3,
            textShadow: '0 0 20px rgba(0, 163, 255, 0.3)',
          }}
        >
          Features
        </Typography>
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: '1.25rem', md: '1.5rem' },
            color: 'rgba(255, 255, 255, 0.7)',
            maxWidth: '800px',
            mx: 'auto',
            lineHeight: 1.6,
          }}
        >
          Discover how our AI-powered platform can transform your product development process
        </Typography>
      </Box>

      {/* Tabs Navigation */}
      <Box 
        sx={{ 
          bgcolor: 'rgba(2, 9, 20, 0.3)',
          backdropFilter: 'blur(10px)',
          borderTop: '1px solid rgba(255, 255, 255, 0.05)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
          mb: 8,
          position: 'sticky',
          top: 0,
          zIndex: 2,
        }}
      >
        <Box sx={{ maxWidth: '1600px', mx: 'auto' }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            sx={{
              '& .MuiTabs-indicator': {
                backgroundColor: '#00A3FF',
                height: 3,
                borderRadius: '3px 3px 0 0',
              },
              '& .MuiTab-root': {
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '1rem',
                textTransform: 'none',
                minHeight: 64,
                '&.Mui-selected': {
                  color: '#00A3FF',
                },
              },
            }}
          >
            {featureTabs.map((tab) => (
              <Tab 
                key={tab.category.id} 
                label={tab.category.title}
                sx={{
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    color: 'rgba(0, 163, 255, 0.8)',
                  },
                }}
              />
            ))}
          </Tabs>
        </Box>
      </Box>

      {/* Content Area */}
      <Box sx={{ 
        maxWidth: '1600px', 
        mx: 'auto',
        px: { xs: 2, sm: 4, md: 6 },
        pb: { xs: 8, md: 12 },
      }}>
        {featureTabs.map((tab, index) => (
          <FeatureTab
            key={tab.category.id}
            tab={tab}
            isActive={activeTab === index}
          />
        ))}
      </Box>

      {/* Call to Action */}
      <FeaturesCallToAction />
    </Box>
  );
};

export default Features;
