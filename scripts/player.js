class Player {
	constructor(sprite, canvas) {
		this._canvas = canvas;
		this._sprite = sprite;
		this._speed = 7;
		this.x = this._canvas.width / 2 - this.width / 2;
		this.y = this._canvas.height - this._sprite.height;
		this._shooting = false;
	}

	get width() {
		return this._sprite.width;
	}
	get height() {
		return this._sprite.height;
	}

	update(keyboard) {
		// update position
		if (keyboard.isDown(keyboard.LEFT)) {
			this.x -= this._speed;
		}
		if (keyboard.isDown(keyboard.RIGHT)) {
			this.x += this._speed;
		}

		/* 
		  Shoots continuously while key is pressed.
		  If we need single shot on press this must be chnaged.
		*/
		if (keyboard.isDown(keyboard.SPACE)) {
			this._shooting = true;
		} else {
			this._shooting = false;
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

		// Different shooting types drawing here
		if (this._shooting) {
			const color = '#f00';
			const margin = 1;
			const laser = {
				left: {
					x: this.x + margin,
					y: this.y + this.height / 2
				},
				right: {
					x: this.x + this.width - margin,
					y: this.y + this.height / 2
				}
			}

			ctx.strokeStyle = color;

			ctx.beginPath();
			ctx.moveTo(laser.left.x, laser.left.y);
			ctx.lineTo(laser.left.x, 0);
			ctx.stroke();
			ctx.closePath();

			ctx.beginPath();
			ctx.moveTo(laser.right.x, laser.right.y);
			ctx.lineTo(laser.right.x, 0);
			ctx.stroke();
			ctx.closePath();
		}
	}
}
