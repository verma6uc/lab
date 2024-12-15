import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  IconButton,
  Chip,
  LinearProgress,
} from '@mui/material';
import {
  ArrowForward as ArrowForwardIcon,
  Person as PersonIcon,
  Update as UpdateIcon,
} from '@mui/icons-material';
import { MockApplication } from '../mockData';

interface ApplicationListProps {
  applications: MockApplication[];
  onSelectApplication: (applicationId: string) => void;
}

const ApplicationList: React.FC<ApplicationListProps> = ({ applications, onSelectApplication }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return '#4CAF50';
      case 'In Review':
        return '#FFC107';
      case 'Draft':
        return '#9E9E9E';
      case 'Archived':
        return '#F44336';
      default:
        return '#9E9E9E';
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ color: 'common.white', mb: 3 }}>
        Applications
      </Typography>
      <Grid container spacing={3}>
        {applications.map((app) => (
          <Grid item xs={12} sm={6} md={4} key={app.id}>
            <Card
              sx={{
                height: '100%',
                background: 'rgba(13, 25, 41, 0.7)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                transition: 'transform 0.2s, border-color 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  borderColor: '#00A3FF',
                },
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" sx={{ color: 'common.white', mb: 1 }}>
                      {app.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 2, minHeight: 40 }}
                    >
                      {app.description}
                    </Typography>
                  </Box>
                  <IconButton
                    onClick={() => onSelectApplication(app.id)}
                    sx={{
                      color: '#00A3FF',
                      bgcolor: 'rgba(0, 163, 255, 0.1)',
                      '&:hover': {
                        bgcolor: 'rgba(0, 163, 255, 0.2)',
                      },
                    }}
                  >
                    <ArrowForwardIcon />
                  </IconButton>
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                      Progress
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'common.white' }}>
                      {app.progress}%
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={app.progress}
                    sx={{
                      bgcolor: 'rgba(255, 255, 255, 0.1)',
                      '& .MuiLinearProgress-bar': {
                        bgcolor: '#00A3FF',
                      },
                    }}
                  />
                </Box>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  <Chip
                    label={app.status}
                    size="small"
                    sx={{
                      bgcolor: `${getStatusColor(app.status)}20`,
                      color: getStatusColor(app.status),
                    }}
                  />
                  <Chip
                    icon={<PersonIcon />}
                    label={app.creator}
                    size="small"
                    sx={{
                      bgcolor: 'rgba(255, 255, 255, 0.1)',
                      color: 'common.white',
                      '& .MuiChip-icon': { color: 'inherit' },
                    }}
                  />
                  <Chip
                    icon={<UpdateIcon />}
                    label={new Date(app.lastModified).toLocaleDateString()}
                    size="small"
                    sx={{
                      bgcolor: 'rgba(255, 255, 255, 0.1)',
                      color: 'common.white',
                      '& .MuiChip-icon': { color: 'inherit' },
                    }}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ApplicationList; 