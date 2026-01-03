import { formatTime } from '../../../apps/web/src/utils';
import { Timer as TimerType } from '@repo/types/game';
import { FC, useEffect, useState } from 'react';

type Prop = {
  timer: TimerType;
};

export const Timer: FC<Prop> = ({ timer }) => {
  const endTime = parseInt(timer);
  const [timeRemaining, setTimeRemaining] = useState<number>(endTime);

  useEffect(() => {
    const interval = setInterval(() => {
      if (timeRemaining <= 0) {
        return;
      }

      setTimeRemaining((prev) => prev - 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });

  return (
    <div className="bg-brown-1 w-full h-32 flex justify-center items-center">
      <p className="text-grain-3 font-md text-4xl">
        {formatTime(timeRemaining)}
      </p>
    </div>
  );
};
