import { createSearchParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useGame } from '../contexts';
import { URL } from '../utils';

export const useTimer = (time: number) => {
  const navigate = useNavigate();
  const { id } = useGame().gameState ?? {};

  const [timeRemaining, setTimeRemaining] = useState<number>(time);

  useEffect(() => {
    if (timeRemaining <= 0) {
      if (!id) {
        return;
      }

      navigate(
        {
          pathname: `/${URL.GAME}/${URL.STATS}`,
          search: createSearchParams({ id }).toString(),
        },
        {
          state: {
            autoFetch: true,
          },
        },
      );
      return;
    }

    const interval = setInterval(() => {
      setTimeRemaining((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeRemaining]);

  return timeRemaining;
};
