class Space {
    constructor(sprite, canvas){
        this._canvas = canvas;
		this._sprite = sprite;
		this._speed = 1;
		this.x = 0;
		this.y = 0;
    }

    get width() {
		return this._sprite.width;
	}
	get height() {
		return this._sprite.height;
	}

    draw(ctx){
        ctx.drawImage(
			this._sprite,
			this.x, this.y,
			this._sprite.width, this._sprite.height);
    }

    //TODO animate moving space
}