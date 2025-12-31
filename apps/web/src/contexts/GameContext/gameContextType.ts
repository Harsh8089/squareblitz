import { GameFilter, GameState } from '@repo/types/game';
import { Dispatch, SetStateAction } from 'react';
import { SquareType } from '@repo/types/square';
import { BoardSize } from '@repo/types/board';
import { ResponseType } from '../types';

export type GameContextType = {
  gameState?: GameState;
  setGameState: Dispatch<SetStateAction<GameState>>;
  start: () => Promise<ResponseType>;
  end: () => boolean;
  send: (size: BoardSize) => Promise<ResponseType>;
  verify: (timeTaken: number, t: SquareType) => Promise<ResponseType>;
};
