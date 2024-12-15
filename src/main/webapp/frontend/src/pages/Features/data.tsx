import React from 'react';
import PsychologyIcon from '@mui/icons-material/Psychology';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import BrushIcon from '@mui/icons-material/Brush';
import DescriptionIcon from '@mui/icons-material/Description';
import ApiIcon from '@mui/icons-material/Api';
import WidgetsIcon from '@mui/icons-material/Widgets';
import AssessmentIcon from '@mui/icons-material/Assessment';
import LoopIcon from '@mui/icons-material/Loop';
import SpeedIcon from '@mui/icons-material/Speed';
import { Feature, FeatureCategory } from './types';

const iconStyle = {
  fontSize: 40,
  filter: 'drop-shadow(0 0 8px rgba(0, 163, 255, 0.3))',
};

export const categories: FeatureCategory[] = [
  {
    id: 'research',
    title: 'Research & Planning',
    description: 'Leverage AI to understand your market and plan your product strategy',
  },
  {
    id: 'development',
    title: 'Development & Documentation',
    description: 'Transform your vision into detailed specifications and documentation',
  },
  {
    id: 'improvement',
    title: 'Continuous Improvement',
    description: 'Iterate and improve your product with data-driven insights',
  },
];

export const features: Feature[] = [
  {
    id: 'ai-research',
    title: 'AI-Driven Research & Insights',
    description: 'Harness the power of AI to analyze market trends and user needs',
    icon: <PsychologyIcon sx={iconStyle} />,
    bullets: [
      'Automated market analysis and trend identification',
      'User behavior pattern recognition',
      'Competitive landscape mapping',
      'Real-time data insights and visualization',
    ],
    category: 'research',
  },
  {
    id: 'blueprint',
    title: 'Outcome-Focused Blueprint Generation',
    description: 'Create comprehensive product blueprints aligned with business goals',
    icon: <AutoGraphIcon sx={iconStyle} />,
    bullets: [
      'Goal-oriented feature prioritization',
      'User journey mapping',
      'Resource allocation planning',
      'Risk assessment and mitigation strategies',
    ],
    category: 'research',
  },
  {
    id: 'brand-alignment',
    title: 'Section Archetypes & Brand Alignment',
    description: 'Ensure consistent brand experience across your product',
    icon: <BrushIcon sx={iconStyle} />,
    bullets: [
      'Brand voice and tone guidelines',
      'Visual design consistency checks',
      'Component library management',
      'Brand archetype integration',
    ],
    category: 'research',
  },
  {
    id: 'prd-generation',
    title: 'Refinable PRD Generation',
    description: 'Generate and iterate on detailed product requirement documents',
    icon: <DescriptionIcon sx={iconStyle} />,
    bullets: [
      'AI-powered document generation',
      'Real-time collaboration features',
      'Version control and change tracking',
      'Requirement validation and testing',
    ],
    category: 'development',
  },
  {
    id: 'api-specs',
    title: 'API Specification Development',
    description: 'Create and maintain comprehensive API documentation',
    icon: <ApiIcon sx={iconStyle} />,
    bullets: [
      'OpenAPI/Swagger integration',
      'Automated endpoint documentation',
      'API testing and validation',
      'Security compliance checks',
    ],
    category: 'development',
  },
  {
    id: 'ui-components',
    title: 'UI Component Library',
    description: 'Build and manage reusable UI components',
    icon: <WidgetsIcon sx={iconStyle} />,
    bullets: [
      'Component documentation',
      'Visual regression testing',
      'Accessibility compliance',
      'Performance optimization',
    ],
    category: 'development',
  },
  {
    id: 'analytics',
    title: 'Analytics Integration',
    description: 'Track and analyze product performance metrics',
    icon: <AssessmentIcon sx={iconStyle} />,
    bullets: [
      'Custom metric tracking',
      'User behavior analysis',
      'Performance monitoring',
      'ROI calculation',
    ],
    category: 'improvement',
  },
  {
    id: 'feedback-loop',
    title: 'Automated Feedback Loops',
    description: 'Collect and analyze user feedback automatically',
    icon: <LoopIcon sx={iconStyle} />,
    bullets: [
      'User feedback collection',
      'Sentiment analysis',
      'Feature request tracking',
      'Priority scoring',
    ],
    category: 'improvement',
  },
  {
    id: 'optimization',
    title: 'Continuous Optimization',
    description: 'Optimize product performance and user experience',
    icon: <SpeedIcon sx={iconStyle} />,
    bullets: [
      'Performance monitoring',
      'A/B testing integration',
      'Load time optimization',
      'Resource utilization tracking',
    ],
    category: 'improvement',
  },
];

export const featureTabs = categories.map(category => ({
  category,
  features: features.filter(feature => feature.category === category.id),
}));
