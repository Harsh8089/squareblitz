import { WebSocketServer } from "ws";

const PORT = Number(process.env.PORT || 8001);

const wss = new WebSocketServer(
  { 
    port: PORT
  }
);

wss.on("connection", (ws) => {
  console.log("Client connected");
  ws.on("message", (message) => {
    console.log(`Received message: ${message}`);
  });

  ws.on('error', console.error);
});

console.log(`WebSocket server is running on port ${PORT}`);