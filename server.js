class PlayerGame {
    constructor(referee, player, room) {
        this.referee = referee;
        this.player = player;
        this.scoreReferee = 0;
        this.scorePlayer = 0;
        this.room = room;
    }
}

function makeid(length){
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

const express = require("express");

const app = express();
const server = app.listen(process.env.PORT || 3000);

app.use(express.static("Public"));

console.log("Server is running");

const state = {};
const clientRooms = {};



const socket = require("socket.io");
const io  = socket(server);

io.sockets.on("connection", newConnection);


function startGame(socket){

    let y = Math.random();
    if (y < 0.5) y = -1;
    else y= 1;

    let data = {
        x: 800,
        y: 400,
        xSpeed: 400 * y,
        ySpeed: 300 * (Math.random()*2-1),
    }
    socket.emit("ball", data);
    socket.broadcast.emit("ball", data);
}


function newConnection(socket){
    console.log("new connection: " + socket.id);

    socket.on("player", playerData);
    socket.on("ball", ballData);
    // socket.on("ready", playerReady);


    socket.on("newGame", handleNewGame);
    socket.on("joinGame", handleJoinGame);

    // socket.on("score", scoreUpdate);


    function playerData(data){
        socket.broadcast.emit("player", data);
    }

    function ballData(data){
        socket.broadcast.emit("ball", data);
    }
    function scoreUpdate(data){
        socket.broadcast.emit("score", data);
    }

    // function playerReady(data){
    //     waitingPlayers.push(data);
    //     if(waitingPlayers.length>=2){
    //
    //         socket.emit("getReady", {
    //             referee: waitingPlayers.at(0),
    //             play: true,
    //         });
    //         socket.broadcast.emit("getReady", {
    //             referee: waitingPlayers.at(0),
    //             play: true,
    //         });
    //         startGame(socket);
    //     }
    // }

    function handleNewGame(data){
        let roomName = makeid(5);
        clientRooms[socket.id] = roomName;
        socket.emit("gameCode", roomName);

        state[roomName] = "waiting";

        socket.join(roomName);
        socket.number = 1;
        console.log(roomName);
        console.log(socket.number);
    }

    async function handleJoinGame(roomName) {

        const sockets = await io.in(roomName).fetchSockets() // returns an array of all sockets
        const socketCount = sockets.length;

        console.log(socketCount);
        if (socketCount === 0) {
            socket.emit("failedConnection", 0); //unknown
            return;
        } else if (socketCount >= 2) {
            socket.emit("failedConnection", 1); //full
            return;
        }

        clientRooms[socket.id] = roomName;

        socket.join(roomName);
        socket.number = 2;



        socket.emit("getReady", {
            referee: socket.id,
            play: true,
        });

        socket.broadcast.emit("getReady", {
            referee: socket.id,
            play: true,
        });
        console.log(io.sockets.adapter.rooms);

        startGame(socket);

    }
}
