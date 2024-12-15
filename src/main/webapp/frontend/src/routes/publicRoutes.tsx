import React from 'react';
import { RouteObject } from 'react-router-dom';
import PublicLayout from '../components/Layout/PublicLayout';
import Home from '../pages/Home';
import Features from '../pages/Features';
import Solutions from '../pages/Solutions';
import Personas from '../pages/Personas';
import Agents from '../pages/Agents';
import Journey from '../pages/Journey';

const publicRoutes: RouteObject[] = [
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      {
        index: true,
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
    ],
  },
];

export default publicRoutes;
