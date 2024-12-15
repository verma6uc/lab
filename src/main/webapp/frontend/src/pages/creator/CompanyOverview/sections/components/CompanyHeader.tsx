import React from 'react';
import {
  Box,
  Avatar,
  Typography,
  Chip,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Edit as EditIcon,
  Business as BusinessIcon,
  OpenInNew as OpenInNewIcon,
  Category as CategoryIcon,
  People as PeopleIcon,
} from '@mui/icons-material';
import { Company } from '../../../../../types/models';

interface CompanyHeaderProps {
  company: Company;
  onEdit: () => void;
}

const CompanyHeader: React.FC<CompanyHeaderProps> = ({ company, onEdit }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Avatar
          src={company.logoUrl}
          alt={company.name}
          sx={{
            width: 64,
            height: 64,
            bgcolor: 'rgba(98, 0, 234, 0.1)',
            border: '2px solid',
            borderColor: 'rgba(98, 0, 234, 0.2)',
          }}
        >
          {!company.logoUrl && <BusinessIcon sx={{ fontSize: 32, color: '#6200EA' }} />}
        </Avatar>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 0.5, color: 'common.white' }}>
            {company.name}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', flexWrap: 'wrap' }}>
            <Chip
              size="small"
              label={company.industry.replace(/_/g, ' ')}
              sx={{
                bgcolor: 'rgba(98, 0, 234, 0.1)',
                color: '#6200EA',
                fontWeight: 500,
                '& .MuiChip-label': { px: 1.5 },
              }}
            />
            <Chip
              size="small"
              icon={<CategoryIcon sx={{ fontSize: '1rem' }} />}
              label={company.type}
              sx={{
                bgcolor: 'rgba(98, 0, 234, 0.1)',
                color: '#6200EA',
                fontWeight: 500,
                '& .MuiChip-label': { px: 1.5 },
              }}
            />
            <Chip
              size="small"
              icon={<PeopleIcon sx={{ fontSize: '1rem' }} />}
              label={`${company.size} Employees`}
              variant="outlined"
              sx={{
                borderColor: 'rgba(255, 255, 255, 0.12)',
                color: 'rgba(255, 255, 255, 0.7)',
                '& .MuiChip-icon': { color: 'rgba(255, 255, 255, 0.7)' },
              }}
            />
          </Box>
        </Box>
      </Box>
      <Box>
        <Tooltip title="Edit Company Information">
          <IconButton 
            onClick={onEdit} 
            size="small"
            sx={{
              color: 'rgba(255, 255, 255, 0.7)',
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.05)',
              },
            }}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="View Full Details">
          <IconButton 
            size="small"
            sx={{
              color: 'rgba(255, 255, 255, 0.7)',
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.05)',
              },
            }}
          >
            <OpenInNewIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default CompanyHeader; 