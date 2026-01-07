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

export type GameFilter = {
  size?: BoardSize;
  mode?: GameMode;
  timer?: Timer;
};

export type GameState = {
  id?: string;
  status?: GameStatus;
  filter?: GameFilter;
  correct?: number;
  total?: number;
  timeTaken?: number[]; // in milliseconds
  currentTarget?: SquareType;
  startedAt?: number; // in epoch format
  lastMoveCorrect?: boolean;
  lastMoveTimeTaken?: number; // in epoch format
};
