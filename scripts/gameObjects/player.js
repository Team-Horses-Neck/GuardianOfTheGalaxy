class Player extends MovableUnit {
    constructor(x, y, ctx, sprite) {
        super(x, y, ctx, sprite, PLAYER_SPEED);

        // Weapon properties
        this._lastProjectileShotTime = new Date(0);
        this._currWeapon = weaponTypes.projectiles;
        this._lasersOn = false;

        this.lives = PLAYER_START_LIFE;
        this._totalScore = 0;
    }

    get lives() {
        return this._lives;
    }

    set lives(value) {
        this._lives = value;
    }

    get totalScore() {
        return this._totalScore;
    }

    set totalScore(value) {
        this._totalScore = value;

    }

    get _laserProperties() {
        const marginTop = 5;
        const marginSides = 1.5;
        return {
            color: '#f00',
            width: 1.5,
            left: {
                x: this.x + marginSides,
                y: this.y + this.height / 2 - marginTop
            },
            right: {
                x: this.x + this.width - marginSides,
                y: this.y + this.height / 2 - marginTop
            }
        };
    }

    _shootProjectile() {
        const offsetX = this.width / 2 - PROJECTILE_WIDTH / 2;
        const fireEvent = new CustomEvent('projectileFired', {
            detail: {
                firedBy: unitTypes.player,
                x: this.x + offsetX,
                y: this.y
            }
        });
        window.dispatchEvent(fireEvent);
    }

    _drawLasers(ctx) {
        const laser = this._laserProperties;
        ctx.strokeStyle = laser.color;
        ctx.lineWidth = laser.width;

        ctx.beginPath();
        ctx.moveTo(laser.left.x, laser.left.y);
        ctx.lineTo(laser.left.x, 0);
        ctx.stroke();
        ctx.closePath();

        ctx.beginPath();
        ctx.moveTo(laser.right.x, laser.right.y);
        ctx.lineTo(laser.right.x, 0);
        ctx.stroke();
        ctx.closePath();
    }

    update(keyboard) {
        // update position
        if (keyboard.isDown(keyboard.left)) {
            this.x -= this._speed;
        }
        if (keyboard.isDown(keyboard.right)) {
            this.x += this._speed;
        }

        // colide with canvas edges
        if (this.x < 0) {
            this.x = 0;
        } else if (this.x + this.width > this._ctx.canvas.width) {
            this.x = this._ctx.canvas.width - this.width;
        }

        // Shoot behaviour
        if (keyboard.isDown(keyboard.space)) {
            if (this._currWeapon === weaponTypes.lasers) {
                this._lasersOn = true;
            }
            if (this._currWeapon === weaponTypes.projectiles) {
                const currTime = new Date();
                if (currTime - this._lastProjectileShotTime > MIN_TIME_BETWEEN_SHOTS) {
                    this._lastProjectileShotTime = currTime;
                    this._shootProjectile();
                }
            }
        } else {
            if (this._currWeapon === weaponTypes.lasers) {
                this._lasersOn = false;
            }
        }
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
