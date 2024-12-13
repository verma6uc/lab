import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../components/Layout/MainLayout';
import PublicLayout from '../components/Layout/PublicLayout';
import Home from '../pages/Home';
import Features from '../pages/Features';
import Solutions from '../pages/Solutions';
import Agents from '../pages/Agents';
import Personas from '../pages/Personas';
import Journey from '../pages/Journey';
import Dashboard from '../pages/Dashboard';
import Users from '../pages/Users';
import Teams from '../pages/Teams';
import Conversations from '../pages/Conversations';
import NotFound from '../pages/NotFound';

export const router = createBrowserRouter([
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
    {
        path: '/app',
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <Dashboard />,
            },
            {
                path: 'users',
                element: <Users />,
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
    {
        path: '*',
        element: <NotFound />,
    },
]); 