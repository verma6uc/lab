import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { keyframes } from '@mui/system';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const glow = keyframes`
  0% {
    text-shadow: 0 0 20px rgba(0, 163, 255, 0.3);
  }
  50% {
    text-shadow: 0 0 30px rgba(0, 163, 255, 0.5);
  }
  100% {
    text-shadow: 0 0 20px rgba(0, 163, 255, 0.3);
  }
`;

const HeroSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box 
      sx={{ 
        width: '100%', 
        pt: { xs: 12, md: 16 }, 
        pb: { xs: 10, md: 12 },
        px: { xs: 2, sm: 4, md: 6 },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        bgcolor: 'rgba(2, 9, 20, 0.4)',
        backdropFilter: 'blur(10px)',
        pointerEvents: 'none',
      }}
    >
      <Box sx={{ width: '100%', maxWidth: '1600px' }}>
        <Box sx={{ 
          textAlign: 'center', 
          mb: { xs: 8, md: 10 },
          animation: `${fadeIn} 1s ease-out`,
        }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2.5rem', md: '4rem' },
              fontWeight: 700,
              color: '#00A3FF',
              mb: 3,
              animation: `${glow} 3s infinite ease-in-out`,
              textShadow: '0 0 20px rgba(0, 163, 255, 0.3)',
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: '-10px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '60px',
                height: '2px',
                background: 'linear-gradient(90deg, rgba(0, 163, 255, 0) 0%, rgba(0, 163, 255, 0.5) 50%, rgba(0, 163, 255, 0) 100%)',
              },
            }}
          >
            Creator Labs
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '1.25rem', md: '1.5rem' },
              color: 'rgba(255, 255, 255, 0.7)',
              mb: 6,
              maxWidth: '800px',
              mx: 'auto',
              lineHeight: 1.6,
              animation: `${fadeIn} 1s ease-out 0.3s both`,
            }}
          >
            Transform your ideas into fully realized products with our AI-powered platform
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/auth/register')}
            sx={{
              bgcolor: 'rgba(0, 163, 255, 0.1)',
              pointerEvents: 'auto',
              '&:hover': {
                bgcolor: 'rgba(0, 163, 255, 0.2)',
                transform: 'translateY(-4px)',
                boxShadow: '0 4px 20px rgba(0, 163, 255, 0.3)',
              },
              px: 6,
              py: 2,
              borderRadius: 2,
              textTransform: 'none',
              fontSize: '1.1rem',
              boxShadow: '0 0 20px rgba(0, 163, 255, 0.3)',
              transition: 'all 0.3s ease-in-out',
              animation: `${fadeIn} 1s ease-out 0.6s both`,
              position: 'relative',
              overflow: 'hidden',
              border: '1px solid rgba(0, 163, 255, 0.3)',
              color: '#00A3FF',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: '-100%',
                width: '100%',
                height: '100%',
                background: 'linear-gradient(90deg, transparent 0%, rgba(0, 163, 255, 0.2) 50%, transparent 100%)',
                transition: 'left 0.5s ease-in-out',
              },
              '&:hover::before': {
                left: '100%',
              },
            }}
          >
            Start Creating
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default HeroSection;
