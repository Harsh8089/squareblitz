import { Board, GameSetup } from '../components';
import { TimerBar } from '@repo/ui/timerBar';
import { useGame } from '../contexts';
import { FC, useState } from 'react';

export const Game: FC = () => {
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const { gameState } = useGame();

  const { size, timer } = gameState?.filter ?? {};

  return (
    <>
      {gameStarted ? (
        <div className="w-screen h-screen grid grid-cols-[2fr_2fr]">
          <div className="w-full h-full flex flex-col justify-center items-center">
            <Board />
            <TimerBar timer={timer} size={size} />
          </div>
          <div className="w-full my-5">
            {/* <ScorePanel score={score} /> */}
          </div>
        </div>
      ) : (
        <GameSetup setGameStarted={setGameStarted} />
      )}
    </>
  );
};
