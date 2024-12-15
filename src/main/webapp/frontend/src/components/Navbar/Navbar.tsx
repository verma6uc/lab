import React from 'react';
import { AppBar, Toolbar, Button, Stack } from '@mui/material';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import Logo from '../shared/Logo';

const navItems = [
  { text: 'Home', path: '/' },
  { text: 'Features', path: '/features' },
  { text: 'Solutions', path: '/solutions' },
  { text: 'Agents', path: '/agents' },
  { text: 'Personas', path: '/personas' },
  { text: 'Journey', path: '/journey' },
];

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <AppBar
      position="sticky"
      sx={{
        bgcolor: 'rgba(10, 25, 41, 0.85)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(0, 163, 255, 0.1)',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', minHeight: '64px', px: { xs: 2, sm: 4, md: 6 } }}>
        <Stack direction="row" spacing={5} alignItems="center">
          <Link
            to="/"
            style={{
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              marginRight: '12px',
            }}
          >
            <Logo size={80} />
          </Link>

          <Stack direction="row" spacing={2} alignItems="center">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Button
                  key={item.text}
                  component={Link}
                  to={item.path}
                  color="inherit"
                  sx={{
                    textTransform: 'none',
                    fontSize: '0.9375rem',
                    fontWeight: 500,
                    color: isActive ? '#00A3FF' : 'rgba(255, 255, 255, 0.85)',
                    position: 'relative',
                    minWidth: 'auto',
                    padding: '6px 8px',
                    '&:hover': {
                      color: '#00A3FF',
                      backgroundColor: 'transparent',
                    },
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: '-1px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: isActive ? '100%' : '0%',
                      height: '2px',
                      background: '#00A3FF',
                      transition: 'all 0.2s ease',
                      opacity: isActive ? 1 : 0,
                    },
                    '&:hover::after': {
                      width: '100%',
                      opacity: 0.7,
                    }
                  }}
                >
                  {item.text}
                </Button>
              );
            })}
          </Stack>
        </Stack>

        <Button
          variant="contained"
          onClick={() => navigate('/auth/login')}
          sx={{
            bgcolor: 'rgba(0, 163, 255, 0.1)',
            color: '#00A3FF',
            border: '1px solid rgba(0, 163, 255, 0.2)',
            textTransform: 'none',
            fontSize: '0.9375rem',
            fontWeight: 500,
            px: 4,
            py: 1,
            borderRadius: '8px',
            '&:hover': {
              bgcolor: 'rgba(0, 163, 255, 0.2)',
              transform: 'translateY(-1px)',
              boxShadow: '0 4px 20px rgba(0, 163, 255, 0.2)',
            },
            boxShadow: 'none',
            transition: 'all 0.3s ease',
          }}
        >
          Sign In
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
