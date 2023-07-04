class Ball{
    constructor() {
        this.diameter = 20;

        this.x = width/2;
        this.y = height/2;
        this.xSpeed = 100;
        this.ySpeed = 100;

        this.multiplier = 1;

        this.positionHistory = [];
        this.maxPositionHistory = 30;
    }
    DrawTrail(){
        if (this.positionHistory.length > this.maxPositionHistory) {
            this.positionHistory.shift();
        }
        for (let i = 0; i < this.positionHistory.length; i++) {
            // how you want to draw the previous poses
            // relate it to i to change pose drawing over time
            circle(this.positionHistory[i].x, this.positionHistory[i].y, lerp(0,this.diameter, Math.pow(i/this.positionHistory.length, 3)));
        }
    }

    Draw(){
        circle(this.x, this.y, this.diameter);
    }

    Update(){
        this.x += this.xSpeed*delta;

        this.y += this.ySpeed*delta;

        if(this.y<this.diameter/2){
            this.y = this.diameter/2;
            this.ySpeed *= -1;
        }else if(this.y>height-this.diameter/2){
            this.y = height-this.diameter/2;
            this.ySpeed *= -1;
        }

        this.positionHistory.push({x:this.x, y:this.y})
    }

    CheckScore(){
        if(ball.x<ball.diameter/2){
            rightPoints++;
            leftServes = false;
            // ResetGame();
        }else if(ball.x>width-ball.diameter/2){
            leftPoints++;
            leftServes = true;
            // ResetGame();
        }
    }

    CheckCollision(player){
        if (this.x < width / 2 && this.xSpeed < 0) {
            if(!player.CheckCollision(this.x, this.y, this.diameter/2)) {
                return;
            }
            this.x = player.x + player.width / 2 + this.diameter / 2;
            let difPos = (this.y - player.y) / (player.height / 2);
            this.multiplier += player.bounceYMultiply;
            this.ySpeed = (this.ySpeed * player.bounceBallInfluence + difPos * player.bounceMultiply*this.multiplier);

            this.xSpeed = -1 * ball.xSpeed + player.bounceAddForce;
        } else if (this.x > width / 2 && this.xSpeed > 0) {
            if(!player.CheckCollision(this.x, this.y, this.diameter/2)) {
                return;
            }

            this.x = player.x - player.width / 2 - this.diameter / 2;
            let difPos = (this.y - player.y) / (player.height / 2);

            this.multiplier += player.bounceYMultiply;

            this.ySpeed = (this.ySpeed * player.bounceBallInfluence + difPos * player.bounceMultiply*this.multiplier);

            this.xSpeed = -1 * ball.xSpeed - player.bounceAddForce;
        }
    }

}