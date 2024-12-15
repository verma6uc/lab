import React from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import ParticleBackground from '../ParticleBackground';

const PublicLayout: React.FC = () => {
  return (
    <Box sx={{ 
      minHeight: '100vh',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Particle Background */}
      <ParticleBackground />
      
      {/* Content Layer */}
      <Box sx={{ 
        position: 'relative',
        zIndex: 1,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}>
        <Navbar />
        <Box component="main" sx={{ 
          flexGrow: 1,
          position: 'relative',
          '& > *': {
            position: 'relative',
          }
        }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default PublicLayout;
