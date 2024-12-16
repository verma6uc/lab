import React from 'react';
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';

interface AccordionSectionProps {
  title: string;
  icon: React.ReactElement;
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
        '&:before': { display: 'none' },
        boxShadow: 'none',
        transition: 'all 0.3s ease-in-out',
        '& .MuiAccordionSummary-root': {
          transition: 'all 0.3s ease',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          '&:hover': { 
            bgcolor: 'rgba(0, 163, 255, 0.05)',
            borderBottom: '1px solid rgba(0, 163, 255, 0.2)',
          },
        },
        '& .MuiAccordionDetails-root': {
          transition: 'all 0.3s ease',
          background: 'rgba(13, 25, 41, 0.3)',
          backdropFilter: 'blur(20px)',
          borderRadius: '0 0 12px 12px',
        },
      }}
    >
      <AccordionSummary
        expandIcon={
          <ExpandMoreIcon 
            sx={{ 
              color: '#00A3FF',
              transition: 'transform 0.3s ease',
              transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
            }} 
          />
        }
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {React.cloneElement(icon, { sx: { color: '#00A3FF' } })}
          <Typography variant="h6" sx={{ color: 'common.white' }}>
            {title}
          </Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 2 }}>
          {children}
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default AccordionSection;
