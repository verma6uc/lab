import React from 'react';
import {
  Box,
  Typography,
  Grid,
  IconButton,
  Chip,
} from '@mui/material';
import {
  ArrowForward as ArrowForwardIcon,
  Apps as AppsIcon,
  People as PeopleIcon,
  Update as UpdateIcon,
} from '@mui/icons-material';
import { MockCompany } from '../mockData';
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

const glowPulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(0, 163, 255, 0);
  }
  50% {
    box-shadow: 0 0 20px 0 rgba(0, 163, 255, 0.1);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(0, 163, 255, 0);
  }
`;

interface CompanyOverviewProps {
  companies: MockCompany[];
  onSelectCompany: (companyId: string) => void;
}

const CompanyOverview: React.FC<CompanyOverviewProps> = ({ companies, onSelectCompany }) => {
  return (
    <Box sx={{ mt: -1 }}>
      <Typography variant="h4" sx={{ color: 'common.white', mb: 2, px: 0.5 }}>
        Companies
      </Typography>
      <Grid container spacing={2}>
        {companies.map((company, index) => (
          <Grid item xs={12} sm={6} md={4} key={company.id}>
            <Box
              sx={{
                height: '100%',
                bgcolor: 'rgba(2, 9, 20, 0.3)',
                backdropFilter: 'blur(10px)',
                borderRadius: 3,
                p: 3,
                border: '1px solid rgba(255, 255, 255, 0.05)',
                transition: 'all 0.3s ease-in-out',
                animation: `${fadeIn} 0.5s ease-out ${index * 0.1}s both`,
                position: 'relative',
                overflow: 'hidden',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  borderColor: 'rgba(0, 163, 255, 0.3)',
                  bgcolor: 'rgba(2, 9, 20, 0.4)',
                  animation: `${glowPulse} 2s infinite`,
                  '& .action-icon': {
                    bgcolor: 'rgba(0, 163, 255, 0.2)',
                  },
                },
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '2px',
                  background: 'linear-gradient(90deg, rgba(0, 163, 255, 0) 0%, rgba(0, 163, 255, 0.3) 50%, rgba(0, 163, 255, 0) 100%)',
                  opacity: 0,
                  transition: 'opacity 0.3s ease-in-out',
                },
                '&:hover::before': {
                  opacity: 1,
                },
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                  <Typography variant="h6" sx={{ 
                    color: 'common.white', 
                    mb: 1,
                    fontWeight: 600,
                    fontSize: '1.25rem',
                  }}>
                    {company.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ 
                      color: 'rgba(255, 255, 255, 0.7)',
                      mb: 2,
                      minHeight: 40,
                      lineHeight: 1.7,
                    }}
                  >
                    {company.description}
                  </Typography>
                </Box>
                <IconButton
                  onClick={() => onSelectCompany(company.id)}
                  className="action-icon"
                  sx={{
                    color: '#00A3FF',
                    bgcolor: 'rgba(0, 163, 255, 0.1)',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      bgcolor: 'rgba(0, 163, 255, 0.2)',
                      transform: 'scale(1.1)',
                    },
                  }}
                >
                  <ArrowForwardIcon />
                </IconButton>
              </Box>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                <Chip
                  icon={<AppsIcon />}
                  label={`${company.applications} Apps`}
                  size="small"
                  sx={{
                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                    color: 'rgba(255, 255, 255, 0.8)',
                    '& .MuiChip-icon': { 
                      color: 'inherit',
                      fontSize: '1rem',
                    },
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      bgcolor: 'rgba(0, 163, 255, 0.1)',
                      color: '#00A3FF',
                    },
                  }}
                />
                <Chip
                  icon={<PeopleIcon />}
                  label={`${company.activeUsers} Users`}
                  size="small"
                  sx={{
                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                    color: 'rgba(255, 255, 255, 0.8)',
                    '& .MuiChip-icon': { 
                      color: 'inherit',
                      fontSize: '1rem',
                    },
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      bgcolor: 'rgba(0, 163, 255, 0.1)',
                      color: '#00A3FF',
                    },
                  }}
                />
                <Chip
                  icon={<UpdateIcon />}
                  label={new Date(company.lastActivity).toLocaleDateString()}
                  size="small"
                  sx={{
                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                    color: 'rgba(255, 255, 255, 0.8)',
                    '& .MuiChip-icon': { 
                      color: 'inherit',
                      fontSize: '1rem',
                    },
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      bgcolor: 'rgba(0, 163, 255, 0.1)',
                      color: '#00A3FF',
                    },
                  }}
                />
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CompanyOverview;
