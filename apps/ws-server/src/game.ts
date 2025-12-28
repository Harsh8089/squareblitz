import { SquareType } from '@repo/types/square';
import type { WebSocket } from 'ws';

const MAX_ROW_LENGTH = 8;

const ROWS = Array.from({ length: MAX_ROW_LENGTH }, (_, r) =>
  String.fromCharCode(r + 97),
);

export const users: {
  ws: WebSocket;
  correct: number;
  inCorrect: number;
  lastTarget?: SquareType;
}[] = [];

const initGame = (ws: WebSocket) =>
  ws.send(
    JSON.stringify({
      message: 'user connected successfully',
      success: true,
    }),
  );

const sendMove = (ws: WebSocket) => {
  const user = users.filter((user) => user.ws === ws)?.at(0);
  if (!user) {
    return ws.send(
      JSON.stringify({
        message: 'user is missing',
        success: false,
      }),
    );
  }

  const target = {
    file: ROWS[Math.floor(Math.random() * 8)],
    rank: Math.floor(Math.random() * 8) + 1,
  } as SquareType;

  user.lastTarget = target;

  return ws.send(
    JSON.stringify({
      mode: 'send',
      target,
      user,
    }),
  );
};

const verifyMove = (ws: WebSocket, target?: SquareType) => {
  if (!target) {
    return ws.send(
      JSON.stringify({
        message: 'target is missing to verify',
      }),
    );
  }

  const user = users.filter((user) => user.ws === ws)?.at(0);
  if (!user) {
    return ws.send(
      JSON.stringify({
        message: 'user is missing',
        success: false,
      }),
    );
  }

  const { file, rank } = user.lastTarget ?? {};

  if (file === target.file && rank === target.rank) {
    user.correct++;
    return ws.send(
      JSON.stringify({
        success: true,
      }),
    );
  } else {
    user.inCorrect++;
    return ws.send(
      JSON.stringify({
        success: false,
      }),
    );
  }
};

export { initGame, sendMove, verifyMove };
