import React from 'react';
import {
  Box,
  Typography,
  Button,
  LinearProgress,
} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Flag as FlagIcon,
  Memory as MemoryIcon,
  Architecture as ArchitectureIcon,
  DesignServices as DesignIcon,
  Build as BuildIcon,
  Speed as SpeedIcon,
  Rocket as RocketIcon,
} from '@mui/icons-material';

const mockWorkflows = [
  {
    projectName: 'AI Analytics Dashboard',
    stage: 'VISUAL_PRD',
    task: 'Review Visual PRD Layout',
    priority: 'high',
    progress: 75,
    impact: 'Critical for UX consistency',
    dependencies: 'Blueprint Approval',
    nextPrototype: true,
  },
  {
    projectName: 'AI Analytics Dashboard',
    stage: 'VISUAL_PRD',
    task: 'Component Structure',
    priority: 'medium',
    progress: 50,
    impact: 'Affects development modularity',
    dependencies: 'Visual PRD Draft',
  },
  {
    projectName: 'Customer Feedback Portal',
    stage: 'MEMORY',
    task: 'Memory Document Review',
    priority: 'medium',
    progress: 30,
    impact: 'Initial product vision and scope',
    dependencies: 'None',
  },
];

const getStageIcon = (stage: string) => {
  const iconProps = { sx: { fontSize: 16, color: 'inherit' } };
  switch (stage) {
    case 'MEMORY':
      return <MemoryIcon {...iconProps} />;
    case 'BLUEPRINT':
      return <ArchitectureIcon {...iconProps} />;
    case 'VISUAL_PRD':
      return <DesignIcon {...iconProps} />;
    case 'PROTOTYPE':
      return <BuildIcon {...iconProps} />;
    case 'DEVELOPMENT':
      return <SpeedIcon {...iconProps} />;
    case 'LAUNCH':
      return <RocketIcon {...iconProps} />;
    default:
      return null;
  }
};

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

const WorkflowManager = () => {
  return (
    <Box sx={{ p: 1.5 }}>
      <Typography variant="h6" sx={{ mb: 1.5 }}>
        Stage Workflows
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        {mockWorkflows.map((workflow, index) => (
          <Box
            key={index}
            sx={{
              p: 1.5,
              borderRadius: 1,
              bgcolor: 'rgba(145, 158, 171, 0.05)',
              border: '1px solid rgba(145, 158, 171, 0.08)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Priority Indicator */}
            <Box
              sx={{
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: 3,
                bgcolor: getPriorityColor(workflow.priority),
              }}
            />

            {/* Header */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                  color: getStageColor(workflow.stage),
                }}
              >
                {getStageIcon(workflow.stage)}
                <Typography variant="caption" sx={{ fontWeight: 500 }}>
                  {workflow.stage.replace('_', ' ')}
                </Typography>
              </Box>
              {workflow.nextPrototype && (
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                    bgcolor: 'rgba(0, 171, 85, 0.08)',
                    color: '#00AB55',
                    px: 0.75,
                    py: 0.25,
                    borderRadius: 1,
                  }}
                >
                  <FlagIcon sx={{ fontSize: 14 }} />
                  <Typography variant="caption">Next Prototype</Typography>
                </Box>
              )}
            </Box>

            {/* Task */}
            <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
              {workflow.task}
            </Typography>

            {/* Project */}
            <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
              {workflow.projectName}
            </Typography>

            {/* Progress */}
            <Box sx={{ mb: 1.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.5 }}>
                <Typography variant="caption" color="text.secondary">Progress</Typography>
                <Typography variant="caption" color="text.primary">{workflow.progress}%</Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={workflow.progress}
                sx={{
                  height: 4,
                  borderRadius: 2,
                  bgcolor: 'rgba(145, 158, 171, 0.16)',
                  '& .MuiLinearProgress-bar': {
                    borderRadius: 2,
                    bgcolor: workflow.progress >= 75 ? '#00AB55' : '#2196F3',
                  },
                }}
              />
            </Box>

            {/* Impact & Dependencies */}
            <Box sx={{ mb: 1.5 }}>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                Impact: {workflow.impact}
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                Dependencies: {workflow.dependencies}
              </Typography>
            </Box>

            {/* Actions */}
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant="contained"
                size="small"
                startIcon={<CheckCircleIcon />}
                sx={{
                  bgcolor: 'rgba(0, 171, 85, 0.08)',
                  color: '#00AB55',
                  '&:hover': {
                    bgcolor: 'rgba(0, 171, 85, 0.16)',
                  },
                  '& .MuiButton-startIcon': {
                    color: '#00AB55',
                  },
                }}
              >
                Approve
              </Button>
              <Button
                variant="contained"
                size="small"
                startIcon={<CancelIcon />}
                sx={{
                  bgcolor: 'rgba(255, 72, 66, 0.08)',
                  color: '#FF4842',
                  '&:hover': {
                    bgcolor: 'rgba(255, 72, 66, 0.16)',
                  },
                  '& .MuiButton-startIcon': {
                    color: '#FF4842',
                  },
                }}
              >
                Reject
              </Button>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

const getStageColor = (stage: string) => {
  switch (stage) {
    case 'MEMORY':
      return '#2196F3';
    case 'BLUEPRINT':
      return '#9C27B0';
    case 'VISUAL_PRD':
      return '#FF9800';
    case 'PROTOTYPE':
      return '#00BCD4';
    case 'DEVELOPMENT':
      return '#4CAF50';
    case 'LAUNCH':
      return '#F44336';
    default:
      return '#919EAB';
  }
};

export default WorkflowManager; 