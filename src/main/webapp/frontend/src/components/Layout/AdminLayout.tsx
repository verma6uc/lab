import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People as UsersIcon,
  Business as CompaniesIcon,
  Settings as SettingsIcon,
  Security as SecurityIcon,
} from '@mui/icons-material';
import Header from '../shared/Header';

const navItems = [
  {
    label: 'Dashboard',
    icon: <DashboardIcon />,
    path: '/admin/dashboard',
  },
  {
    label: 'Users',
    icon: <UsersIcon />,
    path: '/admin/users',
  },
  {
    label: 'Companies',
    icon: <CompaniesIcon />,
    path: '/admin/companies',
  },
  {
    label: 'Settings',
    icon: <SettingsIcon />,
    path: '/admin/settings',
  },
  {
    label: 'Security Audit',
    icon: <SecurityIcon />,
    path: '/admin/security-audit',
  },
];

const AdminLayout: React.FC = () => {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#0A1929' }}>
      <Header navItems={navItems} />
      <Box component="main" sx={{ p: 3 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminLayout;
