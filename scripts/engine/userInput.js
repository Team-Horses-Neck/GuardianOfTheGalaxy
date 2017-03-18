// Stores the most recent keypress state
class UserInput {
    constructor() {
        this._pressed = {};
    }

    get space() {
        return 32;
    }
    get left() {
        return 37;
    }
    get right() {
        return 39;
    }

    isDown(keyCode) {
        return this._pressed[keyCode];
    }
    onKeydown(event) {
        this._pressed[event.keyCode] = true;
    }
    onKeyup(event) {
        delete this._pressed[event.keyCode];
    }
}
