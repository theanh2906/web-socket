import express from 'express';
import { createServer } from 'http';
const app = express();
const server = createServer(app);
import WebSocket, { WebSocketServer } from 'ws';
const PORT = process.env.PORT ?? 8080;
//@ts-ignore
const wss = new WebSocket.Server({ port: PORT });
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
module.exports = app;