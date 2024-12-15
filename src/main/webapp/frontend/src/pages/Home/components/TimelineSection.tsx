import React from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import {
  Memory as IdeationIcon,
  Architecture as PlanningIcon,
  Palette as DesignIcon,
  Code as DevelopmentIcon,
  BugReport as TestingIcon,
  Rocket as LaunchIcon,
} from '@mui/icons-material';

interface TimelineStep {
  icon: React.ReactElement;
  title: string;
  description: string;
}

const steps: TimelineStep[] = [
  {
    icon: <IdeationIcon sx={{ fontSize: 40, color: '#00A3FF' }} />,
    title: 'Ideation',
    description: 'Transform your vision into actionable concepts with AI assistance.',
  },
  {
    icon: <PlanningIcon sx={{ fontSize: 40, color: '#00A3FF' }} />,
    title: 'Planning',
    description: 'Structure your development roadmap with data-driven insights.',
  },
  {
    icon: <DesignIcon sx={{ fontSize: 40, color: '#00A3FF' }} />,
    title: 'Design',
    description: 'Create intuitive user experiences with AI-powered design tools.',
  },
  {
    icon: <DevelopmentIcon sx={{ fontSize: 40, color: '#00A3FF' }} />,
    title: 'Development',
    description: 'Build your product efficiently with automated workflows.',
  },
  {
    icon: <TestingIcon sx={{ fontSize: 40, color: '#00A3FF' }} />,
    title: 'Testing',
    description: 'Ensure quality with comprehensive automated testing.',
  },
  {
    icon: <LaunchIcon sx={{ fontSize: 40, color: '#00A3FF' }} />,
    title: 'Launch',
    description: 'Deploy confidently with streamlined release management.',
  },
];

const TimelineSection: React.FC = () => {
  return (
    <Box sx={{ py: 10 }}>
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          align="center"
          sx={{
            color: 'white',
            fontWeight: 600,
            mb: 2,
          }}
        >
          Development Process
        </Typography>
        <Typography
          variant="h6"
          align="center"
          sx={{
            color: 'rgba(255, 255, 255, 0.7)',
            mb: 8,
            maxWidth: 800,
            mx: 'auto',
          }}
        >
          Our streamlined process guides you from concept to launch with AI assistance at every step
        </Typography>
        <Grid container spacing={4}>
          {steps.map((step, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Box
                sx={{
                  position: 'relative',
                  p: 3,
                  height: '100%',
                  bgcolor: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: 2,
                  transition: 'all 0.3s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    bgcolor: 'rgba(255, 255, 255, 0.08)',
                  },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '2px',
                    background: 'linear-gradient(90deg, #00A3FF 0%, rgba(0, 163, 255, 0) 100%)',
                  },
                }}
              >
                <Box sx={{ mb: 2 }}>{step.icon}</Box>
                <Typography
                  variant="h6"
                  sx={{
                    color: 'white',
                    fontWeight: 600,
                    mb: 1,
                  }}
                >
                  {step.title}
                </Typography>
                <Typography
                  sx={{
                    color: 'rgba(255, 255, 255, 0.7)',
                    fontSize: '0.875rem',
                  }}
                >
                  {step.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default TimelineSection;
