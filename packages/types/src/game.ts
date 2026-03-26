import { Square } from './square';

export type Timer = '15' | '30' | '45' | '60';

export type BoardSize = 4 | 5 | 6 | 7 | 8 | 9 | 10;

export enum GameMode {
  ASSISTED = 'ASSISTED', // Highlights rank + file + flashes square
  BLIND = 'BLIND', // Only shows rank + file, no square highlight
}

export enum GameStatus {
  ACTIVE = 'ACTIVE',
  ABANDONED = 'ABANDONED',
  COMPLETED = 'COMPLETED',
}

export type GameSettings = {
  size?: BoardSize;
  mode?: GameMode;
  timer?: Timer;
};

export type Move = {
  targetSquare?: Square;
  clickedSquare?: Square;
  isCorrect?: boolean;
  timeTaken?: number; // in milliseconds
  timeStamp?: number; // absolute time
};

export type GameState = {
  id: string | null;
  status: GameStatus | null;
  filter?: GameSettings;
  startedAt?: number; // in epoch format
  moves?: Move[];
  mpm?: number;
  accuracy?: number;
  opponent?: string; // ref to User.id in case of mutltiplayer
};

export type GameStats = Required<
  Pick<GameState, 'id' | 'moves' | 'mpm' | 'accuracy'>
>;
