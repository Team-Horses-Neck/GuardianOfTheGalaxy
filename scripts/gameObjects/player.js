class Player extends Unit {
    constructor(ctx, sprite) {
        const x = ctx.canvas.width / 2 - sprite.width / 2;
        const y = ctx.canvas.height - sprite.height;
        super(x, y, ctx, sprite, PLAYER_SPEED);

        // Weapon properties
        this._lastBulletShotTime = new Date(0);
        this._currWeapon = weaponTypes.lasers;
        this._lasersOn = false;
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

    _shootBullet() {
        console.log('Pew pew ');
        /*
          add a Bullet() object in bulletsOnScreen and
          remove it when it's off the screen or colides with an enemy
        */
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
        }
        else if (this.x + this.width > this._ctx.canvas.width) {
            this.x = this._ctx.canvas.width - this.width;
        }

        // Shoot behaviour
        if (keyboard.isDown(keyboard.space)) {
            if (this._currWeapon === weaponTypes.lasers) {
                this._lasersOn = true;
            }
            if (this._currWeapon === weaponTypes.bullets) {
                const currTime = new Date();
                if (currTime - this._lastBulletShotTime > MIN_TIME_BETWEEN_SHOTS) {
                    this._lastBulletShotTime = currTime;
                    this._shootBullet();
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
