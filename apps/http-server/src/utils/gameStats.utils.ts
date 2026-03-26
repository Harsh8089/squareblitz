import { GameState, GameStats } from '@repo/types/game';

export const prepareGameStats = (
  gameState?: GameState,
): GameStats | undefined => {
  if (!gameState) {
    return;
  }

  // TODO: calculate mpm, accuracy, avg time taken

  const moves = gameState.moves?.map((move, index) => {
    return {
      ...move,
      id: index,
      timeTaken: (move.timeTaken ?? 0) / 1000,
    };
  });

  return {
    id: gameState.id,
    moves: moves ?? [],
    accuracy: 98.14,
    mpm: 67,
  };
};
