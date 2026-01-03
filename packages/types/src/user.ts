import { GameMode, Timer } from './game';
import { BoardSize } from './board';

export type User = {
  // auth information
  id: string; // from db
  username: string;
  email: string;
  password: string;
  joined: number; // in epoch format
  refreshToken?: string;

  // game information
  gameStarted?: number;
  gameCompleted?: number;
  playingTime?: number;
  bestRecord: {
    timer: Timer;
    mpm?: number;
    accuracy?: number;
  }[];
  history?: {
    timer: Timer;
    mpm: number;
    accuracy: number;
    mode: GameMode;
    size: BoardSize;
    date: Date;
  }[];
};
