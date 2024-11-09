/*import WebSocket from "ws";
import { fetchTransfers } from "./fetchTransfers.js";

export const setupWebSocket = (app) => {
  const wss = new WebSocket.Server({ noServer: true });

  // Handle WebSocket upgrade
  app.server.on("upgrade", (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit("connection", ws, request);
    });
  });

  wss.on("connection", (ws) => {
    console.log("Client connected");

    // Send the latest data to the client
    const sendTransfers = async () => {
      const transfers = await fetchTransfers(
        "0x8C39E0F96469E38DDD6d4727f876b5505698c596"
      );
      ws.send(JSON.stringify({ transfers }));
    };

    sendTransfers();

    const interval = setInterval(() => {
      sendTransfers();
    }, 10000);

    ws.on("close", () => {
      console.log("Client disconnected");
      clearInterval(interval); // Clear interval when client disconnects
    });
  });
};*/
