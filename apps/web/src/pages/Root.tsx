import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth, useGame } from '../contexts';
import { GameStatus } from '@repo/types/game';
import { Navbar } from '../components';
import { FC, useEffect } from 'react';

export const Root: FC = () => {
  const navigate = useNavigate();
  const { isLoading, isAuthenticated } = useAuth();
  const { gameState } = useGame();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/game');

      return;
    }
  }, [isAuthenticated]);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <div className="h-screen font-mono overflow-hidden px-48 bg-brown-1">
      {gameState?.status !== GameStatus.START && (
        <Navbar isLoggedIn={isAuthenticated} />
      )}
      <Outlet />
    </div>
  );
};
