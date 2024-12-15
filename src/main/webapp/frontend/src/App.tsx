import React from 'react';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { theme } from './theme';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ 
        minHeight: '100vh',
        bgcolor: '#020914', // Dark background color
        color: 'white',
        position: 'relative',
        '& canvas': {
          mixBlendMode: 'screen', // This will make particles blend better with the dark background
        }
      }}>
        <RouterProvider router={router} />
      </Box>
    </ThemeProvider>
  );
};

export default App;
