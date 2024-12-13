import React from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Typography,
  IconButton,
  Chip,
} from '@mui/material';
import {
  Edit as EditIcon,
  Block as BlockIcon,
  Mail as MailIcon,
  Work as WorkIcon,
} from '@mui/icons-material';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  status: 'active' | 'inactive';
  avatar?: string;
}

const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@techcorp.com',
    role: 'Software Engineer',
    department: 'Engineering',
    status: 'active',
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.j@techcorp.com',
    role: 'Product Manager',
    department: 'Product',
    status: 'active',
  },
  {
    id: '3',
    name: 'Michael Chen',
    email: 'm.chen@techcorp.com',
    role: 'UX Designer',
    department: 'Design',
    status: 'inactive',
  },
];

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active':
      return { bg: 'rgba(76, 175, 80, 0.1)', text: '#4caf50', border: '#4caf50' };
    case 'inactive':
      return { bg: 'rgba(244, 67, 54, 0.1)', text: '#f44336', border: '#f44336' };
    default:
      return { bg: 'rgba(158, 158, 158, 0.1)', text: '#9e9e9e', border: '#9e9e9e' };
  }
};

const UsersTab = () => {
  return (
    <TableContainer 
      component={Paper}
      elevation={0}
      sx={{ 
        backgroundColor: 'rgba(255, 255, 255, 0.02)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        borderRadius: 1,
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>User</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Department</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {mockUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar
                    src={user.avatar}
                    sx={{
                      width: 40,
                      height: 40,
                      bgcolor: 'primary.main',
                      fontSize: '1rem',
                    }}
                  >
                    {getInitials(user.name)}
                  </Avatar>
                  <Box>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {user.name}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <MailIcon sx={{ fontSize: '0.9rem', color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary">
                        {user.email}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </TableCell>
              <TableCell>
                <Typography variant="body2">{user.role}</Typography>
              </TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <WorkIcon sx={{ fontSize: '0.9rem', color: 'text.secondary' }} />
                  <Typography variant="body2">{user.department}</Typography>
                </Box>
              </TableCell>
              <TableCell>
                <Box
                  sx={{
                    display: 'inline-flex',
                    px: 1.5,
                    py: 0.5,
                    borderRadius: 1,
                    backgroundColor: getStatusColor(user.status).bg,
                    color: getStatusColor(user.status).text,
                    border: `1px solid ${getStatusColor(user.status).border}`,
                    textTransform: 'capitalize',
                    fontSize: '0.75rem',
                    fontWeight: 500,
                  }}
                >
                  {user.status}
                </Box>
              </TableCell>
              <TableCell align="right">
                <IconButton 
                  size="small"
                  sx={{ 
                    color: 'primary.main',
                    '&:hover': { backgroundColor: 'rgba(0, 163, 255, 0.1)' },
                  }}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton 
                  size="small"
                  sx={{ 
                    color: user.status === 'active' ? 'error.main' : 'text.disabled',
                    '&:hover': { backgroundColor: 'rgba(244, 67, 54, 0.1)' },
                  }}
                  disabled={user.status !== 'active'}
                >
                  <BlockIcon fontSize="small" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UsersTab; 