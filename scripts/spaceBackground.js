class SpaceBackground {
    constructor(ctx, staticBackground, movingBackground) {
        this._x = 0;
        this._y = 0;
        this._ctx = ctx;
        this._staticBackground = staticBackground;
        this._movingBackground = movingBackground;
        this._staticBackgroundPattern = ctx.createPattern(staticBackground, 'repeat');
    }

    update() {
        this._y += SPACE_SCROLL_SPEED;
        if (this._y >= this._ctx.canvas.height) {
            this._y = 0;
        }
    }

    draw() {
        // Distant stars stay in place
        this._ctx.fillStyle = this._staticBackgroundPattern;
        this._ctx.fillRect(0, 0, this._ctx.canvas.width, this._ctx.canvas.height);

        // Closer stars move
        this._ctx.drawImage(this._movingBackground, this._x, this._y);
        this._ctx.drawImage(this._movingBackground, this._x, this._y - this._ctx.canvas.height);
    }
}
