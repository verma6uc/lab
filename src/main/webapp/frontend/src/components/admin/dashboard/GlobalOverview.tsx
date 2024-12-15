import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid,
  LinearProgress,
  Stack,
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  Business as BusinessIcon,
  People as PeopleIcon,
  Apps as AppsIcon,
} from '@mui/icons-material';
import StyledButton from '../../shared/StyledButton';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, icon, trend }) => (
  <Paper sx={{ 
    p: 3,
    bgcolor: 'rgba(10, 25, 41, 0.7)',
    borderRadius: 2,
    border: '1px solid rgba(0, 163, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    transition: 'all 0.3s ease',
    height: '100%',
    '&:hover': {
      border: '1px solid rgba(0, 163, 255, 0.2)',
      boxShadow: '0 8px 32px rgba(0, 163, 255, 0.1)',
      transform: 'translateY(-2px)',
    }
  }}>
    <Stack spacing={2}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Box sx={{ 
          p: 1, 
          borderRadius: 1, 
          bgcolor: 'rgba(0, 163, 255, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {React.cloneElement(icon as React.ReactElement, { sx: { color: '#00A3FF' } })}
        </Box>
        <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9375rem' }}>
          {title}
        </Typography>
      </Box>
      
      <Typography variant="h3" sx={{ color: 'white', fontWeight: 600 }}>
        {value}
      </Typography>

      {trend && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <TrendingUpIcon sx={{ 
            color: trend.isPositive ? '#2ecc71' : '#ff6347',
            transform: trend.isPositive ? 'none' : 'rotate(180deg)'
          }} />
          <Typography sx={{ 
            color: trend.isPositive ? '#2ecc71' : '#ff6347',
            fontSize: '0.875rem'
          }}>
            {trend.value}% {trend.isPositive ? 'increase' : 'decrease'}
          </Typography>
        </Box>
      )}
    </Stack>
  </Paper>
);

const GlobalOverview: React.FC = () => {
  return (
    <Box>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h5" sx={{ color: 'white', mb: 1, fontWeight: 600 }}>
            Global Overview
          </Typography>
          <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            System-wide metrics and performance indicators
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <StyledButton
            buttonType="secondary"
            onClick={() => window.location.href = '/admin/companies'}
          >
            View All Companies
          </StyledButton>
          <StyledButton
            buttonType="primary"
            onClick={() => window.location.href = '/admin/security-audit'}
          >
            View Analytics
          </StyledButton>
        </Box>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={3}>
          <MetricCard
            title="Total Companies"
            value={45}
            icon={<BusinessIcon />}
            trend={{ value: 12, isPositive: true }}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <MetricCard
            title="Active Users"
            value={128}
            icon={<PeopleIcon />}
            trend={{ value: 8, isPositive: true }}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <MetricCard
            title="Total Applications"
            value={256}
            icon={<AppsIcon />}
            trend={{ value: 5, isPositive: true }}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper sx={{ 
            p: 3,
            bgcolor: 'rgba(10, 25, 41, 0.7)',
            borderRadius: 2,
            border: '1px solid rgba(0, 163, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            transition: 'all 0.3s ease',
            height: '100%',
            '&:hover': {
              border: '1px solid rgba(0, 163, 255, 0.2)',
              boxShadow: '0 8px 32px rgba(0, 163, 255, 0.1)',
              transform: 'translateY(-2px)',
            }
          }}>
            <Stack spacing={2}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9375rem' }}>
                  System Health
                </Typography>
              </Box>
              <Box>
                <Typography variant="h3" sx={{ color: 'white', fontWeight: 600, mb: 1 }}>
                  98%
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={98}
                  sx={{
                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: 1,
                    height: 8,
                    '& .MuiLinearProgress-bar': {
                      bgcolor: '#2ecc71',
                      borderRadius: 1,
                    }
                  }}
                />
              </Box>
              <Typography sx={{ color: '#2ecc71', fontSize: '0.875rem' }}>
                All systems operational
              </Typography>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default GlobalOverview;
