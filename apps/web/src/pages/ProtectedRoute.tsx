import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts';

import { URL } from '../utils';
import { FC } from 'react';

export const ProtectedRoute: FC = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to={`${URL.WELCOME}/${URL.LOGIN}`} />;
  }

  return <Outlet />;
};
