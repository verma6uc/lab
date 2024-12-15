import React from 'react';
import { Box, Typography } from '@mui/material';

interface FeatureCardProps {
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description }) => (
  <Box sx={{ 
    p: 4, 
    background: 'linear-gradient(135deg, rgba(0, 163, 255, 0.1) 0%, rgba(0, 163, 255, 0.05) 100%)',
    borderRadius: '24px',
    border: '1px solid rgba(0, 163, 255, 0.1)',
    height: '100%',
    transition: 'all 0.3s ease',
    position: 'relative',
    overflow: 'hidden',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(10px)',
    '&:hover': {
      transform: 'translateY(-4px)',
      border: '1px solid rgba(0, 163, 255, 0.2)',
      boxShadow: '0 8px 30px rgba(0, 163, 255, 0.15)',
      '&::after': {
        opacity: 1,
      },
      '& .card-title': {
        background: 'linear-gradient(90deg, #00A3FF, #00FFD1)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }
    },
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'radial-gradient(circle at center, rgba(0, 163, 255, 0.1) 0%, rgba(0, 163, 255, 0) 70%)',
      opacity: 0,
      transition: 'opacity 0.3s ease',
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '1px',
      background: 'linear-gradient(90deg, rgba(0, 163, 255, 0) 0%, rgba(0, 163, 255, 0.3) 50%, rgba(0, 163, 255, 0) 100%)',
      opacity: 0,
      transition: 'opacity 0.3s ease',
    }
  }}>
    <Typography 
      className="card-title"
      variant="h6" 
      sx={{ 
        color: '#00A3FF', 
        mb: 2, 
        fontWeight: 600,
        fontSize: '1.25rem',
        transition: 'all 0.3s ease',
      }}
    >
      {title}
    </Typography>
    <Typography 
      sx={{ 
        color: 'rgba(255, 255, 255, 0.8)', 
        lineHeight: 1.7,
        fontSize: '1.05rem',
      }}
    >
      {description}
    </Typography>
  </Box>
);

export default FeatureCard;
