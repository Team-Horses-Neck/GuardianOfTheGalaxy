class Render {
    constructor(ctx) {
        this._ctx = ctx;
        this._space = new SpaceBackground(ctx, sprites.spaceStatic, sprites.spaceMoving);


    }

    get ctx() {
        return this._ctx;
    }

    update(){
        requestAnimationFrame(update, ctx);
    }

    clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    draw(arrayOfUnits) {
        arrayOfUnits.forEach(function (element) {
            const canvasContext = this.ctx;
            canvasContext.drawImage(
                    this._sprite,
                    this.x, this.y,
                    this._sprite.width, this._sprite.height);

        }, this);
    }
}