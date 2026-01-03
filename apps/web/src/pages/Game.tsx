import { Navigate, useLocation } from 'react-router-dom';
import { Board, ScorePanel } from '../components';
import { TimerBar } from '@repo/ui/timerBar';
import { useGame } from '../contexts';
import { FC } from 'react';

export const Game: FC = () => {
  const { gameState } = useGame();
  const location = useLocation();

  const { size, timer } = gameState?.filter ?? {};

  if (!size || !timer || !location.state?.autoStart) {
    <Navigate to={'/game/setup'} />;

    return;
  }

  return (
    <div className="w-screen h-screen grid grid-cols-[2fr_2fr]">
      <div className="w-full h-full flex flex-col justify-center items-center">
        <Board />
        <TimerBar timer={timer} size={size} />
      </div>
      <div className="w-full my-5">
        <ScorePanel />
      </div>
    </div>
  );
};
