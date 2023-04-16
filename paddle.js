class Paddle{
    constructor(x, y, left) {
        this.left = left;
        this.height = 180;
        this.width = 24;
        this.x = x;
        this.y = y;
        this.speed = 700;

        this.bounceAddForce = 150; //how much extra speed is added to the current x speed of the ball.
        this.bounceMultiply = 400; //how much the angle of the ball changes after the bounce of the paddle.
        this.bounceBallInfluence = 0.3; //0.0f-1.0f range recomended. Influence of the current speed on the speed following the bounce.
        this.bounceYMultiply  = 0.1;

        this.points = 0;
    }
    Draw(){
        rect(this.x-this.width/2, this.y-this.height/2, this.width, this.height);
    }

    Update(up, down){
        if(up){
            this.y -= this.speed*delta;
        } if (down){
            this.y += this.speed*delta;
        }

        if (this.y < this.height/2){
            this.y = this.height/2;
        } else if (this.y > height-this.height/2){
            this.y = height-this.height/2;
        }
    }
    CheckCollision(circleX, circleY, circleRadius){
        let testX = circleX;
        let testY = circleY;
        if (circleX < this.x-this.width/2)                       testX = this.x-this.width/2;      // test left edge
        else if (circleX > this.x+this.width/2)       testX = this.x+this.width;   // right edge
        if (circleY < this.y-this.height/2)                       testY = this.y-this.height/2;      // top edge
        else if (circleY > this.y+this.height/2)      testY = this.y+this.height/2;   // bottom edge

        // get distance from closest edges
        let distX = circleX-testX;
        let distY = circleY-testY;
        let distance = sqrt( (distX*distX) + (distY*distY) );

        // if the distance is less than the radius, collision!
        return distance <= circleRadius;

    }
}