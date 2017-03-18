class Wall {
    constructor(ctx, sprite, x, y) {
        this._ctx = ctx;
        this._sprite = sprite;
        this.x = x;
        this.y = y;
    }

    get x() {
        return this._x;
    }
    set x(val) {
        this._x = val;
    }

    get y() {
        return this._y;
    }
    set y(val) {
        this._y = val;
    }
    draw() {
        const ctx = this._ctx;
        ctx.drawImage(
            this._sprite,
            this.x, this.y,
            this._sprite.width, this._sprite.height);
    }
}
