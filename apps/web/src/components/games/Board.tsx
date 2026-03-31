import { useEnd, useSend, useVerify } from '../../hooks/useGameMutations';
import { FC, memo, useCallback, useEffect, useMemo } from 'react';
import { useGame, useGameSession } from '../../contexts';
import { Board as BoardUI } from '@repo/ui/board';
import { GameStatus } from '@repo/types/game';
import { Square } from '@repo/types/square';
import { mapSizeToPx } from '../../utils';

export const Board: FC = memo(() => {
  const { mutate: send } = useSend();
  const { mutateAsync: verify } = useVerify();
  const { mutateAsync: end } = useEnd();

  const { gameState } = useGame();
  const { size, isRunning } = useGameSession();

  const { moves } = gameState ?? {};
  const currentTarget = moves?.at(-1)?.targetSquare;

  const squareSizePx = useMemo(() => mapSizeToPx(size), [size]);

  useEffect(() => {
    send();

    return () => {
      end(GameStatus.COMPLETED).catch(console.error);
    };
  }, []);

  const handleSquareClick = useCallback(
    async (square: Square) => {
      if (isRunning) {
        await verify(square);
        send();
      } else {
        // TODO: show toaster saying "you have paused the game"
      }
    },
    [verify, send, isRunning],
  );

  if (!currentTarget) {
    return null;
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
