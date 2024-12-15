import React from 'react';
import { Grid, Typography } from '@mui/material';
import { BaseCard, CardContent } from '../../../../components/shared/StyledComponents';

interface StatCard {
  title: string;
  value: string | number;
  color: string;
  subtitle: string;
}

const statistics: StatCard[] = [
  {
    title: 'High Severity',
    value: '23',
    color: 'error',
    subtitle: 'Last 24 hours'
  },
  {
    title: 'Failed Operations',
    value: '45',
    color: 'warning.main',
    subtitle: 'Last 24 hours'
  },
  {
    title: 'Total Events',
    value: '1,234',
    color: 'info.main',
    subtitle: 'Last 24 hours'
  },
  {
    title: 'Success Rate',
    value: '98.5%',
    color: 'success.main',
    subtitle: 'Last 24 hours'
  }
];

const StatisticsCards: React.FC = () => {
  return (
    <Grid container spacing={2}>
      {statistics.map((stat, index) => (
        <Grid item xs={12} md={3} key={index}>
          <BaseCard>
            <CardContent>
              <Typography 
                variant="subtitle2" 
                sx={{ 
                  color: stat.color,
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase',
                  mb: 1
                }}
              >
                {stat.title}
              </Typography>
              <Typography 
                variant="h4" 
                sx={{ 
                  fontSize: '1.75rem',
                  fontWeight: 600,
                  color: 'white',
                  mb: 1
                }}
              >
                {stat.value}
              </Typography>
              <Typography 
                variant="caption" 
                sx={{ 
                  color: 'rgba(255, 255, 255, 0.6)',
                  fontSize: '0.7rem'
                }}
              >
                {stat.subtitle}
              </Typography>
            </CardContent>
          </BaseCard>
        </Grid>
      ))}
    </Grid>
  );
};

export default StatisticsCards;
