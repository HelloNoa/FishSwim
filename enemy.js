import {Fish} from './fish.js';
import {canvas} from './index.js';

export class Enemy extends Fish {
    constructor(x = 0, y = 0, moveSpeed = 1, width = 10, height = 10) {
        console.log(canvas.height)
        // this.setY()
        super(x, y, moveSpeed, width, height);
    }



    move() {
        if (this.vecter.left) {
            // this.addForceXY()
        } else {

        }
        console.log('test')
    }
}