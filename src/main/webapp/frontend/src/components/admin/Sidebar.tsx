import React from 'react';
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
} from '@mui/material';
import {
  Dashboard,
  Business,
  Group,
  Settings,
  Visibility,
  Security,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const drawerWidth = 280;

const menuItems = [
  { text: 'Dashboard', icon: <Dashboard />, path: '/admin' },
  { text: 'Companies', icon: <Business />, path: '/admin/companies' },
  { text: 'Live Sessions', icon: <Visibility />, path: '/admin/live-sessions' },
  { text: 'Security Audit', icon: <Security />, path: '/admin/security-audit' },
  { text: 'Settings', icon: <Settings />, path: '/admin/settings' },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          bgcolor: 'rgba(255, 255, 255, 0.03)',
          backdropFilter: 'blur(20px)',
          borderRight: '1px solid rgba(255, 255, 255, 0.05)',
        },
      }}
    >
      <Box sx={{ p: 3 }}>
        <Typography 
          variant="h5" 
          onClick={() => navigate('/admin')}
          sx={{ 
            fontWeight: 'bold',
            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
            backgroundClip: 'text',
            textFillColor: 'transparent',
            cursor: 'pointer',
            '&:hover': {
              opacity: 0.8,
            },
          }}
        >
          YuVi Admin
        </Typography>
      </Box>
      
      <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.05)' }} />
      
      <List sx={{ px: 2 }}>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.text}
            onClick={() => navigate(item.path)}
            selected={
              item.path === '/admin' 
                ? location.pathname === '/admin'
                : location.pathname.startsWith(item.path)
            }
            sx={{
              borderRadius: 2,
              mb: 1,
              '&.Mui-selected': {
                bgcolor: 'rgba(255, 255, 255, 0.08)',
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.12)',
                },
              },
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.05)',
              },
            }}
          >
            <ListItemIcon sx={{ 
              color: location.pathname === item.path ? 'primary.main' : 'rgba(255, 255, 255, 0.7)',
              minWidth: 40,
            }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText 
              primary={item.text} 
              sx={{ 
                '& .MuiListItemText-primary': {
                  color: location.pathname === item.path ? 'white' : 'rgba(255, 255, 255, 0.7)',
                  fontWeight: location.pathname === item.path ? 600 : 400,
                },
              }}
            />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar; 