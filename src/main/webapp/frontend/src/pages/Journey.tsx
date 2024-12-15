import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { GradientText } from '../components/shared/StyledComponents';
import ParticleBackground from '../components/ParticleBackground';
import StageCard from './Journey/components/StageCard';
import FeatureCard from './Journey/components/FeatureCard';
import { stages } from './Journey/data';

const Journey: React.FC = () => {
  return (
    <Box sx={{ 
      minHeight: '100vh',
      position: 'relative',
      overflow: 'hidden',
      bgcolor: 'transparent',
    }}>
      {/* Content Layer */}
      <Box sx={{ 
        position: 'relative', 
        zIndex: 1,
        '& > section': {
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            pointerEvents: 'none',
          }
        }
      }}>
        {/* Service as Software Section */}
        <Box component="section">
          {/* Particle Background Layer */}
          <Box sx={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0 }}>
            <ParticleBackground />
          </Box>

          <Box 
            sx={{ 
              position: 'relative',
              zIndex: 1,
              width: '100%', 
              px: { xs: 1, sm: 2, md: 3 },
              pt: '120px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Box sx={{ width: '98%' }}>
              <Box sx={{ textAlign: 'center', mb: 8 }}>
                <GradientText variant="h2" sx={{ mb: 3, fontWeight: 700, fontSize: '4rem' }}>
                  Service as Software
                </GradientText>
                <Typography
                  sx={{
                    color: 'rgba(255, 255, 255, 0.8)',
                    fontSize: '1.2rem',
                    mx: 'auto',
                    lineHeight: 1.7,
                    mb: 6,
                  }}
                >
                  In a world where traditional 'Software as a Service' offers rigid, pre-defined solutions, our AI-powered platform evolves the paradigm into 'Service as Software'—a dynamic, adaptive approach tailored to your unique challenges.
                </Typography>

                <Box sx={{ width: '100%' }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                      <FeatureCard 
                        title="Why the shift is needed"
                        description="Traditional SaaS can be rigid and requires businesses to adapt to the software. 'Service as Software' adapts dynamically to your business processes."
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <FeatureCard 
                        title="Benefits Explained"
                        description="Customization tailors solutions to unique challenges. Real-time optimization learns and improves continuously. Efficiency reduces friction and simplifies workflows, accelerating innovation and measurable outcomes."
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <FeatureCard 
                        title="The Vision"
                        description="Software is no longer a tool but an intelligent ecosystem that grows with your business, uniting cutting-edge AI with your vision to transform processes into intelligent, service-driven ecosystems."
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Journey Section */}
        <Box component="section">
          <Box 
            sx={{ 
              position: 'relative',
              zIndex: 1,
              width: '100%', 
              px: { xs: 1, sm: 2, md: 3 },
              pb: '80px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Box sx={{ width: '98%' }}>
              {/* Divider */}
              <Box 
                sx={{ 
                  width: '100%', 
                  mx: 'auto',
                  mb: 12,
                  position: 'relative',
                  height: '1px',
                  background: 'linear-gradient(90deg, rgba(0, 163, 255, 0) 0%, rgba(0, 163, 255, 0.2) 50%, rgba(0, 163, 255, 0) 100%)',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: '#00A3FF',
                    boxShadow: '0 0 20px rgba(0, 163, 255, 0.5)',
                  }
                }}
              />

              <Box sx={{ textAlign: 'center', mb: 8 }}>
                <GradientText variant="h2" sx={{ mb: 3, fontWeight: 700, fontSize: '4rem' }}>
                  Building Your Vision
                </GradientText>
                <Typography
                  sx={{
                    color: 'rgba(255, 255, 255, 0.8)',
                    fontSize: '1.2rem',
                    mx: 'auto',
                    lineHeight: 1.7,
                  }}
                >
                  Follow the path as our AI agents guide you through each milestone,
                  transforming your idea into reality.
                </Typography>
              </Box>

              <Box 
                sx={{ 
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    left: { xs: 20, md: 40 },
                    top: 0,
                    bottom: 0,
                    width: '1px',
                    background: 'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.1) 15%, rgba(255,255,255,0.1) 85%, rgba(255,255,255,0) 100%)',
                    zIndex: -1,
                  }
                }}
              >
                {stages.map((stage, index) => (
                  <StageCard key={stage.id} stage={stage} index={index} />
                ))}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Journey;
