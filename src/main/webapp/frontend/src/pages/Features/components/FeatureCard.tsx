import React from 'react';
import { Box, Typography, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { keyframes } from '@mui/system';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Feature } from '../types';

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

const glowPulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(0, 163, 255, 0);
  }
  50% {
    box-shadow: 0 0 20px 0 rgba(0, 163, 255, 0.1);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(0, 163, 255, 0);
  }
`;

interface FeatureCardProps {
  feature: Feature;
  index: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ feature, index }) => {
  return (
    <Box
      sx={{
        bgcolor: 'rgba(2, 9, 20, 0.3)',
        backdropFilter: 'blur(10px)',
        borderRadius: 3,
        p: 4,
        height: '100%',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        transition: 'all 0.3s ease-in-out',
        animation: `${fadeIn} 0.5s ease-out ${index * 0.1}s both`,
        position: 'relative',
        overflow: 'hidden',
        '&:hover': {
          transform: 'translateY(-4px)',
          borderColor: 'rgba(0, 163, 255, 0.3)',
          bgcolor: 'rgba(2, 9, 20, 0.4)',
          animation: `${glowPulse} 2s infinite`,
          '& .feature-icon': {
            transform: 'scale(1.1)',
            '& > *': {
              color: '#00A3FF',
            }
          },
          '& .bullet-icon': {
            color: '#00A3FF',
          },
        },
        '&::before': {
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
        '&:hover::before': {
          opacity: 1,
        },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Box
          className="feature-icon"
          sx={{
            mr: 2,
            transition: 'all 0.3s ease-in-out',
            display: 'flex',
            alignItems: 'center',
            '& > *': {
              color: 'rgba(255, 255, 255, 0.8)',
              transition: 'color 0.3s ease-in-out',
            }
          }}
        >
          {feature.icon}
        </Box>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 600,
            color: 'white',
            fontSize: '1.25rem',
          }}
        >
          {feature.title}
        </Typography>
      </Box>

      <Typography
        sx={{
          color: 'rgba(255, 255, 255, 0.7)',
          mb: 3,
          lineHeight: 1.7,
        }}
      >
        {feature.description}
      </Typography>

      <List sx={{ p: 0 }}>
        {feature.bullets.map((bullet, idx) => (
          <ListItem 
            key={idx} 
            sx={{ 
              px: 0,
              '&:hover': {
                '& .bullet-icon': {
                  color: '#00A3FF',
                },
              },
            }}
          >
            <ListItemIcon sx={{ 
              minWidth: 36, 
              color: 'rgba(255, 255, 255, 0.5)', 
              transition: 'color 0.3s ease',
            }}>
              <CheckCircleOutlineIcon className="bullet-icon" fontSize="small" />
            </ListItemIcon>
            <ListItemText 
              primary={bullet}
              primaryTypographyProps={{
                sx: {
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontSize: '0.95rem',
                }
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default FeatureCard;
