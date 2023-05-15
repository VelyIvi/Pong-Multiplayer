class PlayerGame {
    constructor(referee, player) {
        this.referee = referee;
        this.player = player;
        this.scoreReferee = 0;
        this.scorePlayer = 0;
    }
}

const express = require("express");

const app = express();
const server = app.listen(3000);

app.use(express.static("Public"));

console.log("Server is running");

let connections = [];
let waitingPlayers = [];


const socket = require("socket.io");
const io  = socket(server);

io.sockets.on("connection", newConnection);

function newConnection(socket){
    connections.push(socket)
    console.log("new connection: " + socket.id);

    socket.on("player", playerData);
    socket.on("ball", ballData);
    socket.on("ready", playerReady);

    function playerData(data){
        socket.broadcast.emit("player", data);
        // console.log(socket.id);
        // console.log(data);
    }

    function ballData(data){
        socket.broadcast.emit("ball", data);
        console.log(data);
    }

    function playerReady(data){
        if(waitingPlayers.length>0){
            console.log(waitingPlayers);

            socket.emit("play", {
                referee: waitingPlayers.at(0),
                play: true,
            });
            socket.broadcast.emit("play", {
                referee: waitingPlayers.at(0),
                play: true,
            });
        } else {
            waitingPlayers.push(data);
        }
    }

}
