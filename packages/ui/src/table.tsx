import { GameMode, Timer } from '@repo/types/game';
import { BoardSize } from '@repo/types/board';
import { FC } from 'react';

type Props = {
  records?: {
    mode: Timer;
    mpm: number;
    accuracy: number;
    variant: GameMode;
    size: BoardSize;
    date: Date;
  }[];
};

export const Table: FC<Props> = ({ records }) => {
  return (
    <div className="w-full mt-10">
      <div className="grid grid-cols-[2fr_3fr_4fr_1fr_2fr_4fr] items-center place-items-center">
        {columns.map((c) => (
          <div key={c} className="text-md font-semibold text-grain-1">
            {c}
          </div>
        ))}
      </div>
      {records?.map((r, i) => (
        <div
          key={i}
          className={`${i & 1 ? 'bg-brown-1' : 'bg-brown-2/25'} grid grid-cols-[2fr_3fr_4fr_1fr_2fr_4fr]
          items-center place-items-center text-grain-3 text-lg h-14`}
        >
          <div>{r.mpm}</div>
          <div>{r.accuracy + ' %'}</div>
          <div>{r.variant}</div>
          <div>{r.mode}</div>
          <div>{r.size}</div>
          <div>{r.date.toLocaleDateString()}</div>
        </div>
      ))}
    </div>
  );
};

const columns = ['mpm', 'accuracy', 'variant', 'mode', 'size', 'date'];
