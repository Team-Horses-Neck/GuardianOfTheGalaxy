class Engine {
    constructor(ctx, sprites) {
        this._userInput = new UserInput();
        this._space = new SpaceBackground(ctx, sprites.spaceStatic, sprites.spaceMoving);

        this._ctx = ctx;
        this._sprites = sprites;
        this._totalScore = 0;

        // Define game objects (player, enemies...)
        this._enemies = [];
        this._projectiles = [];
        this._walls = [];
        this._bonuses = [];

        this._gameOn = true;

        this.initGame();
    }

    get totalScore() {
        return this._totalScore;
    }

    set totalScore(value) {
        this._totalScore = value;
    }

    get player() {
        return this._player;
    }
    set player(object) {
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
            }
        }
    }

    initGame() {
        //sets the initial field
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

    onEnemyGoDown() {
        this._enemies.forEach(x => x.goDown = true);
    }

    onEnemiesToErase(e) {
        for (let i = 0; i < e.detail.length; i += 1) {
            let index = this._enemies.findIndex(x => x === e.detail[i]);
            this._enemies.splice(index, 1);
        }
    }

    onProjectilesToErase(e) {
        for (let i = 0; i < e.detail.length; i += 1) {
            let index = this._projectiles.findIndex(x => x === e.detail[i]);
            this._projectiles.splice(index, 1);
        }
    }
    onBonusesToErase(e) {
        for (let i = 0; i < e.detail.length; i += 1) {
            let index = this._bonuses.findIndex(x => x === e.detail[i]);
            this._bonuses.splice(index, 1);
        }
    }

    onWallstoErase(e) {
        for (let i = 0; i < e.detail.length; i += 1) {
            const index = this._walls.findIndex(w => w === e.detail[i]);
            this._walls.splice(index, 1);
        }
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

        engine._enemies.forEach(u => u.move());
        engine._enemies.forEach(u => u.update());

        engine._bonuses.forEach(u => u.move());

        // Update lives
        document.getElementById('playerLivesCount').innerHTML = engine.player.lives;

        //player
        engine.player.move();
        engine.player.update(this._userInput);

        const projectilesToErase = []; //Cannot erase projectiles and enemies in the loops!
        const enemiesToErase = [];
        const wallsToErase = [];
        const bonusesToErase = [];

        engine._projectiles.forEach(function(projectile) {

            engine._walls.forEach(function(wall) {
                if (projectile.hasCollidedWith(wall)) {
                    projectilesToErase.push(projectile);

                    wall.decreaseHealth();
                    if (wall.health === 0) {
                        wallsToErase.push(wall);
                    }
                }
            });

            const projectileGoingUp = projectile.direction < 0;
            if (projectileGoingUp) {
                engine._enemies.forEach(function(enemy) {
                    if (projectile.hasCollidedWith(enemy)) {
                        engine.totalScore += enemy.points;
                        engine.printScore();

                        projectilesToErase.push(projectile);
                        enemiesToErase.push(enemy);

                        if (enemy.bonus === 'health') {
                            const bonus = new Bonus(enemy.x, enemy.y, engine._ctx, engine._sprites.bonusHealth, 'health');
                            engine._bonuses.push(bonus);
                        } else if (enemy.bonus === 'points') {
                            const bonus = new Bonus(enemy.x, enemy.y, engine._ctx, engine._sprites.bonusPoint, 'points');
                            engine._bonuses.push(bonus);
                        }
                    }
                });
            } else {
                if (projectile.hasCollidedWith(engine._player)) {
                    projectilesToErase.push(projectile);
                    engine._player.lives -= 1;

                    if(engine._player.lives < 0){
                        engine._gameOn = false;
                    }
                }
            }

            const projectileOutOfScreen = projectile.y < 0 || projectile.y > ctx.canvas.height;
            if (projectileOutOfScreen) {
                projectilesToErase.push(projectile);
            }
        });

        engine._bonuses.forEach(function(bonus) {
            if(bonus.hasCollidedWith(engine.player)) {
                if(bonus.type==='health'){
                    engine.player.lives++;
                }

                if(bonus.type==='points'){
                    engine.totalScore += BONUS_POINTS_VALUE;
                    engine.printScore();
                }

                bonusesToErase.push(bonus);
            }
            else{
                const bonusOutOfScreen = bonus.y > ctx.canvas.height;
                if (bonusOutOfScreen) {
                    bonusesToErase.push(bonus);
                }
            }
        });

        if (wallsToErase.length > 0) {
            const wallsToEraseEvent = new CustomEvent('wallsToErase', {
                detail: wallsToErase
            });
            window.dispatchEvent(wallsToEraseEvent);
        }

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

        if (bonusesToErase.length > 0) {
            const bonusesToEraseEvent = new CustomEvent('bonusesToErase', {
                detail: bonusesToErase
            });
            window.dispatchEvent(bonusesToEraseEvent);
        }

        // Draw
        ctx.clearAll();
        engine._space.draw();

        //Possible fixes
        if (this._enemies.length === 0) {
            engine.createBoss();
        }
        engine._walls.forEach(wall => wall.draw());
        engine.player.draw();
        engine._projectiles.forEach(u => u.draw());
        engine._enemies.forEach(u => u.draw());
        engine._bonuses.forEach(u => u.draw());

        if (engine._gameOn) {
            requestAnimationFrame(function() {
                engine.gameLoop(engine, ctx);
            });
        } else {
            ctx.fillStyle = 'orangered';
            ctx.font = "40px Arial";
            ctx.fillText("Game Over",ctx.canvas.width/2 - 100, ctx.canvas.height/2);
        }

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
            this._walls.push(new Wall(wallStartPosWidth * i + (i - 1) * wallWidth, wallStartPosHeight,
                ctx, spritesHightLeft, WALL_HEALTH));
            this._walls.push(new Wall(wallStartPosWidth * i + (i - 1) * wallWidth + spriteWidth, wallStartPosHeight,
                ctx, spritesWall, WALL_HEALTH));
            this._walls.push(new Wall(wallStartPosWidth * i + (i - 1) * wallWidth + 2 * spriteWidth, wallStartPosHeight,
                ctx, spritesHightRight, WALL_HEALTH));
            this._walls.push(new Wall(wallStartPosWidth * i + (i - 1) * wallWidth, wallStartPosHeight + spriteHeight,
                ctx, spritesWall, WALL_HEALTH));
            this._walls.push(new Wall(wallStartPosWidth * i + (i - 1) * wallWidth + spriteWidth,
                wallStartPosHeight + spriteHeight, ctx, spritesMiddle, WALL_HEALTH));
            this._walls.push(new Wall(wallStartPosWidth * i + (i - 1) * wallWidth + 2 * spriteWidth,
                wallStartPosHeight + spriteHeight, ctx, spritesWall, WALL_HEALTH));
            this._walls.push(new Wall(wallStartPosWidth * i + (i - 1) * wallWidth, wallStartPosHeight + 2 * spriteHeight,
                ctx, spritesDown, WALL_HEALTH));
            this._walls.push(new Wall(wallStartPosWidth * i + (i - 1) * wallWidth + 2 * spriteWidth,
                wallStartPosHeight + 2 * spriteHeight, ctx, spritesDown, WALL_HEALTH));
        }
    }

    createBoss() {
        const boss = new Boss(30, 30, this._ctx, this._sprites.boss, 2);
        this._enemies.push(boss);
    }
}
