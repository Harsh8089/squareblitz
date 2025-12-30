import { User } from '@repo/types/user';
import { FC } from 'react';

type Props = {
  userInfo: User;
};

export const PersonalBestsCard: FC<Props> = ({ userInfo }) => (
  <div className="bg-brown-2/25 rounded-xl h-[150px] min-w-full grid grid-cols-4 px-8 place-items-center items-center mt-2">
    {userInfo.bestRecord.map((br, idx) => (
      <div
        key={idx}
        className="flex flex-col items-center justify-center gap-2"
      >
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
);
