import React from 'react';
import {
  Search as SearchIcon,
  Code as CodeIcon,
  Timeline as TimelineIcon,
  Extension as IntegrationIcon,
  AutoFixHigh as AIIcon,
  LocationOn as LocationIcon,
  Code as GenerationIcon,
  Extension as SeamlessIcon,
} from '@mui/icons-material';
import { Feature, Step } from './types';

export const features: Feature[] = [
  {
    title: 'AI Insights at Every Step',
    description: 'Our research agents analyze market data and user behavior to recommend features, brand archetypes, and improvement paths—ensuring your product aligns with real-world needs.',
    icon: <SearchIcon sx={{ fontSize: 40, color: '#00A3FF' }} />,
  },
  {
    title: 'Blueprinting & PRD Generation',
    description: 'Turn abstract ideas into actionable plans. Create navigation flows, define sections, integrate metrics, and produce a detailed PRD ready for development.',
    icon: <CodeIcon sx={{ fontSize: 40, color: '#00A3FF' }} />,
  },
  {
    title: 'Continuous Feedback & Metrics',
    description: 'Refine your blueprint by providing direct feedback. Add or remove metrics, adjust page sections, and watch the system adapt, ensuring you always move closer to your desired outcomes.',
    icon: <TimelineIcon sx={{ fontSize: 40, color: '#00A3FF' }} />,
  },
  {
    title: 'Seamless Integrations & Scalability',
    description: 'Easily integrate with external services, analytics tools, or data sources. Our flexible architecture and unified ontology ensure every piece fits harmoniously.',
    icon: <IntegrationIcon sx={{ fontSize: 40, color: '#00A3FF' }} />,
  },
];

export const bottomFeatures: Feature[] = [
  {
    title: 'AI-Powered Creation',
    description: 'Transform your ideas into reality with advanced AI assistance at every step',
    icon: <AIIcon sx={{ fontSize: 32, color: '#00A3FF' }} />,
  },
  {
    title: 'Intelligent Insights',
    description: 'Get real-time suggestions and improvements as you build your product',
    icon: <LocationIcon sx={{ fontSize: 32, color: '#00A3FF' }} />,
  },
  {
    title: 'Code Generation',
    description: 'Automatically generate high-quality, production-ready code',
    icon: <GenerationIcon sx={{ fontSize: 32, color: '#00A3FF' }} />,
  },
  {
    title: 'Seamless Integration',
    description: 'Works with your existing tools and workflows effortlessly',
    icon: <SeamlessIcon sx={{ fontSize: 32, color: '#00A3FF' }} />,
  },
];

export const steps: Step[] = [
  {
    number: '01',
    title: 'Start with an Idea',
    description: 'Provide a short description of what you want to create—no technical details needed.',
    icon: <SearchIcon sx={{ fontSize: 24, color: '#00A3FF' }} />,
  },
  {
    number: '02',
    title: 'AI-Driven Research',
    description: 'Our agents analyze competitors, market context, and user patterns, turning your vague concept into structured recommendations.',
    icon: <AIIcon sx={{ fontSize: 24, color: '#00A3FF' }} />,
  },
  {
    number: '03',
    title: 'Blueprint Generation',
    description: 'We produce a visual map of pages, sections, features, and metrics. Drag and drop to rearrange, rename, or remove elements.',
    icon: <CodeIcon sx={{ fontSize: 24, color: '#00A3FF' }} />,
  },
  {
    number: '04',
    title: 'PRD & Documentation',
    description: 'Receive a detailed Product Requirements Document and integrated references—ready to hand off to a development team or use as your actionable guide.',
    icon: <TimelineIcon sx={{ fontSize: 24, color: '#00A3FF' }} />,
  },
  {
    number: '05',
    title: 'Add Metrics & Integrations',
    description: 'Define KPIs, track performance, and connect to external platforms. Tweak metrics anytime to measure real success.',
    icon: <IntegrationIcon sx={{ fontSize: 24, color: '#00A3FF' }} />,
  },
  {
    number: '06',
    title: 'Continuous Refinement',
    description: 'Give feedback at each stage. Every comment, suggestion, or data point feeds back into our system, improving recommendations and outcomes over time.',
    icon: <LocationIcon sx={{ fontSize: 24, color: '#00A3FF' }} />,
  },
];
