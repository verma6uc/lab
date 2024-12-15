import React from 'react';
import {
  Box,
  Typography,
} from '@mui/material';
import {
  Description as DescriptionIcon,
} from '@mui/icons-material';
import { Company } from '../../../../../types/models';

interface CompanyDescriptionProps {
  company: Company;
}

const CompanyDescription: React.FC<CompanyDescriptionProps> = ({ company }) => {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="subtitle2" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 1 }}>
        <DescriptionIcon sx={{ fontSize: '1rem', mr: 1, verticalAlign: 'text-bottom' }} />
        About
      </Typography>
      <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 1, fontStyle: 'italic' }}>
        {company.bio}
      </Typography>
      <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
        {company.description}
      </Typography>
    </Box>
  );
};

export default CompanyDescription; 