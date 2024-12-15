import React from 'react';
import { Box, Container } from '@mui/material';
import { Outlet } from 'react-router-dom';
import ParticleBackground from '../ParticleBackground';

const AuthLayout = () => {
  return (
    <Box
      component="div"
      sx={{
        minHeight: '100vh',
        bgcolor: '#0A1929',
        color: 'white',
        position: 'relative',
      }}
    >
      <ParticleBackground />
      <Container
        maxWidth="sm"
        sx={{
          position: 'relative',
          zIndex: 1,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          py: 4,
        }}
      >
        <Box
          component="div"
          sx={{
            bgcolor: 'rgba(17, 25, 40, 0.6)',
            backdropFilter: 'blur(16px)',
            borderRadius: 2,
            border: '1px solid rgba(255, 255, 255, 0.05)',
            p: 4,
          }}
        >
          <Outlet />
        </Box>
      </Container>
    </Box>
  );
};

export default AuthLayout;
