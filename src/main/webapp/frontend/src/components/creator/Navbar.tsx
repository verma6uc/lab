import React from 'react';
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Avatar,
  Badge,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  Settings as SettingsIcon,
  ExitToApp as LogoutIcon,
} from '@mui/icons-material';
import { useNavigate, Link } from 'react-router-dom';
import { keyframes } from '@mui/system';

const glow = keyframes`
  0% {
    text-shadow: 0 0 20px rgba(0, 163, 255, 0.3);
  }
  50% {
    text-shadow: 0 0 30px rgba(0, 163, 255, 0.5);
  }
  100% {
    text-shadow: 0 0 20px rgba(0, 163, 255, 0.3);
  }
`;

const CreatorNavbar = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationClick = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setNotificationAnchorEl(null);
  };

  const handleSettings = () => {
    handleClose();
    navigate('/creator/settings');
  };

  const handleLogout = () => {
    handleClose();
    // Add logout logic here
    navigate('/auth/login');
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: 'rgba(10, 25, 41, 0.7)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(0, 163, 255, 0.1)',
        height: '64px', // Set back to 64px
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', minHeight: '64px' }}>
        {/* Logo */}
        <Box
          component={Link}
          to="/creator"
          sx={{
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
            color: '#00A3FF',
            '&:hover': {
              opacity: 0.8,
            },
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              fontSize: '1.25rem',
              animation: `${glow} 3s infinite ease-in-out`,
              textShadow: '0 0 20px rgba(0, 163, 255, 0.3)',
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: '-4px',
                left: '0',
                width: '100%',
                height: '2px',
                background: 'linear-gradient(90deg, rgba(0, 163, 255, 0) 0%, rgba(0, 163, 255, 0.5) 50%, rgba(0, 163, 255, 0) 100%)',
              },
            }}
          >
            Creator Labs
          </Typography>
        </Box>

        {/* Right side icons */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {/* Notifications */}
          <Tooltip title="Notifications">
            <IconButton
              size="small"
              onClick={handleNotificationClick}
              sx={{ 
                mr: 2,
                color: 'rgba(255, 255, 255, 0.7)',
                '&:hover': {
                  backgroundColor: 'rgba(0, 163, 255, 0.1)',
                  color: '#00A3FF',
                }
              }}
            >
              <Badge 
                badgeContent={3} 
                sx={{
                  '& .MuiBadge-badge': {
                    backgroundColor: '#00A3FF',
                    color: '#fff',
                  }
                }}
              >
                <NotificationsIcon sx={{ fontSize: '1.25rem' }} />
              </Badge>
            </IconButton>
          </Tooltip>

          {/* Profile */}
          <Tooltip title="Account settings">
            <IconButton
              onClick={handleProfileClick}
              sx={{
                p: 0.5,
                border: '2px solid rgba(0, 163, 255, 0.3)',
                '&:hover': {
                  border: '2px solid rgba(0, 163, 255, 0.5)',
                  backgroundColor: 'rgba(0, 163, 255, 0.1)',
                }
              }}
            >
              <Avatar
                alt="John Smith"
                src="/avatar.jpg"
                sx={{ width: 28, height: 28 }}
              />
            </IconButton>
          </Tooltip>
        </Box>

        {/* Profile Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            sx: {
              backgroundColor: 'rgba(10, 25, 41, 0.95)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(0, 163, 255, 0.1)',
              color: 'white',
              mt: 1.5,
              '& .MuiMenuItem-root': {
                fontSize: '0.875rem',
                '&:hover': {
                  backgroundColor: 'rgba(0, 163, 255, 0.1)',
                },
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem onClick={handleSettings}>
            <SettingsIcon sx={{ mr: 1.5, fontSize: '1.25rem' }} />
            Settings
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <LogoutIcon sx={{ mr: 1.5, fontSize: '1.25rem' }} />
            Logout
          </MenuItem>
        </Menu>

        {/* Notifications Menu */}
        <Menu
          anchorEl={notificationAnchorEl}
          open={Boolean(notificationAnchorEl)}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            sx: {
              backgroundColor: 'rgba(10, 25, 41, 0.95)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(0, 163, 255, 0.1)',
              color: 'white',
              mt: 1.5,
              minWidth: 320,
              '& .MuiMenuItem-root': {
                fontSize: '0.875rem',
                whiteSpace: 'normal',
                padding: '12px 16px',
                borderBottom: '1px solid rgba(0, 163, 255, 0.1)',
                '&:last-child': {
                  borderBottom: 'none',
                },
                '&:hover': {
                  backgroundColor: 'rgba(0, 163, 255, 0.1)',
                },
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant="subtitle2" sx={{ color: '#00A3FF', mb: 0.5 }}>
                New Update Available
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                A new version of the application is available
              </Typography>
            </Box>
          </MenuItem>
          <MenuItem>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant="subtitle2" sx={{ color: '#00A3FF', mb: 0.5 }}>
                Team Activity
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                Your team added a new project
              </Typography>
            </Box>
          </MenuItem>
          <MenuItem>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant="subtitle2" sx={{ color: '#00A3FF', mb: 0.5 }}>
                Security Alert
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                New login detected from a different location
              </Typography>
            </Box>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default CreatorNavbar;
