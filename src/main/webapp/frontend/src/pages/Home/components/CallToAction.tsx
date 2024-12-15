import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CallToAction: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box 
      sx={{ 
        width: '100%', 
        py: { xs: 12, md: 16 }, 
        px: { xs: 2, sm: 4, md: 6 },
        display: 'flex',
        justifyContent: 'center',
        position: 'relative',
        bgcolor: 'rgba(2, 9, 20, 0.4)',
        backdropFilter: 'blur(10px)',
        pointerEvents: 'none',
      }}
    >
      <Box sx={{ 
        width: '100%', 
        maxWidth: '1600px', 
        textAlign: 'center',
        position: 'relative',
        zIndex: 1,
      }}>
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: '2rem', md: '3rem' },
            fontWeight: 700,
            color: '#00A3FF',
            mb: 3,
            textShadow: '0 0 20px rgba(0, 163, 255, 0.3)',
          }}
        >
          Ready to Build Something Amazing?
        </Typography>
        <Typography
          sx={{
            color: 'rgba(255, 255, 255, 0.7)',
            mb: 6,
            maxWidth: '600px',
            mx: 'auto',
            fontSize: '1.1rem',
            lineHeight: 1.7,
          }}
        >
          Join us in revolutionizing the way products are built. Experience the power of AI-assisted creation.
        </Typography>
        <Button
          variant="outlined"
          size="large"
          onClick={() => navigate('/features')}
          sx={{
            color: '#00A3FF',
            borderColor: '#00A3FF',
            bgcolor: 'rgba(0, 163, 255, 0.05)',
            pointerEvents: 'auto',
            '&:hover': {
              borderColor: '#0081CC',
              bgcolor: 'rgba(0, 163, 255, 0.1)',
              transform: 'translateY(-4px)',
              boxShadow: '0 4px 20px rgba(0, 163, 255, 0.2)',
            },
            px: 6,
            py: 2,
            borderRadius: 2,
            textTransform: 'none',
            fontSize: '1.1rem',
            transition: 'all 0.3s ease-in-out',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: '-100%',
              width: '100%',
              height: '100%',
              background: 'linear-gradient(90deg, transparent 0%, rgba(0, 163, 255, 0.1) 50%, transparent 100%)',
              transition: 'left 0.5s ease-in-out',
            },
            '&:hover::before': {
              left: '100%',
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
