import { Timer } from './game';

export type User = {
  id: string;
  username: string;
  email: string;
  password: string;
  joined: number; // in epoch format
  refreshToken?: string;
  stats?: {
    gamesStarted: number;
    gamesCompleted: number;
    totalPlayingTime: number;
    bestMPM?: number;
    averageAccuracy?: number;
  };
  bestRecords: {
    '15': BestRecordStats;
    '30': BestRecordStats;
    '45': BestRecordStats;
    '60': BestRecordStats;
  };
  history?: {
    gameId: string;
    completedAt: string; // in epoch format
  }[];
};

type BestRecordStats = null | {
  timer: Timer;
  mpm?: number;
  accuracy?: number;
};
