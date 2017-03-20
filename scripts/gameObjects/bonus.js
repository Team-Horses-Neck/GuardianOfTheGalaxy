class Bonus extends Unit {
    constructor(x, y, ctx, sprite, type) {
        super(x, y, ctx, sprite);

        this._type = type;
        this._direction = 1;
        this._speed = BONUS_SPEED;
    }
    get type() {
        return this._type;
    }

    move() {
        this.y = this.y + (this.speed * this._direction);
    }
}