import { Navigate, Outlet } from 'react-router-dom';
import { Navbar } from '../components';
import { useAuth } from '../contexts';
import { FC } from 'react';

export const ProtectedRoute: FC = () => {
  const { isLoading, isAuthenticated } = useAuth();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/welcome/sign-in" />;
  }

  return (
    <>
      <Navbar isLoggedIn={true} />
      <Outlet />
    </>
  );
};
