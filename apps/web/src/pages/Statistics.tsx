import {
  HistoryTable,
  PersonalBestsCard,
  PlayerProfileCard,
} from '../components';
import { GameMode } from '@repo/types/game';
import { User } from '@repo/types/user';
import { FC } from 'react';

// mock data
const userInfo: User = {
  username: 'harsh123123',
  email: 'harshjain123@gmail.com',
  password: '123123',
  joined: 'Sat Dec 27 2025 08:45:46 GMT+0530 (India Standard Time)',
  gameStarted: 130,
  gameCompleted: 96,
  playingTime: 93000, // in seconds
  bestRecord: [
    {
      mode: '15',
      mpm: 86.19,
      accuracy: 94.78,
    },
    {
      mode: '30',
    },
    {
      mode: '45',
    },
    {
      mode: '60',
      mpm: 80,
      accuracy: 87,
    },
  ],
  history: [
    {
      mode: '60',
      mpm: 65.98,
      accuracy: 60.34,
      variant: GameMode.ASSISTED,
      date: new Date(),
      size: 5,
    },
    {
      mode: '15',
      mpm: 78.0,
      accuracy: 67.15,
      variant: GameMode.BLIND,
      date: new Date(),
      size: 5,
    },
    {
      mode: '15',
      mpm: 87.1,
      accuracy: 97.74,
      variant: GameMode.ASSISTED,
      date: new Date(),
      size: 8,
    },
    {
      mode: '30',
      mpm: 75.4,
      accuracy: 74.04,
      variant: GameMode.BLIND,
      date: new Date(),
      size: 4,
    },
  ],
};

export const Statistics: FC = () => {
  return (
    <div className="w-[90%] mx-auto flex flex-col justify-center items-center">
      <PlayerProfileCard userInfo={userInfo} />

      <PersonalBestsCard userInfo={userInfo} />

      <HistoryTable records={userInfo.history} />
    </div>
  );
};
