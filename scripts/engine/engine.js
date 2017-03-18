class Engine {
    constructor(ctx, sprites) {
        // Define game objects (player, enemies...)
        this._ctx = ctx;
        this._userInput = new UserInput();
        this._sprites = sprites;
        this._guardian = new Player(ctx, sprites.guardian);
        this._space = new SpaceBackground(ctx, sprites.spaceStatic, sprites.spaceMoving);
        this._gameObjectsArray = [];
        this._gameObjectsArray.push(this._guardian);
        this.resetGame();
    }

    resetGame() {     //sets the initial field

        //For now - only one enemy
        const enemy = new Enemy(20, 20, this._ctx, this._sprites.enemy, 0.5);
        this._gameObjectsArray.push(enemy);
    }

    launchNewShell(e) {

        const newShell = new Shell(e.enemyX, e.enemyY, this._ctx, this._sprites.shell, 1, 1);
        this._gameObjectsArray.push(newShell);
    }

    gameLoop(engine, ctx) {
        // Update
        engine._guardian.updateGuardian(engine._userInput);
        engine._space.update();
        engine._gameObjectsArray.forEach(u => u.move());
        engine._gameObjectsArray.forEach(u => u.update());

        // Draw
        ctx.clearAll();
        engine._space.draw();
        engine._gameObjectsArray.forEach(u => u.draw());

        requestAnimationFrame(function () {
            engine.gameLoop(engine, ctx);
        });
    }

}
