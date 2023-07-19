import {Fish} from './fish.js';

export class Enemy extends Fish {
    constructor(x = 0, y = 0, moveSpeed = 1, width = 10, height = 10) {
        super(x, y, moveSpeed, width, height);
        this.flip = false;
    }

    move() {
        if (this.vecter.left) {
            this.flip = true;
            this.addForceXY(-this.moveSpeed, 0)
        } else {
            this.flip = false;
            this.addForceXY(this.moveSpeed, 0)
        }
    }
}