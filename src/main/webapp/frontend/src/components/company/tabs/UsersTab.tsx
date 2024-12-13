import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
} from '@mui/material';
import { CompanyUser } from '../../../types/models';
import { Person as PersonIcon, Work as WorkIcon } from '@mui/icons-material';

interface UsersTabProps {
  users: CompanyUser[];
}

const UsersTab: React.FC<UsersTabProps> = ({ users }) => {
  if (!users.length) return <Typography>No users available</Typography>;

  return (
    <Grid container spacing={3}>
      {users.map((user) => (
        <Grid item xs={12} sm={6} key={user.id}>
          <Card sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
            <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
              {user.name.charAt(0)}
            </Avatar>
            <CardContent>
              <Typography variant="h6">{user.name}</Typography>
              <Typography color="textSecondary">{user.email}</Typography>
              <Box mt={2}>
                <Typography variant="body2">
                  <WorkIcon fontSize="small" sx={{ mr: 1 }} />
                  Role: {user.role}
                </Typography>
                <Typography variant="body2">
                  <PersonIcon fontSize="small" sx={{ mr: 1 }} />
                  Department: {user.department}
                </Typography>
                <Typography variant="body2">
                  Status: {user.status}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default UsersTab; 