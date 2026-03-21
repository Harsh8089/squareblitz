import { useEnd, useSend, useVerify } from '../hooks/useGameMutations';
import { FC, memo, useEffect, useMemo } from 'react';
import { Board as BoardUI } from '@repo/ui/board';
import { Square } from '@repo/types/square';
import { Navigate } from 'react-router-dom';
import { mapSizeToPx, URL } from '../utils';
import { useGame } from '../contexts';

export const Board: FC = memo(() => {
  const { mutate: send } = useSend();
  const { mutateAsync: verify } = useVerify();
  const { mutateAsync: end } = useEnd();

  const { gameState } = useGame();

  const { filter, moves } = gameState ?? {};

  const { size, mode, timer } = filter ?? {};
  const currentTarget = moves?.at(-1)?.targetSquare;

  if (!size || !mode || !timer) {
    return <Navigate to={`/${URL.SETUP}`} />;
  }

  const handleSquareClick = async (square: Square) => {
    await verify(square);
    send();
  };

  useEffect(() => {
    send();

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
});
