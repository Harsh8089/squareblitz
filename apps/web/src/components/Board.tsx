import { FC, useEffect, useMemo, useState } from "react";
import { Board as BoardUI } from "@repo/ui/board";
import { BoardSize } from "@repo/types/board";
import { SquareType } from "@repo/types/square";
import { mapSizeToPx } from "../utils";
import { useGame } from "../contexts";
import { ResponseType } from "../contexts/types";

type Prop = {
  size: BoardSize;
};

export const Board: FC<Prop> = ({
  size
}) => {
  const gameContext = useGame();
  
  if (!gameContext) {
    throw new Error("useGame must be used within a GameProvider");
  }
  
  const { start, send, verify } = gameContext;

  const [currentTarget, setCurrentTarget] = useState<SquareType>();
  const [score, setScore] = useState({ correct: 0, total: 0 });

  const setTarget = async (size: BoardSize) => {
    const response = await send(size) as ResponseType; 

    if(response.success) {
      console.log(response.data.target);
      setCurrentTarget(response.data?.target);
    }
  } 

  const handleSquareClick = async (square: SquareType) => {
    const response = await verify(0, square) as ResponseType;
    const isCorrect = response.success && response.statusCode === 200;

    setScore(prev => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1
    }));

    setTarget(size);
  };

  useEffect(() => {
    start()
    .then((res: ResponseType) => {
      if(res.success) {
        // show toaster for success
        setTarget(size);
      }
    })
  }, []);

  const squareSizePx = useMemo(() => mapSizeToPx(size), [size]);

  if(!currentTarget) {
    return;
  }

  return <BoardUI 
    size={size}
    squareSizePx={squareSizePx}
    handleSquareClick={handleSquareClick}
    currentTarget={currentTarget}
  />
} 