import React from 'react';
import {
  Box,
  Typography,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Chip,
  IconButton,
} from '@mui/material';
import { Edit, Delete, Group } from '@mui/icons-material';
import PageContainer from '../../components/admin/PageContainer';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  lastLogin: string;
}

const users: User[] = [
  {
    id: 1,
    name: 'John Admin',
    email: 'john@example.com',
    role: 'Admin',
    status: 'active',
    lastLogin: '2024-03-14 15:30:00',
  },
  {
    id: 2,
    name: 'Sarah Manager',
    email: 'sarah@example.com',
    role: 'Manager',
    status: 'active',
    lastLogin: '2024-03-14 14:45:00',
  },
  // Add more users as needed
];

const Users: React.FC = () => {
  return (
    <PageContainer
      icon={<Group />}
      title="Users"
      onSearch={(value) => console.log('Search:', value)}
      onFilter={() => console.log('Filter clicked')}
      onAdd={() => console.log('Add clicked')}
      addButtonLabel="Add User"
      filterOptions={[
        'All Roles',
        'Administrators',
        'Managers',
        'Users',
      ]}
      searchPlaceholder="Search users..."
    >
      {/* Your users content */}
    </PageContainer>
  );
};

export default Users; 