import { mapSizeToPx } from '../../../apps/web/src/utils';
import { FC, useEffect, useMemo, useState } from 'react';
import { Timer } from '@repo/types/game';

type Prop = {
  timer: Timer;
  size: number;
};

export const TimerBar: FC<Prop> = ({ timer, size }) => {
  const endTime = Number(timer);
  const [timeRemaining, setTimeRemaining] = useState<number>(endTime);

  const squareSizePx = useMemo(() => mapSizeToPx(size) * size, [size]);

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

  const progressPercentage = (timeRemaining / endTime) * 100;

  return (
    <div
      style={{
        width: squareSizePx,
      }}
    >
      <div className="h-4 bg-brown-2 rounded-full overflow-hidden shadow-sm">
        <div
          className={`h-full transition-all duration-300 ${
            progressPercentage > 50
              ? 'bg-grain-2'
              : progressPercentage > 25
                ? 'bg-grain-1'
                : 'bg-brown-3'
          }`}
          style={{ width: `${Math.max(0, progressPercentage)}%` }}
        />
      </div>
    </div>
  );
};
