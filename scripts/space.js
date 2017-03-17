class SpaceBg {
	constructor(ctx, staticBg, movingBg) {
		this._x = 0;
		this._y = 0;
		this._ctx = ctx;
		this._staticBg = staticBg;
		this._movingBg = movingBg;
		this._staticBgPattern = ctx.createPattern(this._staticBg, 'repeat');
	}

	update() {
		this._y += SPACE_SCROLL_SPEED;
		if (this._y >= this._ctx.canvas.height) {
			this._y = 0;
		}
	}

	draw() {
		// Distant stars stay in place
		this._ctx.fillStyle = this._staticBgPattern;
		this._ctx.fillRect(0, 0, this._ctx.canvas.width, this._ctx.canvas.height);

		// Closer stars move
		this._ctx.drawImage(this._movingBg, this._x, this._y);
		this._ctx.drawImage(this._movingBg, this._x, this._y - this._ctx.canvas.height);
	}
}
