import { Check, Target, TimerIcon, X } from 'lucide-react';
import { useGame, useGameSession } from '../../contexts';
import { formatTime } from '../../utils';
import { Move } from '@repo/types/game';
import { Timer } from '@repo/ui/timer';
import { FC, useMemo } from 'react';

export const ScorePanel: FC = () => {
  const { moves } = useGame().gameState ?? {};
  const { time } = useGameSession();

  return (
    <div className="flex flex-col h-full gap-3 p-5 w-[60%]">
      <div className="flex gap-3 shrink-0">
        <Timer timeRemaining={time} icon={<TimerIcon size={16} />} />
        <Accuracy />
      </div>
      <LiveFeed moves={moves} />
    </div>
  );
};

const Accuracy: FC = () => (
  <div className="flex flex-1 flex-col justify-center items-center gap-1.5 px-5 py-4 rounded-2xl bg-brown-2/20 border border-brown-2/40">
    <Target size={16} className="text-grain-1" />
    <p className="text-3xl font-light text-grain-3 tracking-tight">
      {/* TODO: Remove hardcoded value for accuracy */}
      98
      <span className="text-base text-grain-1 ml-0.5">%</span>
    </p>
    <p className="text-[11px] uppercase tracking-widest text-grain-1/80">
      accuracy
    </p>
  </div>
);

const LiveFeed: FC<{ moves?: Move[] }> = ({ moves }) => {
  const updatedMoves = useMemo(() => (moves ?? []).slice(0, -1), [moves]);

  const { correct, total } = useMemo(
    () => ({
      correct: updatedMoves.filter((m) => m.isCorrect === true).length,
      total: updatedMoves.length,
    }),
    [updatedMoves],
  );

  return (
    <div className="flex flex-col flex-1 rounded-2xl bg-brown-2/20 border border-brown-2/40 overflow-hidden min-h-0">
      <div className="flex justify-between items-center px-5 py-3.5 border-b border-brown-2/40 shrink-0">
        <p className="text-[11px] uppercase tracking-widest text-grain-1">
          live feed
        </p>
        <div className="flex items-center gap-4">
          <div className="flex gap-1.5 items-center">
            <div className="w-5 h-5 rounded-full bg-correct-1/25 border border-correct-2 flex items-center justify-center">
              <Check size={11} className="text-correct-3" strokeWidth={2.5} />
            </div>
            <span className="text-sm text-grain-3 tabular-nums">{correct}</span>
          </div>
          <div className="flex gap-1.5 items-center">
            <div className="w-5 h-5 rounded-full bg-wrong-1/25 border border-wrong-2 flex items-center justify-center">
              <X size={11} className="text-wrong-3" strokeWidth={2.5} />
            </div>
            <span className="text-sm text-grain-3 tabular-nums">
              {total - correct}
            </span>
          </div>
        </div>
      </div>
      <div
        className="flex flex-col divide-y divide-brown-2/30 overflow-y-auto min-h-0"
        style={{ scrollbarWidth: 'thin', scrollbarColor: '#703b3b #3a1d1d' }}
      >
        {updatedMoves.map((move) => (
          <LiveFeedCard key={move.id} move={move} />
        ))}
        <LiveFeedCardSkeleton index={moves?.length ?? 0} />
      </div>
    </div>
  );
};

const LiveFeedCard: FC<{ move: Move }> = ({ move }) => (
  <div className="flex items-center justify-between px-5 py-3 hover:bg-brown-2/30 transition-colors">
    <div className="flex items-center gap-3">
      <span className="text-[11px] text-grain-1/40 tabular-nums w-5 text-right">
        #{move.id}
      </span>
      <span className="text-sm font-medium text-grain-3 tracking-wide">
        {move.targetSquare?.file}
        {move.targetSquare?.rank}
      </span>
      {move.isCorrect ? (
        <div className="w-4 h-4 rounded-full bg-correct-1/25 border border-correct-2 flex items-center justify-center">
          <Check size={9} className="text-correct-3" strokeWidth={2.5} />
        </div>
      ) : (
        <div className="w-4 h-4 rounded-full bg-wrong-1/25 border border-wrong-2 flex items-center justify-center">
          <X size={9} className="text-wrong-3" strokeWidth={2.5} />
        </div>
      )}
    </div>
    <span className="text-[11px] text-grain-1 tabular-nums">
      {formatTime(move.timeTaken)}
    </span>
  </div>
);

const LiveFeedCardSkeleton: FC<{ index: number }> = ({ index }) => (
  <div className="flex items-center justify-between px-5 py-3">
    <div className="flex items-center gap-3">
      <span className="text-[11px] text-grain-1/40 tabular-nums w-5 text-right">
        #{index}
      </span>
      <div className="w-6 h-3.5 rounded bg-brown-2/25 animate-pulse" />
      <div className="w-4 h-4 rounded-full bg-brown-2/25 animate-pulse" />
    </div>
    <div className="w-8 h-3 rounded bg-brown-2/30 animate-pulse" />
  </div>
);
