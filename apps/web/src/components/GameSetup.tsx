import { CHESS_PIECES_ICONS, TIMER_ICONS, VARIANT_ICONS } from '../common';
import { BoardSize, Timer, type GameSettings } from '@repo/types/game';
import { Toggle } from '@repo/ui/toggle';
import { Button } from '@repo/ui/button';
import { Slider } from '@repo/ui/sider';
import { useGame } from '../contexts';
import { FC } from 'react';
import { useStart } from '../hooks/useGameMutations';

export const GameSetup: FC = () => {
  const { gameState, setGameState } = useGame();
  const { mutateAsync: start } = useStart(); 

  const startGame = () => {
    if(!gameState?.filter) {
      return;
    }

    start(gameState.filter as Required<GameSettings>);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-20">
      <Slider<BoardSize>
        icons={CHESS_PIECES_ICONS}
        label="Board size"
        randomIcon={true}
        variant="large"
        parse={(v) => Number(v) as BoardSize}
        onChange={(v) => {
          setGameState((prev) => {
            if (!prev?.filter) return prev;
            return {
              ...prev,
              filter: {
                ...prev.filter,
                size: v,
              },
            };
          });
        }}
      />
      <Toggle
        icons={VARIANT_ICONS}
        variant="large"
        onChange={(v) =>
          setGameState((prev) => {
            if (!prev?.filter) return prev;

            return {
              ...prev,
              filter: {
                ...prev.filter,
                mode: v,
              },
            };
          })
        }
      />
      <Slider
        label={'Timer'}
        min="15"
        max="60"
        step="15"
        icons={TIMER_ICONS}
        variant="large"
        parse={(v) => v as Timer}
        onChange={(v) => {
          setGameState((prev) => {
            if (!prev?.filter) return prev;
            return {
              ...prev,
              filter: {
                ...prev.filter,
                timer: v,
              },
            };
          });
        }}
      />
      <Button
        title="Start"
        className="w-[460px] h-18"
        variant="outline"
        onClick={startGame}
      />
    </div>
  );
};
