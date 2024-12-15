import React, { useState } from 'react';
import { Box, Typography, Collapse } from '@mui/material';
import { PersonaDetail } from '../types';

interface PersonaSectionProps {
  details: PersonaDetail;
  color: string;
}

const PersonaSection: React.FC<PersonaSectionProps> = ({ details, color }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Box
      sx={{
        mb: 2,
        cursor: 'pointer',
        '&:hover': {
          '& .persona-header': {
            background: `${color}25`,
            transform: 'translateY(-2px)',
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
          borderRadius: '12px',
          background: `${color}15`,
          transition: 'all 0.3s ease',
          border: `1px solid ${color}30`,
        }}
      >
        <Typography
          sx={{
            color: 'white',
            fontWeight: 500,
            flex: 1,
            fontSize: '1rem',
          }}
        >
          {details.persona}
        </Typography>
        <Box
          sx={{
            transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.3s ease',
            color: color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 24,
            height: 24,
          }}
        >
          ▼
        </Box>
      </Box>

      <Collapse in={isExpanded}>
        <Box
          sx={{
            mt: 2,
            ml: 2,
            p: 3,
            borderLeft: `2px solid ${color}40`,
            background: 'rgba(255, 255, 255, 0.02)',
            borderRadius: '0 12px 12px 0',
          }}
        >
          <Typography
            sx={{
              color: color,
              mb: 2,
              fontSize: '0.95rem',
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
                fontSize: '0.9rem',
                mb: 1,
                pl: 2,
                position: 'relative',
                lineHeight: 1.5,
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
              mt: 3,
              mb: 2,
              fontSize: '0.95rem',
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
                fontSize: '0.9rem',
                mb: 1,
                pl: 2,
                position: 'relative',
                lineHeight: 1.5,
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

export default PersonaSection;
