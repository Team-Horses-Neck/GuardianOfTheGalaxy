const getNextId = (function () {
    let counter = 0;
    return function () {
        counter += 1;
        return counter;
    };
})();

class Projectile extends Unit {
    constructor(x, y, ctx, sprite, speed, direction, shooter) {
        super(x, y, ctx, sprite, speed);

        this._shooter = shooter;
        this.direction = direction;
        this._id = getNextId();
    }

    get id() {
        return this._id;
    }

    get shooter() {
        return this._shooter;
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
            throw new Error("Projectile speed can not be 0");
        }
    }

    update() {

    }

    move() {
        this.y = this.y + (this.speed * this.direction);

        const out = this.y < 0 || this.y > this._ctc.canvas.height;
        if (out) {
            const projectileOutEvent = new CustomEvent('projectileOut', { detail: this.id });
            window.dispatchEvent(projectileOutEvent);

        }

    }

}