import { useQuery } from '@tanstack/react-query';
import { gameService } from '../services';

export const useStats = (id: string) =>
  useQuery({
    queryKey: ['fetchStats', id],
    queryFn: () => gameService.stats(id),
    refetchOnWindowFocus: false,
    enabled: !!id,
  });
