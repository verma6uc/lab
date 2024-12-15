import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import Sidebar from '../admin/Sidebar';
import ParticleBackground from '../shared/ParticleBackground';

const AdminLayout = () => {
  return (
    <Box 
      component="div"
      sx={{ 
        display: 'flex', 
        minHeight: '100vh', 
        bgcolor: '#070E1A' 
      }}
    >
      <Sidebar />
      <Box 
        component="div" 
        sx={{ 
          flexGrow: 1,
          minHeight: '100vh',
          position: 'relative',
          pt: 4,
        }}
      >
        <ParticleBackground />
        <Box 
          component="div" 
          sx={{ 
            position: 'relative', 
            zIndex: 1,
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100%',
          }}
        >
          <Box 
            component="div" 
            sx={{ 
              flexGrow: 1,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Outlet />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AdminLayout;
