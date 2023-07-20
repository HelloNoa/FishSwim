import {FishHeight, FishWidth, IMAGE} from "./index.js";

type T_Vecter = {
    up: boolean;
    left: boolean;
    right: boolean;
    down: boolean;
}

export class Fish {
    private _x: number;
    private _y: number;
    private _moveSpeed: number;
    private _width: number;
    private _height: number;
    private _flip: boolean;
    private _vecter: T_Vecter;
    private _img: HTMLImageElement[];

    constructor(_x: number = 0, _y: number = 0, _moveSpeed: number = 1, _width: number = 10, _height: number = 10, _img: HTMLImageElement[] = IMAGE.main) {
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
        }
        this.img = _img;
    }

    get x() {
        return this._x;
    }

    get mx() {
        return this._x + this._width / 2
    }

    get my() {
        return this._y + this._height / 2
    }

    set x(x) {
        this._x = x;
    }


    get y() {
        return this._y;
    }

    set y(y: number) {
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
        if (FishWidth * 5 >= width) {
            this._width = width;
        }
    }

    get height() {
        return this._height;
    }

    set height(height) {
        if (FishHeight * 5 >= height) {
            this._height = height;
        }
    }

    get flip() {
        return this._flip;
    }

    set flip(flip) {
        this._flip = flip;
    }

    get img() {
        return this._img;
    }

    set img(img) {
        this._img = img;
    }

    get vecter() {
        return this._vecter;
    }

    set vecter(vecter) {
        this._vecter = vecter;
    }

    setVecter(key, status) {
        let eventKey = '';
        switch (key) {
            case "w":
            case "W":
            case "ㅈ":
            case "ㅉ":
                eventKey = 'w';
                this.vecter.up = status;
                break;
            case "a":
            case "A":
            case "ㅁ":
                eventKey = 'a';
                this.vecter.left = status;
                if (status) {
                    this.flip = true;
                } else if (this.vecter.right) {
                    this.flip = false;
                }
                break;
            case "s":
            case "S":
            case "ㄴ":
                eventKey = 's';
                this.vecter.down = status;
                break;
            case "d":
            case "D":
            case "ㅇ":
                eventKey = 'd';
                this.vecter.right = status;
                if (status) {
                    this.flip = false;
                } else if (this.vecter.left) {
                    this.flip = true;
                }
                break;
            default:
                break
        }
        if (status) {
            document.querySelector(`.btn.btn_${eventKey}`)?.classList.add('active');
        } else {
            document.querySelector(`.btn.btn_${eventKey}`)?.classList.remove('active');
        }
    }

}