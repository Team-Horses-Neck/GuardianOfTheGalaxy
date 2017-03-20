class Wall extends Unit {
    constructor(x, y, ctx, sprites, health) {
        super(x, y, ctx, sprites[0]);
        this._health = health;
        this._sprites = sprites;
    }

    get health() {
        return this._health;
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
