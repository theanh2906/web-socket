"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const app = (0, express_1.default)();
const server = (0, http_1.createServer)(app);
const PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 8080;
const io = new socket_io_1.Server(server, {
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
    socket.on('message', (message) => {
        console.log('Received message:', JSON.parse(message));
    });
    socket.on('close', () => {
        console.log('Client disconnected');
    });
    socket.on('error', (error) => {
        console.error('WebSocket error:', error);
    });
});
app.get('/', (req, res) => {
    res.json({ success: true });
});
server.listen(PORT, () => {
    console.log(`'server running at port ${PORT}'`);
});
module.exports = app;
