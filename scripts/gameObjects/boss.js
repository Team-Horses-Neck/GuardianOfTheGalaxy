/**
 * Created by Joro on 3/19/2017.
 */
class Boss extends Unit{

    constructor(x, y, ctx, sprite, speed){
        super(x, y, ctx, sprite, speed);

        this.targetX = this._ctx.canvas.width / 2;
        this.targetY = this._ctx.canvas.height / 2;
    }

    get targetX(){
        return this._targetX;
    }

    set targetX(value){
        this._targetX = value;
    }

    get targetY(){
        return this._targetY;
    }

    set targetY(value){
        this._targetY = value;
    }

    move(){
        if (this.targetX > this.x){
            this.x += this.speed;

            if(this.x > this.targetX){
                this.x = this.targetX;
            }
        } else if(this.targetX < this.x){
            this.x -= this.speed;

            if(this.x < this.targetX){
                this.x = this.targetX;
            }
        }

        if(this.targetY > this.y){
            this.y += this.speed;

            if(this.y > this.targetY){
                this.y = this.targetY;
            }
        } else if(this.targetY < this.y){
            this.y -= this.speed;

            if(this.y < this.targetY){
                this.y = this.targetY;
            }
        }
    }

    update(){
        if(this.x === this.targetX && this.y === this.targetY){
            this._getTargetPosition();
        }
    }

    _getTargetPosition(){
        let newTargetX = Math.floor(Math.random() * this._ctx.canvas.width);
        this.targetX = newTargetX;

        let newTargetY = Math.floor(Math.random() * this._ctx.canvas.height);
        this.targetY = newTargetY;
    }
}