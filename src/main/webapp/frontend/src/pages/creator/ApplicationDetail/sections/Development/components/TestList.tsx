import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Tooltip,
  Chip,
} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Sync as SyncIcon,
  Info as InfoIcon,
} from '@mui/icons-material';
import { TestCase } from '../types';

interface TestListProps {
  tests: TestCase[];
  onTestClick: (testId: string) => void;
}

const TestList: React.FC<TestListProps> = ({ tests, onTestClick }) => {
  const getTestIcon = (status: TestCase['status']) => {
    switch (status) {
      case 'passed':
        return <CheckCircleIcon sx={{ color: '#4CAF50' }} />;
      case 'failed':
        return <ErrorIcon sx={{ color: '#f44336' }} />;
      case 'running':
        return <SyncIcon sx={{ color: '#ff9800' }} />;
      default:
        return <CheckCircleIcon />;
    }
  };

  const getStatusColor = (status: TestCase['status']): 'success' | 'error' | 'warning' => {
    switch (status) {
      case 'passed':
        return 'success';
      case 'failed':
        return 'error';
      case 'running':
        return 'warning';
      default:
        return 'warning';
    }
  };

  const getTestTypeChip = (type: TestCase['type']) => {
    const colors: Record<TestCase['type'], 'primary' | 'secondary' | 'info'> = {
      'unit': 'primary',
      'integration': 'secondary',
      'e2e': 'info',
    };

    return (
      <Chip
        size="small"
        label={type.toUpperCase()}
        color={colors[type]}
        sx={{ minWidth: 60 }}
      />
    );
  };

  return (
    <Card sx={{
      background: 'transparent',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
    }}>
      <CardContent>
        <Typography variant="h6" sx={{ color: 'common.white', mb: 2 }}>
          Tests
        </Typography>
        <List>
          {tests.map((test) => (
            <ListItem
              key={test.id}
              sx={{
                borderRadius: 1,
                mb: 1,
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.05)',
                },
              }}
              secondaryAction={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Chip
                    size="small"
                    label={test.status.toUpperCase()}
                    color={getStatusColor(test.status)}
                    sx={{ minWidth: 80 }}
                  />
                  <Tooltip title="View Details">
                    <IconButton
                      edge="end"
                      onClick={() => onTestClick(test.id)}
                      sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
                    >
                      <InfoIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              }
            >
              <ListItemIcon>
                {getTestIcon(test.status)}
              </ListItemIcon>
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="body1" sx={{ color: 'common.white' }}>
                      {test.name}
                    </Typography>
                    {getTestTypeChip(test.type)}
                  </Box>
                }
                secondary={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                    <Typography
                      variant="caption"
                      sx={{ color: 'rgba(255, 255, 255, 0.5)' }}
                    >
                      Agent: {test.agent}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ color: '#4CAF50' }}
                    >
                      Confidence: {(test.confidence * 100).toFixed(1)}%
                    </Typography>
                    {test.details && (
                      <Typography
                        variant="caption"
                        sx={{ color: 'rgba(255, 255, 255, 0.5)' }}
                      >
                        • {test.details}
                      </Typography>
                    )}
                  </Box>
                }
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default TestList; 