import { users, initGame, sendMove, verifyMove } from './game.js';
import { WebSocketServer } from 'ws';
import type { WebSocket } from 'ws';

const PORT = Number(process.env.PORT || 8001);

const wss = new WebSocketServer({
  port: PORT,
});

wss.on('connection', (ws: WebSocket) => {
  const userIdx = users.findIndex((user) => user.ws === ws);
  if (userIdx === -1) {
    users.push({
      ws,
      correct: 0,
      inCorrect: 0,
    });

    ws.send(
      JSON.stringify({
        success: true,
        message: 'Connected to ws server',
      }),
    );
  }

  ws.on('message', (message) => {
    const data = JSON.parse(message.toString());

    switch (data.mode) {
      case 'init':
        initGame(ws);

        break;

      case 'send':
        sendMove(ws);

        break;

      case 'verify':
        verifyMove(ws, data.target);

        break;
    }
  });

  ws.on('close', () => {
    const userIdx = users.findIndex((user) => user.ws === ws);
    if (userIdx !== -1) {
      users.splice(userIdx, 1);
    }
  });

  ws.on('error', console.error);
});

console.log(`WebSocket server is running on port ${PORT}`);
