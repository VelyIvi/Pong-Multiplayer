let delta;
let controls;
let rightPlayer;

let leftPlayer;


let ball;

let leftServes;

let state = "wait";

function whiteColor() {
    if (arguments.length == 0) {
        return color(235, 229, 206);
    } else {
        return color(235, 229, 206, arguments[0]);
    }
}

function blackColor(alpha) {
    if (arguments.length == 0) {
        return color(23, 18, 25);
    } else {
        return color(23, 18, 25, arguments[0]);
    }
}

let BUTTONSTYLE = {
    color: "#ebe5ce", hover_color: "#f3efe2", pressed_color: "#fdfcfa",
    text_color: "rgb(23, 18, 25)", border_color: "rgb(23, 18, 25)",
    text_size: 40
};
function setLineDash(list) {
    drawingContext.setLineDash(list);
}
function start(){
    leftServes = boolean(Math.random()<0.5);
    createCanvas(1600, 800);

    controls = new Controls()

    leftPlayer = new Paddle(60,height/2,1);

    rightPlayer = new Paddle(width-60,height/2,0);

    ball = new Ball();

    ball.x = width/2;
    ball.y = height/2;

    ball.xSpeed = 400 * (leftServes ? -1 : 1);
    ball.ySpeed = 250 * (Math.random()*2-1);
    ball.multiplier = 1;

    leftPlayer.y = height/2;
    rightPlayer.y = height/2;
    rightPlayer.y = height/2;

    while(ball.positionHistory.length > 0) {
        ball.positionHistory.pop();
    }
}
function restart(){
    leftServes = boolean(Math.random()<0.5);
    leftPlayer.points = 0;
    rightPlayer.points = 0;
    state = "wait";
    start();
}

function drawGame() {
    switch (state) {
        case "play":
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
let resumeButton;
let restartButton;
let settingsButton;
let exitButton;

function PauseMenu(){
    background(blackColor(150));
    resumeButton = {x: width/2, y: height/2-90, w:300, h: 50,
        origin_x:0.5, origin_y:0.5,
        text:"Resume", style: BUTTONSTYLE
    };
    restartButton = {x: width/2, y: height/2-30, w:300, h: 50,
        origin_x:0.5, origin_y:0.5,
        text:"Restart", style: BUTTONSTYLE
    };
    settingsButton = {x: width/2, y: height/2+30, w:300, h: 50,
        origin_x:0.5, origin_y:0.5,
        text:"Settings", style: BUTTONSTYLE
    };
    exitButton = {x: width/2, y: height/2+90, w:300, h: 50,
        origin_x:0.5, origin_y:0.5,
        text:"Exit", style: BUTTONSTYLE
    };


    fill(whiteColor());
    textAlign(CENTER, CENTER);
    textSize(50);
    text("PAUSED", width/2, height/2-150);

    setLineDash([0]);
    button(resumeButton);
    button(restartButton);
    button(settingsButton);
    button(exitButton);

}

function PausedState(){
    DrawGame();
    PauseMenu();
    if(controls.escape || resumeButton.pressed){
        controls.escape = false;

        if(rightPlayer.points == 0 && leftPlayer.points == 0 && ball.x == width/2 && ball.y == height/2){
            state = "wait";
        } else {
            state = "play";
        }
    } else if (restartButton.pressed){
        restart();
    }
}

function WaitState(){
    if(controls.enter){
        controls.enter = false;
        state = "play";
    } else if(controls.escape){
        controls.escape = false;
        state = "pause";
    }


    DrawGame();

    stroke(whiteColor());
    noFill()
    setLineDash([0]);
    line(ball.x, ball.y, ball.x+ball.xSpeed, ball.y+ball.ySpeed);


    background(blackColor(150));

    fill(whiteColor());
    textAlign(CENTER, CENTER);
    textSize(60);
    text("To start press ENTER", width/2, height/2);


}

function PlayState(){



    if(controls.escape){
        controls.escape = false;
        state = "pause";
    }

    delta = deltaTime*0.001;
    // leftPlayer.Update();
    leftPlayer.Update(controls.leftUp, controls.leftDown);

    rightPlayer.Update(controls.rightUp, controls.rightDown);




    ball.Update();
    ball.CheckCollision(leftPlayer);
    ball.CheckCollision(rightPlayer);
    ball.CheckScore();

    DrawGame();
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
    text(leftPlayer.points, 20, 30);
    text(rightPlayer.points, width-20, 30);

    fill(whiteColor());
}