import React, { useState } from 'react';
import { Box, Container, Typography, Grid, Modal, IconButton, Chip } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { GradientText } from '../components/shared/StyledComponents';
import { AgentIconMap } from '../components/shared/AgentIcons';

interface AgentStory {
  agent: string;
  role: string;
  contribution: string;
  impact: string;
}

interface CaseStudy {
  id: string;
  title: string;
  industry: string;
  challenge: string;
  solution: string;
  results: string[];
  agentStories: AgentStory[];
  imageUrl: string;
}

const caseStudies: CaseStudy[] = [
  {
    id: 'edu-platform',
    title: 'AI-Powered Adaptive Learning Platform',
    industry: 'Education',
    challenge: 'A major online education provider needed to scale their personalized learning approach to serve millions of students while maintaining educational quality and engagement.',
    solution: 'We created an adaptive learning platform that dynamically adjusts to each student\'s pace and learning style, powered by our AI agents working in concert.',
    results: [
      'Improved student engagement by 40%',
      'Increased course completion rates by 55%',
      'Reduced educator workload by 30%'
    ],
    agentStories: [
      {
        agent: 'Baley',
        role: 'Research & Insights',
        contribution: 'Analyzed learning patterns of over 1 million students to identify key engagement factors and optimal intervention points.',
        impact: 'Created a predictive model that accurately identifies student struggles 2 weeks before they typically surface.'
      },
      {
        agent: 'Seldon',
        role: 'Strategic Planning',
        contribution: 'Developed the adaptive learning algorithm that personalizes content delivery based on student performance and engagement metrics.',
        impact: 'Enabled real-time course adjustments that increased student success rates by 45%.'
      },
      {
        agent: 'Daneel',
        role: 'Backend Architecture',
        contribution: 'Built a scalable infrastructure handling real-time analysis of student interactions and content delivery.',
        impact: 'Successfully scaled from 10,000 to 1 million concurrent users with 99.99% uptime.'
      }
    ],
    imageUrl: '/assets/education-case.jpg'
  },
  {
    id: 'pharma-analytics',
    title: 'Pharmaceutical Research Assistant',
    industry: 'Healthcare',
    challenge: 'A pharmaceutical company struggled to analyze vast amounts of research data and identify promising drug candidates efficiently.',
    solution: 'We developed an AI-powered research assistant that processes research papers, clinical trials, and molecular data to accelerate drug discovery.',
    results: [
      'Reduced initial screening time by 60%',
      'Increased successful drug candidates by 35%',
      'Saved $12M in research costs annually'
    ],
    agentStories: [
      {
        agent: 'Calvin',
        role: 'Quality Assurance',
        contribution: 'Implemented rigorous validation protocols for data analysis and prediction accuracy.',
        impact: 'Achieved 99.9% accuracy in molecular interaction predictions.'
      },
      {
        agent: 'Giskard',
        role: 'Integration Specialist',
        contribution: 'Connected diverse research databases and analysis tools into a unified research platform.',
        impact: 'Enabled seamless access to over 100 million research papers and clinical trials.'
      },
      {
        agent: 'Vasilia',
        role: 'Performance Optimizer',
        contribution: 'Optimized molecular simulation algorithms for maximum efficiency.',
        impact: 'Reduced processing time for complex simulations by 75%.'
      }
    ],
    imageUrl: '/assets/pharma-case.jpg'
  },
  {
    id: 'retail-platform',
    title: 'Smart Retail Operations Platform',
    industry: 'Retail',
    challenge: 'A multinational retailer needed to optimize their supply chain and personalize customer experiences across 2,000+ stores.',
    solution: 'We built an integrated retail operations platform that combines inventory management, customer insights, and predictive analytics.',
    results: [
      'Reduced inventory costs by 25%',
      'Increased customer satisfaction by 45%',
      'Improved supply chain efficiency by 30%'
    ],
    agentStories: [
      {
        agent: 'Amadiro',
        role: 'Systems Architect',
        contribution: 'Designed a scalable architecture that integrates point-of-sale, inventory, and customer data in real-time.',
        impact: 'Created a unified system handling 10 million transactions daily across 2,000 stores.'
      },
      {
        agent: 'Fastolfe',
        role: 'Innovation Strategist',
        contribution: 'Developed predictive models for inventory optimization and customer behavior analysis.',
        impact: 'Reduced out-of-stock incidents by 40% while maintaining optimal inventory levels.'
      },
      {
        agent: 'Dors',
        role: 'Frontend Experience',
        contribution: 'Created an intuitive dashboard for store managers and staff to access real-time insights.',
        impact: 'Reduced staff training time by 50% and improved decision-making speed.'
      }
    ],
    imageUrl: '/assets/retail-case.jpg'
  },
  {
    id: 'pharma-compliance',
    title: 'Integrated Pharmaceutical Compliance Suite',
    industry: 'Pharmaceutical',
    challenge: 'A global pharmaceutical manufacturer struggled with managing complex compliance requirements, user access controls, and quality assurance processes across multiple facilities.',
    solution: 'We developed an integrated suite of applications combining User Access Management, Audit Trails, and Quality Control systems, powered by our AI agents working in harmony.',
    results: [
      'Achieved 100% regulatory compliance',
      'Reduced compliance-related incidents by 75%',
      'Decreased audit preparation time by 60%',
      'Improved operational efficiency by 40%'
    ],
    agentStories: [
      {
        agent: 'Calvin',
        role: 'Quality Assurance',
        contribution: 'Implemented rigorous validation protocols for all system changes and user access modifications.',
        impact: 'Maintained perfect compliance score across 12 months of regulatory audits.'
      },
      {
        agent: 'Daneel',
        role: 'Systems Integration',
        contribution: 'Created secure, interconnected systems for UAM, audit logs, and compliance tracking.',
        impact: 'Reduced cross-system verification time by 85% while maintaining data integrity.'
      },
      {
        agent: 'Seldon',
        role: 'Strategic Planning',
        contribution: 'Developed predictive compliance models to anticipate and prevent potential issues.',
        impact: 'Prevented 150+ compliance incidents through early detection.'
      }
    ],
    imageUrl: '/assets/pharma-compliance.jpg'
  },
  {
    id: 'lab-management',
    title: 'Smart Laboratory Operations Platform',
    industry: 'Healthcare',
    challenge: 'A research facility needed to optimize their chromatography operations, material sampling processes, and inventory management while ensuring compliance with strict quality standards.',
    solution: 'We created an intelligent laboratory management system that integrates chromatography column management, material sampling, and inventory tracking with advanced AI assistance.',
    results: [
      'Optimized column lifecycle efficiency by 45%',
      'Reduced material sampling errors by 90%',
      'Improved inventory accuracy to 99.9%',
      'Decreased operational costs by 35%'
    ],
    agentStories: [
      {
        agent: 'Giskard',
        role: 'Integration Specialist',
        contribution: 'Orchestrated seamless data flow between lab equipment, inventory systems, and quality control processes.',
        impact: 'Created a unified platform handling 10,000+ daily lab operations.'
      },
      {
        agent: 'Vasilia',
        role: 'Performance Optimizer',
        contribution: 'Implemented real-time monitoring and optimization for laboratory processes.',
        impact: 'Reduced process bottlenecks by 65% and improved resource utilization.'
      },
      {
        agent: 'Amadiro',
        role: 'Systems Architect',
        contribution: 'Designed scalable architecture for managing complex laboratory workflows.',
        impact: 'Enabled handling of 500+ concurrent processes with 99.99% uptime.'
      }
    ],
    imageUrl: '/assets/lab-management.jpg'
  },
  {
    id: 'quality-control',
    title: 'Advanced Quality Control System',
    industry: 'Manufacturing',
    challenge: 'A pharmaceutical manufacturer needed to streamline their quality control processes, including material testing, environmental monitoring, and non-conformance reporting.',
    solution: 'We implemented a comprehensive quality control platform integrating material test packet management, environmental monitoring, and NCMR processing.',
    results: [
      'Reduced quality control cycle time by 55%',
      'Improved first-pass quality rate by 40%',
      'Decreased documentation errors by 95%',
      'Enhanced regulatory compliance by 100%'
    ],
    agentStories: [
      {
        agent: 'Baley',
        role: 'Research & Analysis',
        contribution: 'Analyzed patterns in quality control data to identify optimization opportunities.',
        impact: 'Identified and eliminated 23 major quality risk factors.'
      },
      {
        agent: 'Fastolfe',
        role: 'Innovation Strategy',
        contribution: 'Developed AI-powered quality prediction models for proactive quality control.',
        impact: 'Prevented 200+ potential quality issues before they occurred.'
      },
      {
        agent: 'Dors',
        role: 'User Experience',
        contribution: 'Created intuitive interfaces for complex quality control workflows.',
        impact: 'Reduced training time by 60% and user errors by 85%.'
      }
    ],
    imageUrl: '/assets/quality-control.jpg'
  },
  {
    id: 'hr-management',
    title: 'Intelligent HR Management Suite',
    industry: 'Enterprise',
    challenge: 'A large organization needed to modernize their HR operations, including employee management, training tracking, and performance evaluation.',
    solution: 'We developed a comprehensive HRMS that automates core HR processes while providing intelligent insights for better decision-making.',
    results: [
      'Automated 85% of routine HR tasks',
      'Reduced onboarding time by 60%',
      'Improved employee satisfaction by 45%',
      'Decreased HR operational costs by 30%'
    ],
    agentStories: [
      {
        agent: 'Seldon',
        role: 'Strategic Planning',
        contribution: 'Created predictive models for workforce planning and performance optimization.',
        impact: 'Improved hiring accuracy by 40% and reduced turnover by 25%.'
      },
      {
        agent: 'Daneel',
        role: 'Data Management',
        contribution: 'Built secure, scalable systems for managing sensitive employee data.',
        impact: 'Maintained 100% data security while handling 50,000+ employee records.'
      },
      {
        agent: 'Calvin',
        role: 'Compliance',
        contribution: 'Implemented automated compliance checking for HR processes.',
        impact: 'Ensured perfect compliance with labor laws across multiple regions.'
      }
    ],
    imageUrl: '/assets/hr-management.jpg'
  }
];

const SolutionCard = ({ study, onClick }: { study: CaseStudy; onClick: () => void }) => (
  <Box
    onClick={onClick}
    sx={{
      background: 'rgba(10, 25, 41, 0.7)',
      borderRadius: '24px',
      p: 4,
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      border: '1px solid rgba(0, 163, 255, 0.1)',
      height: '100%',
      '&:hover': {
        transform: 'translateY(-8px)',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
        border: '1px solid rgba(0, 163, 255, 0.3)',
      }
    }}
  >
    <Typography variant="h5" sx={{ color: 'white', mb: 2, fontWeight: 600 }}>
      {study.title}
    </Typography>
    <Chip
      label={study.industry}
      sx={{
        mb: 3,
        background: 'rgba(0, 163, 255, 0.1)',
        color: '#00A3FF',
        fontWeight: 500
      }}
    />
    <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 3 }}>
      {study.challenge}
    </Typography>
    <Typography
      sx={{
        color: '#00A3FF',
        fontSize: '0.9rem',
        fontWeight: 500,
        display: 'flex',
        alignItems: 'center',
        '&:hover': { textDecoration: 'underline' }
      }}
    >
      View Case Study →
    </Typography>
  </Box>
);

const CaseStudyModal = ({ study, open, onClose }: { study: CaseStudy; open: boolean; onClose: () => void }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2
      }}
    >
      <Box
        sx={{
          width: '90%',
          maxWidth: '1200px',
          maxHeight: '90vh',
          overflow: 'auto',
          bgcolor: '#0A1929',
          border: '1px solid rgba(0, 163, 255, 0.2)',
          borderRadius: '24px',
          boxShadow: 24,
          p: { xs: 3, md: 6 },
          position: 'relative',
          '&::-webkit-scrollbar': {
            width: '8px'
          },
          '&::-webkit-scrollbar-track': {
            background: 'rgba(0, 0, 0, 0.1)'
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'rgba(0, 163, 255, 0.3)',
            borderRadius: '4px'
          }
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 20,
            top: 20,
            color: 'white'
          }}
        >
          <CloseIcon />
        </IconButton>

        <Typography variant="h4" sx={{ color: 'white', mb: 1, fontWeight: 600 }}>
          {study.title}
        </Typography>
        
        <Chip
          label={study.industry}
          sx={{
            mb: 4,
            background: 'rgba(0, 163, 255, 0.1)',
            color: '#00A3FF',
            fontWeight: 500
          }}
        />

        <Box sx={{ mb: 6 }}>
          <Typography variant="h6" sx={{ color: 'white', mb: 2, fontWeight: 600 }}>
            The Challenge
          </Typography>
          <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 4 }}>
            {study.challenge}
          </Typography>

          <Typography variant="h6" sx={{ color: 'white', mb: 2, fontWeight: 600 }}>
            Our Solution
          </Typography>
          <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 4 }}>
            {study.solution}
          </Typography>

          <Typography variant="h6" sx={{ color: 'white', mb: 2, fontWeight: 600 }}>
            Key Results
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 4 }}>
            {study.results.map((result, index) => (
              <Chip
                key={index}
                label={result}
                sx={{
                  background: 'rgba(0, 163, 255, 0.1)',
                  color: '#00A3FF',
                  fontWeight: 500
                }}
              />
            ))}
          </Box>
        </Box>

        <Typography variant="h5" sx={{ color: 'white', mb: 4, fontWeight: 600 }}>
          The Agent Journey
        </Typography>
        
        <Grid container spacing={3}>
          {study.agentStories.map((story, index) => {
            const Icon = AgentIconMap[story.agent as keyof typeof AgentIconMap];
            return (
              <Grid item xs={12} md={4} key={index}>
                <Box
                  sx={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '16px',
                    p: 3,
                    height: '100%',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: '12px',
                        background: 'rgba(0, 163, 255, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mr: 2
                      }}
                    >
                      {Icon && <Icon size={24} color="#00A3FF" />}
                    </Box>
                    <Box>
                      <Typography sx={{ color: 'white', fontWeight: 600 }}>
                        {story.agent}
                      </Typography>
                      <Typography sx={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.875rem' }}>
                        {story.role}
                      </Typography>
                    </Box>
                  </Box>
                  <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 2, fontSize: '0.95rem' }}>
                    {story.contribution}
                  </Typography>
                  <Typography
                    sx={{
                      color: '#00A3FF',
                      fontSize: '0.9rem',
                      fontStyle: 'italic'
                    }}
                  >
                    Impact: {story.impact}
                  </Typography>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Modal>
  );
};

const Solutions = () => {
  const [selectedStudy, setSelectedStudy] = useState<CaseStudy | null>(null);

  return (
    <Container maxWidth="xl" sx={{ pt: '120px', pb: '80px' }}>
      <Box sx={{ textAlign: 'center', mb: 8 }}>
        <GradientText variant="h2" sx={{ mb: 3, fontWeight: 700 }}>
          Success Stories
        </GradientText>
        <Typography
          sx={{
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: '1.1rem',
            maxWidth: '800px',
            mx: 'auto'
          }}
        >
          Discover how our AI agents work together to solve complex challenges across industries,
          delivering measurable results and transformative solutions.
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {caseStudies.map((study) => (
          <Grid item xs={12} md={6} lg={4} key={study.id}>
            <SolutionCard
              study={study}
              onClick={() => setSelectedStudy(study)}
            />
          </Grid>
        ))}
      </Grid>

      {selectedStudy && (
        <CaseStudyModal
          study={selectedStudy}
          open={Boolean(selectedStudy)}
          onClose={() => setSelectedStudy(null)}
        />
      )}
    </Container>
  );
};

export default Solutions; 