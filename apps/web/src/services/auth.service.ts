import { AuthData, Response } from '@repo/types/response';
import { User } from '@repo/types/user';
import { api } from './axios.service';

type AuthResponse = Promise<Response<AuthData>>;

export const authService = {
  signup: async (user: User): AuthResponse => {
    const response = await api.post('/auth/signup', user);
    return response.data;
  },
  signin: async (user: Omit<User, 'email'>): AuthResponse => {
    const response = await api.post('/auth/signin', user);
    return response.data;
  },
  logout: async (): AuthResponse => {
    const response = await api.post('/auth/logout');
    return response.data;
  },
  getCurrentUser: (): string | null => {
    return localStorage.getItem('user');
  },
  getToken: (): string | null => {
    return localStorage.getItem('token');
  },
};
