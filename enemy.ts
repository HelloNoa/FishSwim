import {Fish} from './fish.js';
import {FishWidth, height, IMAGE, Player, width} from "./index.js";
import {d2d} from "./util/index.js";

export class Enemy extends Fish {
    constructor(x = 0, y = 0, moveSpeed = 1, width = 10, height = 10, img: HTMLImageElement[] = IMAGE.green) {
        super(x, y, moveSpeed, width, height, img);
        this.setRandomStartingPosition();
    }

    setRandomStartingPosition() {
        this.y = Math.max(Math.floor(Math.random() * height - this.height), 0);
        if (Math.random() >= 0.5) {
            this.x = -width * 0.4;
            this.vecter.left = false;
            this.vecter.right = true;
        } else {
            this.x = width * 1.4;
            this.vecter.left = true;
            this.vecter.right = false;
        }
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

    crash() {
        if (d2d(Player.mx, Player.my, this.mx, this.my) <= Math.max(this.height, Player.height) * 0.3) {
            this.setRandomStartingPosition();
            const delta = this.width / FishWidth
            Player.width *= (1 + delta * 0.05);
            Player.height *= (1 + delta * 0.05);
            console.log('먹었당');
        }

    }

    update() {
        if (this.x <= -width * 0.5 || this.x >= width * 1.5) {
            this.setRandomStartingPosition();
        }
        this.crash();
    }

}