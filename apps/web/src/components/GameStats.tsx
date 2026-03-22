import { Navigate, useLocation } from 'react-router-dom';
import { useStats } from '../hooks';
import { URL } from '../utils';
import { FC } from 'react';

export const GameStats: FC = () => {
  const { search } = useLocation();
  const id = new URLSearchParams(search).get('id');

  if (!id) {
    return <Navigate to={`/${URL.GAME}/${URL.SETUP}`} />;
  }

  const { data, isLoading, isFetching } = useStats(id);

  return <div className="text-black">{JSON.stringify(data)}</div>;
};
