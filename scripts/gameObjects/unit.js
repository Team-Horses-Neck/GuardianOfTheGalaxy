class Unit {
    constructor(x, y, ctx, sprite) {
        this._x = x;
        this._y = y;

        this._ctx = ctx;
        this._sprite = sprite;


        this._radius = (sprite.width + sprite.height) / 4;
    }

    get x() {
        return this._x;
    }

    set x(value) {
        this._x = value;
    }

    get y() {
        return this._y;
    }

    set y(value) {
        this._y = value;
    }

    get width() {
        return this._sprite.width;
    }

    get height() {
        return this._sprite.height;
    }

    get radius() {
        return this._radius;
    }

    hasCollidedWith(withUnit) {
        //formula from workshops jumping pikachu
        let self = this;
        let x1 = self.x + (self.width / 2),
            y1 = self.y + (self.height / 2),
            x2 = withUnit.x + (withUnit.width / 2),
            y2 = withUnit.y + (withUnit.height / 2),
            distance = Math.sqrt(((x1 - x2) * (x1 - x2)) + ((y1 - y2) * (y1 - y2)));

        return distance <= (self.radius + withUnit.radius);
    }

    draw() {
        const ctx = this._ctx;
        ctx.drawImage(
            this._sprite,
            this.x, this.y,
            this._sprite.width, this._sprite.height);
    }
}
