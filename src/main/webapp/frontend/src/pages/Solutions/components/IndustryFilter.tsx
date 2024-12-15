import React from 'react';
import { Box, Chip, Typography } from '@mui/material';
import { keyframes } from '@mui/system';

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

interface IndustryFilterProps {
  industries: string[];
  selectedIndustry: string | null;
  onSelectIndustry: (industry: string | null) => void;
}

const IndustryFilter: React.FC<IndustryFilterProps> = ({
  industries,
  selectedIndustry,
  onSelectIndustry,
}) => {
  return (
    <Box
      sx={{
        mb: 6,
        animation: `${fadeIn} 0.5s ease-out`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography
        sx={{
          color: 'rgba(255, 255, 255, 0.7)',
          mb: 3,
          fontSize: '1.1rem',
        }}
      >
        Filter by Industry
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 1,
          justifyContent: 'center',
        }}
      >
        <Chip
          label="All Industries"
          onClick={() => onSelectIndustry(null)}
          sx={{
            bgcolor: !selectedIndustry ? 'rgba(0, 163, 255, 0.2)' : 'rgba(255, 255, 255, 0.05)',
            color: !selectedIndustry ? '#00A3FF' : 'rgba(255, 255, 255, 0.7)',
            border: '1px solid',
            borderColor: !selectedIndustry ? 'rgba(0, 163, 255, 0.3)' : 'rgba(255, 255, 255, 0.1)',
            '&:hover': {
              bgcolor: 'rgba(0, 163, 255, 0.1)',
              borderColor: 'rgba(0, 163, 255, 0.3)',
            },
            transition: 'all 0.3s ease',
            backdropFilter: 'blur(10px)',
          }}
        />
        {industries.map((industry) => (
          <Chip
            key={industry}
            label={industry}
            onClick={() => onSelectIndustry(industry)}
            sx={{
              bgcolor: selectedIndustry === industry ? 'rgba(0, 163, 255, 0.2)' : 'rgba(255, 255, 255, 0.05)',
              color: selectedIndustry === industry ? '#00A3FF' : 'rgba(255, 255, 255, 0.7)',
              border: '1px solid',
              borderColor: selectedIndustry === industry ? 'rgba(0, 163, 255, 0.3)' : 'rgba(255, 255, 255, 0.1)',
              '&:hover': {
                bgcolor: 'rgba(0, 163, 255, 0.1)',
                borderColor: 'rgba(0, 163, 255, 0.3)',
              },
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(10px)',
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default IndustryFilter;
