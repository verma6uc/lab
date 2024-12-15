import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Chip,
} from '@mui/material';
import PageContainer from '../../components/shared/PageContainer';
import StyledButton from '../../components/shared/StyledButton';

// Mock data
const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'ADMIN', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'USER', status: 'Active' },
  { id: 3, name: 'Bob Wilson', email: 'bob@example.com', role: 'CREATOR', status: 'Inactive' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'USER', status: 'Active' },
  { id: 5, name: 'Charlie Davis', email: 'charlie@example.com', role: 'CREATOR', status: 'Active' },
];

const Users: React.FC = () => {
  return (
    <PageContainer>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" sx={{ color: 'white', mb: 2, fontWeight: 600 }}>
            Users
          </Typography>
          <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            Manage system users and their roles
          </Typography>
        </Box>
        
        <StyledButton buttonType="primary">
          Add New User
        </StyledButton>
      </Box>

      <TableContainer 
        component={Paper} 
        sx={{ 
          bgcolor: 'rgba(10, 25, 41, 0.7)',
          borderRadius: 2,
          border: '1px solid rgba(0, 163, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          transition: 'all 0.3s ease',
          '&:hover': {
            border: '1px solid rgba(0, 163, 255, 0.2)',
            boxShadow: '0 8px 32px rgba(0, 163, 255, 0.1)',
          }
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: 'rgba(255, 255, 255, 0.7)', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>Name</TableCell>
              <TableCell sx={{ color: 'rgba(255, 255, 255, 0.7)', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>Email</TableCell>
              <TableCell sx={{ color: 'rgba(255, 255, 255, 0.7)', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>Role</TableCell>
              <TableCell sx={{ color: 'rgba(255, 255, 255, 0.7)', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>Status</TableCell>
              <TableCell sx={{ color: 'rgba(255, 255, 255, 0.7)', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell sx={{ color: 'white', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                  {user.name}
                </TableCell>
                <TableCell sx={{ color: 'white', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                  {user.email}
                </TableCell>
                <TableCell sx={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                  <Chip 
                    label={user.role}
                    sx={{
                      bgcolor: 'rgba(0, 163, 255, 0.1)',
                      color: '#00A3FF',
                      border: '1px solid rgba(0, 163, 255, 0.2)',
                    }}
                  />
                </TableCell>
                <TableCell sx={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                  <Chip 
                    label={user.status}
                    sx={{
                      bgcolor: user.status === 'Active' ? 'rgba(46, 204, 113, 0.1)' : 'rgba(255, 99, 71, 0.1)',
                      color: user.status === 'Active' ? '#2ecc71' : '#ff6347',
                      border: `1px solid ${user.status === 'Active' ? 'rgba(46, 204, 113, 0.2)' : 'rgba(255, 99, 71, 0.2)'}`,
                    }}
                  />
                </TableCell>
                <TableCell sx={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                  <StyledButton buttonType="primary" size="small">
                    Edit
                  </StyledButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </PageContainer>
  );
};

export default Users;
