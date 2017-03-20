class Engine {
    constructor(ctx, sprites) {
        this._userInput = new UserInput();
        this._space = new SpaceBackground(ctx, sprites.spaceStatic, sprites.spaceMoving);

        this._ctx = ctx;
        this._sprites = sprites;
        this._totalScore = 0;
        // Define game objects (player, enemies...)

        //this._gameObjectsArray = [];
        this._enemies = [];
        this._projectiles = [];
        this._walls = [];

        this.initGame();
    }

    get totalScore() {
        return this._totalScore;
    }

    set totalScore(value) {
        this._totalScore = value;
    }

    get player(){
        return this._player;
    }
    set player(object){
        this._player = object;
    }

    createEnemyArmy() {
        for (let i = 0; i < ENEMY_ROWS; i += 1) {
            for (let j = 0; j < ENEMIES_PER_ROW; j += 1) {

                const firstHalfOfArmy = i <= ENEMY_ROWS / 2 - 1;
                const sprite = firstHalfOfArmy ? this._sprites.evilEnemy : this._sprites.enemy;
                const points = firstHalfOfArmy ? EVIL_ENEMY_POINTS : ENEMY_POINTS;

                const enemy = new Enemy(j * this._sprites.enemy.width * ENEMY_DENSITY + 2,
                    i * this._sprites.enemy.height * ENEMY_DENSITY,
                    this._ctx,
                    sprite,
                    ENEMY_SPEED,
                    points);

                this._enemies.push(enemy);
                //this._gameObjectsArray.push(enemy);
            }
        }
    }

    initGame() {
        //sets the initial field

        //For now - only one enemy

        this.printScore();

        this.createBoss();
        this.createEnemyArmy();

        //create player
        const guardianImage = this._sprites.guardian;
        const x = this._ctx.canvas.width / 2 - guardianImage.width / 2;
        const y = this._ctx.canvas.height - guardianImage.height;
        this.player = new Player(x, y, this._ctx, guardianImage);

        //create wall
        this.createWall(this._ctx, this._sprites);

        //this._gameObjectsArray.push(player);
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
        } else if (e.detail.firedBy === unitTypes.boss) {
            const shooter = unitTypes.boss;
            const direction = 1;
            projectile = new Projectile(e.detail.x, e.detail.y,
                this._ctx, this._sprites.projectile,
                BOSS_PROJECTILE_SPEED, direction, shooter);
        }

        this._projectiles.push(projectile);
    }

    onProjectileOut(e) { //Remove projectile when out from the screen
        const index = this._projectiles.findIndex(x => x === e.detail);
        this._projectiles.splice(index, 1);
    }

    onEnemyGoDown() {
        this._enemies.forEach(x => x.goDown = true);
    }

    onEnemiesToErase(e) {
        for (let i = 0; i < e.detail.length; i += 1) {
            let index = this._enemies.findIndex(x => x === e.detail[i]);
            this._enemies.splice(index, 1);
        }

        // for (let i = 0; i < e.detail.length; i += 1) {
        //     let index = this._gameObjectsArray.findIndex(x => x === e.detail[i]);
        //     this._gameObjectsArray.splice(index, 1);
        // }
    }

    onProjectilesToErase(e) {
        for (let i = 0; i < e.detail.length; i += 1) {
            let index = this._projectiles.findIndex(x => x === e.detail[i]);
            this._projectiles.splice(index, 1);
        }
    }

    onWallDestroy(e) {
        const index = this._walls.findIndex(w => w === e.detail);
        this._walls.splice(index, 1);
        //const indexObjectsArray = this._gameObjectsArray.findIndex(w => w === e.detail);
        //his._gameObjectsArray.splice(indexObjectsArray, 1);
    }

    printScore() { //Long live loose coupling and dependency injection! And encapsulation!
        const score = document.getElementById('playerCurrentScore');
        score.innerHTML = this._totalScore;
    }

    gameLoop(engine, ctx) {
        // Update
        engine._space.update();
        engine._projectiles.forEach(u => u.move());
        engine._projectiles.forEach(u => u.update());
        //engine._gameObjectsArray.forEach(u => u.move());

        engine._enemies.forEach(u => u.move());
        engine._enemies.forEach(u => u.update());

        engine.player.move();
        engine.player.update(this._userInput);
        //engine._gameObjectsArray.forEach(u => u.update(this._userInput));

        var projectilesToErase = []; //Cannot erase projectiles and enemies in the loops!
        var enemiesToErase = [];
        engine._projectiles.forEach(function(projectile) {

            const projectileOutOfScreen = projectile.y < 0 || projectile.y > ctx.canvas.height;
            if (projectileOutOfScreen) {
                projectilesToErase.push(projectile);
            }

            engine._walls.forEach(function(wall) {
                if (projectile.hasCollidedWith(wall)) {
                    const projectileOutEvent = new CustomEvent('projectileOut', {
                        detail: projectile
                    });
                    window.dispatchEvent(projectileOutEvent);

                    wall.decreaseHealth();
                    if (wall.health === 0) {
                        const destroyWallEvent = new CustomEvent('destroyWall', {
                            detail: wall
                        });
                        window.dispatchEvent(destroyWallEvent);
                    }
                }
            });

            engine._enemies.forEach(function(enemy) {
                if (projectile.direction < 0 && projectile.hasCollidedWith(enemy)) {
                    engine.totalScore += enemy.points;
                    engine.printScore();

                    projectilesToErase.push(projectile);
                    enemiesToErase.push(enemy);
                }
            });
        });

        if (enemiesToErase.length > 0) {
            const enemiesToEraseEvent = new CustomEvent('enemiesToErase', {
                detail: enemiesToErase
            });
            window.dispatchEvent(enemiesToEraseEvent);
        }

        if (projectilesToErase.length > 0) {
            const projectilesToEraseEvent = new CustomEvent('projectilesToErase', {
                detail: projectilesToErase
            });
            window.dispatchEvent(projectilesToEraseEvent);
        }


        // Draw
        ctx.clearAll();
        engine._space.draw();

        //Possible fixes
        if (this._enemies.length !== 0) {
            engine._walls.forEach(wall => wall.draw());
            engine.player.draw();
            //engine._gameObjectsArray.forEach(u => u.draw());
            engine._projectiles.forEach(u => u.draw());
            engine._enemies.forEach(u => u.draw());
        } else {
            engine.createBoss();
        }

        requestAnimationFrame(function() {
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
        const spritesDown = [sprites.wallDownHit, sprites.wallDown];

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

        // for (const wall of this._walls) {
        //     this._gameObjectsArray.push(wall);
        // }
    }

    createBoss() {
        const boss = new Boss(30, 30, this._ctx, this._sprites.boss, 2);
        this._enemies.push(boss);
        //this._gameObjectsArray.push(boss);
    }
}
