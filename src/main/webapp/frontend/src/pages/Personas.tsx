import React, { useState } from 'react';
import { Box, Container, Typography, Grid, Chip, IconButton, Collapse } from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import { GradientText, BaseCard, CardContent } from '../components/shared/StyledComponents';
import { AgentIconMap } from '../components/shared/AgentIcons';

interface Challenge {
  title: string;
  description: string;
}

interface Persona {
  id: string;
  title: string;
  role: string;
  description: string;
  challenges: Challenge[];
  benefits: string[];
  outcomes: string[];
  color: string;
  agents: string[];
}

interface Testimonial {
  name: string;
  role: string;
  company: string;
  quote: string;
}

const personas: Persona[] = [
  {
    id: 'entrepreneur',
    title: 'Early-stage Founder',
    role: 'Entrepreneur',
    description: 'Aspiring founders who have a spark of an idea and need guidance turning it into a viable product.',
    challenges: [
      {
        title: 'Vision Definition',
        description: 'Struggling to define the product vision clearly and articulate it to stakeholders.'
      },
      {
        title: 'Market Fit',
        description: 'Unsure about initial market fit and understanding user needs accurately.'
      },
      {
        title: 'Resource Constraints',
        description: 'Limited resources and time, needing quick insights and direction.'
      }
    ],
    benefits: [
      'Rapid idea validation through AI-powered market analysis',
      'Clear product roadmap generation in hours, not weeks',
      'Cost-effective research and planning tools',
      'Expert guidance at every development stage'
    ],
    outcomes: [
      'Accelerated understanding of product potential',
      'Investor-ready documentation and plans',
      'Reduced time to market by 60%',
      'Clear direction and confidence in decision-making'
    ],
    color: '#F97316',
    agents: ['Seldon', 'Baley', 'Fastolfe']
  },
  {
    id: 'startup-cto',
    title: 'Startup CTO',
    role: 'Technical Leader',
    description: 'Technical leaders in growing startups who need to make critical architecture decisions and scale their development processes.',
    challenges: [
      {
        title: 'Technical Decisions',
        description: 'Making critical architecture and technology stack decisions that will scale.'
      },
      {
        title: 'Team Scaling',
        description: 'Building and scaling development teams while maintaining productivity.'
      },
      {
        title: 'Technical Debt',
        description: 'Managing technical debt while moving fast and innovating.'
      }
    ],
    benefits: [
      'AI-powered architecture recommendations',
      'Automated technical documentation',
      'Team productivity optimization',
      'Technical debt monitoring and management'
    ],
    outcomes: [
      'Reduced architecture decision time by 70%',
      'Improved team productivity by 45%',
      'Decreased technical debt by 60%',
      'Faster onboarding of new developers'
    ],
    color: '#2DD4BF',
    agents: ['Daneel', 'Amadiro', 'Vasilia']
  },
  {
    id: 'enterprise',
    title: 'Product & Innovation Teams',
    role: 'Enterprise',
    description: 'Large organizations seeking to innovate, streamline product development, and maintain a competitive edge.',
    challenges: [
      {
        title: 'Stakeholder Alignment',
        description: 'Multiple stakeholders with complex requirements and competing priorities.'
      },
      {
        title: 'Compliance & Security',
        description: 'Strict compliance standards and security requirements that must be met.'
      },
      {
        title: 'Integration Complexity',
        description: 'Need to integrate with existing systems and legacy infrastructure.'
      }
    ],
    benefits: [
      'Unified product vision across all stakeholders',
      'Automated compliance checking and documentation',
      'Seamless integration planning and execution',
      'Data-driven decision making tools'
    ],
    outcomes: [
      'Reduced cross-team friction by 75%',
      'Accelerated compliance processes',
      'Improved product success rate by 60%',
      'Enhanced innovation capabilities'
    ],
    color: '#0EA5E9',
    agents: ['Daneel', 'Giskard', 'Calvin']
  },
  {
    id: 'product-designer',
    title: 'Product Designer',
    role: 'UX/UI Designer',
    description: 'Design professionals who need to create intuitive, scalable, and consistent user experiences across complex products.',
    challenges: [
      {
        title: 'Design Scale',
        description: 'Creating and maintaining consistent design systems across large products.'
      },
      {
        title: 'User Research',
        description: 'Gathering and analyzing user feedback effectively.'
      },
      {
        title: 'Design-Dev Handoff',
        description: 'Ensuring smooth translation of designs into implementation.'
      }
    ],
    benefits: [
      'AI-assisted design system management',
      'Automated user research analysis',
      'Design-to-code automation tools',
      'Interactive prototype generation'
    ],
    outcomes: [
      'Reduced design iteration time by 50%',
      'Improved design consistency by 80%',
      'Faster design-to-development handoff',
      'Better user satisfaction scores'
    ],
    color: '#F43F5E',
    agents: ['Dors', 'Baley', 'Fastolfe']
  },
  {
    id: 'agency',
    title: 'Agency & Consultancy',
    role: 'Partner',
    description: 'Agencies and consultants helping clients bring products to market need efficient tools to streamline discovery and planning.',
    challenges: [
      {
        title: 'Client Understanding',
        description: 'Need to rapidly understand and document client product visions.'
      },
      {
        title: 'Delivery Speed',
        description: 'Pressure to produce high-quality deliverables quickly.'
      },
      {
        title: 'Scalable Process',
        description: 'Maintaining consistent quality across multiple client engagements.'
      }
    ],
    benefits: [
      'Rapid client requirement analysis',
      'Professional documentation generation',
      'Reusable templates and workflows',
      'Strategic insight generation'
    ],
    outcomes: [
      'Faster proposal turnaround by 50%',
      'Higher client satisfaction rates',
      'Increased project success rate',
      'More strategic value delivery'
    ],
    color: '#8B5CF6',
    agents: ['Amadiro', 'Vasilia', 'Dors']
  }
];

const testimonials: Testimonial[] = [
  {
    name: 'Sarah Chen',
    role: 'Founder & CEO',
    company: 'TechStart Innovation',
    quote: 'The AI agents transformed our product development process. What used to take months now takes weeks, and the quality is consistently higher.'
  },
  {
    name: 'Michael Rodriguez',
    role: 'Head of Product',
    company: 'Enterprise Solutions Inc.',
    quote: 'Managing complex enterprise products became significantly easier. The platform helps us maintain compliance while moving fast.'
  },
  {
    name: 'Emily Watson',
    role: 'Design Director',
    company: 'Creative Agency Co.',
    quote: 'Our agency has doubled its capacity to handle client projects. The AI assistance in research and planning is like having an extra team.'
  }
];

const PersonaCard = ({ persona }: { persona: Persona }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <BaseCard>
      <CardContent>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h5" className="text-primary" sx={{ mb: 1, fontWeight: 600 }}>
            {persona.title}
          </Typography>
          <Chip
            label={persona.role}
            className="highlight-chip"
            sx={{ mb: 2 }}
          />
          <Typography className="text-secondary" sx={{ mb: 2 }}>
            {persona.description}
          </Typography>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography className="text-accent" sx={{ mb: 2, fontWeight: 600 }}>
            Key Challenges:
          </Typography>
          {persona.challenges.map((challenge, idx) => (
            <Box key={idx} sx={{ mb: 2 }}>
              <Typography className="text-primary" sx={{ mb: 0.5, fontWeight: 500 }}>
                {challenge.title}
              </Typography>
              <Typography className="text-secondary" sx={{ fontSize: '0.9rem' }}>
                {challenge.description}
              </Typography>
            </Box>
          ))}
        </Box>

        <Collapse in={isExpanded}>
          <Box sx={{ mb: 3 }}>
            <Typography className="text-accent" sx={{ mb: 2, fontWeight: 600 }}>
              Benefits:
            </Typography>
            {persona.benefits.map((benefit, idx) => (
              <Box
                key={idx}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  mb: 1,
                  '&::before': {
                    content: '""',
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    bgcolor: persona.color,
                    mr: 2
                  }
                }}
              >
                <Typography className="text-secondary">
                  {benefit}
                </Typography>
              </Box>
            ))}
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography className="text-accent" sx={{ mb: 2, fontWeight: 600 }}>
              Expected Outcomes:
            </Typography>
            {persona.outcomes.map((outcome, idx) => (
              <Box
                key={idx}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  mb: 1,
                  '&::before': {
                    content: '""',
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    bgcolor: persona.color,
                    mr: 2
                  }
                }}
              >
                <Typography className="text-secondary">
                  {outcome}
                </Typography>
              </Box>
            ))}
          </Box>

          <Box sx={{ display: 'flex', gap: 2 }}>
            {persona.agents.map((agent) => {
              const Icon = AgentIconMap[agent as keyof typeof AgentIconMap];
              return (
                <Box
                  key={agent}
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '12px',
                    bgcolor: `${persona.color}15`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      bgcolor: `${persona.color}25`
                    }
                  }}
                >
                  {Icon && <Icon size={24} color={persona.color} />}
                </Box>
              );
            })}
          </Box>
        </Collapse>

        <Box
          onClick={() => setIsExpanded(!isExpanded)}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mt: 2,
            cursor: 'pointer',
            color: persona.color,
            '&:hover': {
              opacity: 0.8
            }
          }}
        >
          <Typography sx={{ mr: 1, fontSize: '0.9rem', fontWeight: 500 }}>
            {isExpanded ? 'Show Less' : 'Learn More'}
          </Typography>
          <ExpandMoreIcon
            sx={{
              transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.3s ease'
            }}
          />
        </Box>
      </CardContent>
    </BaseCard>
  );
};

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => (
  <BaseCard>
    <CardContent>
      <Typography className="text-secondary" sx={{ mb: 3, fontStyle: 'italic' }}>
        "{testimonial.quote}"
      </Typography>
      <Box>
        <Typography className="text-primary" sx={{ fontWeight: 600 }}>
          {testimonial.name}
        </Typography>
        <Typography className="text-secondary" sx={{ fontSize: '0.9rem' }}>
          {testimonial.role}, {testimonial.company}
        </Typography>
      </Box>
    </CardContent>
  </BaseCard>
);

const Personas = () => {
  return (
    <Container maxWidth="xl" sx={{ pt: '120px', pb: '80px' }}>
      <Box className="page-header">
        <GradientText variant="h2" sx={{ mb: 3, fontWeight: 700 }}>
          Who We Serve
        </GradientText>
        <Typography className="description">
          Our AI agents are designed to support different roles and needs in the product development journey.
          Discover how we can help you achieve your goals.
        </Typography>
      </Box>

      <Grid container spacing={4} sx={{ mb: 12 }}>
        {personas.map((persona) => (
          <Grid item xs={12} md={6} key={persona.id}>
            <PersonaCard persona={persona} />
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mb: 12 }}>
        <Typography variant="h3" className="section-title">
          Success Stories
        </Typography>
        <Grid container spacing={4}>
          {testimonials.map((testimonial, index) => (
            <Grid item xs={12} md={4} key={index}>
              <TestimonialCard testimonial={testimonial} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Personas; 