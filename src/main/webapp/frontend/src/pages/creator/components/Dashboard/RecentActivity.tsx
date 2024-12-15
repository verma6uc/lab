import React from 'react';
import { Box, Typography, Avatar, Chip, Button } from '@mui/material';
import {
  Edit as EditIcon,
  Build as BuildIcon,
  Comment as CommentIcon,
  CheckCircle as CheckCircleIcon,
  Message as MessageIcon,
  OpenInNew as OpenInNewIcon,
  Apps as AppsIcon,
  Assignment as AssignmentIcon,
  Architecture as ArchitectureIcon,
} from '@mui/icons-material';

// Mock data for recent activity
const mockRecentActivity = [
  {
    id: 1,
    type: 'update',
    user: {
      name: 'John Smith',
      avatar: '',
      role: 'Product Manager',
    },
    action: 'updated',
    entityType: 'Application',
    target: 'CRM Tool',
    details: 'Changed status from BLUEPRINT to PROTOTYPE',
    changes: [
      { field: 'status', oldValue: 'BLUEPRINT', newValue: 'PROTOTYPE' }
    ],
    timestamp: '2024-03-20T14:30:00Z',
  },
  {
    id: 2,
    type: 'system',
    action: 'added',
    entityType: 'Component',
    target: 'Company UI Archetypes',
    details: 'Added new Metrics component to design system',
    changes: [
      { field: 'components', oldValue: null, newValue: 'MetricsComponent' }
    ],
    timestamp: '2024-03-20T13:15:00Z',
  },
  {
    id: 3,
    type: 'feedback',
    user: {
      name: 'Alice Johnson',
      avatar: '',
      role: 'UX Designer',
    },
    action: 'commented on',
    entityType: 'Visual PRD',
    target: 'Authentication Flow',
    details: 'Added feedback on user onboarding process',
    changes: [
      { field: 'comments', oldValue: '2', newValue: '3' }
    ],
    timestamp: '2024-03-20T12:00:00Z',
  },
  {
    id: 4,
    type: 'approval',
    user: {
      name: 'Mike Wilson',
      avatar: '',
      role: 'Tech Lead',
    },
    action: 'approved',
    entityType: 'Blueprint',
    target: 'Dashboard Layout',
    details: 'Approved component structure changes',
    changes: [
      { field: 'status', oldValue: 'pending', newValue: 'approved' }
    ],
    timestamp: '2024-03-20T11:30:00Z',
  },
];

const getActivityIcon = (type: string) => {
  switch (type) {
    case 'update':
      return <EditIcon sx={{ fontSize: 14 }} />;
    case 'system':
      return <BuildIcon sx={{ fontSize: 14 }} />;
    case 'feedback':
      return <CommentIcon sx={{ fontSize: 14 }} />;
    case 'approval':
      return <CheckCircleIcon sx={{ fontSize: 14 }} />;
    default:
      return <MessageIcon sx={{ fontSize: 14 }} />;
  }
};

const getActivityColor = (type: string) => {
  switch (type) {
    case 'update':
      return '#2196F3';
    case 'system':
      return '#9C27B0';
    case 'feedback':
      return '#FF9800';
    case 'approval':
      return '#4CAF50';
    default:
      return '#9E9E9E';
  }
};

const getEntityTypeIcon = (entityType: string) => {
  switch (entityType.toLowerCase()) {
    case 'application':
      return <AppsIcon sx={{ fontSize: 12 }} />;
    case 'component':
      return <BuildIcon sx={{ fontSize: 12 }} />;
    case 'visual prd':
      return <AssignmentIcon sx={{ fontSize: 12 }} />;
    case 'blueprint':
      return <ArchitectureIcon sx={{ fontSize: 12 }} />;
    default:
      return <EditIcon sx={{ fontSize: 12 }} />;
  }
};

const formatTimeAgo = (timestamp: string) => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

  if (diffInMinutes < 60) {
    return `${diffInMinutes}m ago`;
  } else if (diffInMinutes < 1440) {
    return `${Math.floor(diffInMinutes / 60)}h ago`;
  } else {
    return date.toLocaleDateString();
  }
};

const RecentActivity = () => {
  const handleActivityClick = (activity: typeof mockRecentActivity[0]) => {
    console.log('Navigate to:', activity.entityType, activity.target, activity.changes);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="subtitle1">Recent Activity</Typography>
          <Chip
            label={`Last 24h (${mockRecentActivity.length})`}
            size="small"
            sx={{
              height: 20,
              bgcolor: 'rgba(33, 150, 243, 0.1)',
              '& .MuiChip-label': { px: 1, fontSize: '0.75rem' },
            }}
          />
        </Box>
        <Button
          size="small"
          endIcon={<OpenInNewIcon sx={{ fontSize: 14 }} />}
          sx={{
            color: 'text.secondary',
            '&:hover': { color: 'primary.main' },
          }}
        >
          View Audit Log
        </Button>
      </Box>
      <Box>
        {mockRecentActivity.slice(0, 3).map((activity, index) => (
          <Box
            key={activity.id}
            onClick={() => handleActivityClick(activity)}
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 1.5,
              py: 1.5,
              borderBottom: index < 2 ? '1px solid rgba(255, 255, 255, 0.08)' : 'none',
              cursor: 'pointer',
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.02)',
              },
            }}
          >
            {activity.user ? (
              <Avatar
                src={activity.user.avatar}
                sx={{
                  width: 24,
                  height: 24,
                  bgcolor: `${getActivityColor(activity.type)}15`,
                  color: getActivityColor(activity.type),
                  fontSize: '0.75rem',
                }}
              >
                {activity.user.name.charAt(0)}
              </Avatar>
            ) : (
              <Avatar
                sx={{
                  width: 24,
                  height: 24,
                  bgcolor: `${getActivityColor(activity.type)}15`,
                  color: getActivityColor(activity.type),
                }}
              >
                {getActivityIcon(activity.type)}
              </Avatar>
            )}
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                <Typography variant="body2" noWrap>
                  {activity.user ? (
                    <span>
                      <strong>{activity.user.name}</strong> {activity.action}
                    </span>
                  ) : (
                    <span>
                      <strong>System</strong> {activity.action}
                    </span>
                  )}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  {getEntityTypeIcon(activity.entityType)}
                  <Typography variant="caption" sx={{ color: getActivityColor(activity.type) }}>
                    {activity.entityType}
                  </Typography>
                </Box>
              </Box>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                <strong>{activity.target}</strong> - {activity.details}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="caption" color="text.secondary">
                  {formatTimeAgo(activity.timestamp)}
                </Typography>
                {activity.user?.role && (
                  <Chip
                    label={activity.user.role}
                    size="small"
                    sx={{
                      height: 16,
                      '& .MuiChip-label': { px: 1, fontSize: '0.65rem' },
                      bgcolor: 'rgba(255, 255, 255, 0.05)',
                    }}
                  />
                )}
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default RecentActivity; 