export class Fish {
    constructor(_x = 0, _y = 0, _moveSpeed = 1, _width = 10, _height = 10) {
        this.x = _x;
        this.y = _y;
        this.moveSpeed = _moveSpeed;
        this.width = _width;
        this.height = _height;
        this.flip = true;
        this.vecter = {
            up: false,
            left: false,
            right: false,
            down: false,
        };
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
        this._height = height;
    }
    get flip() {
        return this._flip;
    }
    set flip(flip) {
        this._flip = flip;
    }
    get vecter() {
        return this._vecter;
    }
    set vecter(vecter) {
        this._vecter = vecter;
    }
    setVecter(key, status) {
        switch (key) {
            case "w":
            case "W":
            case "ㅈ":
            case "ㅉ":
                this.vecter.up = status;
                break;
            case "a":
            case "A":
            case "ㅁ":
                this.vecter.left = status;
                if (status) {
                    this.flip = true;
                }
                else if (this.vecter.right) {
                    this.flip = false;
                }
                break;
            case "s":
            case "S":
            case "ㄴ":
                this.vecter.down = status;
                break;
            case "d":
            case "D":
            case "ㅇ":
                this.vecter.right = status;
                if (status) {
                    this.flip = false;
                }
                else if (this.vecter.left) {
                    this.flip = true;
                }
                break;
            default:
                break;
        }
    }
}
//# sourceMappingURL=fish.js.map