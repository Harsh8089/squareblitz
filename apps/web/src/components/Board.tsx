import { Board as BoardUI } from '@repo/ui/board';
import { ResponseType } from '../contexts/types';
import { SquareType } from '@repo/types/square';
import { FC, useEffect, useMemo } from 'react';
import { BoardSize } from '@repo/types/board';
import { Navigate } from 'react-router-dom';
import { mapSizeToPx } from '../utils';
import { useGame } from '../contexts';

export const Board: FC = () => {
  const {
    start,
    send,
    verify,
    end,
    gameState: { filter, currentTarget } = {},
  } = useGame();

  const { size, mode, timer } = filter ?? {};

  if (!size || !mode || !timer) {
    return <Navigate to={'../setup'} />;
  }

  const setTarget = async (size: BoardSize) => {
    await send(size);
  };

  const handleSquareClick = async (square: SquareType) => {
    await verify(0, square);
    setTarget(size);
  };

  useEffect(() => {
    start().then((res: ResponseType) => {
      if (res.success) {
        // show toaster for success
        setTarget(size);
      }
    });

    return () => {
      end().catch(console.error);
    };
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
