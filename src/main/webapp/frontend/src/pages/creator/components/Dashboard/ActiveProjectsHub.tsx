import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  LinearProgress,
  Badge,
  Avatar,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  Comment as CommentIcon,
  Schedule as ScheduleIcon,
  ArrowForward as ArrowForwardIcon,
} from '@mui/icons-material';

const mockProjects = [
  {
    id: 'PRJ-001',
    name: 'AI Analytics Dashboard',
    stage: 'VISUAL_PRD',
    progress: 65,
    notifications: 3,
    comments: 5,
    lastUpdate: '2h ago',
    priority: 'high',
  },
  {
    id: 'PRJ-002',
    name: 'Customer Feedback Portal',
    stage: 'BLUEPRINT',
    progress: 30,
    notifications: 1,
    comments: 2,
    lastUpdate: '4h ago',
    priority: 'medium',
  },
];

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high':
      return '#FF4842';
    case 'medium':
      return '#FFC107';
    case 'low':
      return '#00AB55';
    default:
      return '#919EAB';
  }
};

const ActiveProjectsHub = () => {
  return (
    <Box sx={{ p: 1.5 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="h6">
            Active Projects
            <Chip
              label={mockProjects.length}
              size="small"
              sx={{
                ml: 1,
                height: 20,
                fontSize: '0.75rem',
                bgcolor: 'rgba(0, 171, 85, 0.2)',
                color: '#00AB55',
                '& .MuiChip-label': {
                  px: 1,
                },
              }}
            />
          </Typography>
        </Box>
      </Box>

      {/* Projects Grid */}
      <Grid container spacing={1}>
        {mockProjects.map((project) => (
          <Grid item xs={12} key={project.id}>
            <Card
              sx={{
                bgcolor: 'rgba(145, 158, 171, 0.05)',
                backdropFilter: 'blur(6px)',
                border: '1px solid rgba(145, 158, 171, 0.08)',
                '&:hover': {
                  bgcolor: 'rgba(145, 158, 171, 0.08)',
                },
                position: 'relative',
                overflow: 'visible',
              }}
            >
              {/* Priority Indicator */}
              <Box
                sx={{
                  position: 'absolute',
                  left: -1,
                  top: 12,
                  bottom: 12,
                  width: 4,
                  borderRadius: '0 4px 4px 0',
                  bgcolor: getPriorityColor(project.priority),
                }}
              />

              <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
                <Grid container spacing={1.5} alignItems="center">
                  {/* Project Info */}
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        {project.name}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Typography variant="caption" color="text.secondary">
                          {project.id}
                        </Typography>
                        <Chip
                          label={project.stage.replace('_', ' ')}
                          size="small"
                          sx={{
                            height: 20,
                            fontSize: '0.75rem',
                            bgcolor: 'rgba(33, 150, 243, 0.1)',
                            color: '#2196F3',
                            '& .MuiChip-label': {
                              px: 1,
                            },
                          }}
                        />
                      </Box>
                    </Box>
                  </Grid>

                  {/* Progress and Actions */}
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1.5 }}>
                      {/* Progress */}
                      <Box sx={{ flexGrow: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.5 }}>
                          <Typography variant="caption" color="text.secondary">Progress</Typography>
                          <Typography variant="caption" color="text.primary">{project.progress}%</Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={project.progress}
                          sx={{
                            height: 6,
                            borderRadius: 3,
                            bgcolor: 'rgba(145, 158, 171, 0.16)',
                            '& .MuiLinearProgress-bar': {
                              borderRadius: 3,
                              bgcolor: project.progress >= 80 ? '#00AB55' : '#2196F3',
                            },
                          }}
                        />
                      </Box>

                      {/* Action Badges */}
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                        <Tooltip title="Notifications">
                          <Badge
                            badgeContent={project.notifications}
                            color="error"
                            sx={{
                              '& .MuiBadge-badge': {
                                bgcolor: '#FF4842',
                                color: '#fff',
                              },
                            }}
                          >
                            <Avatar
                              sx={{
                                width: 28,
                                height: 28,
                                bgcolor: 'rgba(255, 72, 66, 0.1)',
                              }}
                            >
                              <NotificationsIcon sx={{ fontSize: 14, color: '#FF4842' }} />
                            </Avatar>
                          </Badge>
                        </Tooltip>

                        <Tooltip title="Comments">
                          <Badge
                            badgeContent={project.comments}
                            color="primary"
                            sx={{
                              '& .MuiBadge-badge': {
                                bgcolor: '#2196F3',
                                color: '#fff',
                              },
                            }}
                          >
                            <Avatar
                              sx={{
                                width: 28,
                                height: 28,
                                bgcolor: 'rgba(33, 150, 243, 0.1)',
                              }}
                            >
                              <CommentIcon sx={{ fontSize: 14, color: '#2196F3' }} />
                            </Avatar>
                          </Badge>
                        </Tooltip>

                        <Tooltip title={`Last updated ${project.lastUpdate}`}>
                          <Avatar
                            sx={{
                              width: 28,
                              height: 28,
                              bgcolor: 'rgba(145, 158, 171, 0.1)',
                            }}
                          >
                            <ScheduleIcon sx={{ fontSize: 14, color: '#919EAB' }} />
                          </Avatar>
                        </Tooltip>

                        <Tooltip title="View Project">
                          <IconButton
                            size="small"
                            sx={{
                              width: 28,
                              height: 28,
                              bgcolor: 'rgba(33, 150, 243, 0.1)',
                              color: '#2196F3',
                              '&:hover': {
                                bgcolor: 'rgba(33, 150, 243, 0.2)',
                              },
                            }}
                          >
                            <ArrowForwardIcon sx={{ fontSize: 14 }} />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ActiveProjectsHub; 