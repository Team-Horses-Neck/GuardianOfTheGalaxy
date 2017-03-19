class Wall {
    constructor(ctx, sprites, x, y) {
        this._ctx = ctx;
        this._health = 2;
        this._sprites = sprites;

        this.x = x;
        this.y = y;

        this._radius = (this.width + this.height) / 4;
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

    get health() {
        return this._health;
    }

    get width() {
        return this._sprites[0].width;
    }

    get height() {
        return this._sprites[0].height;
    }

    get radius() {
        return this._radius;
    }

    decreaseHealth() {
        this._health -= 1;
    }

    draw() {
        const ctx = this._ctx;
        ctx.drawImage(
            this._sprites[this._health - 1],
            this.x, this.y,
            this._sprites[this._health - 1].width, this._sprites[this._health - 1].height);
    }
}
