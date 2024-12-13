import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import Sidebar from '../admin/Sidebar';
import ParticleBackground from '../shared/ParticleBackground';

const AdminLayout = () => {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#070E1A' }}>
      <Sidebar />
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1,
          minHeight: '100vh',
          position: 'relative',
          pt: 4, // Reduced top padding
        }}
      >
        <ParticleBackground />
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default AdminLayout; 