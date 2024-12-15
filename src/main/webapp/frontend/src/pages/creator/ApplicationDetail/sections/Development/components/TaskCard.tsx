import React from 'react';
import {
  Box,
  Card,
  Typography,
  Chip,
  Avatar,
  Tooltip,
  Stack,
} from '@mui/material';
import {
  Description as DocIcon,
  BugReport as TestIcon,
  Category as EntityIcon,
  PlayArrow as ActionIcon,
  Storage as HostIcon,
  Flag as PriorityIcon,
  Code as CodeIcon,
  Build as BuildIcon,
  Help as HelpIcon,
  Speed as SpeedIcon,
  Architecture as StructureIcon,
  ViewQuilt as UIIcon,
  List as FormIcon,
} from '@mui/icons-material';
import { TaskCardProps } from '../types';

const getTypeIcon = (type: string) => {
  switch (type) {
    // Blueprint and Structure
    case 'define_section':
    case 'define_page':
      return <StructureIcon fontSize="small" />;
    // UI and Data Integration
    case 'build_static_ui':
      return <UIIcon fontSize="small" />;
    case 'build_sql_json':
      return <CodeIcon fontSize="small" />;
    case 'integrate_ui_data':
      return <BuildIcon fontSize="small" />;
    // Forms, Actions, and Effects
    case 'build_form_config':
    case 'build_form_logic':
      return <FormIcon fontSize="small" />;
    case 'build_action':
    case 'build_effect_list':
    case 'build_effect':
      return <ActionIcon fontSize="small" />;
    // Help/Documentation
    case 'write_page_help':
    case 'write_section_help':
    case 'write_form_help':
      return <HelpIcon fontSize="small" />;
    // Testing
    case 'write_test_plan':
    case 'create_test_cases':
    case 'build_test_scenarios':
    case 'execute_test':
      return <TestIcon fontSize="small" />;
    // Optimization
    case 'optimize_performance':
      return <SpeedIcon fontSize="small" />;
    default:
      return null;
  }
};

const getTypeColor = (category: string) => {
  switch (category) {
    case 'blueprint_structure':
      return '#9C27B0';
    case 'ui_integration':
      return '#2196F3';
    case 'forms_actions':
      return '#FF9800';
    case 'help_docs':
      return '#4CAF50';
    case 'testing':
      return '#E91E63';
    case 'optimization':
      return '#00BCD4';
    default:
      return '#757575';
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high':
      return '#f44336';
    case 'medium':
      return '#ff9800';
    case 'low':
      return '#4caf50';
    default:
      return '#757575';
  }
};

const TaskCard: React.FC<TaskCardProps> = ({ task, onClick }) => {
  return (
    <Card
      onClick={onClick}
      sx={{
        p: 2,
        mb: 1,
        cursor: 'pointer',
        background: 'rgba(0, 0, 0, 0.2)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        transition: 'all 0.2s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
          borderColor: 'rgba(255, 255, 255, 0.2)',
        },
      }}
    >
      <Stack spacing={1}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              color: getTypeColor(task.category),
            }}
          >
            {getTypeIcon(task.type)}
          </Box>
          <Typography
            variant="subtitle2"
            sx={{
              color: 'common.white',
              flex: 1,
              fontWeight: 600,
            }}
          >
            {task.title}
          </Typography>
          <Tooltip title={`Priority: ${task.priority}`}>
            <PriorityIcon
              sx={{
                fontSize: '1rem',
                color: getPriorityColor(task.priority),
              }}
            />
          </Tooltip>
        </Box>

        <Typography
          variant="body2"
          sx={{
            color: 'rgba(255, 255, 255, 0.7)',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {task.description}
        </Typography>

        {task.dependencies && task.dependencies.length > 0 && (
          <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
            <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
              Dependencies:
            </Typography>
            {task.dependencies.map((dep) => (
              <Chip
                key={dep}
                label={dep}
                size="small"
                sx={{
                  height: '16px',
                  fontSize: '0.65rem',
                  bgcolor: 'rgba(255, 255, 255, 0.05)',
                  color: 'rgba(255, 255, 255, 0.5)',
                  '& .MuiChip-label': { px: 0.5 },
                }}
              />
            ))}
          </Box>
        )}

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
            {task.labels.map((label) => (
              <Chip
                key={label}
                label={label}
                size="small"
                sx={{
                  height: '20px',
                  fontSize: '0.75rem',
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                  color: 'rgba(255, 255, 255, 0.7)',
                  '& .MuiChip-label': {
                    px: 1,
                  },
                }}
              />
            ))}
          </Box>
          <Tooltip title={`Agent: ${task.agent} (${Math.round(task.confidence * 100)}% confidence)`}>
            <Avatar
              sx={{
                width: 24,
                height: 24,
                fontSize: '0.75rem',
                bgcolor: getTypeColor(task.category),
              }}
            >
              {task.agent[0]}
            </Avatar>
          </Tooltip>
        </Box>
      </Stack>
    </Card>
  );
};

export default TaskCard; 