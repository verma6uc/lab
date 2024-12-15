import React from 'react';
import {
  Box,
  Button,
  Typography,
  LinearProgress,
  Grid,
  Tooltip,
} from '@mui/material';
import {
  Launch as LaunchIcon,
  CheckCircle as CheckIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  Schedule as PendingIcon,
} from '@mui/icons-material';
import { Task } from '../types';

interface ProgressSummaryProps {
  tasks: Task[];
  onProceedToLaunch: () => void;
  isReadyForLaunch: boolean;
}

const ProgressSummary: React.FC<ProgressSummaryProps> = ({
  tasks,
  onProceedToLaunch,
  isReadyForLaunch,
}) => {
  const getOverallProgress = () => {
    if (tasks.length === 0) return 0;
    const completedTasks = tasks.filter(task => task.status === 'done').length;
    return (completedTasks / tasks.length) * 100;
  };

  const getStatusCounts = () => {
    const counts = {
      done: 0,
      in_progress: 0,
      review: 0,
      todo: 0,
    };
    tasks.forEach(task => {
      counts[task.status]++;
    });
    return counts;
  };

  const getAverageConfidence = () => {
    if (tasks.length === 0) return 0;
    const totalConfidence = tasks.reduce((sum, task) => sum + task.confidence, 0);
    return (totalConfidence / tasks.length) * 100;
  };

  const statusCounts = getStatusCounts();
  const progress = getOverallProgress();
  const confidence = getAverageConfidence();

  const getProgressColor = (value: number) => {
    if (value >= 90) return 'success.main';
    if (value >= 60) return 'warning.main';
    return 'error.main';
  };

  return (
    <Box>
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                Overall Progress
              </Typography>
              <Typography variant="body2" sx={{ color: 'common.white' }}>
                {Math.round(progress)}%
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                height: 8,
                borderRadius: 4,
                bgcolor: 'rgba(255, 255, 255, 0.1)',
                '& .MuiLinearProgress-bar': {
                  bgcolor: getProgressColor(progress),
                },
              }}
            />
          </Box>
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                Agent Confidence
              </Typography>
              <Typography variant="body2" sx={{ color: 'common.white' }}>
                {Math.round(confidence)}%
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={confidence}
              sx={{
                height: 8,
                borderRadius: 4,
                bgcolor: 'rgba(255, 255, 255, 0.1)',
                '& .MuiLinearProgress-bar': {
                  bgcolor: getProgressColor(confidence),
                },
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Tooltip title="Completed Tasks">
              <Box sx={{ textAlign: 'center', flex: '1 1 auto' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                  <CheckIcon sx={{ color: 'success.main', mr: 1 }} />
                  <Typography variant="h6" sx={{ color: 'common.white' }}>
                    {statusCounts.done}
                  </Typography>
                </Box>
                <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  Done
                </Typography>
              </Box>
            </Tooltip>
            <Tooltip title="Tasks In Progress">
              <Box sx={{ textAlign: 'center', flex: '1 1 auto' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                  <WarningIcon sx={{ color: 'warning.main', mr: 1 }} />
                  <Typography variant="h6" sx={{ color: 'common.white' }}>
                    {statusCounts.in_progress}
                  </Typography>
                </Box>
                <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  In Progress
                </Typography>
              </Box>
            </Tooltip>
            <Tooltip title="Tasks In Review">
              <Box sx={{ textAlign: 'center', flex: '1 1 auto' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                  <ErrorIcon sx={{ color: 'info.main', mr: 1 }} />
                  <Typography variant="h6" sx={{ color: 'common.white' }}>
                    {statusCounts.review}
                  </Typography>
                </Box>
                <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  Review
                </Typography>
              </Box>
            </Tooltip>
            <Tooltip title="Pending Tasks">
              <Box sx={{ textAlign: 'center', flex: '1 1 auto' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                  <PendingIcon sx={{ color: 'error.main', mr: 1 }} />
                  <Typography variant="h6" sx={{ color: 'common.white' }}>
                    {statusCounts.todo}
                  </Typography>
                </Box>
                <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  To Do
                </Typography>
              </Box>
            </Tooltip>
          </Box>
        </Grid>
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<LaunchIcon />}
          onClick={onProceedToLaunch}
          disabled={!isReadyForLaunch}
        >
          Proceed to Launch
        </Button>
      </Box>
    </Box>
  );
};

export default ProgressSummary; 