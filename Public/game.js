let delta;
let controls;
let rightPlayer;
let leftPlayer;


let ball;

let leftServes;

let leftPoints = 0;
let rightPoints = 0;


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
    delta = deltaTime*0.001;
    if(state == "play"){
        PlayState();
    } else if (state == "wait"){
        WaitState();
    }
}
function WaitState(){
    DrawGame();

    stroke(whiteColor());
    noFill();
    setLineDash([0]);
    // line(ball.x, ball.y, ball.x+ball.xSpeed, ball.y+ball.ySpeed);


    background(blackColor(150));

    fill(whiteColor());
    textAlign(CENTER, CENTER);
    textSize(60);
    text("Waiting for second player.", width/2, height/2);


}

function PlayState(){
    if (controls.leftUp || controls.rightUp){
        leftPlayer.y -= leftPlayer.speed*delta;

    }
    if (controls.leftDown || controls.rightDown){
        leftPlayer.y += leftPlayer.speed*delta;
    }

    leftPlayer.CheckLimits();

    ball.Update();
    ball.CheckCollision(leftPlayer);
    ball.CheckCollision(rightPlayer);


    // ball.CheckScore();


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
    text(leftPoints, 20, 30);
    text(rightPoints, width-20, 30);

    fill(whiteColor());
}