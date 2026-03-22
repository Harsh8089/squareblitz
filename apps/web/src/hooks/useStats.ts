import { GameData, Response } from '@repo/types/response';
import { useQuery } from '@tanstack/react-query';
import { gameService } from '../services';

export const useStats = (id: string) =>
  useQuery<Promise<Response<GameData>>>({
    queryKey: ['fetchStats', id],
    queryFn: ({ queryKey }) => gameService.stats(queryKey[1] as string),
  });
