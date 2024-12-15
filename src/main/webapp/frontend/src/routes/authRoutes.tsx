import React from 'react';
import { RouteObject } from 'react-router-dom';
import Login from '../pages/Login';
import PublicLayout from '../components/Layout/PublicLayout';

const authRoutes: RouteObject[] = [
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      {
        path: 'login',
        element: <Login />,
      },
    ],
  },
];

export default authRoutes;
