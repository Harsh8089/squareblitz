import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts';

import { FC } from 'react';
import { URL } from '../utils';

export const ProtectedRoute: FC = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to={`${URL.WELCOME}/${URL.LOGIN}`} />;
  }

  return <Outlet />
};
