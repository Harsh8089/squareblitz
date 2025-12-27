import { Outlet } from 'react-router-dom';
import { Navbar } from '../components';
import { FC } from 'react';

export const Welcome: FC = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};
