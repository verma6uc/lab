import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Memory as MemoryIcon } from '@mui/icons-material';

export interface ApplicationHeaderProps {
  applicationId?: string;
}

const ApplicationHeader: React.FC<ApplicationHeaderProps> = ({ applicationId }) => {
  return (
    <Box sx={{ 
      p: 2, 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <MemoryIcon sx={{ color: '#00A3FF', fontSize: 32 }} />
        <Box>
          <Typography variant="h5" sx={{ color: 'white' }}>
            Application {applicationId}
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            Current Stage: Memory Definition
          </Typography>
        </Box>
      </Box>
      <Button
        variant="contained"
        sx={{
          bgcolor: 'rgba(0, 163, 255, 0.1)',
          color: '#00A3FF',
          '&:hover': {
            bgcolor: 'rgba(0, 163, 255, 0.2)',
          },
        }}
      >
        View Details
      </Button>
    </Box>
  );
};

export default ApplicationHeader;
