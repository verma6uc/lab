import React from 'react';
import { RouteObject } from 'react-router-dom';
import AdminLayout from '../components/Layout/AdminLayout';
import Dashboard from '../pages/admin/Dashboard';
import Users from '../pages/admin/Users';
import Companies from '../pages/admin/Companies';
import CompanyDetails from '../pages/admin/CompanyDetails';
import Settings from '../pages/admin/Settings';
import SecurityAudit from '../pages/admin/SecurityAudit';

const adminRoutes: RouteObject[] = [
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'users',
        element: <Users />,
      },
      {
        path: 'companies',
        element: <Companies />,
      },
      {
        path: 'companies/:id',
        element: <CompanyDetails />,
      },
      {
        path: 'settings',
        element: <Settings />,
      },
      {
        path: 'security-audit',
        element: <SecurityAudit />,
      },
    ],
  },
];

export default adminRoutes;
