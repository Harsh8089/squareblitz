import { Board, TimerBar, TimerControls } from '../components/games';
import { GameSessionProvider } from '../contexts';
import { ScorePanel } from '../components';
import { FC } from 'react';

export const Game: FC = () => {
  return (
    <GameSessionProvider>
      <div className="w-screen h-screen grid grid-cols-[2fr_2fr]">
        <div className="w-full h-full flex flex-col justify-center items-center">
          <Board />
          <TimerBar />
          <TimerControls />
        </div>
        <div className="w-full my-5">
          <ScorePanel />
        </div>
      </div>
    </GameSessionProvider>
  );
};
