// Stores the most recent keypress state 
class Keyboard {
	constructor() {
		this._pressed = {};
	}

	get SPACE() { return 32 };
	get LEFT() { return 37 };
	get RIGHT() { return 39 };

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