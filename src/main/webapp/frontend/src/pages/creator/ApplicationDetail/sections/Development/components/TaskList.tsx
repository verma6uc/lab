import React from 'react';
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  LinearProgress,
} from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import TaskCard from './TaskCard';
import { TaskGroup } from '../types';

interface TaskListProps {
  taskGroups: TaskGroup[];
  onTaskClick: (taskId: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ taskGroups, onTaskClick }) => {
  const getGroupProgress = (group: TaskGroup) => {
    if (group.tasks.length === 0) return 0;
    const completedTasks = group.tasks.filter(task => task.status === 'done').length;
    return (completedTasks / group.tasks.length) * 100;
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {taskGroups.map(group => (
        <Accordion
          key={group.type}
          defaultExpanded
          sx={{
            background: 'rgba(0, 0, 0, 0.2)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            '&:before': {
              display: 'none',
            },
            '& .MuiAccordionSummary-root': {
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: 'common.white' }} />}
          >
            <Box sx={{ flex: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="subtitle1" sx={{ color: 'common.white', fontWeight: 600 }}>
                  {group.title}
                </Typography>
                <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  {group.tasks.filter(task => task.status === 'done').length} / {group.tasks.length} completed
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={getGroupProgress(group)}
                sx={{
                  height: 4,
                  borderRadius: 2,
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                  '& .MuiLinearProgress-bar': {
                    bgcolor: 'primary.main',
                  },
                }}
              />
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {group.tasks.length > 0 ? (
                group.tasks.map(task => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onClick={() => onTaskClick(task.id)}
                  />
                ))
              ) : (
                <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center', py: 2 }}>
                  No tasks in this category
                </Typography>
              )}
            </Box>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default TaskList; 