import React from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Sidebar from '../creator/Sidebar';
import Navbar from '../creator/Navbar';
import ParticleBackground from '../ParticleBackground';

const CreatorLayout = () => {
  return (
    <Box
      component="div"
      sx={{
        display: 'flex',
        minHeight: '100vh',
        bgcolor: '#0A1929',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Particle Background */}
      <ParticleBackground />

      {/* Content Layer */}
      <Box sx={{ 
        position: 'relative', 
        zIndex: 1,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}>
        <Navbar />
        <Box sx={{ display: 'flex', flexGrow: 1 }}>
          <Sidebar />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              minHeight: '100vh',
              bgcolor: 'transparent',
              color: 'white',
              ml: '220px', // Match sidebar width
              pt: '64px', // Match navbar height
              pb: 1,
              px: 1, // 8px padding
            }}
          >
            <Box sx={{ 
              width: '100%',
              mt: 1, // Reduced from 2 to 1 (8px)
            }}>
              <Outlet />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CreatorLayout;
