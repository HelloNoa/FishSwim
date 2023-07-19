import {Fish} from './fish.js';
import {Enemy} from './enemy.js';
import {setImg} from './util/index.js';

export const width = 696
export const height = 564

export const canvas = document.getElementById("game") as HTMLCanvasElement;
export const ctx = canvas.getContext("2d");
let ani = false
var img = new Image();
let enemyImg = new Image();
enemyImg.src = "./fishgame/nooki/greenfish1.png";
const EnemyFish = new Enemy(0, 0, 1, 100, 50)

const Player = new Fish(200, 300, 1.5, 352 * 0.3, 213 * 0.3);

img.src = "./fishgame/nooki/mainfish1.png";
img.onload = () => {
    ctx.drawImage(img, Player.x, Player.y, Player.width, Player.height);
}
const BGImg = ((ms: number) => {
    let idx = 0;
    const img = {
        0: setImg('./fishgame/background1.png'),
        1: setImg('./fishgame/background2.png'),
        2: setImg('./fishgame/background3.png')
    }
    setInterval(() => {
        idx++;
        idx = idx % 3;
    }, ms)

    return () => {
        return img[idx];
    }
})(400)
const IMAGE = {
    main1: setImg('./fishgame/nooki/mainfish2.png'),
    main2: setImg('./fishgame/nooki/mainfish1.png'),
    green1: setImg('./fishgame/nooki/greenfish1.png'),
    green2: setImg('./fishgame/nooki/greenfish2.png'),
    red1: setImg('./fishgame/nooki/redfish1.png'),
    red2: setImg('./fishgame/nooki/redfish2.png'),
    yellow1: setImg('./fishgame/nooki/yellowfish1.png'),
    yellow2: setImg('./fishgame/nooki/yellowfish2.png'),
    pink1: setImg('./fishgame/nooki/pinkfish1.png'),
    pink2: setImg('./fishgame/nooki/pinkfish2.png'),
    monster1: setImg('./fishgame/nooki/monsterfish1.png'),
    monster2: setImg('./fishgame/nooki/monsterfish2.png'),
    bone1: setImg('./fishgame/nooki/bonefish1.png'),
    bone2: setImg('./fishgame/nooki/bonefish2.png'),
}

setInterval(() => {
    ani = !ani
    if (ani) {
        img = IMAGE.main1;
        enemyImg = IMAGE.green1;
    } else {
        img = IMAGE.main2;
        enemyImg = IMAGE.green2;
    }
}, 700)


window.onkeydown = (e) => {
    const key = e.key.toLocaleLowerCase();
    Player.setVecter(key, true)
};
window.onkeyup = (e) => {
    const key = e.key.toLocaleLowerCase();
    Player.setVecter(key, false)
};

window.onload = () => {
    document.querySelector('img.img.main').addEventListener('click', (e: Event) => {
        (e.target as HTMLElement).style.display = 'none';
    });
    document.querySelector('img.img.gameover').addEventListener('click', (e: Event) => {
        (e.target as HTMLElement).style.display = 'none';
    });
    setDPI();
    console.log("onload")
    setInterval(move, 10)
    // setTimeout(() => {
    //     location.reload();
    // }, 1000)
}
const move = () => {
    if (Player.vecter.up && Player.y >= 0)
        Player.addForceXY(0, -Player.moveSpeed)
    if (Player.vecter.left && Player.x >= 0)
        Player.addForceXY(-Player.moveSpeed, 0)
    if (Player.vecter.right && Player.x <= width - Player.width)
        Player.addForceXY(Player.moveSpeed, 0)
    if (Player.vecter.down && Player.y <= height - Player.height)
        Player.addForceXY(0, Player.moveSpeed)
    // ctx.clearRect(0, 0, width, height);
    ctx.drawImage(BGImg(),0,0,canvas.width,canvas.height)
    EnemyFish.move();
    if (EnemyFish.flip) {
        ctx.drawImage(enemyImg, EnemyFish.x, EnemyFish.y, EnemyFish.width, EnemyFish.height);
    } else {
        ctx.save();
        // ctx.translate(canvas.width / 2 - Player.width / 2, canvas.height / 2 - Player.height / 2);
        ctx.translate(canvas.width / 2 + EnemyFish.width / 2, canvas.height / 2 - EnemyFish.height / 2);
        ctx.scale(-1, 1);
        ctx.translate(canvas.width / 2 - EnemyFish.width / 2, -canvas.height / 2 + EnemyFish.height / 2);
        ctx.drawImage(enemyImg, -EnemyFish.x, EnemyFish.y, EnemyFish.width, EnemyFish.height);
        ctx.restore();
    }
    if (Player.flip) {
        ctx.drawImage(img, Player.x, Player.y, Player.width, Player.height);
    } else {
        ctx.save();
        // ctx.translate(canvas.width / 2 - Player.width / 2, canvas.height / 2 - Player.height / 2);
        ctx.translate(canvas.width / 2 + Player.width / 2, canvas.height / 2 - Player.height / 2);
        ctx.scale(-1, 1);
        ctx.translate(canvas.width / 2 - Player.width / 2, -canvas.height / 2 + Player.height / 2);
        ctx.drawImage(img, -Player.x, Player.y, Player.width, Player.height);
        ctx.restore();
    }

}

const setDPI = () => {
    // 디스플레이 크기 설정 (css 픽셀)
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    // 메모리에 실제 크기 설정 (픽셀 밀도를 고려하여 크기 조정)
    const dpr = window.devicePixelRatio;

    canvas.width = width * dpr;
    canvas.height = height * dpr;

    const ctx = canvas.getContext('2d');

    // CSS에서 설정한 크기와 맞춰주기 위한 scale 조정
    ctx.scale(dpr, dpr);

}
