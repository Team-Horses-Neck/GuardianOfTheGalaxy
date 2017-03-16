function Player(sprite, x, y) {
	this._sprite = sprite;
	this.x = x;
	this.y = y;
	
	this.draw = function(ctx) {
		ctx.drawImage(
			this._sprite, 
			this.x, this.y, 
			this._sprite.width, this._sprite.height);
	};
}
