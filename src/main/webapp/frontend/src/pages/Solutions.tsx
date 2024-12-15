import React, { useState, useMemo } from 'react';
import { Box, Typography, Grid, Modal, IconButton, Chip } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { GradientText } from '../components/shared/StyledComponents';
import { AgentIconMap } from '../components/shared/AgentIcons';
import { keyframes } from '@mui/system';
import { CaseStudy } from './Solutions/data';
import { caseStudies } from './Solutions/data';
import IndustryFilter from './Solutions/components/IndustryFilter';
import ParticleBackground from '../components/ParticleBackground';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

interface SolutionCardProps {
  study: CaseStudy;
  onClick: () => void;
  index: number;
}

const SolutionCard: React.FC<SolutionCardProps> = ({ study, onClick, index }) => (
  <Box
    onClick={onClick}
    sx={{
      background: 'rgba(10, 25, 41, 0.7)',
      backdropFilter: 'blur(10px)',
      borderRadius: '24px',
      p: 4,
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      border: '1px solid rgba(0, 163, 255, 0.1)',
      height: '100%',
      animation: `${fadeIn} 0.5s ease-out ${index * 0.1}s both`,
      position: 'relative',
      overflow: 'hidden',
      '&:hover': {
        transform: 'translateY(-8px)',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
        border: '1px solid rgba(0, 163, 255, 0.3)',
        '& .view-more': {
          transform: 'translateX(8px)',
        },
        '&::after': {
          opacity: 1,
        }
      },
      '&::after': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '2px',
        background: 'linear-gradient(90deg, rgba(0, 163, 255, 0) 0%, rgba(0, 163, 255, 0.3) 50%, rgba(0, 163, 255, 0) 100%)',
        opacity: 0,
        transition: 'opacity 0.3s ease-in-out',
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
        fontWeight: 500,
        backdropFilter: 'blur(10px)',
      }}
    />
    <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 3 }}>
      {study.challenge}
    </Typography>
    <Typography
      className="view-more"
      sx={{
        color: '#00A3FF',
        fontSize: '0.9rem',
        fontWeight: 500,
        display: 'flex',
        alignItems: 'center',
        transition: 'transform 0.3s ease',
        '&:hover': { textDecoration: 'underline' }
      }}
    >
      View Case Study →
    </Typography>
  </Box>
);

interface CaseStudyModalProps {
  study: CaseStudy;
  open: boolean;
  onClose: () => void;
}

const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ study, open, onClose }) => {
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
          width: '98%',
          maxHeight: '90vh',
          overflow: 'auto',
          bgcolor: '#0A1929',
          border: '1px solid rgba(0, 163, 255, 0.2)',
          borderRadius: '24px',
          boxShadow: '0 24px 48px rgba(0, 0, 0, 0.8)',
          p: { xs: 3, md: 6 },
          position: 'relative',
          animation: `${fadeIn} 0.3s ease-out`,
          backdropFilter: 'blur(20px)',
          '&::-webkit-scrollbar': {
            width: '8px'
          },
          '&::-webkit-scrollbar-track': {
            background: 'rgba(0, 0, 0, 0.1)',
            borderRadius: '4px'
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'rgba(0, 163, 255, 0.3)',
            borderRadius: '4px',
            '&:hover': {
              background: 'rgba(0, 163, 255, 0.5)'
            }
          }
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 20,
            top: 20,
            color: 'white',
            '&:hover': {
              background: 'rgba(255, 255, 255, 0.1)'
            }
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
                  fontWeight: 500,
                  backdropFilter: 'blur(10px)',
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
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background: 'rgba(255, 255, 255, 0.08)',
                      transform: 'translateY(-4px)',
                    }
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
                      {Icon && <Icon size={24} sx={{ color: '#00A3FF' }} />}
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

const Solutions: React.FC = () => {
  const [selectedStudy, setSelectedStudy] = useState<CaseStudy | null>(null);
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);

  const industries = useMemo(() => {
    const uniqueIndustries = new Set(caseStudies.map(study => study.industry));
    return Array.from(uniqueIndustries);
  }, []);

  const filteredStudies = useMemo(() => {
    if (!selectedIndustry) return caseStudies;
    return caseStudies.filter(study => study.industry === selectedIndustry);
  }, [selectedIndustry]);

  return (
    <Box sx={{ 
      minHeight: '100vh',
      position: 'relative',
      overflow: 'hidden',
      bgcolor: 'transparent',
    }}>
      {/* Particle Background Layer */}
      <Box sx={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0 }}>
        <ParticleBackground />
      </Box>

      {/* Content Layer */}
      <Box 
        sx={{ 
          position: 'relative', 
          zIndex: 1,
          width: '100%',
          px: { xs: 1, sm: 2, md: 3 },
          pt: '120px',
          pb: '80px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box sx={{ width: '98%' }}>
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <GradientText variant="h2" sx={{ mb: 3, fontWeight: 700, fontSize: '4rem' }}>
              Success Stories
            </GradientText>
            <Typography
              sx={{
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '1.1rem',
                maxWidth: '800px',
                mx: 'auto',
                lineHeight: 1.6,
              }}
            >
              Discover how our AI agents work together to solve complex challenges across industries,
              delivering measurable results and transformative solutions.
            </Typography>
          </Box>

          <IndustryFilter
            industries={industries}
            selectedIndustry={selectedIndustry}
            onSelectIndustry={setSelectedIndustry}
          />

          <Grid container spacing={4}>
            {filteredStudies.map((study, index) => (
              <Grid item xs={12} md={6} lg={4} key={study.id}>
                <SolutionCard
                  study={study}
                  onClick={() => setSelectedStudy(study)}
                  index={index}
                />
              </Grid>
            ))}
          </Grid>
        </Box>

        {selectedStudy && (
          <CaseStudyModal
            study={selectedStudy}
            open={Boolean(selectedStudy)}
            onClose={() => setSelectedStudy(null)}
          />
        )}
      </Box>
    </Box>
  );
};

export default Solutions;
