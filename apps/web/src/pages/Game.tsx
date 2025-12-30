import { CHESS_PIECES_ICONS, TIMER_ICONS, VARIANT_ICONS } from '../common';
import { GameMode, Timer } from '@repo/types/game';
import { Board, ScorePanel } from '../components';
import { BoardSize } from '@repo/types/board';
import { TimerBar } from '@repo/ui/timerBar';
import { Toggle } from '@repo/ui/toggle';
import { Button } from '@repo/ui/button';
import { Slider } from '@repo/ui/sider';
import { FC, useState } from 'react';

export const Game: FC = () => {
  const [start, setStart] = useState<boolean>(false);

  const size: BoardSize = 4;
  const mode = GameMode.BLIND;
  const timer: Timer = '15';

  const score = {
    correct: 2,
    total: 3,
  };

  return (
    <>
      {start ? (
        <div className="w-screen h-screen grid grid-cols-[2fr_2fr]">
          <div className="w-full h-full flex flex-col justify-center items-center">
            <Board size={size} mode={mode} timer={timer} />
            <TimerBar timer={timer} size={size} />
          </div>
          <div className="w-full my-5">
            <ScorePanel score={score} />
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-20">
          <Slider
            label={'Board size'}
            icons={CHESS_PIECES_ICONS}
            randomIcon={true}
            variant="large"
          />
          <Toggle icons={VARIANT_ICONS} variant="large" />
          <Slider
            label={'Timer'}
            min="15"
            max="60"
            step="15"
            icons={TIMER_ICONS}
            variant="large"
          />
          <Button
            title="Start"
            className="w-[460px] h-18"
            variant="outline"
            onClick={() => setStart(true)}
          />
        </div>
      )}
    </>
  );
};
