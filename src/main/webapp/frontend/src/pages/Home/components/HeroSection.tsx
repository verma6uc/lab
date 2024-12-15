import React from 'react';
import { Box, Typography, Button, Grid } from '@mui/material';
import ParticleBackground from '../../../components/ParticleBackground';

const HeroSection: React.FC = () => {
  return (
    <Box sx={{ 
      position: 'relative', 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center',
      pt: { xs: 12, md: 16 }, 
      pb: { xs: 8, md: 10 },
      px: { xs: 1, sm: 2, md: 3 },
    }}>
      <ParticleBackground />
      <Grid container spacing={4} sx={{ position: 'relative' }}>
        <Grid item xs={12} md={10} sx={{ mx: 'auto', textAlign: 'center' }}>
          <Box sx={{ mb: 4 }}>
            <Typography
              component="span"
              sx={{
                fontSize: { xs: '1.5rem', md: '2rem' },
                fontWeight: 500,
                color: 'rgba(255, 255, 255, 0.9)',
                display: 'block',
                mb: 1,
              }}
            >
              From
            </Typography>
            <Typography
              component="span"
              sx={{
                fontSize: { xs: '2rem', md: '2.5rem' },
                fontWeight: 700,
                color: '#4A9EFF',
                display: 'block',
                mb: 1,
              }}
            >
              Software-as-a-Service
            </Typography>
            <Typography
              component="span"
              sx={{
                fontSize: { xs: '1.5rem', md: '2rem' },
                fontWeight: 500,
                color: 'rgba(255, 255, 255, 0.9)',
                display: 'block',
                mb: 1,
              }}
            >
              to
            </Typography>
            <Typography
              component="span"
              sx={{
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                fontWeight: 700,
                background: 'linear-gradient(135deg, #00A3FF 0%, #0066FF 100%)',
                backgroundClip: 'text',
                textFillColor: 'transparent',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 0 20px rgba(0, 163, 255, 0.3)',
                mb: 3,
                display: 'block',
              }}
            >
              Service-as-a-Software
            </Typography>
          </Box>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '1.25rem', md: '1.5rem' },
              fontWeight: 500,
              color: '#00A3FF',
              mb: 3,
              lineHeight: 1.6,
            }}
          >
            Beyond tools, towards complete autonomous service experiences
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: '1rem', md: '1.125rem' },
              color: 'rgba(255, 255, 255, 0.7)',
              mb: 5,
              maxWidth: '800px',
              mx: 'auto',
              lineHeight: 1.8,
            }}
          >
            While SaaS revolutionized software delivery, we're pioneering the next evolution: 
            a platform that doesn't just provide tools—it delivers entire outcomes. From concept 
            to execution, our AI orchestrates complete solutions with minimal human intervention.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
            <Button
              variant="contained"
              size="large"
              sx={{
                background: 'linear-gradient(135deg, #00A3FF 0%, #0066FF 100%)',
                color: 'white',
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                textTransform: 'none',
                borderRadius: 2,
                '&:hover': {
                  background: 'linear-gradient(135deg, #0066FF 0%, #0052CC 100%)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 20px rgba(0, 102, 255, 0.3)',
                },
                transition: 'all 0.3s ease-in-out',
              }}
            >
              Experience the Future
            </Button>
            <Button
              variant="outlined"
              size="large"
              sx={{
                color: '#00A3FF',
                borderColor: 'rgba(0, 163, 255, 0.5)',
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                textTransform: 'none',
                borderRadius: 2,
                '&:hover': {
                  borderColor: '#00A3FF',
                  bgcolor: 'rgba(0, 163, 255, 0.1)',
                },
                transition: 'all 0.3s ease-in-out',
              }}
            >
              Learn More
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HeroSection;
