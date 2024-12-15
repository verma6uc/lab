import React from 'react';
import { Box, Typography } from '@mui/material';
import { motion, useInView } from 'framer-motion';
import { Stage } from '../types';
import { AgentIconMap } from '../../../components/shared/AgentIcons';
import PersonaSection from './PersonaSection';

interface StageCardProps {
  stage: Stage;
  index: number;
}

const StageCard: React.FC<StageCardProps> = ({ stage, index }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-100px",
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Box
        sx={{
          position: 'relative',
          mb: 15,
          pl: { xs: 3, md: 4 },
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
            fontSize: '1.75rem',
            fontWeight: 600,
            background: `linear-gradient(135deg, white 0%, ${stage.color} 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {stage.title}
        </Typography>

        <Typography
          sx={{
            color: stage.color,
            mb: 3,
            fontSize: '1.1rem',
            fontWeight: 500,
          }}
        >
          {stage.subtitle}
        </Typography>

        <Typography
          sx={{
            color: 'rgba(255, 255, 255, 0.9)',
            mb: 4,
            fontSize: '1rem',
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
            mb: 4,
            borderRadius: '0 12px 12px 0',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '1px',
              background: `linear-gradient(90deg, ${stage.color}00, ${stage.color}40, ${stage.color}00)`,
            },
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '1px',
              background: `linear-gradient(90deg, ${stage.color}00, ${stage.color}40, ${stage.color}00)`,
            }
          }}
        >
          <Typography
            sx={{
              color: 'rgba(255, 255, 255, 0.9)',
              fontStyle: 'italic',
              mb: 1,
              fontSize: '1.1rem',
              lineHeight: 1.6,
            }}
          >
            "{stage.quote.text}"
          </Typography>
          <Typography
            sx={{
              color: stage.color,
              fontSize: '0.9rem',
              textAlign: 'right',
              fontWeight: 500,
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
                mb: 2,
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
                  fontSize: '0.95rem',
                  lineHeight: 1.5,
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
            fontSize: '1.1rem',
            fontWeight: 500,
            mb: 3
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
                  width: 40,
                  height: 40,
                  borderRadius: '12px',
                  background: `${stage.color}15`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease',
                  border: `1px solid ${stage.color}30`,
                  '&:hover': {
                    background: `${stage.color}25`,
                    transform: 'translateY(-2px)',
                    boxShadow: `0 8px 16px ${stage.color}20`
                  }
                }}
              >
                {Icon && <Icon size={24} color={stage.color} />}
              </Box>
            );
          })}
        </Box>
      </Box>
    </motion.div>
  );
};

export default StageCard;
