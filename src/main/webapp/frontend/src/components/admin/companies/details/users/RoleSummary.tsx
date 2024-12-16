import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import {
  AdminPanelSettings as AdminIcon,
  Create as CreatorIcon,
  Person as UserIcon,
  Visibility as ViewerIcon,
  ManageAccounts as ManagerIcon,
} from '@mui/icons-material';
import { CompanyUser, UserRole } from '../../../../../types/user';

interface RoleSummaryProps {
  users: CompanyUser[];
}

const roleConfig = {
  [UserRole.ADMIN]: {
    icon: AdminIcon,
    color: '#FF4842',
    label: 'Admins',
  },
  [UserRole.CREATOR]: {
    icon: CreatorIcon,
    color: '#00A3FF',
    label: 'Creators',
  },
  [UserRole.MANAGER]: {
    icon: ManagerIcon,
    color: '#54D62C',
    label: 'Managers',
  },
  [UserRole.USER]: {
    icon: UserIcon,
    color: '#7635DC',
    label: 'Users',
  },
  [UserRole.VIEWER]: {
    icon: ViewerIcon,
    color: '#FFC107',
    label: 'Viewers',
  },
};

const RoleSummary: React.FC<RoleSummaryProps> = ({ users }) => {
  const roleCounts = users.reduce((acc, user) => {
    acc[user.role] = (acc[user.role] || 0) + 1;
    return acc;
  }, {} as Record<UserRole, number>);

  return (
    <Grid container spacing={2}>
      {Object.entries(roleConfig).map(([role, config]) => {
        const count = roleCounts[role as UserRole] || 0;
        const Icon = config.icon;

        return (
          <Grid item xs={6} sm={4} md={2.4} key={role}>
            <Box
              sx={{
                p: 2,
                borderRadius: 1,
                bgcolor: 'rgba(10, 25, 41, 0.7)',
                border: '1px solid',
                borderColor: 'rgba(255, 255, 255, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <Icon sx={{ color: config.color, fontSize: '2rem' }} />
              <Typography variant="h4" sx={{ color: config.color, fontWeight: 600 }}>
                {count}
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                {config.label}
              </Typography>
            </Box>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default RoleSummary;
