import React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
} from '@mui/icons-material';

interface AccordionSectionProps {
  title: string;
  icon: React.ReactNode;
  expanded: boolean;
  onChange: (event: React.SyntheticEvent, isExpanded: boolean) => void;
  children: React.ReactNode;
}

const AccordionSection: React.FC<AccordionSectionProps> = ({
  title,
  icon,
  expanded,
  onChange,
  children,
}) => {
  return (
    <Accordion
      expanded={expanded}
      onChange={onChange}
      sx={{
        bgcolor: 'transparent',
        backgroundImage: 'none',
        boxShadow: 'none',
        '&:before': {
          display: 'none',
        },
        '& .MuiAccordionSummary-root': {
          minHeight: 56,
          p: 0,
          '&.Mui-expanded': {
            minHeight: 56,
          },
        },
        '& .MuiAccordionSummary-content': {
          m: 0,
          '&.Mui-expanded': {
            m: 0,
          },
        },
        '& .MuiAccordionDetails-root': {
          p: 0,
          pt: 2,
        },
      }}
    >
      <AccordionSummary
        expandIcon={
          <ExpandMoreIcon 
            sx={{ 
              color: expanded ? '#00A3FF' : 'rgba(255, 255, 255, 0.5)',
              transition: 'all 0.3s ease',
            }} 
          />
        }
        sx={{
          bgcolor: 'rgba(10, 25, 41, 0.7)',
          borderRadius: 2,
          border: '1px solid',
          borderColor: expanded ? 'rgba(0, 163, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          transition: 'all 0.3s ease',
          '&:hover': {
            bgcolor: 'rgba(10, 25, 41, 0.8)',
            borderColor: expanded ? 'rgba(0, 163, 255, 0.3)' : 'rgba(255, 255, 255, 0.2)',
          },
          '&.Mui-expanded': {
            boxShadow: '0 4px 24px rgba(0, 163, 255, 0.1)',
          },
        }}
      >
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 2,
        }}>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 40,
            height: 40,
            borderRadius: '50%',
            bgcolor: expanded ? 'rgba(0, 163, 255, 0.1)' : 'rgba(255, 255, 255, 0.05)',
            color: expanded ? '#00A3FF' : 'rgba(255, 255, 255, 0.5)',
            transition: 'all 0.3s ease',
          }}>
            {icon}
          </Box>
          <Typography 
            variant="h6" 
            sx={{ 
              color: expanded ? '#00A3FF' : 'common.white',
              transition: 'all 0.3s ease',
            }}
          >
            {title}
          </Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Box sx={{ 
          px: 3,
          py: 2,
          bgcolor: 'rgba(10, 25, 41, 0.7)',
          borderRadius: 2,
          border: '1px solid rgba(0, 163, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          transition: 'all 0.3s ease',
          '&:hover': {
            border: '1px solid rgba(0, 163, 255, 0.2)',
            boxShadow: '0 4px 24px rgba(0, 163, 255, 0.1)',
          },
        }}>
          {children}
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default AccordionSection;
