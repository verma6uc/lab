import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  AppBar,
  Box,
  Button,
  Toolbar,
} from '@mui/material';
import { YUVI } from '../../assets/icons';

interface NavItem {
  label: string;
  path: string;
  icon?: React.ReactElement;
}

interface HeaderProps {
  navItems?: NavItem[];
}

const Header: React.FC<HeaderProps> = ({ navItems = [] }) => {
  const location = useLocation();

  return (
    <AppBar position="sticky" sx={{ bgcolor: 'rgba(10, 25, 41, 0.7)', backdropFilter: 'blur(20px)' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
            <YUVI style={{ height: '24px', marginRight: '24px' }} />
          </Link>
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 1 }}>
            {navItems.map((item) => (
              <Button
                key={item.path}
                component={Link}
                to={item.path}
                startIcon={item.icon}
                sx={{
                  color: location.pathname === item.path ? '#00A3FF' : 'rgba(255, 255, 255, 0.7)',
                  '&:hover': {
                    color: '#00A3FF',
                  },
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>
        </Box>
        <Button
          component={Link}
          to="/login"
          sx={{
            color: 'white',
            bgcolor: 'rgba(0, 163, 255, 0.1)',
            border: '1px solid rgba(0, 163, 255, 0.2)',
            '&:hover': {
              bgcolor: 'rgba(0, 163, 255, 0.2)',
              border: '1px solid rgba(0, 163, 255, 0.3)',
            },
          }}
        >
          Sign In
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
