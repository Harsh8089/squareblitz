import { Outlet, useNavigate } from 'react-router-dom';
import { FC, useEffect } from 'react';

export const Root: FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/game');

      return;
    }
  }, []);

  return (
    <div className="h-screen font-mono overflow-hidden px-48 bg-brown-1">
      <Outlet />
    </div>
  );
};
