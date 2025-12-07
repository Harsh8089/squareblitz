import { 
  File,
  Rank, 
  SquareType 
} from "@repo/types/square";
import { FC } from "react";
import { 
  FILES 
} from "./utils";

type Props = {
  size: number;
  row: number;
  col: number;
  sizePx: number;
  onSquareClick: (square: SquareType) => void;
};

export const BoardSquare: FC<Props> = ({ 
  size, 
  row, 
  col, 
  sizePx, 
  onSquareClick 
}) => {
  const isDark = (row + col) % 2 === 1;
  const isLastRow = row === size - 1;
  const isLastCol = col === size - 1;
  
  const file = FILES[col] as File;
  const rank = (size - row) as Rank;

  const handleClick = () => onSquareClick({ file, rank });

  return (
    <button
      onClick={handleClick}
      className={`
        relative transition-colors duration-150
        ${isDark 
          ? 'bg-brown-2 hover:bg-brown-1 active:bg-brown-2' 
          : 'bg-grain-2 hover:bg-grain-1 active:bg-grain-3'
        }
      `}
      style={{ width: sizePx, height: sizePx }}
      aria-label={`Square ${file}${rank}`}
    >
      {isLastRow && (
        <span className={`
          absolute left-1 bottom-0.5 text-lg font-medium
          ${isDark ? 'text-grain-1' : 'text-brown-1'}
        `}>
          {file}
        </span>
      )}
      {isLastCol && (
        <span className={`
          absolute right-1 top-0.5 text-lg font-medium
          ${isDark ? 'text-grain-1' : 'text-brown-1'}
        `}>
          {rank}
        </span>
      )}
    </button>
  );
};