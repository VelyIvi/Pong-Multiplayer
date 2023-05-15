const socket = io("localhost:3000/");
let referee = false;
let state = "wait";
function setup() {
    start();
    socket.on("player", opponent);
    socket.on("ball", ballData);

    socket.on("play", startMSG);


    socket.emit("ready", socket.id);
}

function opponent(data){
    rightPlayer.y = data.y;
}

function startMSG(data){
    if(data.play) state = "play";
    else state = "wait";

    if(data.referee == socket.id) referee = true;
    console.log(data.referee);
}
function ballData(data){
    ball.x = width-data.x;
    ball.y = data.y;
    ball.xSpeed = -data.xSpeed;
    ball.ySpeed = data.ySpeed;
}

function draw() {
    game();

    let playerData = {
        x: leftPlayer.x,
        y: leftPlayer.y,
    }
    let ballData = {
        x : ball.x,
        y : ball.y,
        xSpeed : ball.xSpeed,
        ySpeed : ball.ySpeed,
    }
    socket.emit("player", playerData);

    if(referee){
        socket.emit("ball", ballData);
    }
}