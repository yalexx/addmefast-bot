const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
let exec = require('child_process').exec;
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],

        transports: ['websocket', 'polling'],
        credentials: true
    },
    allowEIO3: true
});
const { spawn } = require('node:child_process');
const { CLIENT_RENEG_LIMIT } = require('tls');
let successLike = 0;
let runs = 1;
let currentUser = process.argv[2] || 1;
let loop = (process.argv[3] === "loop"); 

let lastUser = 16;

server.listen(3000, () => {
    // console.log('listening on *:3000');
});

io.on('successLikeRes', () => {
    successLike++;
    console.log('successLike count', successLike);
});

console.log('browser will restart in 50 sec');

async function main() {
    console.log('start browser...')
    await sleep(2000);
    startBrowser();
    if(loop) {
        console.log('MAIN RUNS', runs++);
        console.log('currentUser: ', currentUser);
        await sleep(50000); // 50 sec (50000)
        exec('killall opera');
        currentUser++;
    }
    
   
    
    if (currentUser > lastUser && loop) {
        currentUser = 1;
        console.log('kill browser start again in 4 hours');
        await sleep(14400000); // 4 hours
    }

    if(loop) {
        main() 
    }
    

 
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function startBrowser() {
    spawn('opera', [
        '--disable-web-security',
        '--allow-running-insecure-content',
        '--nosession',
        '--no-sandbox',
        `--user-data-dir="/home/idr/Projects/addmefast-bot-1/browser/social-robot-chrome-${currentUser}"`
    ]);
}

main()
