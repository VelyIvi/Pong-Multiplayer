class PlayerGame {
    constructor(referee, player, room) {
        this.referee = referee;
        this.player = player;
        this.scoreReferee = 0;
        this.scorePlayer = 0;
        this.room = room;
    }
}

const express = require("express");

const app = express();
const server = app.listen(3000);

app.use(express.static("Public"));

console.log("Server is running");

let waitingPlayers = [];
let games = [];


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
    socket.on("ready", playerReady);

    function playerData(data){
        socket.broadcast.emit("player", data);
    }

    function ballData(data){
        socket.broadcast.emit("ball", data);
    }

    function playerReady(data){
        waitingPlayers.push(data);
        if(waitingPlayers.length>=2){

            socket.emit("getReady", {
                referee: waitingPlayers.at(0),
                play: true,
            });
            socket.broadcast.emit("getReady", {
                referee: waitingPlayers.at(0),
                play: true,
            });
            startGame(socket);
        }
    }
}
