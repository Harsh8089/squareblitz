import { formatTime } from '../../../apps/web/src/utils';
import { FC, useEffect, useState } from 'react';

type Prop = {
  endTime: 15 | 30 | 60;
};

export const Timer: FC<Prop> = ({ endTime }) => {
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
