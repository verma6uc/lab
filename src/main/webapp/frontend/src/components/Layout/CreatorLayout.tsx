import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import Header from '../shared/Header';

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Features', path: '/features' },
  { label: 'Solutions', path: '/solutions' },
  { label: 'Personas', path: '/personas' },
  { label: 'Agents', path: '/agents' },
  { label: 'Journey', path: '/journey' },
];

const CreatorLayout: React.FC = () => {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#0A1929' }}>
      <Header navItems={navItems} />
      <Box component="main" sx={{ p: 3 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default CreatorLayout;
