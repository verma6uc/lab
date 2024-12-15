import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { Feature } from '../types';

interface FeatureGridProps {
  features: Feature[];
  variant?: 'main' | 'bottom';
}

const FeatureGrid: React.FC<FeatureGridProps> = ({ features, variant = 'main' }) => {
  const isMain = variant === 'main';

  return (
    <Grid container spacing={4} sx={{ mt: isMain ? 0 : 8 }}>
      {features.map((feature, index) => (
        <Grid item xs={12} md={isMain ? 6 : 3} key={index}>
          <Box
            sx={{
              bgcolor: 'rgba(2, 9, 20, 0.4)',
              backdropFilter: 'blur(10px)',
              p: 4,
              borderRadius: isMain ? 3 : 2,
              height: '100%',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              transition: 'all 0.3s ease-in-out',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              overflow: 'hidden',
              pointerEvents: 'none',
              '&:hover': {
                transform: 'translateY(-4px)',
                borderColor: 'rgba(0, 163, 255, 0.3)',
                boxShadow: '0 4px 20px rgba(0, 163, 255, 0.1)',
                bgcolor: 'rgba(2, 9, 20, 0.5)',
                '&::before': {
                  opacity: 1,
                },
              },
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '2px',
                background: 'linear-gradient(90deg, rgba(0, 163, 255, 0) 0%, rgba(0, 163, 255, 0.5) 50%, rgba(0, 163, 255, 0) 100%)',
                opacity: 0,
                transition: 'opacity 0.3s ease-in-out',
              },
            }}
          >
            {isMain ? (
              // Main feature layout
              <>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Box
                    sx={{
                      bgcolor: 'rgba(0, 163, 255, 0.1)',
                      borderRadius: 2,
                      p: 1.5,
                      mr: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <Typography
                    variant="h6"
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
                    lineHeight: 1.7,
                    flexGrow: 1,
                    fontSize: '1rem',
                  }}
                >
                  {feature.description}
                </Typography>
              </>
            ) : (
              // Bottom feature layout
              <>
                <Box sx={{ mb: 3 }}>{feature.icon}</Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    color: 'white',
                    mb: 2,
                    fontSize: '1.1rem',
                  }}
                >
                  {feature.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.7)',
                    flexGrow: 1,
                    lineHeight: 1.6,
                  }}
                >
                  {feature.description}
                </Typography>
              </>
            )}
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default FeatureGrid;
