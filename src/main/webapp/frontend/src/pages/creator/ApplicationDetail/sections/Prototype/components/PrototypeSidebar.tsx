import React from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Divider,
  Typography,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  ShoppingCart as ProductsIcon,
  Settings as SettingsIcon,
  Description as DocumentsIcon,
  Assessment as ReportsIcon,
} from '@mui/icons-material';

interface PrototypeSidebarProps {
  selectedItem: string;
  onItemSelect: (item: string) => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
  { id: 'users', label: 'User Management', icon: <PeopleIcon /> },
  { id: 'products', label: 'Products', icon: <ProductsIcon /> },
  { id: 'documents', label: 'Documents', icon: <DocumentsIcon /> },
  { id: 'reports', label: 'Reports', icon: <ReportsIcon /> },
  { id: 'settings', label: 'Settings', icon: <SettingsIcon /> },
];

const PrototypeSidebar: React.FC<PrototypeSidebarProps> = ({
  selectedItem,
  onItemSelect,
}) => {
  return (
    <Box
      sx={{
        width: 240,
        flexShrink: 0,
        bgcolor: 'background.paper',
        borderRight: 1,
        borderColor: 'divider',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* App Logo */}
      <Box 
        sx={{ 
          p: 2, 
          borderBottom: 1, 
          borderColor: 'divider',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: 64,
        }}
      >
        <Box
          component="img"
          src="https://demo-app-builder.leucine.ai/assets/img/logos/yuvi-logo-dark.svg"
          alt="Yuvi Logo"
          sx={{
            height: 32,
            width: 'auto',
          }}
        />
      </Box>

      {/* Navigation Menu */}
      <List sx={{ flexGrow: 1, pt: 0 }}>
        {menuItems.map((item) => (
          <ListItem key={item.id} disablePadding>
            <ListItemButton
              selected={selectedItem === item.id}
              onClick={() => onItemSelect(item.id)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {/* User Info */}
      <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
        <Typography variant="body2" color="text.secondary">
          Logged in as
        </Typography>
        <Typography variant="subtitle2">John Doe</Typography>
      </Box>
    </Box>
  );
};

export default PrototypeSidebar; 