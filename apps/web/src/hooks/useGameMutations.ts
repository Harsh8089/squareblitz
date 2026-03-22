import { createSearchParams, useNavigate } from 'react-router-dom';
import { DEFAULT_GAME_STATE, useGame } from '../contexts';
import { useMutation } from '@tanstack/react-query';
import { GameStatus, Move } from '@repo/types/game';
import { gameService } from '../services';
import { URL } from '../utils';

export const useStart = () => {
  const navigate = useNavigate();
  const { setGameState } = useGame();

  return useMutation({
    mutationFn: gameService.start,
    onSuccess: (response) => {
      const { id, status, filter, startedAt } = response.data!;

      if (!id) {
        console.error('No game ID returned');

        return;
      }

      setGameState({
        id,
        status,
        filter,
        startedAt,
      });

      navigate(
        {
          pathname: `/${URL.GAME}/${URL.PLAY}`,
          search: createSearchParams({ id }).toString(),
        },
        {
          state: {
            autoStart: true,
          },
        },
      );
    },
    onError: (error) => {
      // Access token expiry error
      console.error('Game start failed ' + error);
    },
  });
};

export const useSend = () => {
  const navigate = useNavigate();
  const { setGameState } = useGame();

  return useMutation({
    mutationFn: gameService.send,
    onSuccess: (response) => {
      const target = response.data!.target as Move;
      setGameState((prev) => ({
        ...prev,
        moves: [...(prev.moves ?? []), target],
      }));
    },
    onError: (error) => {
      navigate(`../${URL.SETUP}`);
      console.error('Square send failed ' + error);
    },
  });
};

export const useVerify = () => {
  const { setGameState } = useGame();

  return useMutation({
    mutationFn: gameService.verify,
    onSuccess: (response) => {
      const move = response.data!.move as Move;
      setGameState((prev) => ({
        ...prev,
        moves: [...(prev.moves?.slice(0, -1) ?? []), move],
      }));
    },
  });
};

export const useEnd = () => {
  const { setGameState } = useGame();

  return useMutation({
    mutationFn: gameService.end,
    onSuccess: () => {
      setGameState({
        ...DEFAULT_GAME_STATE,
        status: GameStatus.COMPLETED,
      });
    },
    onError: (error) => {
      console.error('Game end failed ' + error);
    },
  });
};
