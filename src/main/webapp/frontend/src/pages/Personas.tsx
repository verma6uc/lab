import React, { useState } from 'react';
import { Box, Typography, Grid, Chip, IconButton, Collapse } from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import { GradientText, BaseCard, CardContent } from '../components/shared/StyledComponents';
import { AgentIconMap } from '../components/shared/AgentIcons';
import ParticleBackground from '../components/ParticleBackground';
import { Persona, Testimonial } from './Personas/types';
import { personas, testimonials } from './Personas/data';

interface PersonaCardProps {
  persona: Persona;
}

const PersonaCard: React.FC<PersonaCardProps> = ({ persona }) => {
  const [isExpanded, setIsExpanded] = useState(false);

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
        position: 'relative',
        overflow: 'hidden',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: `0 20px 40px rgba(0, 0, 0, 0.4)`,
          border: `1px solid ${persona.color}40`,
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
          background: `linear-gradient(90deg, ${persona.color}00 0%, ${persona.color}66 50%, ${persona.color}00 100%)`,
          opacity: 0,
          transition: 'opacity 0.3s ease-in-out',
        }
      }}
    >
      <Box sx={{ mb: 4 }}>
        <Typography 
          variant="h5" 
          sx={{ 
            color: 'white', 
            mb: 2, 
            fontWeight: 600,
            fontSize: '1.5rem',
          }}
        >
          {persona.title}
        </Typography>
        <Chip
          label={persona.role}
          sx={{
            mb: 3,
            background: `${persona.color}15`,
            color: persona.color,
            fontWeight: 500,
            backdropFilter: 'blur(10px)',
            border: `1px solid ${persona.color}40`,
          }}
        />
        <Typography 
          sx={{ 
            color: 'rgba(255, 255, 255, 0.7)', 
            mb: 2,
            fontSize: '1rem',
            lineHeight: 1.6,
          }}
        >
          {persona.description}
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography 
          sx={{ 
            color: persona.color, 
            mb: 3, 
            fontWeight: 600,
            fontSize: '1.1rem',
          }}
        >
          Key Challenges
        </Typography>
        {persona.challenges.map((challenge, idx) => (
          <Box 
            key={idx} 
            sx={{ 
              mb: 3,
              background: 'rgba(255, 255, 255, 0.03)',
              borderRadius: '12px',
              p: 2,
              border: '1px solid rgba(255, 255, 255, 0.05)',
            }}
          >
            <Typography 
              sx={{ 
                color: 'white', 
                mb: 1, 
                fontWeight: 500,
                fontSize: '1rem',
              }}
            >
              {challenge.title}
            </Typography>
            <Typography 
              sx={{ 
                color: 'rgba(255, 255, 255, 0.7)', 
                fontSize: '0.9rem',
                lineHeight: 1.5,
              }}
            >
              {challenge.description}
            </Typography>
          </Box>
        ))}
      </Box>

      <Collapse in={isExpanded}>
        <Box sx={{ mb: 4 }}>
          <Typography 
            sx={{ 
              color: persona.color, 
              mb: 3, 
              fontWeight: 600,
              fontSize: '1.1rem',
            }}
          >
            Benefits
          </Typography>
          <Grid container spacing={2}>
            {persona.benefits.map((benefit, idx) => (
              <Grid item xs={12} key={idx}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    background: 'rgba(255, 255, 255, 0.03)',
                    borderRadius: '12px',
                    p: 2,
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                  }}
                >
                  <Box
                    sx={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      bgcolor: persona.color,
                      mr: 2,
                      mt: 1,
                      flexShrink: 0,
                    }}
                  />
                  <Typography 
                    sx={{ 
                      color: 'rgba(255, 255, 255, 0.7)',
                      fontSize: '0.9rem',
                      lineHeight: 1.5,
                    }}
                  >
                    {benefit}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography 
            sx={{ 
              color: persona.color, 
              mb: 3, 
              fontWeight: 600,
              fontSize: '1.1rem',
            }}
          >
            Expected Outcomes
          </Typography>
          <Grid container spacing={2}>
            {persona.outcomes.map((outcome, idx) => (
              <Grid item xs={12} key={idx}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    background: 'rgba(255, 255, 255, 0.03)',
                    borderRadius: '12px',
                    p: 2,
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                  }}
                >
                  <Box
                    sx={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      bgcolor: persona.color,
                      mr: 2,
                      mt: 1,
                      flexShrink: 0,
                    }}
                  />
                  <Typography 
                    sx={{ 
                      color: 'rgba(255, 255, 255, 0.7)',
                      fontSize: '0.9rem',
                      lineHeight: 1.5,
                    }}
                  >
                    {outcome}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box sx={{ display: 'flex', gap: 2 }}>
          {persona.agents.map((agent) => {
            const Icon = AgentIconMap[agent as keyof typeof AgentIconMap];
            return (
              <Box
                key={agent}
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: '12px',
                  bgcolor: `${persona.color}15`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease',
                  border: `1px solid ${persona.color}40`,
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    bgcolor: `${persona.color}25`,
                    boxShadow: `0 8px 16px ${persona.color}20`,
                  }
                }}
              >
                {Icon && <Icon size={28} color={persona.color} />}
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
          mt: 4,
          cursor: 'pointer',
          color: persona.color,
          transition: 'all 0.3s ease',
          '&:hover': {
            opacity: 0.8,
            '& .expand-text': {
              letterSpacing: '0.5px',
            },
            '& .expand-icon': {
              transform: isExpanded ? 'rotate(180deg) translateY(-2px)' : 'translateY(2px)',
            }
          }
        }}
      >
        <Typography 
          className="expand-text"
          sx={{ 
            mr: 1, 
            fontSize: '0.9rem', 
            fontWeight: 500,
            transition: 'all 0.3s ease',
          }}
        >
          {isExpanded ? 'Show Less' : 'Learn More'}
        </Typography>
        <ExpandMoreIcon
          className="expand-icon"
          sx={{
            transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'all 0.3s ease'
          }}
        />
      </Box>
    </Box>
  );
};

const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({ testimonial }) => (
  <Box
    sx={{
      background: 'rgba(10, 25, 41, 0.7)',
      borderRadius: '24px',
      p: 4,
      height: '100%',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      transition: 'all 0.3s ease',
      backdropFilter: 'blur(10px)',
      position: 'relative',
      overflow: 'hidden',
      '&:hover': {
        transform: 'translateY(-8px)',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
        border: '1px solid rgba(0, 163, 255, 0.3)',
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
    <Typography 
      sx={{ 
        color: 'rgba(255, 255, 255, 0.7)', 
        mb: 4, 
        fontStyle: 'italic',
        fontSize: '1.1rem',
        lineHeight: 1.6,
      }}
    >
      "{testimonial.quote}"
    </Typography>
    <Box>
      <Typography 
        sx={{ 
          color: 'white', 
          fontWeight: 600,
          mb: 1,
          fontSize: '1.1rem',
        }}
      >
        {testimonial.name}
      </Typography>
      <Typography 
        sx={{ 
          color: 'rgba(255, 255, 255, 0.7)', 
          fontSize: '0.9rem',
          lineHeight: 1.5,
        }}
      >
        {testimonial.role}, {testimonial.company}
      </Typography>
    </Box>
  </Box>
);

const Personas: React.FC = () => {
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
              Who We Serve
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
            <Typography 
              variant="h3" 
              sx={{ 
                textAlign: 'center',
                mb: 6,
                color: 'white',
                fontWeight: 600,
                fontSize: '2.5rem'
              }}
            >
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
        </Box>
      </Box>
    </Box>
  );
};

export default Personas;
