import React from 'react';
import {
  Grid,
  Paper,
  Typography,
  Box,
  Tooltip,
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
} from '@mui/icons-material';
import { SectionData, MetricCard } from '../../types.ts';

interface MetricsSectionProps {
  section: SectionData;
}

const MetricsSection: React.FC<MetricsSectionProps> = ({ section }) => {
  const renderTrend = (metric: MetricCard) => {
    if (!metric.trend) return null;

    const color = metric.trend.direction === 'up' ? 'success.main' : 'error.main';
    const Icon = metric.trend.direction === 'up' ? TrendingUpIcon : TrendingDownIcon;

    return (
      <Box sx={{ display: 'flex', alignItems: 'center', color }}>
        <Icon fontSize="small" sx={{ mr: 0.5 }} />
        <Typography variant="body2" component="span" sx={{ color }}>
          {Math.abs(metric.trend.value)}%
        </Typography>
      </Box>
    );
  };

  return (
    <Grid container spacing={3}>
      {section.config.metrics?.map((metric) => (
        <Grid item xs={12} sm={6} md={3} key={metric.id}>
          <Paper
            sx={{
              p: 3,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              overflow: 'hidden',
              '&:hover': {
                boxShadow: 3,
              },
            }}
          >
            {/* Background decoration */}
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                right: 0,
                p: 1.5,
                bgcolor: 'primary.main',
                borderRadius: '0 0 0 16px',
                opacity: 0.1,
              }}
            >
              {metric.icon && (
                <Box
                  component="img"
                  src={metric.icon}
                  alt=""
                  sx={{ width: 24, height: 24 }}
                />
              )}
            </Box>

            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              {metric.label}
            </Typography>

            <Typography variant="h4" component="div" sx={{ mb: 1, fontWeight: 'bold' }}>
              {typeof metric.value === 'number' 
                ? new Intl.NumberFormat().format(metric.value)
                : metric.value}
            </Typography>

            {renderTrend(metric)}

            {metric.trend && (
              <Typography variant="caption" color="text.secondary" sx={{ mt: 'auto', pt: 1 }}>
                vs previous period
              </Typography>
            )}
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default MetricsSection; 