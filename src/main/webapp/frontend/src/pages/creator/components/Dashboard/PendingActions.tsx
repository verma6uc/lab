import React from 'react';
import { Box, Typography, Avatar, Chip, Button } from '@mui/material';
import {
  Assignment as AssignmentIcon,
  Comment as CommentIcon,
  Build as BuildIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
} from '@mui/icons-material';

// Mock data for pending actions
const mockPendingActions = [
  {
    id: 1,
    type: 'approval',
    title: 'New Product Feature',
    description: 'Review and approve the new authentication flow',
    priority: 'high',
    createdAt: '2024-03-20T10:00:00Z',
  },
  {
    id: 2,
    type: 'feedback',
    title: 'UI Component Library',
    description: 'Provide feedback on the proposed component structure',
    priority: 'medium',
    createdAt: '2024-03-19T15:30:00Z',
  },
  {
    id: 3,
    type: 'review',
    title: 'API Documentation',
    description: 'Review the updated API documentation',
    priority: 'low',
    createdAt: '2024-03-18T09:15:00Z',
  },
];

const getActionIcon = (type: string) => {
  switch (type) {
    case 'approval':
      return <AssignmentIcon sx={{ fontSize: 14 }} />;
    case 'feedback':
      return <CommentIcon sx={{ fontSize: 14 }} />;
    case 'review':
      return <BuildIcon sx={{ fontSize: 14 }} />;
    default:
      return <AssignmentIcon sx={{ fontSize: 14 }} />;
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high':
      return '#F44336';
    case 'medium':
      return '#FF9800';
    case 'low':
      return '#4CAF50';
    default:
      return '#9E9E9E';
  }
};

const PendingActions = () => {
  const handleApprove = (id: number) => {
    console.log('Approve action:', id);
  };

  const handleReject = (id: number) => {
    console.log('Reject action:', id);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="subtitle1" sx={{ mb: 1.5 }}>Pending Actions</Typography>
      <Box>
        {mockPendingActions.map((action, index) => (
          <Box
            key={action.id}
            sx={{
              py: 1.5,
              borderBottom: index < mockPendingActions.length - 1 ? '1px solid rgba(255, 255, 255, 0.08)' : 'none',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mb: 1 }}>
              <Avatar
                sx={{
                  width: 24,
                  height: 24,
                  bgcolor: `${getPriorityColor(action.priority)}15`,
                }}
              >
                {getActionIcon(action.type)}
              </Avatar>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                  <Typography variant="body2" noWrap>{action.title}</Typography>
                  <Chip
                    label={action.priority}
                    size="small"
                    sx={{
                      height: 18,
                      '& .MuiChip-label': { px: 1, fontSize: '0.65rem' },
                      bgcolor: `${getPriorityColor(action.priority)}15`,
                      color: getPriorityColor(action.priority),
                    }}
                  />
                </Box>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                  {action.description}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    size="small"
                    variant="contained"
                    startIcon={<CheckCircleIcon sx={{ fontSize: 14 }} />}
                    onClick={() => handleApprove(action.id)}
                    sx={{
                      py: 0.5,
                      bgcolor: 'rgba(76, 175, 80, 0.1)',
                      color: '#4CAF50',
                      '&:hover': {
                        bgcolor: 'rgba(76, 175, 80, 0.2)',
                      },
                    }}
                  >
                    Approve
                  </Button>
                  <Button
                    size="small"
                    variant="contained"
                    startIcon={<CancelIcon sx={{ fontSize: 14 }} />}
                    onClick={() => handleReject(action.id)}
                    sx={{
                      py: 0.5,
                      bgcolor: 'rgba(244, 67, 54, 0.1)',
                      color: '#F44336',
                      '&:hover': {
                        bgcolor: 'rgba(244, 67, 54, 0.2)',
                      },
                    }}
                  >
                    Reject
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default PendingActions; 