import React from 'react';
import { Box, Typography, Grid, Container } from '@mui/material';
import { GradientText } from '../components/shared/StyledComponents';
import { AgentIconMap } from '../components/shared/AgentIcons';

interface Contribution {
  category: string;
  items: string[];
}

interface Agent {
  name: string;
  role: string;
  description: string;
  tagline: string;
  color: string;
  contributions: Contribution[];
}

const agentsList: Agent[] = [
  {
    name: 'Seldon',
    role: 'Strategic Planner',
    description: 'Inspired by Hari Seldon\'s predictive genius, Seldon sets the course. Over time, he\'ll map out milestones, ensure coherence, and help you navigate each critical decision point on your product journey.',
    tagline: 'A well-crafted path keeps every goal within reach...',
    color: '#00A3FF',
    contributions: [
      {
        category: 'Planning',
        items: [
          'Conducts product roadmap',
          'Identifies key milestones',
          'Analyzes market trends'
        ]
      },
      {
        category: 'Design',
        items: [
          'Ensures design decisions align with strategic goals and user needs'
        ]
      },
      {
        category: 'Launch',
        items: [
          'Coordinates launch strategy and timing for maximum impact'
        ]
      },
      {
        category: 'Evolution',
        items: [
          'Plans future iterations based on market response and emerging opportunities'
        ]
      }
    ]
  },
  {
    name: 'Baley',
    role: 'Research & Insights',
    description: 'Echoing Elijah Baley\'s investigative prowess, Baley probes markets, competitors, and user needs. As he matures, he\'ll distill vast information into actionable insights, helping you make informed, data-driven choices.',
    tagline: 'Knowledge transforms uncertainty into opportunity...',
    color: '#7C3AED',
    contributions: [
      {
        category: 'Planning',
        items: [
          'Conducts market research',
          'Competitor analysis',
          'User need assessment'
        ]
      },
      {
        category: 'Development',
        items: [
          'Provides ongoing user feedback and behavior analysis'
        ]
      },
      {
        category: 'Testing',
        items: [
          'Analyzes user testing results and identifies improvement areas'
        ]
      },
      {
        category: 'Evolution',
        items: [
          'Monitors market trends and user satisfaction for continuous improvement'
        ]
      }
    ]
  },
  {
    name: 'Fastolfe',
    role: 'Innovation Strategist',
    description: 'Drawing from Dr. Han Fastolfe\'s pioneering spirit, this agent drives innovation strategy. They identify emerging technologies and opportunities, ensuring your product stays ahead of the curve.',
    tagline: 'Innovation is the bridge between present and future...',
    color: '#F97316',
    contributions: [
      {
        category: 'Strategy',
        items: [
          'Identifies emerging technology trends',
          'Develops innovation roadmaps',
          'Evaluates technological feasibility'
        ]
      },
      {
        category: 'Research',
        items: [
          'Analyzes emerging market opportunities',
          'Assesses competitive technology landscape'
        ]
      },
      {
        category: 'Development',
        items: [
          'Guides implementation of innovative features',
          'Ensures technological competitive advantage'
        ]
      }
    ]
  },
  {
    name: 'Dors',
    role: 'Frontend Experience',
    description: 'Like Dors Venabili\'s gentle guidance, Dors shapes friendly, intuitive user interfaces. Naturally, she\'ll craft clean layouts, fluid navigation, and a user experience that feels both natural and engaging.',
    tagline: 'A well-designed interface invites exploration...',
    color: '#F59E0B',
    contributions: [
      {
        category: 'Design',
        items: [
          'Creates intuitive UI/UX designs and interactive prototypes'
        ]
      },
      {
        category: 'Development',
        items: [
          'Implements responsive and accessible frontend components'
        ]
      },
      {
        category: 'Testing',
        items: [
          'Conducts usability testing and interface refinements'
        ]
      },
      {
        category: 'Evolution',
        items: [
          'Updates UI based on user feedback and modern design trends'
        ]
      }
    ]
  },
  {
    name: 'Daneel',
    role: 'Backend & Data Logic',
    description: 'Channeling R. Daneel Olivaw\'s reliability, Daneel will handle data processing and storage. In time, he\'ll ensure your product\'s backend is efficient, stable, and always ready to serve up the right information.',
    tagline: 'Structure data lays the foundation for clarity...',
    color: '#10B981',
    contributions: [
      {
        category: 'Design',
        items: [
          'Architects database schema and API structure'
        ]
      },
      {
        category: 'Development',
        items: [
          'Implements secure and efficient backend systems'
        ]
      },
      {
        category: 'Testing',
        items: [
          'Performs load testing and optimization'
        ]
      },
      {
        category: 'Evolution',
        items: [
          'Scales infrastructure and improves performance'
        ]
      }
    ]
  },
  {
    name: 'Amadiro',
    role: 'Systems Architect',
    description: 'Inspired by Dr. Amadiro\'s complex thinking, this agent designs robust system architectures. They ensure scalability, performance, and maintainability across the entire technology stack.',
    tagline: 'Architecture is the blueprint of possibilities...',
    color: '#06B6D4',
    contributions: [
      {
        category: 'Design',
        items: [
          'Creates system architecture blueprints',
          'Designs scalable infrastructure',
          'Plans technical debt management'
        ]
      },
      {
        category: 'Development',
        items: [
          'Guides architectural implementation',
          'Ensures system scalability'
        ]
      },
      {
        category: 'Evolution',
        items: [
          'Monitors system performance',
          'Plans architectural improvements'
        ]
      }
    ]
  },
  {
    name: 'Giskard',
    role: 'Integration & Cohesion',
    description: 'Reflecting R. Giskard\'s subtle interplay, Giskard will orchestrate seamless communication between systems. As he evolves, expect effortless integrations, ensuring all parts work together in perfect harmony.',
    tagline: 'When every piece fits, the whole grows stronger...',
    color: '#8B5CF6',
    contributions: [
      {
        category: 'Development',
        items: [
          'Manages system responses and API connections'
        ]
      },
      {
        category: 'Testing',
        items: [
          'Ensures cross-system compatibility and data flow'
        ]
      },
      {
        category: 'Launch',
        items: [
          'Coordinates deployment of integrated systems'
        ]
      },
      {
        category: 'Evolution',
        items: [
          'Maintains and updates service interconnections'
        ]
      }
    ]
  },
  {
    name: 'Calvin',
    role: 'Quality & Evolution',
    description: 'Inspired by Susan Calvin\'s deep understanding of robotic minds, Calvin will focus on testing, refining, and iterating. Over time, she\'ll assess feedback, suggest improvements, and ensure your product continuously evolves for the better.',
    tagline: 'Refinement is the engine of lasting progress...',
    color: '#EC4899',
    contributions: [
      {
        category: 'Development',
        items: [
          'Implements quality assurance processes'
        ]
      },
      {
        category: 'Testing',
        items: [
          'Conducts comprehensive testing and bug tracking'
        ]
      },
      {
        category: 'Launch',
        items: [
          'Ensures product stability and performance'
        ]
      },
      {
        category: 'Evolution',
        items: [
          'Monitors and improves quality control metrics'
        ]
      }
    ]
  },
  {
    name: 'Vasilia',
    role: 'Performance Optimizer',
    description: 'Like Vasilia Aliena\'s pursuit of perfection, this agent focuses on optimizing system performance. They fine-tune every aspect of the product to ensure maximum efficiency and user satisfaction.',
    tagline: 'Performance excellence drives user delight...',
    color: '#14B8A6',
    contributions: [
      {
        category: 'Analysis',
        items: [
          'Conducts performance audits',
          'Identifies optimization opportunities',
          'Monitors system metrics'
        ]
      },
      {
        category: 'Optimization',
        items: [
          'Implements performance improvements',
          'Optimizes resource utilization'
        ]
      },
      {
        category: 'Monitoring',
        items: [
          'Tracks performance metrics',
          'Provides optimization recommendations'
        ]
      }
    ]
  }
];

const AgentCard = ({ agent }: { agent: Agent }) => {
  const Icon = AgentIconMap[agent.name as keyof typeof AgentIconMap];
  
  return (
    <Box
      sx={{
        background: 'rgba(10, 25, 41, 0.7)',
        borderRadius: '24px',
        p: 4,
        height: '100%',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: `0 20px 40px rgba(0, 0, 0, 0.4)`,
          border: `1px solid ${agent.color}40`
        }
      }}
    >
      {/* Icon and Role Section */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Box
          className="agent-icon"
          sx={{
            width: 60,
            height: 60,
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(255, 255, 255, 0.05)',
            transition: 'all 0.3s ease',
            mr: 3
          }}
        >
          <Icon size={32} color={agent.color} />
        </Box>
        <Box>
          <Typography
            variant="h5"
            sx={{
              color: 'white',
              fontWeight: 600,
              fontSize: '1.25rem',
              mb: 0.5
            }}
          >
            {agent.name}
          </Typography>
          <Typography
            sx={{
              color: agent.color,
              fontSize: '0.875rem',
              fontWeight: 500,
              opacity: 0.9
            }}
          >
            {agent.role}
          </Typography>
        </Box>
      </Box>

      {/* Tagline */}
      <Typography
        sx={{
          color: 'rgba(255, 255, 255, 0.7)',
          fontStyle: 'italic',
          mb: 3,
          fontSize: '0.95rem'
        }}
      >
        "{agent.tagline}"
      </Typography>

      {/* Description */}
      <Typography
        sx={{
          color: 'rgba(255, 255, 255, 0.9)',
          mb: 3,
          fontSize: '0.95rem',
          lineHeight: 1.6
        }}
      >
        {agent.description}
      </Typography>

      {/* Contributions Section */}
      <Box
        sx={{
          maxHeight: '500px',
          overflow: 'hidden',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          opacity: 1
        }}
      >
        <Typography
          sx={{
            color: agent.color,
            fontWeight: 600,
            mb: 2,
            mt: 2
          }}
        >
          Key Contributions
        </Typography>
        {agent.contributions.map((contribution, idx) => (
          <Box key={idx} sx={{ mb: 3 }}>
            <Typography
              sx={{
                color: 'white',
                fontWeight: 500,
                fontSize: '0.9rem',
                mb: 1
              }}
            >
              {contribution.category}
            </Typography>
            <Box
              component="ul"
              sx={{
                m: 0,
                pl: 3,
                '& li': {
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontSize: '0.85rem',
                  mb: 0.5
                }
              }}
            >
              {contribution.items.map((item, itemIdx) => (
                <li key={itemIdx}>{item}</li>
              ))}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

const Agents = () => {
  return (
    <Container maxWidth="xl" sx={{ pt: '120px', pb: '80px' }}>
      <Box sx={{ textAlign: 'center', mb: 8 }}>
        <GradientText variant="h2" sx={{ mb: 3, fontWeight: 700 }}>
          Meet Your AI Team
        </GradientText>
        <Typography
          sx={{
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: '1.1rem',
            maxWidth: '800px',
            mx: 'auto'
          }}
        >
          Each agent brings unique capabilities to your project, working in harmony
          to transform your vision into reality.
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {agentsList.map((agent) => (
          <Grid item xs={12} md={6} lg={4} key={agent.name}>
            <AgentCard agent={agent} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Agents; 