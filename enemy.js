import { Fish } from './fish.js';
import { FishHeight, FishWidth, height, IMAGE, Player, width } from "./index.js";
import { d2d } from "./util/index.js";
export class Enemy extends Fish {
    constructor(x = 0, y = 0, moveSpeed = 1, width = 10, height = 10, img = IMAGE.green) {
        super(x, y, moveSpeed, width, height, img);
        this.setRandomStartingPosition();
    }
    setRandomStartingPosition() {
        this.y = Math.max(Math.floor(Math.random() * height - this.height), 0);
        if (Math.random() >= 0.5) {
            this.x = -width * 0.4;
            this.vecter.left = false;
            this.vecter.right = true;
        }
        else {
            this.x = width * 1.4;
            this.vecter.left = true;
            this.vecter.right = false;
        }
    }
    move() {
        if (this.vecter.left) {
            this.flip = true;
            this.addForceXY(-this.moveSpeed, 0);
        }
        else {
            this.flip = false;
            this.addForceXY(this.moveSpeed, 0);
        }
    }
    crash() {
        if (d2d(Player.mx, Player.my, this.mx, this.my) <= Math.max(this.height, Player.height) * 0.3) {
            const delta = this.width / FishWidth;
            const PlayerDelta = Player.width / FishWidth;
            console.log(PlayerDelta);
            if (delta > PlayerDelta) {
                console.log('먹혔당');
                Player.width = Math.max(FishWidth * 0.05, Player.width * 0.99);
                Player.height = Math.max(FishHeight * 0.05, Player.height * 0.99);
            }
            else {
                this.setRandomStartingPosition();
                Player.width *= (1 + delta * 0.1);
                Player.height *= (1 + delta * 0.1);
                console.log('먹었당');
            }
            document.querySelectorAll('ul.fishList li').forEach(e => e.classList.remove('active'));
            if (PlayerDelta >= 0.1)
                document.querySelectorAll('ul.fishList li')[0].classList.add('active');
            if (PlayerDelta >= 0.2)
                document.querySelectorAll('ul.fishList li')[1].classList.add('active');
            if (PlayerDelta >= 0.4)
                document.querySelectorAll('ul.fishList li')[2].classList.add('active');
            if (PlayerDelta >= 0.5)
                document.querySelectorAll('ul.fishList li')[3].classList.add('active');
            if (PlayerDelta >= 0.6)
                document.querySelectorAll('ul.fishList li')[4].classList.add('active');
            if (PlayerDelta >= 1)
                document.querySelectorAll('ul.fishList li')[5].classList.add('active');
        }
    }
    update() {
        if (this.x <= -width * 0.5 || this.x >= width * 1.5) {
            this.setRandomStartingPosition();
        }
        this.crash();
    }
}
//# sourceMappingURL=enemy.js.map