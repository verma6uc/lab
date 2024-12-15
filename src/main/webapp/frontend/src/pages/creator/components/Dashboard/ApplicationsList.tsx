import React from 'react';
import { Box, Typography, Chip, IconButton, Button, Avatar } from '@mui/material';
import {
  Add as AddIcon,
  OpenInNew as OpenInNewIcon,
  Edit as EditIcon,
  Rocket as RocketIcon,
  Architecture as ArchitectureIcon,
  Science as ScienceIcon,
} from '@mui/icons-material';

// Mock data for applications
const mockApplications = [
  {
    id: 1,
    name: "AI Analytics Dashboard",
    stage: "BLUEPRINT",
    lastUpdated: "2024-03-20T10:00:00Z",
  },
  {
    id: 2,
    name: "Customer Feedback Portal",
    stage: "PROTOTYPE",
    lastUpdated: "2024-03-19T15:30:00Z",
  },
  {
    id: 3,
    name: "Team Collaboration Tool",
    stage: "LAUNCHED",
    lastUpdated: "2024-03-18T09:15:00Z",
  },
];

const getStageIcon = (stage: string) => {
  switch (stage) {
    case 'BLUEPRINT':
      return <ArchitectureIcon sx={{ fontSize: 14 }} />;
    case 'PROTOTYPE':
      return <ScienceIcon sx={{ fontSize: 14 }} />;
    case 'LAUNCHED':
      return <RocketIcon sx={{ fontSize: 14 }} />;
    default:
      return <EditIcon sx={{ fontSize: 14 }} />;
  }
};

const getStageColor = (stage: string) => {
  switch (stage) {
    case 'BLUEPRINT':
      return '#2196F3';
    case 'PROTOTYPE':
      return '#FF9800';
    case 'LAUNCHED':
      return '#4CAF50';
    default:
      return '#9E9E9E';
  }
};

const ApplicationsList = () => {
  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="subtitle1">Applications ({mockApplications.length})</Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon sx={{ fontSize: 16 }} />}
          size="small"
          sx={{
            py: 0.5,
            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
            '&:hover': {
              background: 'linear-gradient(45deg, #21CBF3 30%, #2196F3 90%)',
            },
          }}
        >
          New
        </Button>
      </Box>

      <Box>
        {mockApplications.map((app, index) => (
          <Box
            key={app.id}
            sx={{
              display: 'flex',
              alignItems: 'center',
              py: 1,
              borderBottom: index < mockApplications.length - 1 ? '1px solid rgba(255, 255, 255, 0.08)' : 'none',
              cursor: 'pointer',
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.02)',
              },
            }}
          >
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="body2" noWrap>{app.name}</Typography>
                <Chip
                  icon={getStageIcon(app.stage)}
                  label={app.stage}
                  size="small"
                  sx={{
                    height: 20,
                    '& .MuiChip-label': { px: 1, fontSize: '0.75rem' },
                    bgcolor: `${getStageColor(app.stage)}15`,
                    color: getStageColor(app.stage),
                    '& .MuiChip-icon': { color: 'inherit' },
                  }}
                />
              </Box>
              <Typography variant="caption" color="text.secondary">
                Updated {new Date(app.lastUpdated).toLocaleDateString()}
              </Typography>
            </Box>
            <IconButton size="small">
              <OpenInNewIcon sx={{ fontSize: 16 }} />
            </IconButton>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ApplicationsList; 