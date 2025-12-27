import {
  ChessBishop,
  ChessKing,
  ChessKnight,
  ChessPawn,
  ChessQueen,
  ChessRook,
  Clock12,
  Clock3,
  Clock6,
  Clock9,
  Eye,
  EyeOff,
} from 'lucide-react';
import { GameMode, Timer } from '@repo/types/game';
import { Board, ScorePanel } from '../components';
import { BoardSize } from '@repo/types/board';
import { TimerBar } from '@repo/ui/timerBar';
import { Toggle } from '@repo/ui/toggle';
import { Button } from '@repo/ui/button';
import { Slider } from '@repo/ui/sider';
import { FC, useState } from 'react';

const CHESS_PIECES_ICONS = [
  <ChessBishop size={50} />,
  <ChessKing size={50} />,
  <ChessKnight size={50} />,
  <ChessPawn size={50} />,
  <ChessQueen size={50} />,
  <ChessRook size={50} />,
];

const TIMER_ICONS = [
  <Clock12 size={50} />,
  <Clock3 size={50} />,
  <Clock6 size={50} />,
  <Clock9 size={50} />,
];

const VARIANT_ICONS = [<EyeOff size={50} />, <Eye size={50} />];

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
        <div className="flex flex-col items-center justify-center h-full gap-20">
          <Slider
            label={'Board size'}
            icons={CHESS_PIECES_ICONS}
            randomIcon={true}
          />
          <Toggle icons={VARIANT_ICONS} />
          <Slider
            label={'Timer'}
            min="15"
            max="60"
            step="15"
            icons={TIMER_ICONS}
          />
          <Button
            title="Start"
            className="w-[550px] h-26"
            variant="outline"
            onClick={() => setStart(true)}
          />
        </div>
      )}
    </>
  );
};
