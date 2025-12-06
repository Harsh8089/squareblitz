import { BoardType } from "@repo/types/board";
import { SquareType } from "@repo/types/square";
import { FC, useMemo, useState } from "react";
import { 
  getTarget, 
  isSameSquare, 
  mapSizeToPx 
} from "./utils";
import { BoardSquare } from "./boardSquare";
import { TargetOverlay } from "./targetOverlay";

export const Board: FC<BoardType> = ({ size }) => {
  const [currentTarget, setCurrentTarget] = useState<SquareType>(
    () => getTarget(size)
  );
  const [score, setScore] = useState({ correct: 0, total: 0 });

  const handleSquareClick = (square: SquareType) => {
    const isCorrect = isSameSquare(currentTarget, square);
    
    setScore(prev => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1
    }));
    
    if (isCorrect) {
      setCurrentTarget(getTarget(size));
    }
  };

  const squareSizePx = useMemo(() => mapSizeToPx(size), [size]);

  return (
    <div className="flex flex-col items-center gap-6 p-8">
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
};