import { CHESS_PIECES_ICONS, TIMER_ICONS, VARIANT_ICONS } from '../common';
import { GameFilter, GameMode, Timer } from '@repo/types/game';
import { BoardSize } from '@repo/types/board';
import { Toggle } from '@repo/ui/toggle';
import { Slider } from '@repo/ui/sider';
import { Table } from '@repo/ui/table';
import { FC, useState } from 'react';

type Props = {
  records?: {
    mode: Timer;
    mpm: number;
    accuracy: number;
    variant: GameMode;
    size: BoardSize;
    date: Date;
  }[];
};

export const HistoryTable: FC<Props> = ({ records }) => {
  const [filter, setFilter] = useState<GameFilter>({
    size: 4,
    mode: GameMode.BLIND,
    timer: '15' as Timer,
  });

  return (
    <>
      <div className="grid grid-cols-3 place-items-center items-center min-w-full mt-6">
        <Slider<BoardSize>
          icons={CHESS_PIECES_ICONS}
          label="Board Size"
          parse={(v) => Number(v) as BoardSize}
          randomIcon={true}
          onChange={(v) => {
            setFilter((prev) => ({
              ...prev,
              size: v,
            }));
          }}
        />
        <Toggle
          icons={VARIANT_ICONS}
          onChange={(v) =>
            setFilter((prev) => {
              return {
                ...prev,
                mode: v,
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
          parse={(v) => v as Timer}
          onChange={(v) => {
            setFilter((prev) => ({
              ...prev,
              timer: v,
            }));
          }}
        />
      </div>
      <Table records={records} />
    </>
  );
};
