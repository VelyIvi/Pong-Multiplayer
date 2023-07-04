let delta;
let controls;
let rightPlayer;
let leftPlayer;


let ball;


let leftPoints = 0;
let rightPoints = 0;

let state = "wait";


let leftServes = 1;

function exitPlay(){
    resetPlay();
    state = "wait";
    gameType = "none";
    menuType = "none";
}

function startPlay(){
    ball.x = width/2;
    ball.y = height/2;

    let y = Math.random();
    if (y < 0.5) leftServes = -1;
    else leftServes = 1;
    ball.xSpeed = 400 * leftServes;
    ball.ySpeed = 300 * (Math.random()*2-1);

    leftPoints = 0;
    rightPoints = 0;
}

function resetPlay(){
    ball.x = width/2;
    ball.y = height/2;


    ball.xSpeed = 400 * leftServes;
    ball.ySpeed = 300 * (Math.random()*2-1);
    ball.positionHistory.length = 0;
}

function start(){
    createCanvas(1600, 800);

    controls = new Controls()

    leftPlayer = new Paddle(60,height/2,1);

    rightPlayer = new Paddle(width-60,height/2,0);

    ball = new Ball();
    ball.x = width/2;
    ball.y = height/2;
    ball.xSpeed = 0;
    ball.ySpeed = 0;
    // ResetGame();
}
function game() {
    switch (state) {
    case "play":
        delta = deltaTime*0.001;
        PlayState();
        break;
    case "wait":
        WaitState();
        break;
    case "pause":
        PausedState();
        break;
    default:
        console.log(`Error in state.`);
    }
}
function WaitState(){
    DrawGame();

    stroke(whiteColor());
    noFill();
    setLineDash([0]);


    background(blackColor(150));
    fill(whiteColor());
    textAlign(CENTER, CENTER);
    textSize(60);

    if (gameType == "online") {
        textSize(30);
        text("Gamecode: " + gameConnectionCode, width / 2, 200);

        textSize(60);
        text("Waiting for second player.", width / 2, height / 2);
    } else if (gameType == "local"){
        text("Press enter to play", width/2, height/2);
        line(ball.x, ball.y, ball.x+ball.xSpeed, ball.y+ball.ySpeed);
        if(controls.enter){
            state = "play";
        }
    }
}

let resumeGameButton;
let exitGameButton;
function PausedState(){
    resumeGameButton = {x: width/2, y: 400-30, w:300, h: 50,
        origin_x:0.5, origin_y:0.5,
        text:"Resume", style:BUTTONSTYLE
    };
    exitGameButton = {x: width/2, y: 400+30, w:300, h: 50,
        origin_x:0.5, origin_y:0.5,
        text:"Exit", style:BUTTONSTYLE
    };

    if (gameType == "online") {
        ball.Update();
        ball.CheckCollision(leftPlayer);
        ball.CheckCollision(rightPlayer)
    }
    DrawGame();

    setLineDash([0]);
    background(blackColor(150));
    textSize(100);
    textAlign(CENTER, CENTER);
    text("Paused", width/2, 100);

    button(resumeGameButton);
    button(exitGameButton);

    if(resumeGameButton.pressed || controls.escape){
        controls.escape = false;
        if(gameType == "local"){
            state = "wait";
        } else if (gameType == "online"){
            state = "play";
        }
    } else if (exitGameButton.pressed){
        exitPlay();
    }


}

function PlayState(){
    if (gameType == "online") {
        if (controls.leftUp || controls.rightUp) {
            leftPlayer.y -= leftPlayer.speed * delta;
        }
        if (controls.leftDown || controls.rightDown) {
            leftPlayer.y += leftPlayer.speed * delta;
        }
        leftPlayer.CheckLimits();

        if(referee){
            if(ball.x<ball.diameter/2){
                leftServes = 1;
                rightPoints++;
                let scoreUpdateData = {
                    left: leftPoints,
                    right: rightPoints,
                }
                resetPlay();
                // socket.emit("ball", ballData);
                socket.emit("score", scoreUpdateData);

            }else if(ball.x>width-ball.diameter/2){
                leftServes = -1;
                leftPoints++;
                let scoreUpdateData = {
                    left: leftPoints,
                    right: rightPoints
                }
                resetPlay();
                // socket.emit("ball", ballData);
                socket.emit("score", scoreUpdateData);

            }
        }

    } else if (gameType == "local") {
        if (controls.leftUp) {
            leftPlayer.y -= leftPlayer.speed * delta;

        }
        if (controls.leftDown) {
            leftPlayer.y += leftPlayer.speed * delta;
        }

        if (controls.rightUp) {
            rightPlayer.y -= rightPlayer.speed * delta;

        }
        if (controls.rightDown) {
            rightPlayer.y += rightPlayer.speed * delta;
        }

        leftPlayer.CheckLimits();
        rightPlayer.CheckLimits();

        if(ball.x<ball.diameter/2){
            leftServes = 1;
            rightPoints++;
            resetPlay();
        }else if(ball.x>width-ball.diameter/2){
            leftServes = -1;
            leftPoints++;
            resetPlay();
        }


    } else if (gameType == "ai") {
        if (controls.leftUp || controls.rightUp) {
            leftPlayer.y -= leftPlayer.speed * delta;

        }
        if (controls.leftDown || controls.rightDown) {
            leftPlayer.y += leftPlayer.speed * delta;
        }
        leftPlayer.CheckLimits();
        rightPlayer.CheckLimits();
    }
        // ball.CheckScore();


    ball.Update();
    ball.CheckCollision(leftPlayer);
    ball.CheckCollision(rightPlayer);

    DrawGame();

    if(controls.escape) {
        controls.escape = false;
        state = "pause";
    }
}

function DrawGame(){
    background(blackColor());
    fill(whiteColor());
    // noFill();
    smooth();
    noStroke();
    leftPlayer.Draw();
    rightPlayer.Draw();
    ball.Draw();

    stroke(whiteColor());
    noFill()
    // setLineDash([0])
    setLineDash([0]); //another dashed line pattern

    ball.DrawTrail();

    const dashes = 101;
    setLineDash([height/dashes, height/dashes]); //another dashed line pattern
    stroke(whiteColor());
    line(width/2, 0, width/2, height);


    fill(whiteColor());
    noStroke();
    textSize(32);
    textAlign(CENTER);
    text(leftPoints, 20, 30);
    text(rightPoints, width-20, 30);

    fill(whiteColor());
}