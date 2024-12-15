import { createBrowserRouter } from 'react-router-dom';
import authRoutes from './authRoutes';
import adminRoutes from './adminRoutes';
import creatorRoutes from './creatorRoutes';
import publicRoutes from './publicRoutes';
import NotFound from '../pages/NotFound';

const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <NotFound />,
    children: [
      ...publicRoutes,
      ...authRoutes,
      ...adminRoutes,
      ...creatorRoutes,
    ],
  },
]);

export default router;
