class Enemy extends MovableUnit {

    constructor(x, y, ctx, sprite, speed, points) {
        super(x, y, ctx, sprite, speed);

        this._speedx = speed;
        this._speedy = 0;
        this._timeToShoot = this._newTimeToShoot();
        this.goDown = false;
        this._points = points;
        this._bonus = this.getBonus();
    }

    get points() {
        return this._points;
    }
    get bonus() {
        return this._bonus;
    }
    get goDown() {
        return this._goDown;
    }

    set goDown(value) {
        this._goDown = value;
    }

    _newTimeToShoot() {
        let now = new Date();
        now = now.getTime();


        let randomPeriod = Math.floor(ENEMY_MAXIMAL_FIRING_INTERVAL * Math.random()) +
            ENEMY_MINIMAL_FIRING_INTERVAL;

        return now + randomPeriod;
    }

    getBonus() {
        var random = Math.floor(Math.random() * 10);
        if (random <= 1) {
            return 'health';
        }
        else if (random >= 9) {
            return 'points';
        }
        else {
            return 'none';
        }
    }

    move() {
        this.x += this._speedx;
        this.y += this._speedy;

        const outSide = this.x < 0 || (this.x + this._sprite.width) > this._ctx.canvas.width;
        if (outSide && !this.goDown) {
            const enemyGoDownEvent = new CustomEvent('enemyGoDown');
            window.dispatchEvent(enemyGoDownEvent);
        }

        if (this.goDown) {
            this.y += ENEMY_DOWN;
            this._speedx = -this._speedx;
            this.x += this._speedx;
            this.goDown = false;
        }
    }

    update() {
        let now = new Date();
        now = now.getTime();

        if (this._timeToShoot - now < 0) {
            this._timeToShoot = this._newTimeToShoot();
            const fireEvent = new CustomEvent('projectileFired', {
                detail: {
                    firedBy: unitTypes.enemy,
                    x: this.x + this.width / 2,
                    y: this.y + this.height + 1
                }
            });
            window.dispatchEvent(fireEvent);
        }
    }
}
