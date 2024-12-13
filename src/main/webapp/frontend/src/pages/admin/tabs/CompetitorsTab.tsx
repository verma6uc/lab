import React from 'react';
import {
  Box,
  Paper,
  Grid,
  Typography,
  IconButton,
  Avatar,
  Chip,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Remove as NeutralIcon,
  Language as WebsiteIcon,
  LinkedIn as LinkedInIcon,
  Twitter as TwitterIcon,
} from '@mui/icons-material';

interface Competitor {
  id: string;
  name: string;
  description: string;
  industry: string;
  marketPosition: 'leader' | 'challenger' | 'follower';
  trend: 'up' | 'down' | 'neutral';
  employeeCount: string;
  founded: string;
  website: string;
  socialLinks: {
    linkedin?: string;
    twitter?: string;
  };
}

const mockCompetitors: Competitor[] = [
  {
    id: '1',
    name: 'CloudTech Solutions',
    description: 'Enterprise cloud infrastructure and services provider',
    industry: 'Cloud Computing',
    marketPosition: 'leader',
    trend: 'up',
    employeeCount: '5,000+',
    founded: '2010',
    website: 'https://cloudtech.example.com',
    socialLinks: {
      linkedin: 'https://linkedin.com/cloudtech',
      twitter: 'https://twitter.com/cloudtech',
    },
  },
  {
    id: '2',
    name: 'DataFlow Systems',
    description: 'Data analytics and visualization platform',
    industry: 'Data Analytics',
    marketPosition: 'challenger',
    trend: 'up',
    employeeCount: '1,000+',
    founded: '2015',
    website: 'https://dataflow.example.com',
    socialLinks: {
      linkedin: 'https://linkedin.com/dataflow',
    },
  },
  {
    id: '3',
    name: 'AICore Technologies',
    description: 'AI and machine learning solutions',
    industry: 'Artificial Intelligence',
    marketPosition: 'follower',
    trend: 'neutral',
    employeeCount: '500+',
    founded: '2018',
    website: 'https://aicore.example.com',
    socialLinks: {
      linkedin: 'https://linkedin.com/aicore',
      twitter: 'https://twitter.com/aicore',
    },
  },
];

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

const getTrendIcon = (trend: string) => {
  switch (trend) {
    case 'up':
      return <TrendingUpIcon sx={{ color: '#4caf50' }} />;
    case 'down':
      return <TrendingDownIcon sx={{ color: '#f44336' }} />;
    default:
      return <NeutralIcon sx={{ color: '#9e9e9e' }} />;
  }
};

const getMarketPositionColor = (position: string) => {
  switch (position) {
    case 'leader':
      return { bg: 'rgba(76, 175, 80, 0.1)', text: '#4caf50', border: '#4caf50' };
    case 'challenger':
      return { bg: 'rgba(255, 152, 0, 0.1)', text: '#ff9800', border: '#ff9800' };
    case 'follower':
      return { bg: 'rgba(33, 150, 243, 0.1)', text: '#2196f3', border: '#2196f3' };
    default:
      return { bg: 'rgba(158, 158, 158, 0.1)', text: '#9e9e9e', border: '#9e9e9e' };
  }
};

const CompetitorsTab = () => {
  return (
    <Grid container spacing={2}>
      {mockCompetitors.map((competitor) => (
        <Grid item xs={12} key={competitor.id}>
          <Paper
            elevation={0}
            sx={{
              p: 2.5,
              backgroundColor: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              borderRadius: 1,
              transition: 'all 0.2s ease',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
              },
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Avatar
                    sx={{
                      width: 40,
                      height: 40,
                      bgcolor: 'primary.main',
                      fontSize: '1rem',
                    }}
                  >
                    {getInitials(competitor.name)}
                  </Avatar>
                  <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="h6" sx={{ fontSize: '1rem', fontWeight: 600 }}>
                        {competitor.name}
                      </Typography>
                      {getTrendIcon(competitor.trend)}
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {competitor.description}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Box
                    sx={{
                      display: 'inline-flex',
                      px: 1.5,
                      py: 0.5,
                      borderRadius: 1,
                      backgroundColor: getMarketPositionColor(competitor.marketPosition).bg,
                      color: getMarketPositionColor(competitor.marketPosition).text,
                      border: `1px solid ${getMarketPositionColor(competitor.marketPosition).border}`,
                      textTransform: 'capitalize',
                      fontSize: '0.75rem',
                      fontWeight: 500,
                    }}
                  >
                    {competitor.marketPosition}
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {competitor.employeeCount} employees
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Founded {competitor.founded}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <IconButton
                    size="small"
                    href={competitor.website}
                    target="_blank"
                    sx={{ color: 'text.secondary' }}
                  >
                    <WebsiteIcon fontSize="small" />
                  </IconButton>
                  {competitor.socialLinks.linkedin && (
                    <IconButton
                      size="small"
                      href={competitor.socialLinks.linkedin}
                      target="_blank"
                      sx={{ color: 'text.secondary' }}
                    >
                      <LinkedInIcon fontSize="small" />
                    </IconButton>
                  )}
                  {competitor.socialLinks.twitter && (
                    <IconButton
                      size="small"
                      href={competitor.socialLinks.twitter}
                      target="_blank"
                      sx={{ color: 'text.secondary' }}
                    >
                      <TwitterIcon fontSize="small" />
                    </IconButton>
                  )}
                </Box>
              </Box>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <IconButton
                  size="small"
                  sx={{
                    color: 'primary.main',
                    '&:hover': { backgroundColor: 'rgba(0, 163, 255, 0.1)' },
                  }}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  sx={{
                    color: 'error.main',
                    '&:hover': { backgroundColor: 'rgba(244, 67, 54, 0.1)' },
                  }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default CompetitorsTab; 