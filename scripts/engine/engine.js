class Engine {
    constructor(ctx, sprites) {
        // Define game objects (player, enemies...)
        this._ctx = ctx;
        this._userInput = new UserInput();
        this._sprites = sprites;
        this._guardian = new Player(ctx, sprites.guardian);
        this._space = new SpaceBackground(ctx, sprites.spaceStatic, sprites.spaceMoving);
        this._gameObjectsArray = [];
        this._projectiles = [];
        this._gameObjectsArray.push(this._guardian);
        this.addWall(ctx, sprites);
        this.resetGame();
    }

    resetGame() { //sets the initial field

        //For now - only one enemy
        const enemy = new Enemy(20, 20, this._ctx, this._sprites.enemy, 0.5);
        //const shell = new Shell(200, 20, this._ctx, this._sprites.shell, 1, 1);
        //this._gameObjectsArray.push(shell);
        this._gameObjectsArray.push(enemy);
    }

    // launchNewShell(e) {

    //     const newShell = new Shell(e.detail.enemyX, e.detail.enemyY, this._ctx, this._sprites.shell, 1, 1);
    //     this._gameObjectsArray.push(newShell);
    //     const enemy = new Enemy(20, 20, this._ctx, this._sprites.enemy, ENEMY_SPEED);
    //     this._gameObjectsArray.push(enemy);
    // }

    launchNewProjectile(e) {        //Launch projectile by an enemy
        const newProjectile = new Projectile(e.detail.enemyX, e.detail.enemyY, this._ctx, this._sprites.projectile, 1, 1);
        this._projectiles.push(newProjectile);
    }

    onProjectileOut(e) {            //Remove projectile when out from the screen
        const index = this._projectiles.findIndex(x=>x.id===e.detail);
        this._projectiles.splice(index, 1);
    }

    gameLoop(engine, ctx) {
        // Update
        engine._guardian.updateGuardian(engine._userInput);
        engine._space.update();
        engine._projectiles.forEach(u => u.move());
        engine._projectiles.forEach(u => u.update());
        engine._gameObjectsArray.forEach(u => u.move());
        engine._gameObjectsArray.forEach(u => u.update());

        // Draw
        ctx.clearAll();
        engine._space.draw();
        engine._gameObjectsArray.forEach(u => u.draw());
        engine._projectiles.forEach(u => u.draw());

        requestAnimationFrame(function() {
            engine.gameLoop(engine, ctx);
        });
    }

    addWall(ctx, sprites) {
        const canvasHeight = ctx.canvas.height;
        const canvasWidth = ctx.canvas.width;
        for (let i = 1; i < 6; i += 1) {
            this._gameObjectsArray.push(new Wall(ctx, sprites.wallHightLeft, canvasWidth * 0.1 * i + (i - 1) * 3 * sprites.wall.width, canvasHeight * 0.7));
            this._gameObjectsArray.push(new Wall(ctx, sprites.wall, canvasWidth * 0.1 * i + (i - 1) * 3 * sprites.wall.width + sprites.wall.width, canvasHeight * 0.7));
            this._gameObjectsArray.push(new Wall(ctx, sprites.wallHightRight, canvasWidth * 0.1 * i + (i - 1) * 3 * sprites.wall.width + 2 * sprites.wall.width, canvasHeight * 0.7));
            this._gameObjectsArray.push(new Wall(ctx, sprites.wall, canvasWidth * 0.1 * i + (i - 1) * 3 * sprites.wall.width, canvasHeight * 0.7 + sprites.wall.width));
            this._gameObjectsArray.push(new Wall(ctx, sprites.wallMiddle, canvasWidth * 0.1 * i + (i - 1) * 3 * sprites.wall.width + sprites.wall.width, canvasHeight * 0.7 + sprites.wall.width));
            this._gameObjectsArray.push(new Wall(ctx, sprites.wall, canvasWidth * 0.1 * i + (i - 1) * 3 * sprites.wall.width + 2 * sprites.wall.width, canvasHeight * 0.7 + sprites.wall.width));
            this._gameObjectsArray.push(new Wall(ctx, sprites.wallDown, canvasWidth * 0.1 * i + (i - 1) * 3 * sprites.wall.width, canvasHeight * 0.7 + 2 * sprites.wall.width));
            this._gameObjectsArray.push(new Wall(ctx, sprites.wallDown, canvasWidth * 0.1 * i + (i - 1) * 3 * sprites.wall.width + 2 * sprites.wall.width, canvasHeight * 0.7 + 2 * sprites.wall.width));
        }
    }
}
