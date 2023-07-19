import { Fish } from './fish.js';
import { Enemy } from './enemy.js';
import { setImg } from './util/index.js';
export const IMAGE = {
    main: [
        setImg('./fishgame/nooki/mainfish1.png'),
        setImg('./fishgame/nooki/mainfish2.png'),
    ],
    green: [
        setImg('./fishgame/nooki/greenfish1.png'),
        setImg('./fishgame/nooki/greenfish2.png'),
    ],
    red: [
        setImg('./fishgame/nooki/redfish1.png'),
        setImg('./fishgame/nooki/redfish2.png'),
    ],
    yellow: [
        setImg('./fishgame/nooki/yellowfish1.png'),
        setImg('./fishgame/nooki/yellowfish2.png'),
    ],
    pink: [
        setImg('./fishgame/nooki/pinkfish1.png'),
        setImg('./fishgame/nooki/pinkfish2.png'),
    ],
    monster: [
        setImg('./fishgame/nooki/monsterfish1.png'),
        setImg('./fishgame/nooki/monsterfish2.png'),
    ],
    bone: [
        setImg('./fishgame/nooki/bonefish1.png'),
        setImg('./fishgame/nooki/bonefish2.png'),
    ],
};
export const width = 696;
export const height = 564;
export const FishWidth = 352;
export const FishHeight = 213;
export const canvas = document.getElementById("game");
export const ctx = canvas.getContext("2d");
let ani = 0;
const ARRAY = [
    new Enemy(0, 0, Math.random() * 0.5 + 0.5, FishWidth * 0.1, FishHeight * 0.1, IMAGE.green),
    new Enemy(0, 0, Math.random() * 0.5 + 0.5, FishWidth * 0.2, FishHeight * 0.2, IMAGE.red),
    new Enemy(0, 0, Math.random() * 0.5 + 0.5, FishWidth * 0.4, FishHeight * 0.4, IMAGE.yellow),
    new Enemy(0, 0, Math.random() * 0.5 + 0.5, FishWidth * 0.5, FishHeight * 0.5, IMAGE.pink),
    new Enemy(0, 0, Math.random() * 0.5 + 0.5, FishWidth * 0.6, FishHeight * 0.6, IMAGE.monster),
    new Enemy(0, 0, Math.random() * 0.5 + 0.5, FishWidth, FishHeight, IMAGE.bone),
    new Enemy(0, 0, Math.random() * 0.5 + 0.5, FishWidth * 0.1, FishHeight * 0.1, IMAGE.green),
    new Enemy(0, 0, Math.random() * 0.5 + 0.5, FishWidth * 0.2, FishHeight * 0.2, IMAGE.red),
    new Enemy(0, 0, Math.random() * 0.5 + 0.5, FishWidth * 0.4, FishHeight * 0.4, IMAGE.yellow),
    new Enemy(0, 0, Math.random() * 0.5 + 0.5, FishWidth * 0.5, FishHeight * 0.5, IMAGE.pink),
    new Enemy(0, 0, Math.random() * 0.5 + 0.5, FishWidth * 0.6, FishHeight * 0.6, IMAGE.monster),
    new Enemy(0, 0, Math.random() * 0.5 + 0.5, FishWidth, FishHeight, IMAGE.bone),
];
const EnemyFish = ARRAY;
// const EnemyFish = new Array(10).fill('o').map(e => new Enemy(0, 0, Math.random() + 0.1, 100, 50, IMAGE.green))
const Player = new Fish(200, 300, 1.5, FishWidth * 0.3, FishHeight * 0.3, IMAGE.main);
const BGImg = ((ms) => {
    let idx = 0;
    const img = {
        0: setImg('./fishgame/background1.png'),
        1: setImg('./fishgame/background2.png'),
        2: setImg('./fishgame/background3.png')
    };
    setInterval(() => {
        idx++;
        idx = idx % 3;
    }, ms);
    return () => {
        return img[idx];
    };
})(400);
setInterval(() => {
    if (ani) {
        ani = 0;
    }
    else {
        ani = 1;
    }
}, 700);
window.onkeydown = (e) => {
    const key = e.key.toLocaleLowerCase();
    Player.setVecter(key, true);
};
window.onkeyup = (e) => {
    const key = e.key.toLocaleLowerCase();
    Player.setVecter(key, false);
};
window.onload = () => {
    document.querySelector('img.img.main').addEventListener('click', (e) => {
        e.target.style.display = 'none';
    });
    document.querySelector('img.img.gameover').addEventListener('click', (e) => {
        e.target.style.display = 'none';
    });
    setDPI();
    console.log("onload");
    setInterval(move, 10);
    // setTimeout(() => {
    //     location.reload();
    // }, 1000)
};
const move = () => {
    if (Player.vecter.up && Player.y >= 0)
        Player.addForceXY(0, -Player.moveSpeed);
    if (Player.vecter.left && Player.x >= 0)
        Player.addForceXY(-Player.moveSpeed, 0);
    if (Player.vecter.right && Player.x <= width - Player.width)
        Player.addForceXY(Player.moveSpeed, 0);
    if (Player.vecter.down && Player.y <= height - Player.height)
        Player.addForceXY(0, Player.moveSpeed);
    // ctx.clearRect(0, 0, width, height);
    ctx.drawImage(BGImg(), 0, 0, width, height);
    EnemyFish.map(e => {
        e.move();
        if (e.flip) {
            ctx.drawImage(e.img[ani], e.x, e.y, e.width, e.height);
        }
        else {
            ctx.save();
            // ctx.translate(canvas.width / 2 - Player.width / 2, canvas.height / 2 - Player.height / 2);
            ctx.translate(canvas.width / 2 + e.width / 2, canvas.height / 2 - e.height / 2);
            ctx.scale(-1, 1);
            ctx.translate(canvas.width / 2 - e.width / 2, -canvas.height / 2 + e.height / 2);
            ctx.drawImage(e.img[ani], -e.x, e.y, e.width, e.height);
            ctx.restore();
        }
        e.update();
    });
    if (Player.flip) {
        ctx.drawImage(Player.img[ani], Player.x, Player.y, Player.width, Player.height);
    }
    else {
        ctx.save();
        // ctx.translate(canvas.width / 2 - Player.width / 2, canvas.height / 2 - Player.height / 2);
        ctx.translate(canvas.width / 2 + Player.width / 2, canvas.height / 2 - Player.height / 2);
        ctx.scale(-1, 1);
        ctx.translate(canvas.width / 2 - Player.width / 2, -canvas.height / 2 + Player.height / 2);
        ctx.drawImage(Player.img[ani], -Player.x, Player.y, Player.width, Player.height);
        ctx.restore();
    }
};
const setDPI = () => {
    // 디스플레이 크기 설정 (css 픽셀)
    // canvas.style.width = `${width}px`;
    // canvas.style.height = `${height}px`;
    // 메모리에 실제 크기 설정 (픽셀 밀도를 고려하여 크기 조정)
    const dpr = window.devicePixelRatio;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    const ctx = canvas.getContext('2d');
    // CSS에서 설정한 크기와 맞춰주기 위한 scale 조정
    ctx.scale(dpr, dpr);
};
//# sourceMappingURL=index.js.map