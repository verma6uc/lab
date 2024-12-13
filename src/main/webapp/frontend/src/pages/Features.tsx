import React from 'react';
import { Box, Typography, Grid, Container } from '@mui/material';
import { GradientText, BaseCard, CardContent } from '../components/shared/StyledComponents';
import {
  ResearchIcon,
  BlueprintIcon,
  BrandIcon,
  UnifiedIcon,
  PrdIcon,
  FeedbackIcon,
  MetricsIcon,
  IntegrationIcon,
  AdaptiveIcon
} from '../components/shared/FeatureIcons';

const featureGroups = [
  {
    title: "Research & Planning",
    description: "Leverage AI to analyze and plan your product development",
    features: [
      {
        icon: <ResearchIcon />,
        title: 'AI-Driven Research & Insights',
        description: 'Harness the power of AI to analyze user ideas and market context, delivering intelligent recommendations that shape your product strategy.'
      },
      {
        icon: <BlueprintIcon />,
        title: 'Outcome-Focused Blueprint Generation',
        description: 'Create dynamic visual blueprints that map out your product journey. Easily modify navigation flows and user paths while maintaining a clear view of your desired outcomes.'
      },
      {
        icon: <BrandIcon />,
        title: 'Section Archetypes & Brand Alignment',
        description: 'Access a library of predefined templates that ensure consistent brand representation across all product components. Customize and adapt these archetypes to match your unique brand identity.'
      }
    ]
  },
  {
    title: "Development & Documentation",
    description: "Streamline your development process with integrated tools",
    features: [
      {
        icon: <UnifiedIcon />,
        title: 'Unified Ontology for Seamless Integration',
        description: 'Maintain consistent definitions and terminology across all components, reducing confusion and streamlining communication between team members and stakeholders.'
      },
      {
        icon: <PrdIcon />,
        title: 'Refinable PRD Generation',
        description: 'Automatically generate detailed Product Requirements Documents that can be refined and aligned with team feedback. Keep your documentation current and comprehensive.'
      },
      {
        icon: <IntegrationIcon />,
        title: 'Integration with External Services',
        description: 'Connect seamlessly with your favorite tools and services. Our platform works harmoniously with your existing tech stack, enhancing rather than replacing your current workflow.'
      }
    ]
  },
  {
    title: "Continuous Improvement",
    description: "Evolve and improve with data-driven insights",
    features: [
      {
        icon: <FeedbackIcon />,
        title: 'User-Centric Feedback Loops',
        description: 'Integrate direct user feedback through built-in tools, enabling continuous improvement and validation of your product decisions. Create a dialogue with your users that drives product evolution.'
      },
      {
        icon: <MetricsIcon />,
        title: 'Metrics Management & Continuous Improvement',
        description: 'Track key performance indicators and leverage data-driven insights to iterate and improve your product continuously. Our system suggests relevant KPIs and helps monitor progress.'
      },
      {
        icon: <AdaptiveIcon />,
        title: 'Adaptive Intelligence & Ongoing Learning',
        description: 'Benefit from AI agents that learn from feedback and accumulated data to continuously improve their recommendations and insights, making your product development smarter over time.'
      }
    ]
  }
];

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <BaseCard>
    <CardContent>
      <Box
        className="feature-icon"
        sx={{
          width: 64,
          height: 64,
          borderRadius: '20px',
          background: 'rgba(0, 163, 255, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 3,
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            transform: 'scale(1.1)',
            background: 'rgba(0, 163, 255, 0.2)',
          }
        }}
      >
        {icon}
      </Box>
      <Typography
        variant="h5"
        className="text-primary"
        sx={{
          fontWeight: 600,
          mb: 2,
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            background: 'linear-gradient(135deg, #00A3FF 0%, #0066FF 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }
        }}
      >
        {title}
      </Typography>
      <Typography className="text-secondary" sx={{ lineHeight: 1.6 }}>
        {description}
      </Typography>
    </CardContent>
  </BaseCard>
);

const Features = () => {
  return (
    <Container maxWidth={false} disableGutters>
      <Container maxWidth="xl" sx={{ pt: '120px', pb: '80px' }}>
        <Box className="page-header">
          <Typography
            className="text-accent"
            sx={{
              fontSize: '0.875rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '1px',
              mb: 2
            }}
          >
            Cutting-Edge Capabilities
          </Typography>
          <GradientText variant="h2" sx={{ 
            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }
          }}>
            Features that Empower Innovation
          </GradientText>
          <Typography className="description" sx={{
            fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' }
          }}>
            Advanced AI tools and features designed to amplify your creative potential and streamline development
          </Typography>
        </Box>

        {featureGroups.map((group, groupIndex) => (
          <Box key={groupIndex} sx={{ mb: 12 }}>
            <Box sx={{ textAlign: 'center', mb: 6 }}>
              <GradientText variant="h3" sx={{ 
                fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' },
                fontWeight: 600,
                mb: 2
              }}>
                {group.title}
              </GradientText>
              <Typography className="text-secondary" sx={{
                fontSize: { xs: '1rem', sm: '1.1rem' },
                maxWidth: '600px',
                mx: 'auto'
              }}>
                {group.description}
              </Typography>
            </Box>
            
            <Grid container spacing={4}>
              {group.features.map((feature, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <FeatureCard {...feature} />
                </Grid>
              ))}
            </Grid>
          </Box>
        ))}
      </Container>
    </Container>
  );
};

export default Features; 