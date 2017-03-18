class Enemy extends Unit {

    constructor(x, y, ctx, sprite, speed) {
        super(x, y, ctx, sprite, speed);

        this._speedx = speed;
        this._speedy = 0;
        this._timeToShoot = this._newTimeToShoot();

    }

    _newTimeToShoot() {
        let now = new Date();
        now = now.getTime();
        let randomPeriod = Math.floor(10000 * Math.random());
        console.log(now + randomPeriod);
        return now + randomPeriod;
    }

    move() {
        this.x += this._speedx;
        this.y += this._speedy;
        const outSide = this.x < 0 || this.x > this._ctx.canvas.width;
        if (outSide) {
            this._speedx = - this._speedx;
            this.move();  //move back from outside
        }
    }

    update() {
        let now = new Date();
        now = now.getTime();

        if (this._timeToShoot - now < 0) {
            this._timeToShoot = this._newTimeToShoot();
            const enemyFireEvent = new CustomEvent('enemyFireShell', { detail: { enemyX: this.x, enemyY: this.y } });
            window.dispatchEvent(enemyFireEvent);

        }
        console.log(this._timeToShoot - now);
    }
}