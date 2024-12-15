import React from 'react';
import { RouteObject } from 'react-router-dom';
import AdminLayout from '../components/Layout/AdminLayout';
import Companies from '../pages/admin/Companies';
import SecurityAudit from '../pages/admin/SecurityAudit';

export const adminRoutes: RouteObject = {
  path: 'admin',
  element: <AdminLayout />,
  children: [
    {
      path: '',
      element: <Companies />,
    },
    {
      path: 'companies',
      element: <Companies />,
    },
    {
      path: 'security-audit',
      element: <SecurityAudit />,
    },
    // Add other admin routes here
  ],
};
