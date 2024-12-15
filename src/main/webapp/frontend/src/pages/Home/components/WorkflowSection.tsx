import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import {
  Lightbulb as IdeaIcon,
  Search as ResearchIcon,
  Architecture as BlueprintIcon,
  Description as DocumentIcon,
  Timeline as MetricsIcon,
  Autorenew as RefinementIcon,
} from '@mui/icons-material';

interface WorkflowStep {
  icon: React.ReactElement;
  number: string;
  title: string;
  description: string;
}

const steps: WorkflowStep[] = [
  {
    icon: <IdeaIcon sx={{ fontSize: 32, color: '#00A3FF' }} />,
    number: '01',
    title: 'Start with an Idea',
    description: 'Provide a short description of what you want to create—no technical details needed.',
  },
  {
    icon: <ResearchIcon sx={{ fontSize: 32, color: '#00A3FF' }} />,
    number: '02',
    title: 'AI-Driven Research',
    description: 'Our agents analyze competitors, market context, and user patterns, turning your vague concept into structured recommendations.',
  },
  {
    icon: <BlueprintIcon sx={{ fontSize: 32, color: '#00A3FF' }} />,
    number: '03',
    title: 'Blueprint Generation',
    description: 'We produce a visual map of pages, sections, features, and metrics. Drag and drop to rearrange, rename, or remove elements.',
  },
  {
    icon: <DocumentIcon sx={{ fontSize: 32, color: '#00A3FF' }} />,
    number: '04',
    title: 'PRD & Documentation',
    description: 'Receive a detailed Product Requirements Document and integrated references—ready to hand off to a development team or use as your actionable guide.',
  },
  {
    icon: <MetricsIcon sx={{ fontSize: 32, color: '#00A3FF' }} />,
    number: '05',
    title: 'Add Metrics & Integrations',
    description: 'Define KPIs, track performance, and connect to external platforms. Tweak metrics anytime to measure real success.',
  },
  {
    icon: <RefinementIcon sx={{ fontSize: 32, color: '#00A3FF' }} />,
    number: '06',
    title: 'Continuous Refinement',
    description: 'Give feedback at each stage. Every comment, suggestion, or data point feeds back into our system, improving recommendations and outcomes over time.',
  },
];

const WorkflowSection: React.FC = () => {
  return (
    <Box sx={{ 
      py: { xs: 8, md: 10 },
      px: { xs: 1, sm: 2, md: 3 },
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
        How It Works: A Guided Path from Concept to Completion
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
        Building something extraordinary doesn't have to be complicated. We've designed a step-by-step journey where your idea evolves effortlessly through AI-driven insights, user feedback loops, and intelligent orchestration.
      </Typography>

      <Grid container spacing={4}>
        {steps.map((step, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Box
              sx={{
                p: 4,
                bgcolor: 'rgba(255, 255, 255, 0.03)',
                borderRadius: 2,
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  bgcolor: 'rgba(255, 255, 255, 0.05)',
                  boxShadow: '0 8px 24px rgba(0, 163, 255, 0.1)',
                },
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '4px',
                  height: '100%',
                  background: 'linear-gradient(180deg, #00A3FF 0%, rgba(0, 163, 255, 0) 100%)',
                },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                {step.icon}
                <Typography
                  sx={{
                    color: '#00A3FF',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    ml: 2,
                    opacity: 0.8,
                  }}
                >
                  {step.number}
                </Typography>
              </Box>
              <Typography
                variant="h5"
                sx={{
                  color: 'white',
                  fontWeight: 600,
                  mb: 2,
                }}
              >
                {step.title}
              </Typography>
              <Typography
                sx={{
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontSize: '1rem',
                  lineHeight: 1.6,
                }}
              >
                {step.description}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default WorkflowSection;
