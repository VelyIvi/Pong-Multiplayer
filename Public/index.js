const socket = io("localhost:3000/");
let referee = false;

let menuType = "none";
let gameType = "none";

function setup() {
    start();
    socket.on("player", opponent);
    socket.on("ball", ballData);

    socket.on("getReady", readySignal);


    socket.emit("ready", socket.id);
}

function opponent(data){
    rightPlayer.y = data.y;
}

function readySignal(data){
    if(data.play) state = "play";
    else state = "wait";
    leftServes = boolean(Math.random()<0.5);
    if(data.referee == socket.id) referee = true;
    console.log(data.referee);
}
function ballData(data){
    if(referee){
        ball.x = data.x;
        ball.y = data.y;
        ball.xSpeed = data.xSpeed;
        ball.ySpeed = data.ySpeed;
    } else {
        ball.x = width-data.x;
        ball.y = data.y;
        ball.xSpeed = -data.xSpeed;
        ball.ySpeed = data.ySpeed;
    }
}

function draw() {
    if(menuType == "none" || menuType == "start") startMenu();
    else if (menuType == "game"){
        game();
        if (gameType == "online"){
            let playerData = {
                x: leftPlayer.x,
                y: leftPlayer.y,
            }
            let ballData = {
                x: ball.x,
                y: ball.y,
                xSpeed: ball.xSpeed,
                ySpeed: ball.ySpeed,
            }
            socket.emit("player", playerData);

            if (referee) {
                socket.emit("ball", ballData);
            }
        }
    }
}


