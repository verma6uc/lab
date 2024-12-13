import React from 'react';
import { Grid, Typography, Box, Container } from '@mui/material';
import { 
  GradientText, 
  BaseCard, 
  CardContent, 
  GlassButton 
} from '../components/shared/StyledComponents';
import {
  AutoAwesome as AutoAwesomeIcon,
  Psychology as PsychologyIcon,
  Code as CodeIcon,
  Hub as HubIcon,
  Search as SearchIcon,
  Extension as ExtensionIcon,
  Timeline as TimelineIcon,
  Lightbulb as LightbulbIcon,
  Public as PublicIcon,
  Hexagon as HexagonIcon,
  Description as DescriptionIcon,
  BarChart as BarChartIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';

const features = [
  {
    icon: <AutoAwesomeIcon />,
    title: 'AI-Powered Creation',
    description: 'Transform your ideas into reality with advanced AI assistance at every step'
  },
  {
    icon: <PsychologyIcon />,
    title: 'Intelligent Insights',
    description: 'Get real-time suggestions and improvements as you build your product'
  },
  {
    icon: <CodeIcon />,
    title: 'Code Generation',
    description: 'Automatically generate high-quality, production-ready code'
  },
  {
    icon: <HubIcon />,
    title: 'Seamless Integration',
    description: 'Works with your existing tools and workflows effortlessly'
  }
];

const valueProps = [
  {
    icon: <SearchIcon />,
    title: 'AI Insights at Every Step',
    description: 'Our research agents analyze market data and user behavior to recommend features, brand archetypes, and improvement paths—ensuring your product aligns with real-world needs.'
  },
  {
    icon: <ExtensionIcon />,
    title: 'Blueprinting & PRD Generation',
    description: 'Turn abstract ideas into actionable plans. Create navigation flows, define sections, integrate metrics, and produce a detailed PRD ready for development.'
  },
  {
    icon: <TimelineIcon />,
    title: 'Continuous Feedback & Metrics',
    description: 'Refine your blueprint by providing direct feedback. Add or remove metrics, adjust page sections, and watch the system adapt, ensuring you always move closer to your desired outcomes.'
  },
  {
    icon: <HubIcon />,
    title: 'Seamless Integrations & Scalability',
    description: 'Easily integrate with external services, analytics tools, or data sources. Our flexible architecture and unified ontology ensure every piece fits harmoniously.'
  }
];

const timelineSteps = [
  {
    icon: <LightbulbIcon />,
    number: '01',
    title: 'Start with an Idea',
    description: 'Provide a short description of what you want to create—no technical details needed.'
  },
  {
    icon: <PublicIcon />,
    number: '02',
    title: 'AI-Driven Research',
    description: 'Our agents analyze competitors, market context, and user patterns, turning your vague concept into structured recommendations.'
  },
  {
    icon: <HexagonIcon />,
    number: '03',
    title: 'Blueprint Generation',
    description: 'We produce a visual map of pages, sections, features, and metrics. Drag and drop to rearrange, rename, or remove elements.'
  },
  {
    icon: <DescriptionIcon />,
    number: '04',
    title: 'PRD & Documentation',
    description: 'Receive a detailed Product Requirements Document and integrated references—ready to hand off to a development team or use as your actionable guide.'
  },
  {
    icon: <BarChartIcon />,
    number: '05',
    title: 'Add Metrics & Integrations',
    description: 'Define KPIs, track performance, and connect to external platforms. Tweak metrics anytime to measure real success.'
  },
  {
    icon: <RefreshIcon />,
    number: '06',
    title: 'Continuous Refinement',
    description: 'Give feedback at each stage. Every comment, suggestion, or data point feeds back into our system, improving recommendations and outcomes over time.'
  }
];

const FeatureBox = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <BaseCard>
    <CardContent>
      <Box sx={{
        width: 56,
        height: 56,
        borderRadius: 2,
        bgcolor: 'rgba(0, 163, 255, 0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        mb: 3
      }}>
        <Box sx={{ color: '#00A3FF', fontSize: 28 }}>
          {icon}
        </Box>
      </Box>
      <Typography variant="h6" className="text-primary" sx={{ mb: 2, fontWeight: 600 }}>
        {title}
      </Typography>
      <Typography className="text-secondary" sx={{ lineHeight: 1.6 }}>
        {description}
      </Typography>
    </CardContent>
  </BaseCard>
);

const TimelineStep = ({ icon, number, title, description }: { icon: React.ReactNode, number: string, title: string, description: string }) => (
  <BaseCard>
    <CardContent>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        mb: 3
      }}>
        <Box sx={{
          width: 48,
          height: 48,
          borderRadius: 2,
          bgcolor: 'rgba(0, 163, 255, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mr: 2
        }}>
          <Box sx={{ color: '#00A3FF', fontSize: 24 }}>
            {icon}
          </Box>
        </Box>
        <Typography className="text-accent" sx={{ fontWeight: 600, fontSize: '1.25rem' }}>
          {number}
        </Typography>
      </Box>
      <Typography variant="h6" className="text-primary" sx={{ mb: 2, fontWeight: 600 }}>
        {title}
      </Typography>
      <Typography className="text-secondary" sx={{ lineHeight: 1.6 }}>
        {description}
      </Typography>
    </CardContent>
  </BaseCard>
);

const Home = () => {
  return (
    <Container maxWidth={false} disableGutters>
      {/* Hero Section */}
      <Box className="page-header" sx={{ pt: { xs: 8, md: 12 }, pb: { xs: 8, md: 12 } }}>
        <GradientText variant="h1" sx={{ 
          fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
          maxWidth: '1200px',
          mx: 'auto'
        }}>
          Creator Labs
        </GradientText>
        <Typography className="description" sx={{
          fontSize: { xs: '1.1rem', sm: '1.25rem', md: '1.5rem' },
          px: { xs: 2, sm: 4 }
        }}>
          Transform your ideas into fully realized products with our AI-powered platform
        </Typography>
        <GlassButton className="primary" size="large">
          Start Creating
        </GlassButton>
      </Box>

      {/* Value Props Grid */}
      <Container maxWidth="xl" sx={{ mb: { xs: 8, md: 12 } }}>
        <Grid container spacing={4}>
          {valueProps.map((prop, index) => (
            <Grid item xs={12} sm={6} lg={3} key={index}>
              <FeatureBox {...prop} />
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Features Grid */}
      <Container maxWidth="xl" sx={{ mb: { xs: 8, md: 12 } }}>
        <Typography variant="h3" className="section-title">
          Key Features
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} lg={3} key={index}>
              <FeatureBox {...feature} />
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* How It Works Section */}
      <Container maxWidth="xl" sx={{ mb: { xs: 8, md: 12 } }}>
        <Typography variant="h3" className="section-title">
          How It Works
        </Typography>
        <Grid container spacing={4}>
          {timelineSteps.map((step, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <TimelineStep {...step} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Container>
  );
}

export default Home; 