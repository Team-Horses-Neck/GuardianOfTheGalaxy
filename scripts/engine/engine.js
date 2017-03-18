
class Engine {
    constructor() {
        // Define game objects (player, enemies...)
        this._keyboard = new Keyboard();
        this._guardian = new Player(ctx, sprites.guardian);
        this._space = new SpaceBackground(ctx, sprites.spaceStatic, sprites.spaceMoving);

        
        this._gameObjectsArray.push(this._guardian);
    }

    gameLoop() {
        // Update
        guardian.update(this._keyboard);
        space.update();

        // Draw
        ctx.clearAll();
        _space.draw();
        _gameObjectsArray.foreach(u => u.draw());

        requestAnimationFrame(gameLoop);
    }

}

