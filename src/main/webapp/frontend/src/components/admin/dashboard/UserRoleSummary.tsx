import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Stack,
  LinearProgress,
  Chip,
} from '@mui/material';
import {
  SupervisorAccount as AdminIcon,
  Create as CreatorIcon,
  Person as UserIcon,
  NotificationsActive as PendingIcon,
} from '@mui/icons-material';
import StyledButton from '../../shared/StyledButton';

interface RoleMetricProps {
  role: string;
  count: number;
  total: number;
  icon: React.ReactNode;
  color: string;
}

const RoleMetric: React.FC<RoleMetricProps> = ({ role, count, total, icon, color }) => (
  <Box sx={{ mb: 3 }}>
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Box sx={{ 
          p: 0.5, 
          borderRadius: 1, 
          bgcolor: `${color}20`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {React.cloneElement(icon as React.ReactElement, { sx: { color } })}
        </Box>
        <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
          {role}
        </Typography>
      </Box>
      <Typography sx={{ color: 'white', fontWeight: 500 }}>
        {count}
      </Typography>
    </Box>
    <LinearProgress
      variant="determinate"
      value={(count / total) * 100}
      sx={{
        bgcolor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 1,
        height: 6,
        '& .MuiLinearProgress-bar': {
          bgcolor: color,
          borderRadius: 1,
        }
      }}
    />
  </Box>
);

const UserRoleSummary: React.FC = () => {
  // Mock data
  const userData = {
    superadmin: 3,
    creator: 25,
    user: 100,
    pendingRequests: [
      { id: 1, user: 'john.doe@example.com', from: 'USER', to: 'CREATOR' },
      { id: 2, user: 'jane.smith@example.com', from: 'CREATOR', to: 'USER' },
    ]
  };

  const totalUsers = userData.superadmin + userData.creator + userData.user;

  return (
    <Box sx={{ mt: 4 }}>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h5" sx={{ color: 'white', mb: 1, fontWeight: 600 }}>
            User & Role Summary
          </Typography>
          <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            Distribution of users across different roles
          </Typography>
        </Box>

        <StyledButton
          buttonType="primary"
          onClick={() => window.location.href = '/admin/users'}
        >
          Manage Users & Roles
        </StyledButton>
      </Box>

      <Box sx={{ display: 'flex', gap: 3 }}>
        {/* Role Distribution */}
        <Paper sx={{ 
          p: 3,
          bgcolor: 'rgba(10, 25, 41, 0.7)',
          borderRadius: 2,
          border: '1px solid rgba(0, 163, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          transition: 'all 0.3s ease',
          flexGrow: 1,
          '&:hover': {
            border: '1px solid rgba(0, 163, 255, 0.2)',
            boxShadow: '0 8px 32px rgba(0, 163, 255, 0.1)',
            transform: 'translateY(-2px)',
          }
        }}>
          <Typography variant="h6" sx={{ color: 'white', mb: 3, fontWeight: 500 }}>
            Role Distribution
          </Typography>

          <RoleMetric
            role="Super Admin"
            count={userData.superadmin}
            total={totalUsers}
            icon={<AdminIcon />}
            color="#00A3FF"
          />
          <RoleMetric
            role="Creator"
            count={userData.creator}
            total={totalUsers}
            icon={<CreatorIcon />}
            color="#2ecc71"
          />
          <RoleMetric
            role="User"
            count={userData.user}
            total={totalUsers}
            icon={<UserIcon />}
            color="#9b59b6"
          />
        </Paper>

        {/* Pending Requests */}
        <Paper sx={{ 
          p: 3,
          bgcolor: 'rgba(10, 25, 41, 0.7)',
          borderRadius: 2,
          border: '1px solid rgba(0, 163, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          transition: 'all 0.3s ease',
          width: '350px',
          '&:hover': {
            border: '1px solid rgba(0, 163, 255, 0.2)',
            boxShadow: '0 8px 32px rgba(0, 163, 255, 0.1)',
            transform: 'translateY(-2px)',
          }
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
            <Typography variant="h6" sx={{ color: 'white', fontWeight: 500 }}>
              Pending Requests
            </Typography>
            <Chip 
              label={userData.pendingRequests.length}
              size="small"
              sx={{
                bgcolor: 'rgba(255, 152, 0, 0.1)',
                color: '#ff9800',
                border: '1px solid rgba(255, 152, 0, 0.2)',
              }}
            />
          </Box>

          <Stack spacing={2}>
            {userData.pendingRequests.map(request => (
              <Box 
                key={request.id}
                sx={{ 
                  p: 2,
                  borderRadius: 1,
                  bgcolor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <Typography sx={{ color: 'white', mb: 1, fontSize: '0.875rem' }}>
                  {request.user}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Chip 
                    label={request.from}
                    size="small"
                    sx={{
                      bgcolor: 'rgba(255, 255, 255, 0.1)',
                      color: 'rgba(255, 255, 255, 0.7)',
                    }}
                  />
                  <Box sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>→</Box>
                  <Chip 
                    label={request.to}
                    size="small"
                    sx={{
                      bgcolor: 'rgba(0, 163, 255, 0.1)',
                      color: '#00A3FF',
                    }}
                  />
                </Box>
              </Box>
            ))}
          </Stack>
        </Paper>
      </Box>
    </Box>
  );
};

export default UserRoleSummary;
