import { User } from '@repo/types/user';
import { ResponseType } from '../types';

export type AuthContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  signup: (u: User) => Promise<ResponseType>;
  signin: (u: Omit<User, 'email'>) => Promise<ResponseType>;
  logout: () => Promise<ResponseType>;
};
