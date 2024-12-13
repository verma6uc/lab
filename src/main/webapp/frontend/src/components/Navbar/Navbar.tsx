import React, { useState } from 'react';
import { 
  AppBar, 
  Box, 
  Container, 
  IconButton, 
  Stack, 
  Toolbar, 
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Collapse,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';

const NavLink = styled(Link)(({ theme }) => ({
  color: 'rgba(255, 255, 255, 0.7)',
  textDecoration: 'none',
  padding: '8px 16px',
  borderRadius: '8px',
  transition: 'all 0.2s ease-in-out',
  fontWeight: 500,
  '&:hover': {
    color: 'white',
    background: 'rgba(255, 255, 255, 0.1)',
  },
  '&.active': {
    color: 'white',
    background: 'rgba(255, 255, 255, 0.1)',
  },
}));

const BrandLink = styled(Link)({
  textDecoration: 'none',
  display: 'flex',
  alignItems: 'center',
  gap: '12px'
});

const MobileNavItem = styled(ListItem)(({ theme }) => ({
  padding: 0,
  marginBottom: '8px',
  '& .MuiListItemText-root': {
    margin: 0,
  },
  '& a': {
    color: 'rgba(255, 255, 255, 0.7)',
    textDecoration: 'none',
    padding: '12px 24px',
    display: 'block',
    width: '100%',
    borderRadius: '8px',
    transition: 'all 0.2s ease-in-out',
    '&:hover, &.active': {
      color: 'white',
      background: 'rgba(255, 255, 255, 0.1)',
    },
  },
}));

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/features', label: 'Features' },
  { path: '/solutions', label: 'Solutions' },
  { path: '/agents', label: 'Agents' },
  { path: '/personas', label: 'Personas' },
  { path: '/journey', label: 'Journey' },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const isActive = (path: string) => {
    return location.pathname === path ? 'active' : '';
  };

  const mobileMenu = (
    <Box
      onClick={handleDrawerToggle}
      sx={{
        width: 280,
        height: '100%',
        bgcolor: 'background.paper',
        p: 2,
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <BrandLink to="/">
          <Typography 
            sx={{ 
              fontSize: '1.5rem',
              fontWeight: 700, 
              color: '#00A3FF',
              lineHeight: 1.2
            }}
          >
            YuVi
          </Typography>
        </BrandLink>
        <IconButton onClick={handleDrawerToggle} sx={{ color: 'white' }}>
          <CloseIcon />
        </IconButton>
      </Box>
      <List>
        {navItems.map((item) => (
          <MobileNavItem key={item.path}>
            <Link to={item.path} className={isActive(item.path)}>
              <ListItemText 
                primary={item.label} 
                primaryTypographyProps={{
                  fontSize: '1rem',
                  fontWeight: 500
                }}
              />
            </Link>
          </MobileNavItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar 
        position="fixed" 
        sx={{ 
          background: 'rgba(10, 25, 41, 0.8)', 
          backdropFilter: 'blur(20px)',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)'
        }}
      >
        <Container maxWidth="xl">
          <Toolbar 
            disableGutters 
            sx={{ 
              justifyContent: 'space-between',
              minHeight: { xs: '64px', md: '80px' }
            }}
          >
            <BrandLink to="/">
              <Typography 
                sx={{ 
                  fontSize: { xs: '1.5rem', md: '1.75rem' }, 
                  fontWeight: 700, 
                  color: '#00A3FF',
                  lineHeight: 1.2
                }}
              >
                YuVi
              </Typography>
              <Typography 
                sx={{ 
                  fontSize: { xs: '0.7rem', md: '0.8rem' }, 
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontWeight: 500,
                  letterSpacing: '0.5px',
                  display: { xs: 'none', sm: 'block' }
                }}
              >
                Your Vision, Our Mission
              </Typography>
            </BrandLink>

            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <Stack direction="row" spacing={1}>
                {navItems.map((item) => (
                  <NavLink 
                    key={item.path}
                    to={item.path}
                    className={isActive(item.path)}
                  >
                    {item.label}
                  </NavLink>
                ))}
              </Stack>
            </Box>

            <IconButton
              onClick={handleDrawerToggle}
              sx={{
                display: { xs: 'block', md: 'none' },
                color: 'white',
              }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better mobile performance
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 280,
            bgcolor: 'background.paper',
          },
        }}
      >
        {mobileMenu}
      </Drawer>
    </>
  );
}

export default Navbar; 