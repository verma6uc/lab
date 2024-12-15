import React from 'react';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  Avatar,
  IconButton,
  Tooltip,
  Chip,
  Divider,
  Stack,
} from '@mui/material';
import {
  Person as PersonIcon,
  PersonAdd as PersonAddIcon,
  Edit as EditIcon,
  Block as BlockIcon,
  SupervisorAccount as AdminIcon,
  Build as CreatorIcon,
  Person as UserIcon,
} from '@mui/icons-material';
import StyledButton from '../../../shared/StyledButton';
import { CompanyUser, UserRole } from '../../../../types/user';

interface CompanyUsersProps {
  users: CompanyUser[];
  onAddUser: () => void;
  onEditUser: (id: number) => void;
  onToggleUserStatus: (id: number) => void;
}

const CompanyUsers: React.FC<CompanyUsersProps> = ({
  users,
  onAddUser,
  onEditUser,
  onToggleUserStatus,
}) => {
  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case 'ADMIN':
        return <AdminIcon sx={{ color: '#e74c3c' }} />;
      case 'CREATOR':
        return <CreatorIcon sx={{ color: '#3498db' }} />;
      default:
        return <UserIcon sx={{ color: '#2ecc71' }} />;
    }
  };

  const getRoleColor = (role: UserRole) => {
    switch (role) {
      case 'ADMIN':
        return '#e74c3c';
      case 'CREATOR':
        return '#3498db';
      default:
        return '#2ecc71';
    }
  };

  const roleCounts = users.reduce((acc, user) => {
    acc[user.role] = (acc[user.role] || 0) + 1;
    return acc;
  }, {} as Record<UserRole, number>);

  return (
    <Paper sx={{ 
      p: 3,
      bgcolor: 'rgba(10, 25, 41, 0.7)',
      borderRadius: 2,
      border: '1px solid rgba(0, 163, 255, 0.1)',
    }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <PersonIcon sx={{ color: '#00A3FF' }} />
          <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
            Users & Roles
          </Typography>
          <Box
            sx={{
              ml: 1,
              px: 1.5,
              py: 0.5,
              borderRadius: 1,
              bgcolor: 'rgba(0, 163, 255, 0.1)',
              border: '1px solid rgba(0, 163, 255, 0.2)',
            }}
          >
            <Typography sx={{ color: '#00A3FF', fontSize: '0.875rem' }}>
              {users.length}
            </Typography>
          </Box>
        </Box>
        <StyledButton
          buttonType="primary"
          startIcon={<PersonAddIcon />}
          onClick={onAddUser}
        >
          Add User
        </StyledButton>
      </Box>

      {/* Role Summary */}
      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
        {Object.entries(roleCounts).map(([role, count]) => (
          <Box
            key={role}
            sx={{
              px: 2,
              py: 1,
              borderRadius: 1,
              bgcolor: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {getRoleIcon(role as UserRole)}
              <Typography sx={{ color: 'white', fontSize: '0.875rem' }}>
                {role}
              </Typography>
            </Box>
            <Typography sx={{ color: getRoleColor(role as UserRole), fontSize: '1.25rem', fontWeight: 600, mt: 0.5 }}>
              {count}
            </Typography>
          </Box>
        ))}
      </Stack>

      {users.length === 0 ? (
        <Box sx={{ 
          textAlign: 'center',
          py: 4,
          color: 'rgba(255, 255, 255, 0.5)',
        }}>
          <Typography variant="body1" sx={{ mb: 1 }}>
            No users added yet
          </Typography>
          <Typography variant="body2">
            Click the button above to add your first user
          </Typography>
        </Box>
      ) : (
        <List sx={{ mx: -3 }}>
          {users.map((user, index) => (
            <React.Fragment key={user.id}>
              <ListItem sx={{ px: 3 }}>
                <ListItemIcon>
                  <Avatar 
                    src={user.avatar_url}
                    sx={{ 
                      bgcolor: 'rgba(0, 163, 255, 0.1)',
                      border: '1px solid rgba(0, 163, 255, 0.2)',
                    }}
                  >
                    {user.name[0].toUpperCase()}
                  </Avatar>
                </ListItemIcon>
                <Box sx={{ flex: 1, ml: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography sx={{ color: 'white', fontWeight: 500 }}>
                      {user.name}
                    </Typography>
                    <Chip 
                      label={user.role}
                      size="small"
                      icon={getRoleIcon(user.role)}
                      sx={{
                        bgcolor: `${getRoleColor(user.role)}20`,
                        color: getRoleColor(user.role),
                        border: `1px solid ${getRoleColor(user.role)}40`,
                        '& .MuiChip-icon': {
                          color: 'inherit',
                        },
                      }}
                    />
                    <Chip 
                      label={user.status}
                      size="small"
                      sx={{
                        bgcolor: user.status === 'active' ? 'rgba(46, 204, 113, 0.1)' : 'rgba(255, 99, 71, 0.1)',
                        color: user.status === 'active' ? '#2ecc71' : '#ff6347',
                        border: `1px solid ${user.status === 'active' ? 'rgba(46, 204, 113, 0.2)' : 'rgba(255, 99, 71, 0.2)'}`,
                      }}
                    />
                  </Box>
                  <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.875rem' }}>
                    {user.email}
                  </Typography>
                  {user.last_active && (
                    <Typography sx={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.75rem', mt: 0.5 }}>
                      Last active: {new Date(user.last_active).toLocaleDateString()}
                    </Typography>
                  )}
                </Box>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Tooltip title="Edit User">
                    <IconButton 
                      onClick={() => onEditUser(user.id)}
                      sx={{ color: '#00A3FF' }}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={user.status === 'active' ? 'Deactivate User' : 'Activate User'}>
                    <IconButton 
                      onClick={() => onToggleUserStatus(user.id)}
                      sx={{ 
                        color: user.status === 'active' ? '#ff9800' : '#2ecc71',
                      }}
                    >
                      <BlockIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </ListItem>
              {index < users.length - 1 && (
                <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />
              )}
            </React.Fragment>
          ))}
        </List>
      )}
    </Paper>
  );
};

export default CompanyUsers;
