import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  Chip,
  IconButton,
  Tooltip,
  Divider,
  Stack,
  TextField,
  MenuItem,
  LinearProgress,
} from '@mui/material';
import {
  Apps as AppsIcon,
  Edit as EditIcon,
  Launch as LaunchIcon,
  Code as CodeIcon,
  Assessment as AssessmentIcon,
  Memory as MemoryIcon,
  Architecture as BlueprintIcon,
  Palette as VisualIcon,
  PhoneAndroid as PrototypeIcon,
  Rocket as LaunchStageIcon,
  Person as OwnerIcon,
  Update as UpdateIcon,
  Schedule as ScheduleIcon,
  Warning as WarningIcon,
  Feedback as FeedbackIcon,
} from '@mui/icons-material';
import { Company } from '../../../../types/company';

interface CompanyApplicationsProps {
  company: Company;
  onEditApplication: (id: number) => void;
  onViewApplication: (id: number) => void;
}

type StageInfo = {
  icon: JSX.Element;
  color: string;
  label: string;
  description: string;
};

const STAGES: Record<Company['applications'][0]['stage'], StageInfo> = {
  memory: {
    icon: <MemoryIcon />,
    color: '#9e9e9e',
    label: 'Memory',
    description: 'Early conceptual phase where ideas are being formed',
  },
  blueprint: {
    icon: <BlueprintIcon />,
    color: '#2196f3',
    label: 'Blueprint',
    description: 'Logical structures and architecture are being defined',
  },
  visual_prd: {
    icon: <VisualIcon />,
    color: '#9c27b0',
    label: 'Visual PRD',
    description: 'Design and visual elements are being created',
  },
  prototype: {
    icon: <PrototypeIcon />,
    color: '#4caf50',
    label: 'Prototype',
    description: 'Interactive mockups and simulations',
  },
  development: {
    icon: <CodeIcon />,
    color: '#ff9800',
    label: 'Development',
    description: 'Active development and testing phase',
  },
  launch: {
    icon: <LaunchStageIcon />,
    color: '#00bcd4',
    label: 'Launch',
    description: 'Application is live and being monitored',
  },
};

const CompanyApplications: React.FC<CompanyApplicationsProps> = ({
  company,
  onEditApplication,
  onViewApplication,
}) => {
  const [filterStage, setFilterStage] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const stageStats = company.applications.reduce((acc, app) => {
    acc[app.stage] = (acc[app.stage] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const filteredApplications = company.applications.filter(app => {
    const matchesStage = filterStage === 'all' || app.stage === filterStage;
    const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.owner?.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStage && matchesSearch;
  });

  const getProgressValue = (stage: Company['applications'][0]['stage']) => {
    const stages = ['memory', 'blueprint', 'visual_prd', 'prototype', 'development', 'launch'];
    return ((stages.indexOf(stage) + 1) / stages.length) * 100;
  };

  return (
    <Paper sx={{ 
      p: 3,
      bgcolor: 'rgba(10, 25, 41, 0.7)',
      borderRadius: 2,
      border: '1px solid rgba(0, 163, 255, 0.1)',
    }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <AppsIcon sx={{ color: '#00A3FF' }} />
          <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
            Applications
          </Typography>
          <Chip 
            label={company.applications.length}
            size="small"
            sx={{
              ml: 1,
              bgcolor: 'rgba(0, 163, 255, 0.1)',
              color: '#00A3FF',
              border: '1px solid rgba(0, 163, 255, 0.2)',
            }}
          />
        </Box>
        <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
          Below are the applications currently managed by the platform for {company.name}.
          Each application's stage, summary, and pending actions are shown at a glance.
        </Typography>
      </Box>

      {/* Stage Summary */}
      <Box sx={{ mb: 3, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        {Object.entries(STAGES).map(([stage, info]) => (
          <Box
            key={stage}
            sx={{
              px: 2,
              py: 1.5,
              borderRadius: 1,
              bgcolor: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              minWidth: 120,
              cursor: 'pointer',
              transition: 'all 0.2s',
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.08)',
              },
              ...(filterStage === stage && {
                bgcolor: `${info.color}15`,
                borderColor: `${info.color}40`,
              }),
            }}
            onClick={() => setFilterStage(stage === filterStage ? 'all' : stage)}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              {React.cloneElement(info.icon, { 
                sx: { color: info.color, fontSize: '1.2rem' } 
              })}
              <Typography sx={{ color: info.color, fontSize: '0.875rem', fontWeight: 500 }}>
                {info.label}
              </Typography>
            </Box>
            <Typography 
              sx={{ 
                color: info.color,
                fontSize: '1.25rem',
                fontWeight: 600,
              }}
            >
              {stageStats[stage] || 0}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Search */}
      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          size="small"
          placeholder="Search applications by name, description, or owner..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{
            '& .MuiOutlinedInput-root': {
              color: 'white',
              '& fieldset': {
                borderColor: 'rgba(255, 255, 255, 0.2)',
              },
              '&:hover fieldset': {
                borderColor: 'rgba(255, 255, 255, 0.3)',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#00A3FF',
              },
            },
          }}
        />
      </Box>

      {/* Applications List */}
      {filteredApplications.length === 0 ? (
        <Box sx={{ 
          textAlign: 'center',
          py: 4,
          color: 'rgba(255, 255, 255, 0.5)',
        }}>
          <Typography variant="body1" sx={{ mb: 1 }}>
            No applications found
          </Typography>
          <Typography variant="body2">
            Try adjusting your filters or search query
          </Typography>
        </Box>
      ) : (
        <List sx={{ mx: -3 }}>
          {filteredApplications.map((app, index) => (
            <React.Fragment key={app.id}>
              <ListItem sx={{ px: 3, py: 2 }}>
                <Box sx={{ width: '100%' }}>
                  {/* Header Row */}
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      {React.cloneElement(STAGES[app.stage].icon, { 
                        sx: { color: STAGES[app.stage].color } 
                      })}
                    </ListItemIcon>
                    <Box sx={{ flex: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                        <Typography sx={{ color: 'white', fontWeight: 500 }}>
                          {app.name}
                        </Typography>
                        <Chip 
                          label={STAGES[app.stage].label}
                          size="small"
                          icon={STAGES[app.stage].icon}
                          sx={{
                            bgcolor: `${STAGES[app.stage].color}20`,
                            color: STAGES[app.stage].color,
                            border: `1px solid ${STAGES[app.stage].color}40`,
                            '& .MuiChip-icon': {
                              color: 'inherit',
                            },
                          }}
                        />
                        {app.pending_approval && (
                          <Tooltip title="Awaiting approval to proceed">
                            <Chip 
                              icon={<WarningIcon />}
                              label="Pending Approval"
                              size="small"
                              sx={{
                                bgcolor: 'rgba(255, 152, 0, 0.1)',
                                color: '#ff9800',
                                border: '1px solid rgba(255, 152, 0, 0.2)',
                                '& .MuiChip-icon': {
                                  color: 'inherit',
                                },
                              }}
                            />
                          </Tooltip>
                        )}
                        {app.feedback_required && (
                          <Tooltip title="Feedback required">
                            <Chip 
                              icon={<FeedbackIcon />}
                              label="Needs Feedback"
                              size="small"
                              sx={{
                                bgcolor: 'rgba(233, 30, 99, 0.1)',
                                color: '#e91e63',
                                border: '1px solid rgba(233, 30, 99, 0.2)',
                                '& .MuiChip-icon': {
                                  color: 'inherit',
                                },
                              }}
                            />
                          </Tooltip>
                        )}
                      </Box>
                      {app.description && (
                        <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.875rem' }}>
                          {app.description}
                        </Typography>
                      )}
                    </Box>
                    <Stack direction="row" spacing={1}>
                      <Tooltip title="Edit Application">
                        <IconButton 
                          onClick={() => onEditApplication(app.id)}
                          sx={{ color: '#00A3FF' }}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="View Application">
                        <IconButton 
                          onClick={() => onViewApplication(app.id)}
                          sx={{ color: '#00A3FF' }}
                        >
                          <LaunchIcon />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </Box>

                  {/* Progress & Info Row */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                    <Box sx={{ flex: 1 }}>
                      <LinearProgress
                        variant="determinate"
                        value={getProgressValue(app.stage)}
                        sx={{
                          bgcolor: 'rgba(255, 255, 255, 0.1)',
                          borderRadius: 1,
                          height: 6,
                          '& .MuiLinearProgress-bar': {
                            bgcolor: STAGES[app.stage].color,
                            borderRadius: 1,
                          },
                        }}
                      />
                    </Box>
                    <Stack direction="row" spacing={3} sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                      {app.owner && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <OwnerIcon sx={{ fontSize: '1rem' }} />
                          <Typography variant="body2">
                            {app.owner.name}
                          </Typography>
                        </Box>
                      )}
                      {app.last_updated && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <UpdateIcon sx={{ fontSize: '1rem' }} />
                          <Typography variant="body2">
                            Updated {new Date(app.last_updated).toLocaleDateString()}
                          </Typography>
                        </Box>
                      )}
                      {app.estimated_completion && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <ScheduleIcon sx={{ fontSize: '1rem' }} />
                          <Typography variant="body2">
                            Due {new Date(app.estimated_completion).toLocaleDateString()}
                          </Typography>
                        </Box>
                      )}
                    </Stack>
                  </Box>
                </Box>
              </ListItem>
              {index < filteredApplications.length - 1 && (
                <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />
              )}
            </React.Fragment>
          ))}
        </List>
      )}
    </Paper>
  );
};

export default CompanyApplications;
