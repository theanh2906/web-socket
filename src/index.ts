import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
const app = express();
const server = createServer(app);
const PORT = process.env.PORT ?? 8080;
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ["Content-Type"],
        credentials: true
    }
});
io.on('connection', (socket) => {
    console.log('WebSocket connection established');
    socket.emit('message', 'Connected!');
    socket.on('message', (message: any) => {
        console.log('Received message:', JSON.parse(message));
    });

    socket.on('close', () => {
        console.log('Client disconnected');
    });

    socket.on('error', (error: any) => {
        console.error('WebSocket error:', error);
    });
});

app.get('/', (req, res) => {
    res.json({ success: true })
})

server.listen(PORT, () => {
    console.log(`'server running at port ${PORT}'`);
});
module.exports = app;