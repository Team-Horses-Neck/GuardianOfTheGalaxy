class Boss extends MovableUnit {

    constructor(x, y, ctx, sprite, speed) {
        super(x, y, ctx, sprite, speed);

        this.targetX = this._ctx.canvas.width / 2;
        this.targetY = this._ctx.canvas.height / 2;
        this._timeToShoot = this._newTimeToShoot();
        this.points = BOSS_POINTS;
    }

    get targetX() {
        return this._targetX;
    }

    set targetX(value) {
        this._targetX = value;
    }

    get targetY() {
        return this._targetY;
    }

    set targetY(value) {
        this._targetY = value;
    }

    move() {
        if (this.targetX > this.x) {
            this.x += this.speed;

            if (this.x > this.targetX) {
                this.x = this.targetX;
            }
        } else if (this.targetX < this.x) {
            this.x -= this.speed;

            if (this.x < this.targetX) {
                this.x = this.targetX;
            }
        }

        if (this.targetY > this.y) {
            this.y += this.speed;

            if (this.y > this.targetY) {
                this.y = this.targetY;
            }
        } else if (this.targetY < this.y) {
            this.y -= this.speed;

            if (this.y < this.targetY) {
                this.y = this.targetY;
            }
        }
    }

    update() {
        if (this.x === this.targetX && this.y === this.targetY) {
            this._getTargetPosition();
        }

        let now = new Date();
        now = now.getTime();
        const offsetX = this.width / 2 - PROJECTILE_WIDTH / 2;
        if (this._timeToShoot - now < 0) {
            this._timeToShoot = this._newTimeToShoot();
            const fireEvent = new CustomEvent('projectileFired', {
                detail: {
                    firedBy: unitTypes.boss,
                    x: this.x + offsetX,
                    y: this.y
                }
            });
            window.dispatchEvent(fireEvent);
        }
    }

    _getTargetPosition() {
        let newTargetX = Math.floor(Math.random() * this._ctx.canvas.width);
        if(newTargetX > 835){
            newTargetX = 835;
        }
        if(newTargetX < 30){
            newTargetX = 30;
        }
        this.targetX = newTargetX;

        let newTargetY = Math.floor(Math.random() * this._ctx.canvas.height);
        console.log(this._ctx.canvas.height);
        if(newTargetY > 500){
            newTargetY = 500;
        }
        if(newTargetY < 30){
            newTargetY = 30;
        }
        this.targetY = newTargetY;
    }

    _newTimeToShoot() {
        let now = new Date();
        now = now.getTime();


        let randomPeriod = Math.floor(2000 * Math.random()) + 200;

        return now + randomPeriod;
    }
}
