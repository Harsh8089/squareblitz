import { FC, useEffect, useMemo, useState } from 'react';
import { Board as BoardUI } from '@repo/ui/board';
import { ResponseType } from '../contexts/types';
import { SquareType } from '@repo/types/square';
import { BoardSize } from '@repo/types/board';
import { mapSizeToPx } from '../utils';
import { useGame } from '../contexts';

export const Board: FC = () => {
  const { start, send, verify, gameState } = useGame();
  const { size, mode, timer } = gameState?.filter!;

  if (!size || !mode || !timer) {
    return;
  }

  const [currentTarget, setCurrentTarget] = useState<SquareType>();
  const [score, setScore] = useState({ correct: 0, total: 0 });

  const setTarget = async (size: BoardSize) => {
    const response = (await send(size)) as ResponseType;

    if (response.success) {
      setCurrentTarget(response.data?.target);
    }
  };

  const handleSquareClick = async (square: SquareType) => {
    const response = (await verify(0, square)) as ResponseType;
    const isCorrect = response.success && response.statusCode === 200;

    setScore((prev) => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1,
    }));

    setTarget(size);
  };

  useEffect(() => {
    start().then((res: ResponseType) => {
      if (res.success) {
        // show toaster for success
        setTarget(size);
      }
    });
  }, []);

  const squareSizePx = useMemo(() => mapSizeToPx(size), [size]);

  if (!currentTarget) {
    return;
  }

  return (
    <BoardUI
      size={size}
      squareSizePx={squareSizePx}
      handleSquareClick={handleSquareClick}
      currentTarget={currentTarget}
    />
  );
};
