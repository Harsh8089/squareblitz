import { mapSizeToPx } from '../../../apps/web/src/utils';
import { Timer } from '@repo/types/game';
import { FC, useMemo } from 'react';

type Props = {
  timeRemaining: number;
  timer?: Timer;
  size?: number;
};

export const TimerBar: FC<Props> = ({ timeRemaining, timer, size }) => {
  if (!timer || !size) {
    return;
  }
  const squareSizePx = useMemo(() => mapSizeToPx(size) * size, [size]);

  const progressPercentage = (timeRemaining / parseInt(timer)) * 100;

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
