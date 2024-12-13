import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import PublicLayout from '../components/Layout/PublicLayout';
import MainLayout from '../components/Layout/MainLayout';
import AdminLayout from '../components/Layout/AdminLayout';
import Home from '../pages/Home';
import Features from '../pages/Features';
import Solutions from '../pages/Solutions';
import Agents from '../pages/Agents';
import Personas from '../pages/Personas';
import Journey from '../pages/Journey';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import Dashboard from '../pages/Dashboard';
import AdminDashboard from '../pages/admin/Dashboard';
import Companies from '../pages/admin/Companies';
import Users from '../pages/admin/Users';
import LiveSessions from '../pages/admin/LiveSessions';
import SecurityAudit from '../pages/admin/SecurityAudit';
import Settings from '../pages/admin/Settings';

// Auth guard component
const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  // TODO: Implement proper auth check
  const isAuthenticated = localStorage.getItem('token') !== null;
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  // Redirect authenticated users away from public routes
  const isAuthenticated = localStorage.getItem('token') !== null;
  
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <>{children}</>;
};

export const router = createBrowserRouter([
  // Public routes
  {
    element: <PublicLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/features',
        element: <Features />,
      },
      {
        path: '/solutions',
        element: <Solutions />,
      },
      {
        path: '/agents',
        element: <Agents />,
      },
      {
        path: '/personas',
        element: <Personas />,
      },
      {
        path: '/journey',
        element: <Journey />,
      },
    ],
  },
  // Auth routes
  {
    path: '/login',
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },
  // Protected routes
  {
    element: (
      <PrivateRoute>
        <MainLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: '/dashboard',
        element: <Dashboard />,
      }
    ],
  },
  // Admin routes
  {
    element: (
      <PrivateRoute>
        <AdminLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: '/admin',
        element: <AdminDashboard />,
      },
      {
        path: '/admin/companies',
        element: <Companies />,
      },
      {
        path: '/admin/users',
        element: <Users />,
      },
      {
        path: '/admin/live-sessions',
        element: <LiveSessions />,
      },
      {
        path: '/admin/security-audit',
        element: <SecurityAudit />,
      },
      {
        path: '/admin/settings',
        element: <Settings />,
      },
    ],
  },
  // 404 route
  {
    path: '*',
    element: <NotFound />,
  },
]); 