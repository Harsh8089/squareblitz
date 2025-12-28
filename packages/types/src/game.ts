import { SquareType } from './square';
import { BoardSize } from './board';

export type Timer = '15' | '30' | '45' | '60';

export enum GameMode {
  ASSISTED = 'assisted', // Highlights rank + file + flashes square
  BLIND = 'blind', // Only shows rank + file, no square highlight
}

export enum GameStatus {
  START = 'start',
  END = 'end',
}

export type GameState = {
  status?: GameStatus;
  mode?: GameMode;
  timer?: Timer;
  correct: number;
  total: number;
  timeTaken?: number[];
  size?: BoardSize;
  currentTarget?: SquareType;
  startedAt?: number;
};
