class Shell extends Unit {
    constructor(x, y, ctx, sprite, speed, direction) {
        super(x, y, ctx, sprite, speed);

        this.direction = direction;
    }

    get direction() {
        return this._direction;
    }

    set direction(value) {
        if (value < 0) {
            this._direction = -1;
        }
        else if (value > 0) {
            this._direction = 1;
        }
        else {
            throw new Error("Shell speed can not be 0");
        }
    }

    update() {

    }

    move() {
        this.y = this.y + (this.speed * this.direction);
    }

}