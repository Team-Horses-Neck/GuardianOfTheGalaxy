class Bonus extends MovableUnit {
    constructor(x, y, ctx, sprite, bonusSpeed, type) {
        super(x, y, ctx, sprite);

        this._type = type;
        this._direction = 1;
        this._speed = bonusSpeed;
    }
    get type() {
        return this._type;
    }

    move() {
        this.y = this.y + (this.speed * this._direction);
    }
}
