class Engine {
    constructor(ctx, sprites) {
        this._userInput = new UserInput();
        this._space = new SpaceBackground(ctx, sprites.spaceStatic, sprites.spaceMoving);

        this._ctx = ctx;
        this._sprites = sprites;
        // Define game objects (player, enemies...)

        this._gameObjectsArray = [];
        this._enemies = [];
        this._projectiles = [];
        this._walls = [];

        this.initGame();
    }

    createEnemyArmy() {
        for (let i = 0; i < ENEMY_ROWS; i += 1) {
            for (let j = 0; j < ENEMIES_PER_ROW; j += 1) {
                const enemy = new Enemy(j*this._sprites.enemy.width*ENEMY_DENSITY+2, 
                    i*this._sprites.enemy.height*ENEMY_DENSITY, 
                    this._ctx, 
                    this._sprites.enemy, 
                    ENEMY_SPEED);
                this._enemies.push(enemy);
                this._gameObjectsArray.push(enemy);
            }
        }
    }

    initGame() {
        //sets the initial field

        //For now - only one enemy
        const boss = new Boss(30, 30, this._ctx, this._sprites.boss, 2);
        this._enemies.push(boss);

        this.createEnemyArmy();

        //create player
        const guardianImage = this._sprites.guardian;
        const x = this._ctx.canvas.width / 2 - guardianImage.width / 2;
        const y = this._ctx.canvas.height - guardianImage.height;
        const player = new Player(x, y, this._ctx, guardianImage);

        //create wall
        this.createWall(this._ctx, this._sprites);

        this._gameObjectsArray.push(player);
        //this._gameObjectsArray.push(enemy);
    }

    launchNewProjectile(e) {
        let projectile;
        if (e.detail.firedBy === unitTypes.enemy) {
            const shooter = unitTypes.enemy;
            const direction = 1;
            projectile = new Projectile(e.detail.x, e.detail.y,
                this._ctx, this._sprites.projectile,
                PROJECTILE_SPEED, direction, shooter);
        } else if (e.detail.firedBy === unitTypes.player) {
            const shooter = unitTypes.player;
            const direction = -1;
            projectile = new Projectile(e.detail.x, e.detail.y,
                this._ctx, this._sprites.projectileUp,
                PLAYER_PROJECTILE_SPEED, direction, shooter);
        }
        this._projectiles.push(projectile);
    }

    onProjectileOut(e) { //Remove projectile when out from the screen
        const index = this._projectiles.findIndex(x => x.id === e.detail);
        this._projectiles.splice(index, 1);
    }

    onEnemyGoDown() {
        this._enemies.forEach(x => x.goDown = true);
    }

    gameLoop(engine, ctx) {
        // Update
        engine._space.update();
        engine._projectiles.forEach(u => u.move());
        engine._projectiles.forEach(u => u.update());
        engine._gameObjectsArray.forEach(u => u.move());

        engine._enemies.forEach(u => u.move());
        engine._enemies.forEach(u => u.update());
        engine._gameObjectsArray.forEach(u => u.update(this._userInput));


        const self = this;
        engine._projectiles.forEach(function (projectile) {

            self._walls.forEach(function (wall) {
                if (projectile.hasCollidedWith(wall)) {
                    console.log(1);
                }
            });
        });

        // Draw
        ctx.clearAll();
        engine._space.draw();

        //Possible fixes
        if(this._enemies.length !== 0){
            engine._walls.forEach(wall => wall.draw());
            engine._gameObjectsArray.forEach(u => u.draw());
            engine._projectiles.forEach(u => u.draw());
            engine._enemies.forEach(u => u.draw());
        } else{
            engine.createBoss();
        }

        requestAnimationFrame(function () {
            engine.gameLoop(engine, ctx);
        });
    }

    createWall(ctx, sprites) {
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

        for (const wall of this._walls) {
            this._gameObjectsArray.push(wall);
        }
    }
}
