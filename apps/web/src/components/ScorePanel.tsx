import { FC, memo, ReactElement, useEffect, useState } from 'react';
import { Check, X } from 'lucide-react';
import { Timer } from '@repo/ui/timer';
import { useGame } from '../contexts';
import { formatTime } from '../utils';

type Props = {
  timeRemaining: number;
};

type ClickDetail = {
  isCorrect: boolean;
  time: number;
};

export const ScorePanel: FC<Props> = ({ timeRemaining }) => {
  const { gameState } = useGame();
  const [clickDetails, setClickDetails] = useState<ClickDetail[]>([]);

  const correct = gameState?.correct ?? 0;
  const total = gameState?.total ?? 0;

  useEffect(() => {
    const isCorrect = gameState?.lastMoveCorrect;
    if (isCorrect === undefined) {
      return;
    }

    const time = gameState?.timeTaken?.at(-1) ?? 0;

    setClickDetails((prev) => [
      ...(prev.length >= 20 ? prev.slice(1) : prev),
      {
        isCorrect,
        time,
      },
    ]);
  }, [gameState?.total]);

  return (
    <div className="flex flex-col h-full w-[50%] rounded-2xl overflow-hidden text-grain-3">
      <div className="flex items-center justify-center gap-16 h-[200px] w-full">
        <Score Icon={<Check size={48} />} metric={correct} />
        <Score Icon={<X size={48} />} metric={total - correct} />
      </div>

      <div className="flex items-center justify-center h-[150px] w-full">
        <Timer timeRemaining={timeRemaining} />
      </div>

      <ClickDetailsGrid clickDetails={clickDetails} />
    </div>
  );
};

const Score = memo(
  ({ Icon, metric }: { Icon: ReactElement; metric: number }) => (
    <div className="flex flex-col items-center gap-2">
      {Icon}
      <p className="font-medium text-grain-3 text-3xl">{metric}</p>
    </div>
  ),
);

const ClickDetailsGrid = memo(
  ({ clickDetails }: { clickDetails: ClickDetail[] }) => (
    <div className="flex-1 flex items-center justify-center w-full px-6 pb-6">
      <div className="grid grid-cols-4 gap-4 place-items-center items-center w-full h-fit">
        {clickDetails.map((d, idx) => (
          <div
            className="flex flex-col items-center justify-center gap-1"
            key={idx}
          >
            <div className="bg-brown-2 p-1 rounded-lg w-9 h-9">
              {d.isCorrect ? <Check size={28} /> : <X size={28} />}
            </div>
            <p>{formatTime(d.time)}</p>
          </div>
        ))}
        {Array.from(
          { length: MAX_CLICK_DETAILS - clickDetails.length },
          (_, i) => (
            <div
              className="flex flex-col items-center justify-center gap-1"
              key={i}
            >
              <div className="bg-brown-2 w-9 h-9 rounded-lg"></div>
              <p className="text-xl">-</p>
            </div>
          ),
        )}
      </div>
    </div>
  ),
);

const MAX_CLICK_DETAILS = 20;
