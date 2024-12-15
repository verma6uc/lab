import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { GradientText } from '../components/shared/StyledComponents';
import { AgentIconMap } from '../components/shared/AgentIcons';
import ParticleBackground from '../components/ParticleBackground';
import { Agent } from './Agents/types';
import { agentsList } from './Agents/data';

interface AgentCardProps {
  agent: Agent;
}

const AgentCard: React.FC<AgentCardProps> = ({ agent }) => {
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
        backdropFilter: 'blur(10px)',
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

const Agents: React.FC = () => {
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
          px: { xs: 2, sm: 4, md: 6 },
          pt: '120px',
          pb: '80px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box sx={{ width: '100%', maxWidth: '1600px' }}>
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <GradientText variant="h2" sx={{ mb: 3, fontWeight: 700, fontSize: '4rem' }}>
              Meet Our Asimov-Inspired AI Agents
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
              Drawing on the spirit of Asimov's universe, we've conceptualized a team of specialized AI agents—each playing a distinct role in guiding your product from idea to reality. Today, they're outlines of what they'll become; tomorrow, they'll plan, research, design, build, integrate, and refine your vision into something extraordinary.
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {agentsList.map((agent) => (
              <Grid item xs={12} md={6} lg={4} key={agent.name}>
                <AgentCard agent={agent} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default Agents;
