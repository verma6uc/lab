import React from 'react';
import { RouteObject } from 'react-router-dom';
import CreatorLayout from '../components/Layout/CreatorLayout';
import ApplicationDetail from '../pages/creator/ApplicationDetail';
import Applications from '../pages/creator/Applications';
import Settings from '../pages/creator/Settings';
import CompanyOverview from '../pages/creator/CompanyOverview';

export const creatorRoutes: RouteObject = {
  path: 'creator',
  element: <CreatorLayout />,
  children: [
    {
      path: '',
      element: <CompanyOverview />,
    },
    {
      path: 'dashboard',
      element: <CompanyOverview />,
    },
    {
      path: 'applications',
      element: <Applications />,
    },
    {
      path: 'application/:id/*',
      element: <ApplicationDetail />,
    },
    {
      path: 'settings',
      element: <Settings />,
    },
  ],
};
