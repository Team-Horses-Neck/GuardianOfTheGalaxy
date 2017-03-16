class Player {
	constructor(sprite, canvas) {
		this._canvas = canvas;
		this._sprite = sprite;
		this._speed = 7;
		this.x = this._canvas.width / 2 - this.width / 2;
		this.y = this._canvas.height - this._sprite.height;
	}

	get width() {
		return this._sprite.width;
	}
	get height() {
		return this._sprite.height;
	}

	_shoot() {
		console.log('*insert shooting here*');
	}

	update(keyboard, canvas) {
		// update position
		if (keyboard.isDown(keyboard.LEFT)) {
			this.x -= this._speed;
		}
		if (keyboard.isDown(keyboard.RIGHT)) {
			this.x += this._speed;
		}

		/* 
		  Calls shoot() every frame while key is pressed.
		  If we need single shot on press this must be chnaged.
		*/
		if (keyboard.isDown(keyboard.SPACE)) {
			this._shoot();
		}

		// colide with walls
		if (this.x < 0)
			this.x = 0;
		else if (this.x + this.width > this._canvas.width)
			this.x = this._canvas.width - this.width;
	}

	draw(ctx) {
		ctx.drawImage(
			this._sprite,
			this.x, this.y,
			this._sprite.width, this._sprite.height);
	}
}
