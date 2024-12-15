import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import {
  AutoFixHigh as AIIcon,
  Psychology as OutcomesIcon,
  Autorenew as EvolutionIcon,
  Hub as HarmonyIcon,
} from '@mui/icons-material';

interface Feature {
  icon: React.ReactElement;
  title: string;
  description: string;
}

const mainFeatures: Feature[] = [
  {
    icon: <AIIcon sx={{ fontSize: 40, color: '#00A3FF' }} />,
    title: 'AI and the Puzzle of Complexity',
    description: 'With intelligent reasoning, feedback loops, and self-adaptive models, our system breaks complex problems into manageable steps, learns from each iteration, and quietly handles the grunt work behind the scenes.',
  },
  {
    icon: <OutcomesIcon sx={{ fontSize: 40, color: '#00A3FF' }} />,
    title: 'Beyond Features, Towards Outcomes',
    description: 'Our platform evolves from a set of capabilities to a full-service operator, delivering entire outcomes rather than just tools. We handle end-to-end processes, guided by your intent and feedback.',
  },
  {
    icon: <EvolutionIcon sx={{ fontSize: 40, color: '#00A3FF' }} />,
    title: 'Continuous Refinement & Evolution',
    description: 'The system refines its understanding over time, adapting to shifting needs, new business conditions, and evolving preferences, making the service smarter and more aligned with desired outcomes.',
  },
  {
    icon: <HarmonyIcon sx={{ fontSize: 40, color: '#00A3FF' }} />,
    title: 'Cultural and Operational Harmony',
    description: 'Rather than buying tools and hoping they fit into existing workflows, tap into services delivered by software that mesh seamlessly with your core objectives.',
  },
];

const FeatureGrid: React.FC = () => {
  return (
    <Box sx={{ 
      py: { xs: 8, md: 10 },
      px: { xs: 1, sm: 2, md: 3 },
      bgcolor: 'rgba(10, 25, 41, 0.7)',
    }}>
      <Typography
        variant="h3"
        align="center"
        sx={{
          color: 'white',
          fontWeight: 600,
          mb: 2,
        }}
      >
        A New Paradigm in Software
      </Typography>
      <Typography
        variant="h6"
        align="center"
        sx={{
          color: 'rgba(255, 255, 255, 0.7)',
          mb: 8,
          maxWidth: 800,
          mx: 'auto',
          lineHeight: 1.6,
        }}
      >
        Experience a shift from traditional software tools to a comprehensive service that delivers complete outcomes
      </Typography>

      <Grid container spacing={4}>
        {mainFeatures.map((feature, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Box
              sx={{
                p: 4,
                height: '100%',
                bgcolor: 'rgba(255, 255, 255, 0.03)',
                borderRadius: 2,
                transition: 'all 0.3s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  bgcolor: 'rgba(255, 255, 255, 0.05)',
                  boxShadow: '0 8px 24px rgba(0, 163, 255, 0.1)',
                },
              }}
            >
              <Box sx={{ mb: 2 }}>{feature.icon}</Box>
              <Typography
                variant="h5"
                sx={{
                  color: 'white',
                  fontWeight: 600,
                  mb: 2,
                }}
              >
                {feature.title}
              </Typography>
              <Typography
                sx={{
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontSize: '1rem',
                  lineHeight: 1.6,
                }}
              >
                {feature.description}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FeatureGrid;
