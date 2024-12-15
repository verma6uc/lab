import React from 'react';
import {
  Box,
  Typography,
  Paper,
} from '@mui/material';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from '@mui/lab';
import {
  CheckCircle as DoneIcon,
  PlayArrow as InProgressIcon,
  RateReview as ReviewIcon,
  Schedule as TodoIcon,
} from '@mui/icons-material';
import { Task } from '../types';

interface TimelineViewProps {
  tasks: Task[];
}

const TimelineView: React.FC<TimelineViewProps> = ({ tasks }) => {
  const sortedTasks = [...tasks].sort((a, b) => {
    return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
  });

  const getStatusIcon = (status: Task['status']) => {
    switch (status) {
      case 'done':
        return <DoneIcon />;
      case 'in_progress':
        return <InProgressIcon />;
      case 'review':
        return <ReviewIcon />;
      case 'todo':
        return <TodoIcon />;
    }
  };

  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'done':
        return 'success';
      case 'in_progress':
        return 'warning';
      case 'review':
        return 'info';
      case 'todo':
        return 'grey';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    }).format(date);
  };

  return (
    <Box sx={{ height: '100%', overflowY: 'auto' }}>
      <Timeline position="right">
        {sortedTasks.map((task) => (
          <TimelineItem key={task.id}>
            <TimelineSeparator>
              <TimelineDot sx={{ bgcolor: `${getStatusColor(task.status)}.main` }}>
                {getStatusIcon(task.status)}
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  mb: 2,
                  background: 'rgba(0, 0, 0, 0.2)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <Typography variant="subtitle2" sx={{ color: 'common.white', mb: 1 }}>
                  {task.title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 1 }}>
                  {task.description}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                    Agent: {task.agent} ({Math.round(task.confidence * 100)}% confidence)
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                    {formatDate(task.lastUpdated)}
                  </Typography>
                </Box>
              </Paper>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </Box>
  );
};

export default TimelineView; 