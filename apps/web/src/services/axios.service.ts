import { authService } from './auth.service';
import axios, { AxiosError } from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:8000/api',
});

api.interceptors.request.use(
  (config) => {
    const token = authService.getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(JSON.stringify(error));
  },
);

// api.interceptors.response.use(
//   response => response,
//   async (error: AxiosError) => {
//     if(error?.response?.status === 401) {
//       await refreshAccessToken();
//       if(error.config) {
//         return api(error.config);
//       }
//     }
//     return Promise.reject(JSON.stringify(error));
//   }
// )

export const refreshAccessToken = async (): Promise<void> => {
  try {
    const response = await api.get('/auth/refresh');

    if (!response.data.success) {
      return;
    }

    const { accessToken } = response.data;
    localStorage.setItem('token', accessToken);
  } catch (error) {
    return;
  }
};
