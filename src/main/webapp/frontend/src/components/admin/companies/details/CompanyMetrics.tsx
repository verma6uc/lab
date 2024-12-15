import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Tooltip,
} from '@mui/material';
import {
  Apps as ProductsIcon,
  Image as ScreenshotsIcon,
  Group as TeamIcon,
  Code as ApplicationsIcon,
  Assessment as AnalyticsIcon,
  Palette as BrandingIcon,
} from '@mui/icons-material';
import { Company } from '../../../../types/company';

interface CompanyMetricsProps {
  company: Company;
}

interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: number | string;
  color: string;
  tooltip?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  icon,
  label,
  value,
  color,
  tooltip,
}) => {
  const content = (
    <Box
      sx={{
        p: 2,
        borderRadius: 1,
        bgcolor: 'rgba(255, 255, 255, 0.05)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        height: '100%',
        transition: 'all 0.2s',
        '&:hover': {
          bgcolor: 'rgba(255, 255, 255, 0.08)',
          transform: 'translateY(-2px)',
        },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
        {React.cloneElement(icon as React.ReactElement, { 
          sx: { color, fontSize: '1.2rem' } 
        })}
        <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.875rem' }}>
          {label}
        </Typography>
      </Box>
      <Typography 
        sx={{ 
          color: 'white',
          fontSize: '1.5rem',
          fontWeight: 600,
        }}
      >
        {value}
      </Typography>
    </Box>
  );

  return tooltip ? (
    <Tooltip title={tooltip} arrow>
      {content}
    </Tooltip>
  ) : content;
};

const CompanyMetrics: React.FC<CompanyMetricsProps> = ({ company }) => {
  const metrics = [
    {
      icon: <ProductsIcon />,
      label: 'Products',
      value: company.products_count,
      color: '#00A3FF',
      tooltip: 'Total number of products in catalog',
    },
    {
      icon: <ApplicationsIcon />,
      label: 'Applications',
      value: company.applications.length,
      color: '#2ecc71',
      tooltip: 'Applications in development pipeline',
    },
    {
      icon: <TeamIcon />,
      label: 'Team Size',
      value: company.size,
      color: '#9b59b6',
      tooltip: 'Total number of employees',
    },
    {
      icon: <ScreenshotsIcon />,
      label: 'Screenshots',
      value: company.screenshots_count,
      color: '#e74c3c',
      tooltip: 'UI/UX reference screenshots',
    },
    {
      icon: <BrandingIcon />,
      label: 'Brand Status',
      value: company.branding ? 'Configured' : 'Not Set',
      color: '#f1c40f',
      tooltip: 'Brand identity configuration status',
    },
    {
      icon: <AnalyticsIcon />,
      label: 'Active Apps',
      value: company.applications.filter(app => app.status === 'active').length,
      color: '#1abc9c',
      tooltip: 'Number of active applications',
    },
  ];

  return (
    <Paper sx={{ 
      p: 3,
      bgcolor: 'rgba(10, 25, 41, 0.7)',
      borderRadius: 2,
      border: '1px solid rgba(0, 163, 255, 0.1)',
    }}>
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <AnalyticsIcon sx={{ color: '#00A3FF' }} />
          <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
            Company Metrics
          </Typography>
        </Box>
        <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
          Key statistics and performance indicators for {company.name}
        </Typography>
      </Box>

      <Grid container spacing={2}>
        {metrics.map((metric, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <MetricCard {...metric} />
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default CompanyMetrics;
