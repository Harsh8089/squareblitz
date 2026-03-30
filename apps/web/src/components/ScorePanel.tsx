import { FC, memo, ReactElement, useMemo } from 'react';
import { useGame, useGameSession } from '../contexts';
import { Move } from '@repo/types/game';
import { Check, X } from 'lucide-react';
import { Timer } from '@repo/ui/timer';
import { formatTime } from '../utils';

export const ScorePanel: FC = () => {
  const { moves } = useGame().gameState ?? {};
  const { time } = useGameSession();

  const { correct, total } = useMemo(() => {
    const list = (moves ?? []).slice(0, -1);

    return {
      correct: list.filter((m) => m.isCorrect === true).length,
      total: list.length,
    };
  }, [moves]);

  return (
    <div className="flex flex-col h-full w-[50%] rounded-2xl overflow-hidden text-grain-3">
      <div className="flex items-center justify-center gap-16 h-[200px] w-full">
        <Score Icon={<Check size={48} />} metric={correct} />
        <Score Icon={<X size={48} />} metric={total - correct} />
      </div>

      <div className="flex items-center justify-center h-[150px] w-full">
        <Timer timeRemaining={time} />
      </div>

      <MoveDetailsGrid moves={moves ?? []} />
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

const MoveDetailsGrid = memo(({ moves }: { moves: Move[] }) => {
  const updatedMoves = useMemo(() => {
    const completedMoves = moves.slice(0, -1);

    const rem = completedMoves.length % MAX_CLICK_DETAILS;

    return rem === 0 ? [] : completedMoves.slice(-rem);
  }, [moves]);

  const emptySlots = Math.max(0, MAX_CLICK_DETAILS - updatedMoves.length);

  return (
    <div className="flex-1 flex items-center justify-center w-full px-6 pb-6">
      <div className="grid grid-cols-4 gap-4 place-items-center items-center w-full h-fit">
        {updatedMoves.map((m, idx) => (
          <div
            className="flex flex-col items-center justify-center gap-1"
            key={idx}
          >
            <div className="bg-brown-2 p-1 rounded-lg w-9 h-9">
              {m.isCorrect ? <Check size={28} /> : <X size={28} />}
            </div>
            <p>{formatTime(m.timeTaken)}</p>
          </div>
        ))}
        {Array.from({ length: emptySlots }, (_, i) => (
          <div
            className="flex flex-col items-center justify-center gap-1"
            key={i}
          >
            <div className="bg-brown-2 w-9 h-9 rounded-lg"></div>
            <p className="text-xl">-</p>
          </div>
        ))}
      </div>
    </div>
  );
});

const MAX_CLICK_DETAILS = 20;
