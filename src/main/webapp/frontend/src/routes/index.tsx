import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { adminRoutes } from './adminRoutes';
import { authRoutes } from './authRoutes';
import { creatorRoutes } from './creatorRoutes';
import PublicLayout from '../components/Layout/PublicLayout';
import Home from '../pages/Home';
import Features from '../pages/Features';
import Solutions from '../pages/Solutions';
import Agents from '../pages/Agents';
import Personas from '../pages/Personas';
import Journey from '../pages/Journey';
import NotFound from '../pages/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'features',
        element: <Features />,
      },
      {
        path: 'solutions',
        element: <Solutions />,
      },
      {
        path: 'agents',
        element: <Agents />,
      },
      {
        path: 'personas',
        element: <Personas />,
      },
      {
        path: 'journey',
        element: <Journey />,
      },
    ],
  },
  // Auth routes
  authRoutes,
  // Admin routes with auth check
  {
    path: adminRoutes.path,
    element: (
      // TODO: Add auth check wrapper
      adminRoutes.element
    ),
    children: adminRoutes.children,
  },
  // Creator routes with auth check
  {
    path: creatorRoutes.path,
    element: (
      // TODO: Add auth check wrapper
      creatorRoutes.element
    ),
    children: creatorRoutes.children,
  },
  // Catch-all route
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;
