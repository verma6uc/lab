import React from 'react';
import {
  Box,
  Button,
  Typography,
  Tabs,
  Tab,
  Card,
  CardContent,
} from '@mui/material';
import {
  Launch as LaunchIcon,
  Description as DocIcon,
  BugReport as TestIcon,
  Category as EntityIcon,
  Storage as HostIcon,
} from '@mui/icons-material';
import { DevelopmentViewProps, TaskGroup, Task, TaskStatus } from './types';
import { mockTaskBoard, mockTaskDetails } from './mockData';
import KanbanBoard from './components/KanbanBoard';
import TaskDetailsModal from './components/TaskDetailsModal';

const DevelopmentView: React.FC<DevelopmentViewProps> = ({
  applicationId,
  applicationName,
  onProceedToLaunch,
}) => {
  const [selectedTask, setSelectedTask] = React.useState<string | null>(null);
  const [selectedGroup, setSelectedGroup] = React.useState<string>('documentation');
  const [taskBoard, setTaskBoard] = React.useState(mockTaskBoard);

  // Calculate overall progress
  const overallProgress = React.useMemo(() => {
    const allTasks = taskBoard.groups.flatMap(group => group.tasks);
    const totalTasks = allTasks.length;
    const completedTasks = allTasks.filter(t => t.status === 'done').length;
    return Math.round((completedTasks / totalTasks) * 100);
  }, [taskBoard]);

  const handleTaskClick = (taskId: string) => {
    setSelectedTask(taskId);
  };

  const handleTaskMove = (taskId: string, newStatus: TaskStatus) => {
    setTaskBoard(prev => {
      const newGroups = prev.groups.map(group => ({
        ...group,
        tasks: group.tasks.map(task =>
          task.id === taskId ? { ...task, status: newStatus } : task
        ),
      }));
      return { ...prev, groups: newGroups };
    });
  };

  const currentTasks = React.useMemo(() => {
    const group = taskBoard.groups.find(g => g.type === selectedGroup);
    return group ? group.tasks : [];
  }, [taskBoard, selectedGroup]);

  const getGroupIcon = (type: string) => {
    switch (type) {
      case 'documentation':
        return <DocIcon />;
      case 'test':
        return <TestIcon />;
      case 'entity':
        return <EntityIcon />;
      case 'host':
        return <HostIcon />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Card
        sx={{
          background: 'rgba(0, 0, 0, 0.2)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6" sx={{ color: 'common.white' }}>
              Development Progress
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: overallProgress === 100 ? '#4caf50' : '#00A3FF',
              }}
            >
              {overallProgress}%
            </Typography>
          </Box>
          <Tabs
            value={selectedGroup}
            onChange={(_, value) => setSelectedGroup(value)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              '& .MuiTab-root': {
                color: 'rgba(255, 255, 255, 0.7)',
                '&.Mui-selected': {
                  color: '#00A3FF',
                },
              },
              '& .MuiTabs-indicator': {
                backgroundColor: '#00A3FF',
              },
            }}
          >
            {taskBoard.groups.map(group => (
              <Tab
                key={group.type}
                value={group.type}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {getGroupIcon(group.type)}
                    <span>{group.title}</span>
                  </Box>
                }
              />
            ))}
          </Tabs>
        </CardContent>
      </Card>

      <KanbanBoard
        tasks={currentTasks}
        onTaskClick={handleTaskClick}
        onTaskMove={handleTaskMove}
      />

      {overallProgress === 100 && (
        <Button
          variant="contained"
          size="large"
          startIcon={<LaunchIcon />}
          onClick={onProceedToLaunch}
          sx={{
            bgcolor: '#00A3FF',
            '&:hover': {
              bgcolor: '#0081CC',
            },
            alignSelf: 'center',
            mt: 2,
          }}
        >
          Proceed to Launch
        </Button>
      )}

      <TaskDetailsModal
        task={selectedTask ? mockTaskDetails[selectedTask] : null}
        open={!!selectedTask}
        onClose={() => setSelectedTask(null)}
      />
    </Box>
  );
};

export default DevelopmentView; 