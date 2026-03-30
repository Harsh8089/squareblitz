import { GameState, GameStats, Move } from '@repo/types/game';

export const prepareGameStats = (
  gameState: GameState | null,
): GameStats | undefined => {
  if (!gameState) {
    return;
  }

  const timer = gameState.filter?.timer!;
  let avgTimeTaken = 0;
  let best = +timer;
  let worst = 0;
  let streak = 0;
  let lcStreak = 0;
  let accuracy = 0;
  let mpm = 0;

  const moves: Move[] = [];

  for (const move of gameState.moves ?? []) {
    if (!move.clickedSquare) {
      break;
    }

    const timeTaken = +((move.timeTaken ?? 0) / 1000).toFixed(2);

    avgTimeTaken += timeTaken;
    best = Math.min(best, timeTaken);
    worst = Math.max(worst, timeTaken);

    if (move.isCorrect) {
      lcStreak++;
      streak = Math.max(streak, lcStreak);
    } else {
      lcStreak = 0;
    }

    moves.push({ ...move, timeTaken });
  }

  const totalMoves = moves?.length ?? 0;
  const correctCount = moves?.filter((m) => m.isCorrect).length ?? 0;

  if (totalMoves) {
    avgTimeTaken = +(avgTimeTaken / totalMoves).toFixed(2);
    accuracy = +((correctCount / totalMoves) * 100).toFixed(2);
    mpm = +((correctCount / +timer) * 60).toFixed(1);
  }

  return {
    id: gameState.id,
    moves: moves,
    accuracy,
    mpm,
    avgTimeTaken,
    best: totalMoves ? best : 0,
    worst,
    streak,
    timer,
  };
};
