<<<<<<< HEAD:scripts/gameObjects/shell.js
class Shell extends Unit {
    constructor(x, y, ctx, sprite, speed, direction) {
=======
class Projectile extends Unit{
    constructor(x, y, ctx, sprite, speed, direction, shooter){
>>>>>>> 31d09a46cb4361684042d6895d46983c5b9e900c:scripts/gameObjects/projectile.js
        super(x, y, ctx, sprite, speed);

        this._shooter = shooter;
        this.direction = direction;
    }

<<<<<<< HEAD:scripts/gameObjects/shell.js
    get direction() {
=======
    get shooter(){
        return this._shooter;
    }

    get direction(){
>>>>>>> 31d09a46cb4361684042d6895d46983c5b9e900c:scripts/gameObjects/projectile.js
        return this._direction;
    }

    set direction(value) {
        if (value < 0) {
            this._direction = -1;
        }
        else if (value > 0) {
            this._direction = 1;
        }
<<<<<<< HEAD:scripts/gameObjects/shell.js
        else {
            throw new Error("Shell speed can not be 0");
=======
        else{
            throw new Error("Projectile speed can not be 0");
>>>>>>> 31d09a46cb4361684042d6895d46983c5b9e900c:scripts/gameObjects/projectile.js
        }
    }

    update() {

    }

    move() {
        this.y = this.y + (this.speed * this.direction);
    }

}