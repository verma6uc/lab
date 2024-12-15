import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const CallToAction: React.FC = () => {
  return (
    <Box
      sx={{
        py: { xs: 8, md: 10 },
        px: { xs: 1, sm: 2, md: 3 },
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: 'linear-gradient(90deg, rgba(0, 163, 255, 0) 0%, #00A3FF 50%, rgba(0, 163, 255, 0) 100%)',
        },
      }}
    >
      <Box
        sx={{
          textAlign: 'center',
          maxWidth: 800,
          mx: 'auto',
        }}
      >
        <Typography
          variant="h3"
          sx={{
            color: 'white',
            fontWeight: 600,
            mb: 2,
          }}
        >
          Ready to Build Something Amazing?
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: 'rgba(255, 255, 255, 0.7)',
            mb: 6,
            lineHeight: 1.6,
          }}
        >
          Join us in revolutionizing the way products are built. Experience the power of AI-assisted creation.
        </Typography>
        <Button
          variant="contained"
          size="large"
          sx={{
            bgcolor: '#0066FF',
            color: 'white',
            px: 6,
            py: 2,
            fontSize: '1.1rem',
            textTransform: 'none',
            borderRadius: 2,
            position: 'relative',
            overflow: 'hidden',
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              bgcolor: '#0052CC',
              transform: 'translateY(-2px)',
              boxShadow: '0 8px 20px rgba(0, 102, 255, 0.3)',
            },
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0))',
              transform: 'translateX(-100%)',
              transition: 'transform 0.6s',
            },
            '&:hover::before': {
              transform: 'translateX(100%)',
            },
          }}
        >
          Learn More
        </Button>
      </Box>
    </Box>
  );
};

export default CallToAction;
