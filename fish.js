export class Fish {
    constructor(_x = 0, _y = 0, _moveSpeed = 1, _width = 10, _height = 10) {
        this.x = _x;
        this.y = _y;
        this.moveSpeed = _moveSpeed;
        this.width = _width;
        this.height = _height;

        this.vecter = {
            up: false,
            left: false,
            right: false,
            down: false,
        }
    }

    get x() {
        return this._x;
    }

    set x(x) {
        this._x = x;
    }


    get y() {
        return this._y;
    }

    set y(y) {
        this._y = y;
    }

    setXY(x, y) {
        if (x !== null) {
            this.x = x;
        }
        if (y !== null) {
            this.y = y;
        }
    }

    addForceXY(forceX = 0, forceY = 0) {
        this.x += forceX;
        this.y += forceY;
    }


    get moveSpeed() {
        return this._moveSpeed;
    }

    set moveSpeed(moveSpeed) {
        this._moveSpeed = moveSpeed;
    }

    get width() {
        return this._width;
    }

    set width(width) {
        this._width = width;
    }

    get height() {
        return this._height;
    }

    set height(height) {
        return this._height = height;
    }

    get vecter() {
        return this._vecter;
    }
    set vecter(vecter) {
        this._vecter=vecter;
    }

    setVecter(key, status) {
        switch (key) {
            case "w":
                this.vecter.up = status;
                break;
            case "a":
                this.vecter.left = status;
                break;
            case "s":
                this.vecter.down = status;
                break;
            case "d":
                this.vecter.right = status;
                break;
            default:
                break
        }
    }

}