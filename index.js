const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        transports: ['websocket', 'polling'],
        credentials: true
    },
    allowEIO3: true
});
const {  spawn } = require('node:child_process');
let successLike = 0;

spawn('google-chrome', [
    '--disable-web-security',
    '--allow-running-insecure-content',
    '--nosession',
    '--no-sandbox',
    '--user-data-dir="/home/idr/Projects/social-robot-chrome-1"'
]);

server.listen(3000, () => {
    console.log('listening on *:3000');
});


io.on('successLike', () => {
    successLike++;
    console.log('successLike count', successLike);
});

