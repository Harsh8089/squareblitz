import { GameSettings, GameStats, GameStatus } from '@repo/types/game';
import { GameData, Response } from '@repo/types/response';
import { Square } from '@repo/types/square';
import { api } from './axios.service';

type GameResponse = Promise<Response<GameData>>;

export const gameService = {
  start: async ({
    size,
    mode,
    timer,
  }: Required<GameSettings>): GameResponse => {
    return (
      await api.get('/game/start', {
        params: {
          size,
          mode,
          timer,
        },
      })
    ).data;
  },
  send: async (): GameResponse => {
    return (await api.get('/game/send')).data;
  },
  verify: async (target: Square): GameResponse => {
    return (
      await api.post('/game/verify', {
        target,
      })
    ).data;
  },
  end: async (status: GameStatus): GameResponse => {
    return (await api.post('/game/end', { status })).data;
  },
  stats: async (id: string): Promise<Response<GameStats>> => {
    return (await api.get(`/game/stats/${id}`)).data;
  },
};
