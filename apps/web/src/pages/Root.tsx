import { Outlet } from 'react-router-dom';
import { Navbar } from '../components';
import { FC } from 'react';

export const Root: FC = () => (
  <div className="h-screen font-mono overflow-hidden px-48 bg-brown-1 flex flex-col">
    <Navbar />
    <Outlet />
  </div>
);
