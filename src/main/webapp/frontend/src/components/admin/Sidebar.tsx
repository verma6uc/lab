import React from 'react';
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  Typography,
  Divider,
} from '@mui/material';
import {
  Business,
  Security,
  Settings,
  Visibility,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const drawerWidth = 240;

const menuItems = [
  { text: 'Companies', icon: <Business />, path: '/admin/companies' },
  { text: 'Security Audit', icon: <Security />, path: '/admin/security-audit' },
  { text: 'Live Sessions', icon: <Visibility />, path: '/admin/live-sessions' },
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
          bgcolor: 'rgba(17, 25, 40, 0.6)',
          backdropFilter: 'blur(16px)',
          borderRight: '1px solid rgba(255, 255, 255, 0.05)',
        },
      }}
    >
      <Box component="div" sx={{ p: 2.5 }}>
        <Typography 
          component="div"
          variant="h6" 
          onClick={() => navigate('/admin/companies')}
          sx={{ 
            fontSize: '1.125rem',
            fontWeight: 600,
            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
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
      
      <List sx={{ px: 1.5 }}>
        {menuItems.map((item) => {
          const isSelected = location.pathname.startsWith(item.path);

          return (
            <ListItemButton
              key={item.text}
              onClick={() => navigate(item.path)}
              selected={isSelected}
              sx={{
                borderRadius: 1.5,
                mb: 0.5,
                py: 1,
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
                color: isSelected ? 'primary.main' : 'rgba(255, 255, 255, 0.7)',
                minWidth: 36,
                '& .MuiSvgIcon-root': {
                  fontSize: '1.25rem',
                  strokeWidth: 1,
                  stroke: 'currentColor'
                }
              }}>
                {item.icon}
              </ListItemIcon>
              <Typography
                component="div"
                sx={{
                  color: isSelected ? 'white' : 'rgba(255, 255, 255, 0.7)',
                  fontWeight: isSelected ? 500 : 400,
                  fontSize: '0.875rem',
                  letterSpacing: '0.15px',
                  flexGrow: 1,
                }}
              >
                {item.text}
              </Typography>
            </ListItemButton>
          );
        })}
      </List>
    </Drawer>
  );
};

export default Sidebar;
