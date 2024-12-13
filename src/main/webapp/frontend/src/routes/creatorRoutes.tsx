import React from 'react';
import { RouteObject } from 'react-router-dom';
import CreatorLayout from '../components/Layout/CreatorLayout';
import Home from '../pages/Home';
import Features from '../pages/Features';
import Solutions from '../pages/Solutions';
import Personas from '../pages/Personas';
import Agents from '../pages/Agents';
import Journey from '../pages/Journey';
import Teams from '../pages/Teams';
import Conversations from '../pages/Conversations';

const creatorRoutes: RouteObject[] = [
  {
    path: '/',
    element: <CreatorLayout />,
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
        path: 'personas',
        element: <Personas />,
      },
      {
        path: 'agents',
        element: <Agents />,
      },
      {
        path: 'journey',
        element: <Journey />,
      },
      {
        path: 'teams',
        element: <Teams />,
      },
      {
        path: 'conversations',
        element: <Conversations />,
      },
    ],
  },
];

export default creatorRoutes;
