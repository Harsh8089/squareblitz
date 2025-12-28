import { HistoryTable, Navbar } from '../components';
import { GameMode, Timer } from '@repo/types/game';
import { BoardSize } from '@repo/types/board';
import { formatJoiningTime } from '../utils';
import { FC } from 'react';

type User = {
  username: string;
  joined: string;
  gameStarted?: number;
  gameCompleted?: number;
  playingTime?: number;
  bestRecord: {
    mode: Timer;
    mpm?: number;
    accuracy?: number;
  }[];
  history: {
    mode: Timer;
    mpm: number;
    accuracy: number;
    variant: GameMode;
    size: BoardSize;
    date: Date;
  }[];
};

// mock data
const userInfo: User = {
  username: 'harsh123123',
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
    <>
      <Navbar />
      <div className="w-[90%] mx-auto flex flex-col justify-center items-center">
        <div className="h-[150px] min-w-full grid grid-cols-[25%_75%] space-x-1.5">
          <div className="bg-brown-2/25 rounded-xl grid grid-cols-[40%_60%] px-2 items-center place-items-center">
            <div className="bg-brown-1 w-[100px] h-[100px] rounded-full flex items-center justify-center">
              <p className="text-6xl font-extrabold text-grain-3">
                {userInfo.username.at(0)?.toUpperCase()}
              </p>
            </div>
            <div className="grid grid-rows-2 items-center">
              <p className="text-grain-3 text-xl font-semibold tracking-wide">
                {userInfo.username}
              </p>
              <p className="text-grain-3/95 text-md">
                Joined {formatJoiningTime(userInfo.joined)}
              </p>
            </div>
          </div>
          <div className="bg-brown-2/25 rounded-xl grid grid-cols-3 items-center px-8">
            <div className="flex flex-col gap-1">
              <p className="text-grain-3/95 tracking-wide text-md">
                game started
              </p>
              <p className="text-grain-3 text-3xl font-bold">
                {userInfo.gameStarted}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-grain-3/95 tracking-wide text-md">
                game completed
              </p>
              <p className="text-grain-3 text-3xl font-bold">
                {userInfo.gameCompleted}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-grain-3/95 tracking-wide text-md">
                playing time
              </p>
              <p className="text-grain-3 text-3xl font-bold">
                {userInfo.playingTime}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-brown-2/25 rounded-xl h-[150px] min-w-full grid grid-cols-4 px-8 place-items-center items-center mt-2">
          {userInfo.bestRecord.map((br) => (
            <div className="flex flex-col items-center justify-center gap-2">
              <p className="text-grain-3/95 text-lg tracking-wide">
                {br.mode + ' seconds'}
              </p>
              <p className="text-grain-3 text-3xl font-bold">{br.mpm ?? '-'}</p>
              <p className="text-grain-3/95 text-2xl font-medium">
                {br.accuracy ? br.accuracy + '%' : '-'}
              </p>
            </div>
          ))}
        </div>

        <HistoryTable records={userInfo.history} />
      </div>
    </>
  );
};
