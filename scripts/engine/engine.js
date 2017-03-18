class Engine {
    constructor(ctx, sprites) {
        // Define game objects (player, enemies...)
        this._ctx = ctx;
        this._userInput = new UserInput();
        this._guardian = new Player(ctx, sprites.guardian);
        this._space = new SpaceBackground(ctx, sprites.spaceStatic, sprites.spaceMoving);
        this._gameObjectsArray = [];
        this._gameObjectsArray.push(this._guardian);
    }

    gameLoop(engine, ctx) {
        // Update
        engine._guardian.update(engine._userInput);
        engine._space.update();

        // Draw
        ctx.clearAll();
        engine._space.draw();
        engine._gameObjectsArray.forEach(u => u.draw());

        requestAnimationFrame(function() {
            engine.gameLoop(engine, ctx);
        });
    }

}
