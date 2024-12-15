import React from 'react';
import { 
  Box, 
  Typography, 
  Paper,
  Stack,
  Chip,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Security as SecurityIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
  ArrowForward as ArrowForwardIcon,
} from '@mui/icons-material';
import StyledButton from '../../shared/StyledButton';

interface AlertProps {
  type: 'warning' | 'info';
  message: string;
  timestamp: string;
}

const Alert: React.FC<AlertProps> = ({ type, message, timestamp }) => {
  const colors = {
    warning: {
      bg: 'rgba(255, 152, 0, 0.1)',
      border: 'rgba(255, 152, 0, 0.2)',
      text: '#ff9800',
      icon: <WarningIcon sx={{ fontSize: '1.25rem' }} />,
    },
    info: {
      bg: 'rgba(0, 163, 255, 0.1)',
      border: 'rgba(0, 163, 255, 0.2)',
      text: '#00A3FF',
      icon: <InfoIcon sx={{ fontSize: '1.25rem' }} />,
    },
  };

  const style = colors[type];

  return (
    <Box sx={{ 
      p: 2,
      borderRadius: 1,
      bgcolor: style.bg,
      border: `1px solid ${style.border}`,
      display: 'flex',
      alignItems: 'flex-start',
      gap: 1.5,
    }}>
      <Box sx={{ 
        color: style.text,
        display: 'flex',
        alignItems: 'center',
        pt: 0.25,
      }}>
        {style.icon}
      </Box>
      <Box sx={{ flex: 1 }}>
        <Typography sx={{ color: 'white', mb: 0.5, fontSize: '0.9375rem' }}>
          {message}
        </Typography>
        <Typography sx={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.8125rem' }}>
          {timestamp}
        </Typography>
      </Box>
      <Tooltip title="View Details">
        <IconButton 
          size="small"
          sx={{ 
            color: style.text,
            '&:hover': {
              bgcolor: `${style.text}20`,
            }
          }}
        >
          <ArrowForwardIcon sx={{ fontSize: '1.25rem' }} />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

const SecuritySnapshot: React.FC = () => {
  // Mock data
  const alerts = [
    {
      type: 'warning' as const,
      message: 'Multiple failed login attempts detected from IP 192.168.1.105',
      timestamp: '15 minutes ago',
    },
    {
      type: 'info' as const,
      message: 'System backup completed successfully',
      timestamp: '1 hour ago',
    },
    {
      type: 'warning' as const,
      message: 'New user role elevation request requires review',
      timestamp: '2 hours ago',
    },
  ];

  return (
    <Box sx={{ mt: 4 }}>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h5" sx={{ color: 'white', mb: 1, fontWeight: 600 }}>
            Security & Alerts
          </Typography>
          <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            Recent security events and system alerts
          </Typography>
        </Box>

        <StyledButton
          buttonType="primary"
          onClick={() => window.location.href = '/admin/security-audit'}
          startIcon={<SecurityIcon />}
        >
          View Security Logs
        </StyledButton>
      </Box>

      <Paper sx={{ 
        p: 3,
        bgcolor: 'rgba(10, 25, 41, 0.7)',
        borderRadius: 2,
        border: '1px solid rgba(0, 163, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        transition: 'all 0.3s ease',
        '&:hover': {
          border: '1px solid rgba(0, 163, 255, 0.2)',
          boxShadow: '0 8px 32px rgba(0, 163, 255, 0.1)',
          transform: 'translateY(-2px)',
        }
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography sx={{ color: 'white', fontWeight: 500 }}>
              Active Alerts
            </Typography>
            <Chip 
              label={alerts.length}
              size="small"
              sx={{
                bgcolor: 'rgba(255, 152, 0, 0.1)',
                color: '#ff9800',
                border: '1px solid rgba(255, 152, 0, 0.2)',
                fontWeight: 500,
              }}
            />
          </Box>
        </Box>

        <Stack spacing={2}>
          {alerts.map((alert, index) => (
            <Alert key={index} {...alert} />
          ))}
        </Stack>
      </Paper>
    </Box>
  );
};

export default SecuritySnapshot;
