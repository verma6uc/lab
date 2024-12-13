import React from 'react';
import { Box } from '@mui/material';
import ParticleBackground from '../shared/ParticleBackground';

interface AdminPageWrapperProps {
  children: React.ReactNode;
}

const AdminPageWrapper: React.FC<AdminPageWrapperProps> = ({ children }) => {
  return (
    <Box 
      sx={{ 
        minHeight: '100vh',
        bgcolor: '#070E1A',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <ParticleBackground />
      <Box 
        sx={{ 
          position: 'relative',
          zIndex: 1,
          p: 4
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default AdminPageWrapper; 