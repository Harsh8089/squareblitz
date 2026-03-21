import { Navigate, useLocation } from 'react-router-dom';
import { FC } from 'react';

export const GameStats: FC = () => {
  const { state, search } = useLocation();
  const id = new URLSearchParams(search).get('id');

  if (!state?.autoFetch || !id) {
    <Navigate to={'/game/setup'} />;

    return;
  }

  return <div className="text-black">Game stats</div>;
};
