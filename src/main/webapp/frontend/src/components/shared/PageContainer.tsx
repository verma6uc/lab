import React from 'react';
import { Box, Paper } from '@mui/material';

interface PageContainerProps {
  children: React.ReactNode;
}

const PageContainer: React.FC<PageContainerProps> = ({ children }) => {
  return (
    <Paper
      sx={{
        background: 'rgba(10, 25, 41, 0.7)',
        backdropFilter: 'blur(10px)',
        borderRadius: '24px',
        p: 4,
        border: '1px solid rgba(0, 163, 255, 0.1)',
        transition: 'all 0.3s ease',
        position: 'relative',
        overflow: 'hidden',
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: 'linear-gradient(90deg, rgba(0, 163, 255, 0) 0%, rgba(0, 163, 255, 0.3) 50%, rgba(0, 163, 255, 0) 100%)',
          opacity: 0,
          transition: 'opacity 0.3s ease-in-out',
        },
        '&:hover': {
          border: '1px solid rgba(0, 163, 255, 0.2)',
          boxShadow: '0 8px 32px rgba(0, 163, 255, 0.1)',
          '&::after': {
            opacity: 1,
          }
        }
      }}
    >
      {children}
    </Paper>
  );
};

export default PageContainer;
