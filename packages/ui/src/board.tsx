import { SquareType } from '@repo/types/square';
import { TargetOverlay } from './targetOverlay';
import { BoardSize } from '@repo/types/board';
import { BoardSquare } from './boardSquare';
import { FC } from 'react';

type Prop = {
  size: BoardSize;
  squareSizePx: number;
  handleSquareClick: (t: SquareType) => void;
  currentTarget: SquareType;
};

export const Board: FC<Prop> = ({
  size,
  squareSizePx,
  handleSquareClick,
  currentTarget,
}) => (
  <div className="flex flex-col items-center gap-6 pb-3">
    <div className="relative shadow-2xl">
      <div className="relative">
        {Array.from({ length: size }, (_, row) => (
          <div key={row} className="flex">
            {Array.from({ length: size }, (_, col) => (
              <BoardSquare
                key={`${row}-${col}`}
                size={size}
                row={row}
                col={col}
                sizePx={squareSizePx}
                onSquareClick={handleSquareClick}
              />
            ))}
          </div>
        ))}
      </div>
      <TargetOverlay currentTarget={currentTarget} />
    </div>
  </div>
);
