import React from 'react';
import { Box, List, ListItem, ListItemIcon, ListItemText, ListItemButton } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Dashboard as DashboardIcon,
  Apps as AppsIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';

const menuItems = [
  {
    text: 'Dashboard',
    icon: <DashboardIcon />,
    path: '/creator/dashboard',
  },
  {
    text: 'Applications',
    icon: <AppsIcon />,
    path: '/creator/applications',
  },
  {
    text: 'Settings',
    icon: <SettingsIcon />,
    path: '/creator/settings',
  },
];

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Box
      component="nav"
      sx={{
        width: 220,
        flexShrink: 0,
        borderRight: '1px solid rgba(0, 163, 255, 0.1)',
        background: 'rgba(10, 25, 41, 0.95)',
        backdropFilter: 'blur(10px)',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        pt: '64px', // Match navbar height
      }}
    >
      <List sx={{ pt: 1 }}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path || 
                         (item.path === '/creator/dashboard' && location.pathname === '/creator');
          
          return (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                onClick={() => navigate(item.path)}
                sx={{
                  py: 1.25,
                  px: 2,
                  color: isActive ? '#00A3FF' : 'rgba(255, 255, 255, 0.7)',
                  '&:hover': {
                    bgcolor: 'rgba(0, 163, 255, 0.1)',
                  },
                  ...(isActive && {
                    bgcolor: 'rgba(0, 163, 255, 0.1)',
                    borderRight: '2px solid #00A3FF',
                  }),
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 36,
                    color: isActive ? '#00A3FF' : 'rgba(255, 255, 255, 0.7)',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text}
                  primaryTypographyProps={{
                    fontSize: '0.9375rem',
                    fontWeight: isActive ? 600 : 500,
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};

export default Sidebar;
