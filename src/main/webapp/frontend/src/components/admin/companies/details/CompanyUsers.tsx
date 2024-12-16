import React from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
} from '@mui/material';
import {
  Add as AddIcon,
} from '@mui/icons-material';
import UserCard from './users/UserCard';
import RoleSummary from './users/RoleSummary';
import { CompanyUsersProps } from '../../../../types/company';
import { CompanyUser } from '../../../../types/user';

const CompanyUsers: React.FC<CompanyUsersProps> = ({
  users,
  onAddUser,
  onEditUser,
  onDeleteUser,
}) => {
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" sx={{ color: 'white' }}>
          Users
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={onAddUser}
          sx={{
            bgcolor: '#00A3FF',
            '&:hover': {
              bgcolor: 'rgba(0, 163, 255, 0.8)',
            },
          }}
        >
          Add User
        </Button>
      </Box>

      <Box sx={{ mb: 4 }}>
        <RoleSummary users={users} />
      </Box>

      <Grid container spacing={3}>
        {users.map((user: CompanyUser) => (
          <Grid item xs={12} sm={6} md={4} key={user.id}>
            <UserCard
              user={user}
              onEdit={onEditUser}
              onDelete={onDeleteUser}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CompanyUsers;
