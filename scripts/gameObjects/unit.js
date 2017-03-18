class Unit {
    constructor(x, y, ctx, sprite, speed) {
        this._ctx = ctx;
        this._sprite = sprite;
        this._speed = speed;

        this._x = x;
        this._y = y;

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

    get speed() {
        return this._speed;
    }

    set speed(value) {
        this._speed = value;
    }

    get width(){
        return this._ctx.canvas.width;
    }
    
    get height(){
        return this._ctx.canvas.height;
    }
    // used for collision detection
    get radius(){
        return this._radius;
    }

    move() {

    }

    draw() {
        const ctx = this._ctx;
        ctx.drawImage(
            this._sprite,
            this.x, this.y,
            this._sprite.width, this._sprite.height);

    }
}