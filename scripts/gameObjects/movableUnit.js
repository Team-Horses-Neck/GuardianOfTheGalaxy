class MovableUnit extends Unit{
    constructor(x, y, ctx, sprite, speed) {
        super(x, y, ctx, sprite);

        this._speed = speed;
    }

    get speed() {
        return this._speed;
    }

    set speed(value) {
        this._speed = value;
    }

    update() {

    }

    move() {

    }

}
