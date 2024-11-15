import express from 'express';
import { createServer } from 'http';
const app = express();
const server = createServer(app);
import WebSocket, { WebSocketServer } from 'ws';
const wss = new WebSocket.Server({ server });
const port = 8080;
wss.on('connection', (ws: WebSocket) => {
    console.log('WebSocket connection established');

    ws.on('message', (message: any) => {
        console.log('Received message:', JSON.parse(message));
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });

    ws.on('error', (error: any) => {
        console.error('WebSocket error:', error);
    });
});
// Start the server
server.listen(port, () => {
    console.log(`Server is listening on ${port}`);
});

module.exports = app;