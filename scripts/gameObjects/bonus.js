class Bonus extends MovableUnit {
    constructor(x, y, ctx, sprite, type) {
        super(x, y, ctx, sprite);

        this._type = type;
        this._direction = 1;
        this._speed = BONUS_SPEED;
    }
    get type() {
        return this._type;
    }
    get speed() {
        return this._speed;
    }
    move() {
        this.y = this.y + (this.speed * this._direction);
    }
}