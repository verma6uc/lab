import React, { useState } from 'react';
import {
  Box,
  Typography,
  Avatar,
  Chip,
  Button,
  Stepper,
  Step,
  StepLabel,
  LinearProgress,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Memory as MemoryIcon,
  Architecture as ArchitectureIcon,
  DesignServices as DesignIcon,
  Build as BuildIcon,
  Rocket as RocketIcon,
  Speed as SpeedIcon,
  History as HistoryIcon,
  Edit as EditIcon,
  CheckCircle as CheckCircleIcon,
  Compare as CompareIcon,
  SwapHoriz as SwapHorizIcon,
} from '@mui/icons-material';

// Mock data for multiple projects' PDLC status
const mockProjects = [
  {
    projectName: "AI Analytics Dashboard",
    projectId: "PRJ-001",
    currentStage: 'VISUAL_PRD',
    stages: [
      { id: 'MEMORY', label: 'Memory', completed: true, artifact: 'product-memory-v1.2.md' },
      { id: 'BLUEPRINT', label: 'Blueprint', completed: true, artifact: 'product-blueprint-v1.0.yaml' },
      { id: 'VISUAL_PRD', label: 'Visual PRD', completed: false, artifact: 'visual-prd-draft.json' },
      { id: 'PROTOTYPE', label: 'Prototype', completed: false },
      { id: 'DEVELOPMENT', label: 'Development', completed: false },
      { id: 'LAUNCH', label: 'Launch', completed: false },
    ],
    currentProgress: 65,
    lastEdit: {
      stage: 'VISUAL_PRD',
      action: 'Updated layout structure',
      timestamp: '2024-03-20T14:30:00Z',
      version: 'v1.2.3',
    },
    feedback: {
      pending: 2,
      completed: 5,
    }
  },
  {
    projectName: "Customer Feedback Portal",
    projectId: "PRJ-002",
    currentStage: 'BLUEPRINT',
    stages: [
      { id: 'MEMORY', label: 'Memory', completed: true, artifact: 'product-memory-v1.0.md' },
      { id: 'BLUEPRINT', label: 'Blueprint', completed: false, artifact: 'blueprint-draft.yaml' },
      { id: 'VISUAL_PRD', label: 'Visual PRD', completed: false },
      { id: 'PROTOTYPE', label: 'Prototype', completed: false },
      { id: 'DEVELOPMENT', label: 'Development', completed: false },
      { id: 'LAUNCH', label: 'Launch', completed: false },
    ],
    currentProgress: 30,
    lastEdit: {
      stage: 'BLUEPRINT',
      action: 'Added system architecture',
      timestamp: '2024-03-19T16:45:00Z',
      version: 'v0.2.1',
    },
    feedback: {
      pending: 1,
      completed: 2,
    }
  },
  {
    projectName: "Team Collaboration Tool",
    projectId: "PRJ-003",
    currentStage: 'DEVELOPMENT',
    stages: [
      { id: 'MEMORY', label: 'Memory', completed: true, artifact: 'product-memory-v2.0.md' },
      { id: 'BLUEPRINT', label: 'Blueprint', completed: true, artifact: 'system-blueprint-v1.5.yaml' },
      { id: 'VISUAL_PRD', label: 'Visual PRD', completed: true, artifact: 'visual-prd-v1.0.json' },
      { id: 'PROTOTYPE', label: 'Prototype', completed: true, artifact: 'prototype-v1.0' },
      { id: 'DEVELOPMENT', label: 'Development', completed: false },
      { id: 'LAUNCH', label: 'Launch', completed: false },
    ],
    currentProgress: 85,
    lastEdit: {
      stage: 'DEVELOPMENT',
      action: 'Implemented core features',
      timestamp: '2024-03-20T11:20:00Z',
      version: 'v0.8.5',
    },
    feedback: {
      pending: 3,
      completed: 8,
    }
  }
];

const getStageIcon = (stage: string) => {
  const iconProps = { sx: { color: 'inherit', fontSize: '1.2rem' } };
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
      return <EditIcon {...iconProps} />;
  }
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
      return '#9E9E9E';
  }
};

const CommandCenter = () => {
  const [selectedProjectId, setSelectedProjectId] = useState(mockProjects[0].projectId);
  const [compareMode, setCompareMode] = useState(false);
  const [comparedProjectId, setComparedProjectId] = useState<string | null>(null);

  const handleAction = (action: string) => {
    console.log('Action clicked:', action);
  };

  const selectedProject = mockProjects.find(p => p.projectId === selectedProjectId)!;
  const comparedProject = comparedProjectId ? mockProjects.find(p => p.projectId === comparedProjectId)! : null;
  const currentStageInfo = selectedProject.stages.find(s => s.id === selectedProject.currentStage);

  const renderProjectProgress = (project: typeof mockProjects[0]) => (
    <Box sx={{ width: '100%' }}>
      {/* Project Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>{project.projectName}</Typography>
          <Typography variant="caption" color="text.secondary">Project ID: {project.projectId}</Typography>
        </Box>
        <Chip
          icon={getStageIcon(project.currentStage)}
          label={`Current Stage: ${project.stages.find(s => s.id === project.currentStage)?.label}`}
          size="small"
          sx={{
            bgcolor: `${getStageColor(project.currentStage)}15`,
            color: getStageColor(project.currentStage),
            '& .MuiChip-icon': { color: 'inherit' },
            height: 24,
          }}
        />
      </Box>

      {/* Stage Progress */}
      <Box sx={{ mb: 1.5 }}>
        <Stepper activeStep={project.stages.findIndex(s => s.id === project.currentStage)} alternativeLabel>
          {project.stages.map((stage) => (
            <Step key={stage.id} completed={stage.completed}>
              <StepLabel
                icon={
                  <Avatar
                    sx={{
                      width: 24,
                      height: 24,
                      bgcolor: stage.completed 
                        ? `${getStageColor(stage.id)}30` 
                        : stage.id === project.currentStage 
                          ? `${getStageColor(stage.id)}15`
                          : 'rgba(255, 255, 255, 0.12)',
                      color: stage.completed || stage.id === project.currentStage
                        ? getStageColor(stage.id)
                        : 'rgba(255, 255, 255, 0.5)',
                      border: stage.id === project.currentStage 
                        ? `2px solid ${getStageColor(stage.id)}`
                        : 'none',
                    }}
                  >
                    {stage.completed ? <CheckCircleIcon sx={{ fontSize: 16 }} /> : getStageIcon(stage.id)}
                  </Avatar>
                }
              >
                <Typography 
                  variant="caption" 
                  color={stage.completed || stage.id === project.currentStage 
                    ? getStageColor(stage.id) 
                    : 'text.secondary'}
                  sx={{ 
                    fontWeight: stage.id === project.currentStage ? 600 : 400,
                    opacity: stage.completed || stage.id === project.currentStage ? 1 : 0.7,
                    fontSize: '0.7rem',
                  }}
                >
                  {stage.label}
                </Typography>
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>

      {/* Current Stage Progress */}
      <Box sx={{ mb: 1.25 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.5 }}>
          <Typography variant="caption" color="text.secondary">Stage Progress</Typography>
          <Typography variant="caption" color="text.secondary">{project.currentProgress}%</Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={project.currentProgress}
          sx={{
            height: 4,
            borderRadius: 2,
            bgcolor: 'rgba(255, 255, 255, 0.08)',
            '& .MuiLinearProgress-bar': {
              bgcolor: getStageColor(project.currentStage),
            },
          }}
        />
      </Box>

      {/* Version Info */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
        <HistoryIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
        <Typography variant="caption" color="text.secondary">
          Last edit: {project.lastEdit.action} ({project.lastEdit.version})
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Box>
      {/* Project Selection Header */}
      <Box sx={{ p: 1.25, borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
        <Grid container spacing={1} alignItems="center">
          <Grid item xs>
            <FormControl fullWidth size="small">
              <InputLabel>Select Project</InputLabel>
              <Select
                value={selectedProjectId}
                label="Select Project"
                onChange={(e) => setSelectedProjectId(e.target.value)}
              >
                {mockProjects.map((project) => (
                  <MenuItem key={project.projectId} value={project.projectId}>
                    {project.projectName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <Tooltip title={compareMode ? "Exit Compare Mode" : "Compare Projects"}>
              <IconButton
                size="small"
                onClick={() => {
                  setCompareMode(!compareMode);
                  if (!compareMode) {
                    setComparedProjectId(mockProjects.find(p => p.projectId !== selectedProjectId)?.projectId || null);
                  } else {
                    setComparedProjectId(null);
                  }
                }}
                sx={{
                  bgcolor: compareMode ? 'rgba(33, 150, 243, 0.1)' : 'transparent',
                  '&:hover': { bgcolor: 'rgba(33, 150, 243, 0.2)' },
                }}
              >
                {compareMode ? <SwapHorizIcon /> : <CompareIcon />}
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </Box>

      {/* Project Progress Section */}
      <Box sx={{ p: 1.25 }}>
        <Grid container spacing={compareMode ? 1 : 0}>
          <Grid item xs={compareMode ? 6 : 12}>
            {renderProjectProgress(selectedProject)}
          </Grid>
          {compareMode && comparedProjectId && (
            <Grid item xs={6}>
              <Box sx={{ pl: 1.25, borderLeft: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <FormControl fullWidth size="small" sx={{ mb: 1.25 }}>
                  <InputLabel>Compare With</InputLabel>
                  <Select
                    value={comparedProjectId}
                    label="Compare With"
                    onChange={(e) => setComparedProjectId(e.target.value)}
                  >
                    {mockProjects
                      .filter(p => p.projectId !== selectedProjectId)
                      .map((project) => (
                        <MenuItem key={project.projectId} value={project.projectId}>
                          {project.projectName}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
                {renderProjectProgress(mockProjects.find(p => p.projectId === comparedProjectId)!)}
              </Box>
            </Grid>
          )}
        </Grid>
      </Box>

      {/* Stage Actions */}
      <Box sx={{ p: 1.25, borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
        <Typography variant="subtitle2" sx={{ mb: 0.75 }}>Stage Actions</Typography>
        <Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            startIcon={getStageIcon(selectedProject.currentStage)}
            size="small"
            onClick={() => handleAction('edit_current')}
            sx={{
              bgcolor: `${getStageColor(selectedProject.currentStage)}15`,
              color: getStageColor(selectedProject.currentStage),
              '&:hover': { bgcolor: `${getStageColor(selectedProject.currentStage)}25` },
              py: 0.5,
            }}
          >
            Edit {currentStageInfo?.label}
          </Button>
          <Button
            variant="contained"
            startIcon={<CheckCircleIcon />}
            size="small"
            onClick={() => handleAction('approve_stage')}
            sx={{
              bgcolor: 'rgba(76, 175, 80, 0.1)',
              color: '#4CAF50',
              '&:hover': { bgcolor: 'rgba(76, 175, 80, 0.2)' },
              py: 0.5,
            }}
          >
            Approve Stage
          </Button>
          {currentStageInfo?.artifact && (
            <Button
              variant="outlined"
              size="small"
              onClick={() => handleAction('view_artifact')}
              sx={{ 
                borderColor: 'rgba(255, 255, 255, 0.12)',
                py: 0.5,
              }}
            >
              View {currentStageInfo.label} Document
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default CommandCenter; 