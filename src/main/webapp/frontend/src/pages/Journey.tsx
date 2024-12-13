import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Collapse } from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Navbar from '../components/Navbar/Navbar';
import { AgentIconMap } from '../components/shared/AgentIcons';

interface PersonaDetail {
  persona: string;
  needs: string[];
  outcomes: string[];
}

interface Stage {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  quote: {
    text: string;
    author: string;
  };
  keyPoints: string[];
  agents: string[];
  color: string;
  personaDetails: PersonaDetail[];
}

const stages: Stage[] = [
  {
    id: 'initial-understanding',
    title: 'Initial Understanding',
    subtitle: 'From abstract concept to clear direction',
    description: 'Your vision starts here. We help transform your idea into a concrete, well-defined product concept.',
    quote: {
      text: 'The first step in turning the invisible into the visible.',
      author: 'Seldon'
    },
    keyPoints: [
      'Defined product spark & direction',
      'Initial market & user insights',
      'Strategic framing'
    ],
    agents: ['Seldon', 'Baley'],
    color: '#00A3FF',
    personaDetails: [
      {
        persona: 'Business Stakeholder',
        needs: [
          'Market opportunity validation',
          'Resource planning insights',
          'Competition analysis'
        ],
        outcomes: [
          'Business Model Canvas',
          'Market Analysis Report',
          'Initial Investment Projection',
          'Competitive Analysis Matrix'
        ]
      },
      {
        persona: 'Product Manager',
        needs: [
          'User problem understanding',
          'Feature scope definition',
          'Development timeline'
        ],
        outcomes: [
          'Product Requirements Document (PRD)',
          'User Journey Maps',
          'Feature Priority Matrix',
          'Project Timeline Draft'
        ]
      },
      {
        persona: 'End User',
        needs: [
          'Solution expectations',
          'Current pain points',
          'Workflow integration'
        ],
        outcomes: [
          'User Persona Documents',
          'Pain Points Analysis',
          'User Stories Collection',
          'Needs Assessment Report'
        ]
      }
    ]
  },
  {
    id: 'memory-enhancement',
    title: 'Memory Enhancement',
    subtitle: 'Enriching your product concept',
    description: 'Building upon initial ideas, we enhance and expand the concept with research, analysis, and detailed planning.',
    quote: {
      text: 'Knowledge is the foundation of innovation.',
      author: 'Baley'
    },
    keyPoints: [
      'Detailed market research',
      'User behavior analysis',
      'Technical feasibility study'
    ],
    agents: ['Baley', 'Fastolfe'],
    color: '#10B981',
    personaDetails: [
      {
        persona: 'Business Stakeholder',
        needs: [
          'Market size validation',
          'Revenue model definition',
          'Growth strategy'
        ],
        outcomes: [
          'Financial Projections Model',
          'Go-to-Market Strategy',
          'Risk Assessment Document',
          'Stakeholder Presentation Deck'
        ]
      },
      {
        persona: 'Product Manager',
        needs: [
          'Feature specification',
          'Technical constraints',
          'Resource allocation'
        ],
        outcomes: [
          'Detailed Product Roadmap',
          'Technical Specification Document',
          'Resource Allocation Plan',
          'Development Sprints Schedule'
        ]
      },
      {
        persona: 'End User',
        needs: [
          'Interface preferences',
          'Feature priorities',
          'Usage scenarios'
        ],
        outcomes: [
          'Wireframe Prototypes',
          'User Flow Diagrams',
          'Feature Feedback Reports',
          'Usability Test Plan'
        ]
      }
    ]
  },
  {
    id: 'blueprint-creation',
    title: 'Blueprint Creation',
    subtitle: 'Architecting your solution',
    description: 'Transforming the high-level concept into detailed technical specifications and design documents.',
    quote: {
      text: 'Architecture is the thoughtful making of space.',
      author: 'Daneel'
    },
    keyPoints: [
      'Technical architecture design',
      'System integration planning',
      'Resource allocation'
    ],
    agents: ['Daneel', 'Amadiro'],
    color: '#8B5CF6',
    personaDetails: [
      {
        persona: 'Business Stakeholder',
        needs: [
          'Technical feasibility',
          'Infrastructure costs',
          'Scaling potential'
        ],
        outcomes: [
          'Technology Stack Document',
          'Infrastructure Cost Analysis',
          'Scaling Strategy Plan',
          'Security Compliance Report'
        ]
      },
      {
        persona: 'Product Manager',
        needs: [
          'Technical constraints',
          'Integration requirements',
          'Development timeline'
        ],
        outcomes: [
          'System Architecture Diagram',
          'API Documentation',
          'Database Schema Design',
          'Integration Specifications'
        ]
      },
      {
        persona: 'Development Team',
        needs: [
          'Technical requirements',
          'Code standards',
          'Testing approach'
        ],
        outcomes: [
          'Technical Design Documents',
          'Code Style Guide',
          'Test Strategy Document',
          'Development Environment Setup'
        ]
      }
    ]
  },
  {
    id: 'visual-prd',
    title: 'Visual PRD',
    subtitle: 'Bringing your vision to life',
    description: 'Creating detailed visual representations and interactive prototypes of your product.',
    quote: {
      text: 'Design is intelligence made visible.',
      author: 'Dors'
    },
    keyPoints: [
      'UI/UX design',
      'Interactive prototypes',
      'Visual guidelines'
    ],
    agents: ['Dors', 'Giskard'],
    color: '#EC4899',
    personaDetails: [
      {
        persona: 'Business Stakeholder',
        needs: [
          'Brand alignment',
          'Market positioning',
          'User engagement'
        ],
        outcomes: [
          'Brand Style Guide',
          'Marketing Asset Package',
          'Presentation Mockups',
          'Demo Videos'
        ]
      },
      {
        persona: 'Product Manager',
        needs: [
          'User interface specs',
          'Interaction patterns',
          'Feature visualization'
        ],
        outcomes: [
          'High-fidelity Prototypes',
          'UI Component Library',
          'Interaction Design Specs',
          'Animation Guidelines'
        ]
      },
      {
        persona: 'Design Team',
        needs: [
          'Design requirements',
          'Component specs',
          'Visual consistency'
        ],
        outcomes: [
          'Design System Documentation',
          'Component Specifications',
          'Asset Library',
          'Responsive Design Templates'
        ]
      }
    ]
  },
  {
    id: 'development',
    title: 'Development',
    subtitle: 'Building with precision',
    description: 'Transforming blueprints into reality through careful development and rigorous testing.',
    quote: {
      text: 'Quality is not an act, it is a habit.',
      author: 'Calvin'
    },
    keyPoints: [
      'Code quality checks',
      'Performance optimization',
      'Integration testing'
    ],
    agents: ['Calvin', 'Giskard', 'Vasilia'],
    color: '#F59E0B',
    personaDetails: [
      {
        persona: 'Business Stakeholder',
        needs: [
          'Clear vision articulation',
          'Market opportunity validation',
          'Initial resource assessment'
        ],
        outcomes: [
          'Validated business concept',
          'Preliminary market sizing',
          'Strategic alignment'
        ]
      },
      {
        persona: 'Product Manager',
        needs: [
          'User problem understanding',
          'Market gap analysis',
          'Feature prioritization framework'
        ],
        outcomes: [
          'Product vision document',
          'Initial roadmap',
          'Key success metrics'
        ]
      },
      {
        persona: 'End User',
        needs: [
          'Pain point articulation',
          'Current solution gaps',
          'Desired outcomes'
        ],
        outcomes: [
          'Voice in product direction',
          'Problem acknowledgment',
          'Solution timeline'
        ]
      }
    ]
  },
  {
    id: 'launch',
    title: 'Launch',
    subtitle: 'Taking flight',
    description: 'Preparing and executing a successful product launch with comprehensive testing and deployment.',
    quote: {
      text: 'Success is where preparation meets opportunity.',
      author: 'Giskard'
    },
    keyPoints: [
      'Quality assurance review',
      'Deployment checklist complete',
      'Launch metrics tracking'
    ],
    agents: ['Giskard', 'Calvin'],
    color: '#3B82F6',
    personaDetails: [
      {
        persona: 'Business Stakeholder',
        needs: [
          'Clear vision articulation',
          'Market opportunity validation',
          'Initial resource assessment'
        ],
        outcomes: [
          'Validated business concept',
          'Preliminary market sizing',
          'Strategic alignment'
        ]
      },
      {
        persona: 'Product Manager',
        needs: [
          'User problem understanding',
          'Market gap analysis',
          'Feature prioritization framework'
        ],
        outcomes: [
          'Product vision document',
          'Initial roadmap',
          'Key success metrics'
        ]
      },
      {
        persona: 'End User',
        needs: [
          'Pain point articulation',
          'Current solution gaps',
          'Desired outcomes'
        ],
        outcomes: [
          'Voice in product direction',
          'Problem acknowledgment',
          'Solution timeline'
        ]
      }
    ]
  },
  {
    id: 'post-launch-feedback',
    title: 'Post-Launch Feedback',
    subtitle: 'Learning and improving',
    description: 'Gathering and analyzing user feedback to drive continuous improvement and evolution.',
    quote: {
      text: 'Every piece of feedback is a gift for growth.',
      author: 'Baley'
    },
    keyPoints: [
      'User feedback analysis',
      'Performance metrics review',
      'Improvement opportunities'
    ],
    agents: ['Baley', 'Calvin'],
    color: '#6366F1',
    personaDetails: [
      {
        persona: 'Business Stakeholder',
        needs: [
          'Clear vision articulation',
          'Market opportunity validation',
          'Initial resource assessment'
        ],
        outcomes: [
          'Validated business concept',
          'Preliminary market sizing',
          'Strategic alignment'
        ]
      },
      {
        persona: 'Product Manager',
        needs: [
          'User problem understanding',
          'Market gap analysis',
          'Feature prioritization framework'
        ],
        outcomes: [
          'Product vision document',
          'Initial roadmap',
          'Key success metrics'
        ]
      },
      {
        persona: 'End User',
        needs: [
          'Pain point articulation',
          'Current solution gaps',
          'Desired outcomes'
        ],
        outcomes: [
          'Voice in product direction',
          'Problem acknowledgment',
          'Solution timeline'
        ]
      }
    ]
  },
  {
    id: 'growth-evolution',
    title: 'Growth & Evolution',
    subtitle: 'Scaling for success',
    description: 'Continuously evolving and improving your product based on real-world usage and changing needs.',
    quote: {
      text: 'Growth is never by mere chance; it is the result of forces working together.',
      author: 'Seldon'
    },
    keyPoints: [
      'Scaling optimization',
      'Feature enhancements',
      'Market expansion plans'
    ],
    agents: ['Seldon', 'Daneel', 'Vasilia'],
    color: '#14B8A6',
    personaDetails: [
      {
        persona: 'Business Stakeholder',
        needs: [
          'Clear vision articulation',
          'Market opportunity validation',
          'Initial resource assessment'
        ],
        outcomes: [
          'Validated business concept',
          'Preliminary market sizing',
          'Strategic alignment'
        ]
      },
      {
        persona: 'Product Manager',
        needs: [
          'User problem understanding',
          'Market gap analysis',
          'Feature prioritization framework'
        ],
        outcomes: [
          'Product vision document',
          'Initial roadmap',
          'Key success metrics'
        ]
      },
      {
        persona: 'End User',
        needs: [
          'Pain point articulation',
          'Current solution gaps',
          'Desired outcomes'
        ],
        outcomes: [
          'Voice in product direction',
          'Problem acknowledgment',
          'Solution timeline'
        ]
      }
    ]
  }
];

const PersonaSection = ({ details, color }: { details: PersonaDetail; color: string }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Box
      sx={{
        mb: 2,
        cursor: 'pointer',
        '&:hover': {
          '& .persona-header': {
            background: `${color}25`
          }
        }
      }}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <Box
        className="persona-header"
        sx={{
          display: 'flex',
          alignItems: 'center',
          p: 2,
          borderRadius: '8px',
          background: `${color}15`,
          transition: 'all 0.3s ease',
        }}
      >
        <Typography
          sx={{
            color: 'white',
            fontWeight: 500,
            flex: 1
          }}
        >
          {details.persona}
        </Typography>
        <Box
          sx={{
            transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.3s ease',
            color: color
          }}
        >
          ▼
        </Box>
      </Box>

      <Collapse in={isExpanded}>
        <Box
          sx={{
            mt: 1,
            ml: 2,
            p: 2,
            borderLeft: `2px solid ${color}40`,
          }}
        >
          <Typography
            sx={{
              color: color,
              mb: 1,
              fontSize: '0.9rem',
              fontWeight: 500
            }}
          >
            Needs:
          </Typography>
          {details.needs.map((need, idx) => (
            <Typography
              key={idx}
              sx={{
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: '0.85rem',
                mb: 0.5,
                pl: 2,
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  left: 0,
                  top: '50%',
                  width: '4px',
                  height: '4px',
                  borderRadius: '50%',
                  backgroundColor: color,
                  transform: 'translateY(-50%)'
                }
              }}
            >
              {need}
            </Typography>
          ))}

          <Typography
            sx={{
              color: color,
              mt: 2,
              mb: 1,
              fontSize: '0.9rem',
              fontWeight: 500
            }}
          >
            Outcomes:
          </Typography>
          {details.outcomes.map((outcome, idx) => (
            <Typography
              key={idx}
              sx={{
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: '0.85rem',
                mb: 0.5,
                pl: 2,
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  left: 0,
                  top: '50%',
                  width: '4px',
                  height: '4px',
                  borderRadius: '50%',
                  backgroundColor: color,
                  transform: 'translateY(-50%)'
                }
              }}
            >
              {outcome}
            </Typography>
          ))}
        </Box>
      </Collapse>
    </Box>
  );
};

const StageCard = ({ stage, index }: { stage: Stage; index: number }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -50 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      <Box
        sx={{
          position: 'relative',
          mb: 15,
          pl: 4,
          maxWidth: '800px',
          '&::before': {
            content: '""',
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: '2px',
            background: `linear-gradient(180deg, ${stage.color}00 0%, ${stage.color} 20%, ${stage.color} 80%, ${stage.color}00 100%)`,
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            left: '-4px',
            top: '32px',
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            background: stage.color,
            boxShadow: `0 0 20px ${stage.color}`,
            zIndex: 1
          }
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: 'white',
            mb: 1,
            fontSize: '1.5rem',
            fontWeight: 600
          }}
        >
          {stage.title}
        </Typography>

        <Typography
          sx={{
            color: 'rgba(255, 255, 255, 0.7)',
            mb: 3,
            fontSize: '1rem'
          }}
        >
          {stage.subtitle}
        </Typography>

        <Typography
          sx={{
            color: 'rgba(255, 255, 255, 0.9)',
            mb: 3,
            fontSize: '0.9rem',
            lineHeight: 1.6
          }}
        >
          {stage.description}
        </Typography>

        <Box
          sx={{
            background: `linear-gradient(90deg, ${stage.color}15 0%, ${stage.color}05 100%)`,
            borderLeft: `2px solid ${stage.color}`,
            p: 3,
            mb: 3,
            borderRadius: '0 8px 8px 0',
          }}
        >
          <Typography
            sx={{
              color: 'rgba(255, 255, 255, 0.9)',
              fontStyle: 'italic',
              mb: 1,
              fontSize: '0.95rem'
            }}
          >
            "{stage.quote.text}"
          </Typography>
          <Typography
            sx={{
              color: stage.color,
              fontSize: '0.85rem',
              textAlign: 'right'
            }}
          >
            — {stage.quote.author}
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          {stage.keyPoints.map((point, idx) => (
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
                  backgroundColor: stage.color,
                  mr: 2,
                  boxShadow: `0 0 10px ${stage.color}`
                }
              }}
            >
              <Typography
                sx={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontSize: '0.9rem'
                }}
              >
                {point}
              </Typography>
            </Box>
          ))}
        </Box>

        <Typography
          sx={{
            color: stage.color,
            fontSize: '1rem',
            fontWeight: 500,
            mb: 2
          }}
        >
          Persona Details
        </Typography>

        {stage.personaDetails.map((detail, idx) => (
          <PersonaSection key={idx} details={detail} color={stage.color} />
        ))}

        <Box
          sx={{
            display: 'flex',
            gap: 2,
            mt: 4
          }}
        >
          {stage.agents.map((agent) => {
            const Icon = AgentIconMap[agent as keyof typeof AgentIconMap];
            return (
              <Box
                key={agent}
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: '8px',
                  background: `${stage.color}20`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: `${stage.color}30`,
                    transform: 'translateY(-2px)',
                    boxShadow: `0 0 15px ${stage.color}40`
                  }
                }}
              >
                {Icon && <Icon size={20} color={stage.color} />}
              </Box>
            );
          })}
        </Box>
      </Box>
    </motion.div>
  );
};

const Journey = () => {
  return (
    <Box 
      sx={{ 
        minHeight: '100vh',
        position: 'relative',
        zIndex: 1
      }}
    >
      <Container 
        maxWidth="lg" 
        sx={{ 
          pt: '120px',
          pb: '80px'
        }}
      >
        <Box sx={{ maxWidth: '800px', mx: 'auto', mb: 8, textAlign: 'center' }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              fontWeight: 700,
              mb: 3,
              background: 'linear-gradient(45deg, #00A3FF, #00FF94)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Building Your Vision
          </Typography>
          <Typography
            sx={{
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: '1.1rem',
              maxWidth: '600px',
              mx: 'auto'
            }}
          >
            Follow the path as our AI agents guide you through each milestone,
            transforming your idea into reality.
          </Typography>
        </Box>

        <Box sx={{ position: 'relative' }}>
          {stages.map((stage, index) => (
            <StageCard key={stage.id} stage={stage} index={index} />
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Journey; 