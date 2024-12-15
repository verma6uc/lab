import { Stage } from './types';

export const stages: Stage[] = [
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
        persona: 'Development Team',
        needs: [
          'Clear technical requirements',
          'Code quality standards',
          'Testing protocols'
        ],
        outcomes: [
          'Production-ready code',
          'Test coverage reports',
          'Performance metrics',
          'Documentation updates'
        ]
      },
      {
        persona: 'Product Manager',
        needs: [
          'Development progress tracking',
          'Feature completion status',
          'Quality assurance results'
        ],
        outcomes: [
          'Sprint completion reports',
          'Feature status dashboard',
          'Quality metrics dashboard',
          'Release readiness assessment'
        ]
      },
      {
        persona: 'QA Team',
        needs: [
          'Test case requirements',
          'Bug tracking process',
          'Performance benchmarks'
        ],
        outcomes: [
          'Comprehensive test reports',
          'Bug resolution tracking',
          'Performance test results',
          'User acceptance feedback'
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
        persona: 'Operations Team',
        needs: [
          'Deployment procedures',
          'Monitoring setup',
          'Incident response plan'
        ],
        outcomes: [
          'Launch playbook',
          'Monitoring dashboard',
          'Incident response protocol',
          'Performance baselines'
        ]
      },
      {
        persona: 'Marketing Team',
        needs: [
          'Launch timeline',
          'Product messaging',
          'Success metrics'
        ],
        outcomes: [
          'Marketing campaign plan',
          'Press release package',
          'Analytics setup',
          'Social media strategy'
        ]
      },
      {
        persona: 'Support Team',
        needs: [
          'Product documentation',
          'Support processes',
          'User onboarding'
        ],
        outcomes: [
          'Help center content',
          'Support workflow setup',
          'Training materials',
          'FAQ documentation'
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
        persona: 'Product Team',
        needs: [
          'User feedback collection',
          'Usage analytics',
          'Performance metrics'
        ],
        outcomes: [
          'User feedback report',
          'Analytics dashboard',
          'Performance analysis',
          'Improvement roadmap'
        ]
      },
      {
        persona: 'Development Team',
        needs: [
          'Bug reports',
          'Performance data',
          'Technical feedback'
        ],
        outcomes: [
          'Bug fix priorities',
          'Performance optimizations',
          'Technical debt assessment',
          'System health report'
        ]
      },
      {
        persona: 'Business Team',
        needs: [
          'Business metrics',
          'Customer satisfaction',
          'Market response'
        ],
        outcomes: [
          'Business impact report',
          'Customer satisfaction metrics',
          'Market position analysis',
          'Growth opportunities'
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
        persona: 'Product Strategy',
        needs: [
          'Market expansion plans',
          'Feature roadmap',
          'Competitive analysis'
        ],
        outcomes: [
          'Growth strategy',
          'Product evolution plan',
          'Market opportunity map',
          'Innovation roadmap'
        ]
      },
      {
        persona: 'Technical Team',
        needs: [
          'Scaling requirements',
          'Architecture evolution',
          'Performance targets'
        ],
        outcomes: [
          'Scaling strategy',
          'Architecture roadmap',
          'Performance optimization plan',
          'Technology upgrade path'
        ]
      },
      {
        persona: 'Business Development',
        needs: [
          'Partnership opportunities',
          'Market penetration',
          'Revenue optimization'
        ],
        outcomes: [
          'Partnership strategy',
          'Market expansion plan',
          'Revenue growth model',
          'Business scaling roadmap'
        ]
      }
    ]
  }
];
