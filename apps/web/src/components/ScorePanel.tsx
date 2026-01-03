import { FC, ReactElement } from 'react';
import { Check, X } from 'lucide-react';
import { Timer } from '@repo/ui/timer';
import { useGame } from '../contexts';

export const ScorePanel: FC = () => {
  const { gameState } = useGame();

  const correct = gameState?.correct ?? 0;
  const total = gameState?.total ?? 0;

  const timer = gameState?.filter?.timer || '15';

  return (
    <div className="flex flex-col items-center bg-brown-2 h-full w-[50%] rounded-2xl">
      <div className="flex items-center justify-evenly bg-grain-1 w-full h-48">
        <Score Icon={<Check size={48} color="#3a1d1d" />} metric={correct} />
        <Score
          Icon={<X size={48} color="#3a1d1d" />}
          metric={total - correct}
        />
      </div>
      <Timer timer={timer} />
    </div>
  );
};

const Score = ({ Icon, metric }: { Icon: ReactElement; metric: number }) => (
  <div className="flex flex-col items-center gap-2">
    {Icon}
    <p className="font-bold text-brown-1 text-4xl">{metric}</p>
  </div>
);
