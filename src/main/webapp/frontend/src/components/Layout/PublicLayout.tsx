import React from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import ParticleBackground from '../shared/ParticleBackground';

const PublicLayout: React.FC = () => {
  return (
    <Box 
      sx={{ 
        position: 'relative',
        minHeight: '100vh',
        overflow: 'hidden',
        bgcolor: '#0A1929',
        color: 'white'
      }}
    >
      <ParticleBackground />
      <Box 
        sx={{ 
          position: 'relative',
          zIndex: 1,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Navbar />
        <Box 
          component="main" 
          sx={{ 
            flex: 1,
            position: 'relative',
            pt: { xs: '64px', md: '80px' },
            '& .MuiContainer-root': {
              position: 'relative',
              zIndex: 1,
              px: { xs: 2, sm: 3, md: 4 },
              py: { xs: 4, sm: 6, md: 8 }
            },
            '& .page-header': {
              textAlign: 'center',
              mb: { xs: 4, sm: 6, md: 8 },
              px: { xs: 2, sm: 4 },
              '& h1, & h2': {
                background: 'linear-gradient(45deg, #00A3FF, #00FF94)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: { xs: 2, sm: 3 },
                fontWeight: 700,
                fontSize: {
                  xs: '2rem',
                  sm: '2.5rem',
                  md: '3rem'
                }
              },
              '& .description': {
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: {
                  xs: '1rem',
                  sm: '1.1rem',
                  md: '1.25rem'
                },
                maxWidth: '800px',
                mx: 'auto',
                px: { xs: 2, sm: 0 }
              }
            },
            '& .content-card': {
              background: 'rgba(10, 25, 41, 0.7)',
              borderRadius: { xs: '16px', sm: '24px' },
              p: { xs: 2, sm: 3, md: 4 },
              border: '1px solid rgba(255, 255, 255, 0.1)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
                borderColor: 'rgba(0, 163, 255, 0.3)'
              }
            },
            '& .section-title': {
              color: 'white',
              textAlign: 'center',
              mb: { xs: 4, sm: 6 },
              fontWeight: 600,
              fontSize: {
                xs: '1.5rem',
                sm: '1.75rem',
                md: '2rem'
              }
            },
            '& .highlight-chip': {
              background: 'rgba(0, 163, 255, 0.1)',
              color: '#00A3FF',
              fontWeight: 500,
              fontSize: {
                xs: '0.75rem',
                sm: '0.875rem'
              },
              height: { xs: '24px', sm: '32px' }
            },
            '& .text-primary': {
              color: 'white',
              fontSize: {
                xs: '0.875rem',
                sm: '1rem'
              }
            },
            '& .text-secondary': {
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: {
                xs: '0.8125rem',
                sm: '0.875rem',
                md: '1rem'
              }
            },
            '& .text-accent': {
              color: '#00A3FF'
            },
            '& .MuiGrid-container': {
              spacing: { xs: 2, sm: 3, md: 4 }
            },
            '& .MuiButton-root': {
              minHeight: { xs: '36px', sm: '40px' },
              fontSize: {
                xs: '0.875rem',
                sm: '1rem'
              },
              px: { xs: 2, sm: 3 }
            },
            '& .MuiCard-root': {
              borderRadius: { xs: '12px', sm: '16px' }
            },
            '& .icon-wrapper': {
              width: { xs: '40px', sm: '48px' },
              height: { xs: '40px', sm: '48px' }
            }
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default PublicLayout; 