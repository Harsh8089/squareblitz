import { GameMode, Timer } from './game';
import { BoardSize } from './board';

export type User = {
  username: string;
  email: string;
  password: string;
  joined: string;
  gameStarted?: number;
  gameCompleted?: number;
  playingTime?: number;
  bestRecord: {
    mode: Timer;
    mpm?: number;
    accuracy?: number;
  }[];
  history?: {
    mode: Timer;
    mpm: number;
    accuracy: number;
    variant: GameMode;
    size: BoardSize;
    date: Date;
  }[];
};
