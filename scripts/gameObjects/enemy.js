class Enemy extends Unit {

    constructor(x, y, ctx, sprite, speed) {
        super(x, y, ctx, sprite, speed);

        this._speedx = speed;
        this._speedy = 0;
        this._timeToShoot = this._newTimeToShoot();

    }

    _newTimeToShoot() {
        return new Date().setSeconds(10 * Math.random);
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
        const now = new Date();

        if (this._timeToShoot - now < 0) {
            this._timeToShoot = this._newTimeToShoot();
            const enemyFireEvent = new CustomEvent('enemyFireShell', { enemyX: this.x, enemyY: this.y });
            document.dispatchEvent('enemyFireShell');

        }
    }
}