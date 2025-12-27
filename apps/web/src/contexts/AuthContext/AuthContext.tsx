import { createContext, FC, ReactNode, useContext } from 'react';
import { AuthContextType } from './authContextType';
import { User } from '@repo/types/user';
import { ResponseType } from '../types';
import axios from 'axios';

type Prop = {
  children: ReactNode;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: FC<Prop> = ({ children }) => {
  const signup = async (user: User): Promise<ResponseType> => {
    try {
      const response = await axios.post(
        'http://localhost:8000/api/auth/signup',
        user,
      );

      if (!response.data.success) {
        return {
          success: false,
          error: response.data.message,
        };
      }

      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        error: 'Something went wrong during register',
      };
    }
  };

  const signin = async (user: Omit<User, 'email'>): Promise<ResponseType> => {
    try {
      const response = await axios.post(
        'http://localhost:8000/api/auth/signin',
        {
          username: user.username,
          password: user.password,
        },
      );

      if (!response.data.success) {
        return {
          success: false,
          error: response.data.message,
        };
      }

      const { data } = response.data;
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('token', data.accessToken);

      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        error: 'Something went wrong during login',
      };
    }
  };

  const logout = async (): Promise<ResponseType> => {
    try {
      const response = await axios.post(
        'http://localhost:8000/api/auth/logout',
      );
      if (!response.data.success) {
        return {
          success: false,
          error: response.data.message,
        };
      }

      localStorage.removeItem('user');
      localStorage.removeItem('token');

      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        error: 'Something went wrong during logout',
      };
    }
  };

  return (
    <AuthContext.Provider value={{ signup, signin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
