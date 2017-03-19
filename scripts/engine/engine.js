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
        this._walls = [];
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

    launchNewProjectile(e) { //Launch projectile by an enemy
        const newProjectile = new Projectile(e.detail.enemyX, e.detail.enemyY, this._ctx, this._sprites.projectile, 1, 1);
        this._projectiles.push(newProjectile);
    }

    onProjectileOut(e) { //Remove projectile when out from the screen
        const index = this._projectiles.findIndex(x => x.id === e.detail);
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

        //Detect collision
        const self = this;
        engine._projectiles.forEach(function(projectile) {

            self._walls.forEach(function(wall) {
                if (projectile.hasCollidedWith(wall)) {
                    console.log(1);
                }

            });

        });

        // Draw
        ctx.clearAll();
        engine._space.draw();
        engine._walls.forEach(wall => wall.draw());
        engine._gameObjectsArray.forEach(u => u.draw());
        engine._projectiles.forEach(u => u.draw());

        requestAnimationFrame(function() {
            engine.gameLoop(engine, ctx);
        });
    }

    addWall(ctx, sprites) {
        const canvasHeight = ctx.canvas.height;
        const canvasWidth = ctx.canvas.width;

        const spriteWidth = sprites.wall.width;
        const wallWidth = 3 * spriteWidth;
        const wallStartPosWidth = canvasWidth * WALL_START_POS_WIDTH;

        const spriteHeight = sprites.wall.height;
        const wallStartPosHeight = canvasHeight * WALL_START_POS_HEIGHT;


        const spritesHightLeft = [sprites.wallHightLeftHit, sprites.wallHightLeft];
        const spritesHightRight = [sprites.wallHightRightHit, sprites.wallHightRight];
        const spritesMiddle = [sprites.wallMiddleHit, sprites.wallMiddle];
        const spritesWall = [sprites.wallHit, sprites.wall];
        const spritesDown = [sprites.wallHit, sprites.wallDown];

        for (let i = 1; i < 6; i += 1) {
            this._walls.push(new Wall(ctx, spritesHightLeft,
                wallStartPosWidth * i + (i - 1) * wallWidth, wallStartPosHeight));
            this._walls.push(new Wall(ctx, spritesWall,
                wallStartPosWidth * i + (i - 1) * wallWidth + spriteWidth, wallStartPosHeight));
            this._walls.push(new Wall(ctx, spritesHightRight,
                wallStartPosWidth * i + (i - 1) * wallWidth + 2 * spriteWidth, wallStartPosHeight));
            this._walls.push(new Wall(ctx, spritesWall,
                wallStartPosWidth * i + (i - 1) * wallWidth, wallStartPosHeight + spriteHeight));
            this._walls.push(new Wall(ctx, spritesMiddle,
                wallStartPosWidth * i + (i - 1) * wallWidth + spriteWidth, wallStartPosHeight + spriteHeight));
            this._walls.push(new Wall(ctx, spritesWall,
                wallStartPosWidth * i + (i - 1) * wallWidth + 2 * spriteWidth, wallStartPosHeight + spriteHeight));
            this._walls.push(new Wall(ctx, spritesDown,
                wallStartPosWidth * i + (i - 1) * wallWidth, wallStartPosHeight + 2 * spriteHeight));
            this._walls.push(new Wall(ctx, spritesDown,
                wallStartPosWidth * i + (i - 1) * wallWidth + 2 * spriteWidth, wallStartPosHeight + 2 * spriteHeight));
        }
    }
}
