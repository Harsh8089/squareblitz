import { Outlet } from 'react-router-dom';
import { FC } from 'react';

export const Root: FC = () => (
  <div className="h-screen font-mono overflow-hidden px-48 bg-brown-1">
    <Outlet />
  </div>
);
