export interface AgentStory {
  agent: string;
  role: string;
  contribution: string;
  impact: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  industry: string;
  challenge: string;
  solution: string;
  results: string[];
  agentStories: AgentStory[];
  imageUrl: string;
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'user-access-management',
    title: 'User Access Management Platform',
    industry: 'Compliance',
    challenge: 'A pharmaceutical manufacturer needed a secure and compliant system to manage user roles and permissions across multiple departments and systems.',
    solution: 'We developed a specialized UAM platform that ensures compliance with GMP and 21 CFR Part 11 while streamlining access management processes.',
    results: [
      'Achieved 100% compliance with industry standards',
      'Reduced access provisioning time by 70%',
      'Improved security audit efficiency by 85%',
      'Eliminated unauthorized access incidents'
    ],
    agentStories: [
      {
        agent: 'Calvin',
        role: 'Security Architect',
        contribution: 'Designed and implemented robust security protocols and compliance checks.',
        impact: 'Achieved perfect compliance scores in regulatory audits.'
      },
      {
        agent: 'Daneel',
        role: 'Integration Specialist',
        contribution: 'Created seamless integration with manufacturing and laboratory systems.',
        impact: 'Reduced cross-system verification time by 85%.'
      },
      {
        agent: 'Seldon',
        role: 'Analytics Lead',
        contribution: 'Developed predictive access patterns and security analytics.',
        impact: 'Prevented 200+ potential security incidents through early detection.'
      }
    ],
    imageUrl: '/assets/uam-case.jpg'
  },
  {
    id: 'chromatography-management',
    title: 'Chromatography Column Management',
    industry: 'Laboratory',
    challenge: 'A research facility needed to optimize their chromatography operations while maintaining strict quality standards and efficiency.',
    solution: 'We implemented a comprehensive system for managing the entire lifecycle of chromatography columns, from installation to disposal.',
    results: [
      'Improved column lifecycle efficiency by 45%',
      'Reduced operational costs by 30%',
      'Increased column lifespan by 25%',
      'Enhanced compliance tracking by 100%'
    ],
    agentStories: [
      {
        agent: 'Giskard',
        role: 'Process Optimization',
        contribution: 'Developed real-time monitoring and performance tracking systems.',
        impact: 'Achieved 99.9% uptime in column operations.'
      },
      {
        agent: 'Vasilia',
        role: 'Quality Control',
        contribution: 'Implemented automated quality checks and validation protocols.',
        impact: 'Reduced quality-related incidents by 90%.'
      },
      {
        agent: 'Amadiro',
        role: 'Systems Integration',
        contribution: 'Created unified platform for managing multiple column types.',
        impact: 'Streamlined operations across 50+ column configurations.'
      }
    ],
    imageUrl: '/assets/chromatography-case.jpg'
  },
  {
    id: 'material-test-packet',
    title: 'Material Test Packet Management',
    industry: 'Quality Control',
    challenge: 'Quality control teams needed a comprehensive workflow management system for material testing that ensures compliance and efficiency.',
    solution: 'We developed an automated system for managing material test packets, from initiation through peer review and final approval.',
    results: [
      'Reduced testing cycle time by 55%',
      'Improved documentation accuracy by 95%',
      'Increased testing throughput by 40%',
      'Enhanced regulatory compliance'
    ],
    agentStories: [
      {
        agent: 'Baley',
        role: 'Workflow Optimization',
        contribution: 'Designed intelligent workflow routing and validation systems.',
        impact: 'Eliminated 99% of documentation errors.'
      },
      {
        agent: 'Fastolfe',
        role: 'Quality Assurance',
        contribution: 'Implemented comprehensive quality checks and verifications.',
        impact: 'Achieved perfect compliance in external audits.'
      },
      {
        agent: 'Dors',
        role: 'User Experience',
        contribution: 'Created intuitive interfaces for complex testing procedures.',
        impact: 'Reduced training time by 60% for new analysts.'
      }
    ],
    imageUrl: '/assets/mtpc-case.jpg'
  },
  {
    id: 'environmental-monitoring',
    title: 'Environmental Monitoring System',
    industry: 'Manufacturing',
    challenge: 'A pharmaceutical facility needed precise monitoring of temperature, humidity, and pressure across multiple areas.',
    solution: 'We developed an integrated environmental monitoring system with real-time alerts and compliance tracking.',
    results: [
      'Achieved 99.99% monitoring accuracy',
      'Reduced environmental deviations by 85%',
      'Automated 95% of monitoring tasks',
      'Enhanced GMP compliance'
    ],
    agentStories: [
      {
        agent: 'Calvin',
        role: 'Compliance Manager',
        contribution: 'Implemented GMP-compliant monitoring protocols.',
        impact: 'Maintained perfect compliance record for 12 months.'
      },
      {
        agent: 'Giskard',
        role: 'Systems Integration',
        contribution: 'Connected multiple sensor systems into unified platform.',
        impact: 'Created real-time monitoring across 200+ sensors.'
      },
      {
        agent: 'Vasilia',
        role: 'Analytics Lead',
        contribution: 'Developed predictive maintenance algorithms.',
        impact: 'Prevented 50+ potential system failures.'
      }
    ],
    imageUrl: '/assets/monitoring-case.jpg'
  },
  {
    id: 'nonconforming-materials',
    title: 'Nonconforming Materials Management',
    industry: 'Quality Control',
    challenge: 'A manufacturing facility struggled with tracking and managing nonconforming materials efficiently while maintaining compliance.',
    solution: 'We created a digital NCMR system that streamlines the identification, documentation, and resolution of nonconforming materials.',
    results: [
      'Reduced NCMR processing time by 65%',
      'Improved traceability by 100%',
      'Decreased repeat incidents by 75%',
      'Enhanced compliance reporting'
    ],
    agentStories: [
      {
        agent: 'Calvin',
        role: 'Quality Systems',
        contribution: 'Developed comprehensive quality management workflows.',
        impact: 'Achieved perfect regulatory compliance scores.'
      },
      {
        agent: 'Daneel',
        role: 'Process Automation',
        contribution: 'Implemented automated notification and escalation systems.',
        impact: 'Reduced response time to NCMRs by 80%.'
      },
      {
        agent: 'Seldon',
        role: 'Analytics',
        contribution: 'Created predictive quality analytics system.',
        impact: 'Identified and prevented 100+ potential quality issues.'
      }
    ],
    imageUrl: '/assets/ncmr-case.jpg'
  },
  {
    id: 'training-management',
    title: 'Employee Training Management',
    industry: 'Compliance',
    challenge: 'Organizations needed a robust system to track and manage employee training records while ensuring compliance with industry regulations.',
    solution: 'We built a comprehensive training management system that automates record-keeping and ensures training compliance.',
    results: [
      'Improved training compliance by 95%',
      'Reduced audit preparation time by 70%',
      'Automated 85% of training documentation',
      'Enhanced employee development tracking'
    ],
    agentStories: [
      {
        agent: 'Baley',
        role: 'Training Coordinator',
        contribution: 'Designed adaptive learning pathways and tracking systems.',
        impact: 'Increased training completion rates by 60%.'
      },
      {
        agent: 'Fastolfe',
        role: 'Compliance Manager',
        contribution: 'Implemented regulatory compliance frameworks.',
        impact: 'Achieved 100% training compliance rate.'
      },
      {
        agent: 'Dors',
        role: 'User Experience',
        contribution: 'Created intuitive training interfaces and dashboards.',
        impact: 'Reduced training administration time by 75%.'
      }
    ],
    imageUrl: '/assets/training-case.jpg'
  },
  {
    id: 'door-access-management',
    title: 'Door Access Management System',
    industry: 'Security',
    challenge: 'A large facility needed to manage and control access to secure areas while maintaining compliance with security protocols.',
    solution: 'We developed a comprehensive door access management system that streamlines access requests, approvals, and monitoring.',
    results: [
      'Reduced access request processing time by 80%',
      'Improved security compliance by 100%',
      'Enhanced access tracking and auditing',
      'Eliminated unauthorized access incidents'
    ],
    agentStories: [
      {
        agent: 'Calvin',
        role: 'Security Systems',
        contribution: 'Implemented secure access control protocols.',
        impact: 'Achieved zero security breaches over 12 months.'
      },
      {
        agent: 'Daneel',
        role: 'Integration Lead',
        contribution: 'Connected physical access systems with digital management.',
        impact: 'Created seamless access management across 500+ doors.'
      },
      {
        agent: 'Seldon',
        role: 'Analytics',
        contribution: 'Developed access pattern analysis system.',
        impact: 'Identified and prevented 50+ potential security risks.'
      }
    ],
    imageUrl: '/assets/door-access-case.jpg'
  },
  {
    id: 'hospital-management',
    title: 'Hospital Management System',
    industry: 'Healthcare',
    challenge: 'A major hospital needed to integrate patient care, administrative processes, and resource management into a unified system.',
    solution: 'We created a comprehensive hospital management system that streamlines all aspects of healthcare delivery.',
    results: [
      'Reduced patient wait times by 50%',
      'Improved resource utilization by 40%',
      'Enhanced patient satisfaction by 65%',
      'Decreased administrative costs by 35%'
    ],
    agentStories: [
      {
        agent: 'Baley',
        role: 'Process Optimization',
        contribution: 'Streamlined patient flow and resource allocation.',
        impact: 'Optimized operations across 50 departments.'
      },
      {
        agent: 'Calvin',
        role: 'Compliance Manager',
        contribution: 'Ensured HIPAA compliance and data security.',
        impact: 'Maintained perfect compliance record.'
      },
      {
        agent: 'Fastolfe',
        role: 'Integration Specialist',
        contribution: 'Connected various hospital systems and equipment.',
        impact: 'Created seamless data flow across all departments.'
      }
    ],
    imageUrl: '/assets/hospital-case.jpg'
  },
  {
    id: 'raw-material-sampling',
    title: 'Raw Material Sampling System',
    industry: 'Manufacturing',
    challenge: 'A warehouse needed to streamline their raw material sampling process while maintaining quality standards and traceability.',
    solution: 'We developed an automated system for managing material sampling requests, approvals, and documentation.',
    results: [
      'Reduced sampling process time by 60%',
      'Improved sample tracking accuracy by 95%',
      'Enhanced quality control efficiency by 70%',
      'Eliminated sampling errors'
    ],
    agentStories: [
      {
        agent: 'Giskard',
        role: 'Process Automation',
        contribution: 'Implemented automated sampling workflow system.',
        impact: 'Streamlined operations for 1000+ samples monthly.'
      },
      {
        agent: 'Vasilia',
        role: 'Quality Control',
        contribution: 'Developed quality verification protocols.',
        impact: 'Achieved 100% sampling accuracy.'
      },
      {
        agent: 'Amadiro',
        role: 'Integration Lead',
        contribution: 'Connected warehouse and laboratory systems.',
        impact: 'Reduced cross-department communication time by 85%.'
      }
    ],
    imageUrl: '/assets/sampling-case.jpg'
  }
];
