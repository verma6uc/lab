import React from 'react';
import { Box, Typography, Button, Grid, Chip, Tooltip } from '@mui/material';
import {
  Rocket as RocketIcon,
  Architecture as ArchitectureIcon,
  Science as ScienceIcon,
  Speed as SpeedIcon,
  CloudUpload as CloudUploadIcon,
  Download as DownloadIcon,
  Upload as UploadIcon,
  Assessment as AssessmentIcon,
  Compare as CompareIcon,
  Analytics as AnalyticsIcon,
  History as HistoryIcon,
} from '@mui/icons-material';

// Mock data for application status and metrics
const mockAppStatus = {
  currentStage: 'PROTOTYPE',
  memoryComplete: true,
  visualPrdReady: true,
  testsPassed: true,
  deploymentReady: false,
  version: 'v1.2.3',
  metrics: {
    userSessions: 1234,
    bounceRate: '23%',
    topPages: ['Dashboard', 'Analytics', 'Settings'],
    activeUsers: 156,
  },
  recentChanges: [
    {
      version: 'v1.2.3',
      description: 'Added approval workflow',
      date: '2024-03-20',
    },
    {
      version: 'v1.2.2',
      description: 'Enhanced analytics dashboard',
      date: '2024-03-19',
    },
  ],
};

const QuickActions = () => {
  const handleAction = (action: string) => {
    console.log('Action clicked:', action);
  };

  return (
    <Box sx={{ p: 2 }}>
      {/* Section Title */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="subtitle1">Quick Actions & Next Steps</Typography>
        <Chip
          icon={<SpeedIcon sx={{ fontSize: 14 }} />}
          label="Stage: PROTOTYPE"
          size="small"
          sx={{
            height: 24,
            bgcolor: 'rgba(255, 152, 0, 0.1)',
            color: '#FF9800',
            '& .MuiChip-icon': { color: 'inherit' },
          }}
        />
      </Box>

      {/* Stage-Specific Actions */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12}>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
            RECOMMENDED NEXT STEPS
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {mockAppStatus.memoryComplete && (
              <Button
                variant="contained"
                startIcon={<ArchitectureIcon />}
                size="small"
                onClick={() => handleAction('blueprint')}
                sx={{
                  bgcolor: 'rgba(33, 150, 243, 0.1)',
                  color: '#2196F3',
                  '&:hover': { bgcolor: 'rgba(33, 150, 243, 0.2)' },
                }}
              >
                Go to Blueprint
              </Button>
            )}
            {mockAppStatus.visualPrdReady && (
              <Button
                variant="contained"
                startIcon={<ScienceIcon />}
                size="small"
                onClick={() => handleAction('prototype')}
                sx={{
                  bgcolor: 'rgba(255, 152, 0, 0.1)',
                  color: '#FF9800',
                  '&:hover': { bgcolor: 'rgba(255, 152, 0, 0.2)' },
                }}
              >
                Review Prototype
              </Button>
            )}
            {mockAppStatus.deploymentReady && (
              <Button
                variant="contained"
                startIcon={<RocketIcon />}
                size="small"
                onClick={() => handleAction('deploy')}
                sx={{
                  bgcolor: 'rgba(76, 175, 80, 0.1)',
                  color: '#4CAF50',
                  '&:hover': { bgcolor: 'rgba(76, 175, 80, 0.2)' },
                }}
              >
                Deploy to Space
              </Button>
            )}
          </Box>
        </Grid>
      </Grid>

      {/* Common Utilities */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12}>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
            COMMON UTILITIES
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Button
              variant="outlined"
              startIcon={<DownloadIcon />}
              size="small"
              onClick={() => handleAction('export')}
              sx={{ borderColor: 'rgba(255, 255, 255, 0.12)' }}
            >
              Export App
            </Button>
            <Button
              variant="outlined"
              startIcon={<UploadIcon />}
              size="small"
              onClick={() => handleAction('import')}
              sx={{ borderColor: 'rgba(255, 255, 255, 0.12)' }}
            >
              Import Config
            </Button>
            {mockAppStatus.testsPassed && (
              <Button
                variant="outlined"
                startIcon={<AssessmentIcon />}
                size="small"
                onClick={() => handleAction('tests')}
                sx={{ borderColor: 'rgba(255, 255, 255, 0.12)' }}
              >
                View Tests
              </Button>
            )}
          </Box>
        </Grid>
      </Grid>

      {/* Metrics & Analytics */}
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12}>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
            KEY METRICS
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Tooltip title="Total user sessions">
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <AnalyticsIcon sx={{ fontSize: 16, color: 'primary.main' }} />
                <Typography variant="body2">
                  {mockAppStatus.metrics.userSessions} <Typography component="span" variant="caption" color="text.secondary">sessions</Typography>
                </Typography>
              </Box>
            </Tooltip>
            <Tooltip title="Current bounce rate">
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CompareIcon sx={{ fontSize: 16, color: '#FF9800' }} />
                <Typography variant="body2">
                  {mockAppStatus.metrics.bounceRate} <Typography component="span" variant="caption" color="text.secondary">bounce rate</Typography>
                </Typography>
              </Box>
            </Tooltip>
          </Box>
        </Grid>
      </Grid>

      {/* Version Info */}
      <Box>
        <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
          RECENT CHANGES
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <HistoryIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
          <Typography variant="body2">
            {mockAppStatus.recentChanges[0].version} - {mockAppStatus.recentChanges[0].description}
          </Typography>
          <Button
            size="small"
            sx={{ color: 'text.secondary', fontSize: '0.75rem', textTransform: 'none' }}
            onClick={() => handleAction('history')}
          >
            View History
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default QuickActions; 