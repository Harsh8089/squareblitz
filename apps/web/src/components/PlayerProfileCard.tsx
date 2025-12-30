import { formatJoiningTime } from '../utils';
import { User } from '@repo/types/user';
import { FC } from 'react';

type Props = {
  userInfo: User;
};

export const PlayerProfileCard: FC<Props> = ({ userInfo }) => (
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
        <p className="text-grain-3/95 tracking-wide text-md">game started</p>
        <p className="text-grain-3 text-3xl font-bold">
          {userInfo.gameStarted ?? '-'}
        </p>
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-grain-3/95 tracking-wide text-md">game completed</p>
        <p className="text-grain-3 text-3xl font-bold">
          {userInfo.gameCompleted ?? '-'}
        </p>
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-grain-3/95 tracking-wide text-md">playing time</p>
        <p className="text-grain-3 text-3xl font-bold">
          {userInfo.playingTime ?? '-'}
        </p>
      </div>
    </div>
  </div>
);
