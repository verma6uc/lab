import React from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
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

const float = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
`;

const glow = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(0, 163, 255, 0.4);
  }
  50% {
    box-shadow: 0 0 20px 10px rgba(0, 163, 255, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(0, 163, 255, 0);
  }
`;

const FeaturesCallToAction: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: '100%',
        bgcolor: 'rgba(2, 9, 20, 0.3)',
        backdropFilter: 'blur(10px)',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        py: { xs: 8, md: 12 },
        px: { xs: 2, sm: 4, md: 6 },
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: 'linear-gradient(90deg, rgba(0, 163, 255, 0) 0%, rgba(0, 163, 255, 0.3) 50%, rgba(0, 163, 255, 0) 100%)',
        },
      }}
    >
      <Box sx={{ maxWidth: '800px', mx: 'auto', position: 'relative' }}>
        <RocketLaunchIcon
          sx={{
            fontSize: '3rem',
            color: '#00A3FF',
            mb: 3,
            animation: `${float} 3s ease-in-out infinite`,
          }}
        />
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: '2rem', md: '2.5rem' },
            fontWeight: 700,
            color: '#00A3FF',
            mb: 3,
            textShadow: '0 0 20px rgba(0, 163, 255, 0.3)',
            animation: `${fadeIn} 0.5s ease-out`,
          }}
        >
          Ready to Transform Your Product Development?
        </Typography>
        <Typography
          sx={{
            color: 'rgba(255, 255, 255, 0.7)',
            mb: 6,
            fontSize: '1.1rem',
            lineHeight: 1.7,
            animation: `${fadeIn} 0.5s ease-out 0.2s both`,
          }}
        >
          Join thousands of creators who are building better products faster with our AI-powered platform.
        </Typography>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          justifyContent="center"
          sx={{ mt: 4, animation: `${fadeIn} 0.5s ease-out 0.4s both` }}
        >
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/auth/register')}
            sx={{
              bgcolor: 'rgba(0, 163, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(0, 163, 255, 0.3)',
              '&:hover': {
                bgcolor: 'rgba(0, 163, 255, 0.2)',
                transform: 'translateY(-4px)',
                animation: `${glow} 2s infinite`,
              },
              px: 6,
              py: 2,
              borderRadius: 2,
              textTransform: 'none',
              fontSize: '1.1rem',
              transition: 'all 0.3s ease-in-out',
              color: '#00A3FF',
            }}
          >
            Start Free Trial
          </Button>
          <Button
            variant="outlined"
            size="large"
            onClick={() => navigate('/solutions')}
            sx={{
              color: '#00A3FF',
              borderColor: '#00A3FF',
              '&:hover': {
                borderColor: '#0081CC',
                bgcolor: 'rgba(0, 163, 255, 0.1)',
                transform: 'translateY(-4px)',
              },
              px: 6,
              py: 2,
              borderRadius: 2,
              textTransform: 'none',
              fontSize: '1.1rem',
              transition: 'all 0.3s ease-in-out',
            }}
          >
            View Solutions
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default FeaturesCallToAction;
