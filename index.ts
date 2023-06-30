import {Fish} from './fish.js';
import {Enemy} from './enemy.js';


export const canvas = document.getElementById("game") as HTMLCanvasElement;
export const ctx = canvas.getContext("2d");
var img = new Image();
img.src = "fish.png";
const Player = new Fish(200, 300, 1, 100, 50);

img.onload = () => {
    ctx.drawImage(img, Player.x, Player.y, Player.width, Player.height);
}

const enemyImg = new Image();
enemyImg.src = "fish.png"
const EnemyFish = new Enemy(0, 0, 1, 30, 15)
window.onkeydown = (e) => {
    const key = e.key.toLocaleLowerCase();
    Player.setVecter(key, true)
};
window.onkeyup = (e) => {
    const key = e.key.toLocaleLowerCase();
    Player.setVecter(key, false)
};

window.onload = () => {
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
    if (Player.vecter.right && Player.x <= canvas.width - Player.width)
        Player.addForceXY(Player.moveSpeed, 0)
    if (Player.vecter.down && Player.y <= canvas.height - Player.height)
        Player.addForceXY(0, Player.moveSpeed)
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    EnemyFish.move();
    ctx.save();
    ctx.translate(canvas.width / 2 + EnemyFish.width / 2, canvas.height / 2 - EnemyFish.height / 2);
    // ctx.rotate(180*Math.PI/180);
    ctx.scale(-1, 1);
    ctx.translate(canvas.width / 2 - EnemyFish.width / 2, -canvas.height / 2 + EnemyFish.height / 2);
    ctx.drawImage(img, EnemyFish.x, EnemyFish.y, EnemyFish.width, EnemyFish.height);
    ctx.restore();

    if (Player.flip) {
        ctx.drawImage(img, Player.x, Player.y, Player.width, Player.height);
    } else {
        ctx.save();
        // ctx.translate(canvas.width / 2 - Player.width / 2, canvas.height / 2 - Player.height / 2);
        ctx.translate(canvas.width / 2 + Player.width / 2, canvas.height / 2 - Player.height / 2);
        ctx.scale(-1, 1);
        ctx.translate(canvas.width / 2 - Player.width/2, -canvas.height / 2 + Player.height / 2);
        ctx.drawImage(img, -Player.x, Player.y, Player.width, Player.height);
        ctx.restore();
    }

}

const setDPI = () => {
    // 디스플레이 크기 설정 (css 픽셀)
    const width = 696
    const height = 564
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
