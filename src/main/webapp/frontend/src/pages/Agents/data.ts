import { Agent } from './types';

export const agentsList: Agent[] = [
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
