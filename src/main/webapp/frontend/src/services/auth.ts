import axios from 'axios';
import { UserRole } from '../types/models';

// Mock data for development
const MOCK_USERS = [
  {
    id: 1,
    email: 'creator@example.com',
    password: 'password123',
    role: UserRole.CREATOR,
    firstName: 'John',
    lastName: 'Creator',
  },
  {
    id: 2,
    email: 'user@example.com',
    password: 'password123',
    role: UserRole.USER,
    firstName: 'Jane',
    lastName: 'User',
  },
];

interface LoginCredentials {
  email: string;
  password: string;
}

interface CreatorLoginCredentials extends LoginCredentials {
  inviteCode?: string;
}

interface AuthResponse {
  token: string;
  user: {
    id: number;
    email: string;
    role: UserRole;
    firstName: string;
    lastName: string;
  };
}

const API_URL = `${import.meta.env.VITE_API_URL}/auth`;

const generateMockToken = (user: typeof MOCK_USERS[0]): string => {
  return btoa(JSON.stringify({
    id: user.id,
    email: user.email,
    role: user.role,
    exp: Date.now() + 24 * 60 * 60 * 1000 // 24 hours
  }));
};

export const authService = {
  login: async (credentials: LoginCredentials): Promise<void> => {
    try {
      // For development, use mock authentication
      if (!import.meta.env.PROD) {
        const user = MOCK_USERS.find(u => u.email === credentials.email);
        
        if (!user || user.password !== credentials.password) {
          throw new Error('Invalid email or password');
        }

        const mockResponse: AuthResponse = {
          token: generateMockToken(user),
          user: {
            id: user.id,
            email: user.email,
            role: user.role,
            firstName: user.firstName,
            lastName: user.lastName,
          }
        };

        localStorage.setItem('token', mockResponse.token);
        localStorage.setItem('user', JSON.stringify(mockResponse.user));
        return;
      }

      // Production API call
      const response = await axios.post<AuthResponse>(`${API_URL}/login`, credentials);
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Failed to login');
      }
      throw error;
    }
  },

  creatorLogin: async (credentials: CreatorLoginCredentials): Promise<void> => {
    try {
      // For development, use mock authentication
      if (!import.meta.env.PROD) {
        const user = MOCK_USERS.find(u => u.email === credentials.email);
        
        if (!user || user.password !== credentials.password) {
          throw new Error('Invalid email or password');
        }

        if (user.role !== UserRole.CREATOR) {
          throw new Error('This account is not a creator account');
        }

        const mockResponse: AuthResponse = {
          token: generateMockToken(user),
          user: {
            id: user.id,
            email: user.email,
            role: user.role,
            firstName: user.firstName,
            lastName: user.lastName,
          }
        };

        localStorage.setItem('token', mockResponse.token);
        localStorage.setItem('user', JSON.stringify(mockResponse.user));
        return;
      }

      // Production API call
      const response = await axios.post<AuthResponse>(`${API_URL}/creator/login`, credentials);
      const { token, user } = response.data;
      
      if (user.role !== UserRole.CREATOR) {
        throw new Error('Invalid account type. Please use a creator account.');
      }
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Failed to login');
      }
      throw error;
    }
  },

  logout: (): void => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  },

  getCurrentUser: (): { id: number; email: string; role: UserRole; firstName: string; lastName: string; } | null => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  isAuthenticated: (): boolean => {
    const token = localStorage.getItem('token');
    if (!token) return false;

    try {
      const decoded = JSON.parse(atob(token));
      return decoded.exp > Date.now();
    } catch {
      return false;
    }
  },

  isCreator: (): boolean => {
    const user = authService.getCurrentUser();
    return user?.role === UserRole.CREATOR;
  },

  getToken: (): string | null => {
    return localStorage.getItem('token');
  },
};

// Axios interceptor for adding auth token to requests
axios.interceptors.request.use(
  (config) => {
    const token = authService.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Axios interceptor for handling auth errors
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      authService.logout();
    }
    return Promise.reject(error);
  }
); 