import { FC, useMemo, useState } from "react";
import { Board as BoardUI } from "@repo/ui/board";
import { BoardSize } from "@repo/types/board";
import { SquareType } from "@repo/types/square";
import { 
  getTarget, 
  isSameSquare, 
  mapSizeToPx 
} from "../utils";

type Prop = {
  size: BoardSize;
};

export const Board: FC<Prop> = ({
  size
}) => {
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
    
    setCurrentTarget(getTarget(size));
  };

  const squareSizePx = useMemo(() => mapSizeToPx(size), [size]);

  return <BoardUI 
    size={size}
    squareSizePx={squareSizePx}
    handleSquareClick={handleSquareClick}
    currentTarget={currentTarget}
  />
} 