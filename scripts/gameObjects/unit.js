class Unit {
    constructor(x, y, ctx){

    }
    
    
    draw() {
        const ctx = this._ctx;
        ctx.drawImage(
            this._sprite,
            this.x, this.y,
            this._sprite.width, this._sprite.height);

        if (this._lasersOn) {
            this._drawLasers(ctx);
        }
    }
}