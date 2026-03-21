import { Navigate, Outlet } from 'react-router-dom';
import { FC } from 'react';
import { useAuth } from '../contexts';
import { URL } from '../utils';

export const Welcome: FC = () => {
  const { user } = useAuth();

  if(user) {
    return <Navigate to={`/${URL.GAME}/${URL.SETUP}`} replace/>;
  }

  return <Outlet />
}
