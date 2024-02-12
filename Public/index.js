const socket = io("localhost:3000/");
let referee = false;

let menuType = "none";
let gameType = "none";

let gameConnectionCode = "";

let mousePressedHistory;

let gameConnectionError;

function makeNewGame(){
    socket.on("gameCode", handleGameCode);

    socket.emit("newGame", socket.id);

    multiplayerOn();

}
function multiplayerOn(){
    socket.on("player", opponent);
    socket.on("ball", ballData);
    socket.on("score", scoreUpdate);


    socket.on("getReady", readySignal);



    // socket.emit("ready", socket.id);

}

function handleGameCode(gameCode) {
    console.log(gameCode);
    gameConnectionCode = gameCode;
}

function handleFailedConnection(errorType){
    if (errorType === 0){
        gameConnectionError = "Unknown room code";
    } else if (errorType === 1){
        gameConnectionError = "Room full";
    }
}

function joinGame(roomName){
    socket.on("failedConnection", handleFailedConnection);
    socket.on("getReady", readySignal);
    socket.emit("joinGame", roomName);

}
function multiplayerOff(){
    socket.off("player", opponent);
    socket.off("ball", ballData);
    socket.off("getReady", readySignal);
}

function setup() {
    var myCanvas = createCanvas(1600, 800);
    myCanvas.parent("CanvasElement");
    console.log(socket.id);

}

function opponent(data){
    rightPlayer.y = data.y;
}

function readySignal(data){
    start();
    if(data.play) {
        state = "play";
        menuType = "game";
        gameType = "online";
    }
    else {
        state = "wait";
        menuType = "online";
        gameType = "none";
    }
    if(data.referee == socket.id) {
        referee = true;
        leftServes = boolean(Math.random()<0.5);
    }
    multiplayerOn();
    startPlay();

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
function scoreUpdate(data){
    if(referee){
        leftPoints = data.left;
        rightPoints = data.right;
    } else {
        leftPoints = data.right;
        rightPoints = data.left;
    }
}

function draw() {
    if(menuType == "none" || menuType == "start") startMenu();
    else if(menuType == "select") selectMenu();
    else if (menuType == "online") onlineMenu();
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
// function mousePressed() {
//     mousePressedHistory = true;
// }

function mouseReleased() {
    mousePressedHistory = false;
}