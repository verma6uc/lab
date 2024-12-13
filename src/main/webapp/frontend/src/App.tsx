import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import AppTheme from './theme/AppTheme';
import LiveSessions from './pages/admin/LiveSessions';
import SecurityAudit from './pages/admin/SecurityAudit';

const App = () => {
  return (
    <AppTheme>
      <RouterProvider router={router} />
    </AppTheme>
  );
};

export default App;
