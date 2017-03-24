class PointBonus extends Bonus {
    constructor(x, y, ctx, sprite, type, points) {
        super(x, y, ctx, sprite, type);
        this.points = points;
    }

    get points() {
        return this._points;
    }
    set points(value) {
        this._points = value;
    }
}
