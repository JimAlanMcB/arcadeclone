// TODO: 
// 
// 
// ADJUST CSS
// 
// ADD README
// REFACTOR
// EASY / HARD MODE
// DIFFERENT ENEMY COLORS
// 
// make look like Gameboy
// mobile touch contorls with different screen on mobile 
// choose char and weapon
// 
let bullets;
let bulletDirection = 'up';
let canvas = document.getElementsByTagName('canvas');
canvas.width = 705;
canvas.height = 675;
let bgMusic = new Audio('sounds/OffLimits.wav');
bgMusic.preload = "auto";

 // make a loop for sound



let Game = {
    mode: "easy",
    itemCount: 0,
    level: 1,
    lives: 3,
    score: 0,
    spawnEnemies: function (enemyCount) {
        if(this.level >= 5){
            enemyCount = 35;
        }else if(this.level >= 10){
            enemyCount = 55;
        }else if(this.level >= 15){
            enemyCount = 65;
        }else {
            enemyCount = 25;
        }
        allCollectables = [];
        allEnemies = [];
        decals = [];
        collectableCount = 10;
        for (let i = 0; i < collectableCount; i++) {
            allCollectables.push(new Collectable);
        }        
        for (i = 0; i < enemyCount; i++) {
            allEnemies.push(new Enemy);
        }
        decalCount = 20;
        for (i = 0; i < decalCount; i++) {
            decals.push(new Decal('images/decal1.png', pos.random(600), pos.randomY()));
        }

    },
    updateItemsMsgArea: function () {
        itemsMsgArea = document.getElementById('game_msg_area_items');
        itemsMsgArea.innerHTML = this.itemCount;
    },
    updateLevelMsgArea: function () {
        levelMsgArea = document.getElementById('game_msg_area_level');
        levelMsgArea.innerHTML = this.level;
    },
    updateLivesMsgArea: function () {
        livesMsgArea = document.getElementById('game_msg_area_lives');
        if (this.lives < 1) {
            this.lives = 0;
            // Game over
            Game.reset();
        }
        livesMsgArea.innerHTML = this.lives;
    },
    scoreUp: function (num) {
        scoreMsgArea = document.getElementById('game_msg_area_score');
        this.score += num;
        scoreMsgArea.innerHTML = this.score;
    },
    checkCollision: function (player, element) {

        if (player.y >= element.y && player.y < element.y + element.height) {
            if (player.x + player.width > element.x && player.x < element.x + element.width) {

                player.y = element.y + element.height;
            }
        }
        if ((element.x < player.x + player.width) && (element.x + element.width > player.x) && (element.y < player.y + player.height) && (element.y + element.height > player.y)) {

            if (player.x < element.x + element.width) {

                if (player.y < element.y + element.height) {
                    player.y = element.y - player.height;

                } else if (player.y > element.y) {

                    player.y = element.y + element.height;
                }
            }
        }
    },
    levelUp: function () {
        this.itemCount = 0;
        this.level += 1;
        this.updateItemsMsgArea();
        this.updateLevelMsgArea();
        ctx.clearRect(0, 0, 707, 808);
        addEntities();
        this.createWalls();
        if(this.level >= 5){
            this.randomWalls(10);
        }else if(this.level >= 10){
            this.randomWalls(20);
        }
    },
    reset: function () {
        ctx.clearRect(0, 0, 707, 808);
        this.itemCount = 0;
        this.level = 1;
        this.lives = 3;
        this.score = 0;
        this.updateItemsMsgArea();
        this.updateLevelMsgArea();
        addEntities();
        this.createWalls();
        
    },
    createWalls: function () {
        walls = [];
        this.randomLengthWalls(pos.random(20), pos.randomY(300));
        this.randomLengthWalls(pos.random(20), pos.randomY(400));
        this.randomLengthWalls(300, pos.randomY(500));
        this.randomLengthWalls(100, pos.randomY(600));
        this.randomLengthWalls(200, pos.randomY(700));
        this.randomLengthWalls(300, pos.random(800));
    },
    randomLengthWalls: function (x, y) {
        for (col = 0; col < canvas.width / col; col++) {
            walls.push(new Wall(col * x, y));
        }
    }, 
    randomWalls: function (num){
        for(i=0;i < num; i++){
            walls.push(new Wall(pos.random(500), pos.randomY(600)));
            console.log(walls);
        }
    }
}

let pos = {
    randomX: function () {
        x = this.random(-600);
        return x;
    },
    randomY: function () {
        y = this.random(600);
        // make sure enemies dont spawn on top of player
        if ((this.name == 'enemy') && (y > 500)) {
            this.randomY(y);
        }
        // make sure things y's don't spawn out of bounds
        if (y < 100) {
            this.randomY(y);
        }
        return y;
    },
    randomSpeed: function (num) {
        num = this.random(num);
        return num;
    },
    random: function (num) {
        xypos = Math.floor(Math.random() * Math.floor(num));
        return xypos;
    }
};
// ------------------------------------------------ Walls Section
let Wall = function (x, y) {
    this.height = 16;
    this.width = 48;
    this.sprite = 'images/wall.png';
    this.x = x
    this.y = y;
}
Wall.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
walls = [];
Game.createWalls();

// ------------------------------------------------Decals 
bullets = [];
function fireBullet() {
    if(bulletDirection == 'right'){
    bullets.push(new Bullet('right'));
    }
    if(bulletDirection == 'left'){
    bullets.push(new Bullet('left'));
    }
    if(bulletDirection == 'up'){
    bullets.push(new Bullet('up'));    
    }
    if(bulletDirection == 'down'){
    bullets.push(new Bullet('down'));
    }
    
}
let Bullet = function (direction) {
    this.sprite = 'images/bullet.png';
    this.x = player.x;
    this.y = player.y;
    this.height = 13;
    this.width = 13;
    this.bulletDirection = direction;
    
}

Bullet.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Bullet.prototype.update = function (dt) {
    // console.log('X: ' +this.x+ 'Y: ' +this.y);
    
        if(this.bulletDirection == 'right'){
            this.x += 5;
        }
        if(this.bulletDirection == 'left'){
            this.x -= 5;
        }
        if(this.bulletDirection == 'up'){
            this.y -= 5;
        }
        if(this.bulletDirection == 'down'){
            this.y += 5;
        }   

    if (bullets.length > 5) {
        bullets.pop();
    }
    // remove bullets after they get off the screen.
    allEnemies.forEach(element => {
        if ((element.x < this.x + this.width) && (element.x + element.width > this.x) && (element.y < this.y + this.height) && (element.y + element.height > this.y)) {
            bullets.splice(this, 1);
            element.x = -200;
            element.y = pos.randomY(500);
            Game.scoreUp(50);
        }
    });
    walls.forEach(element => {
        if ((element.x < this.x + this.width) && (element.x + element.width > this.x) && (element.y < this.y + this.height) && (element.y + element.height > this.y)) {
            bullets.splice(this, 1);
            element.x = -500;
            element.y = -500;

        }
    });
    for (b in bullets) {
       if (bullets[b].y < 0 || bullets[b].x > canvas.width || bullets[b].x < 0 || bullets[b].y > canvas.height) {
            for (x in bullets) {
                delete bullets[b];
            }
            bullets.shift(b);
        }
    }

    // move across the screen 

};
let Decal = function (img, x, y) {
    this.sprite = img;
    this.x = x;
    this.y = y;
};
Decal.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
let decal2 = new Decal('images/decal2.png', pos.random(600), 0);
let decal3 = new Decal('images/decal2.png', pos.random(600), 0);
// ------------------------------------------------ Collectables Section

var Collectable = function () {
    this.sprite = 'images/shot_side.png';
    this.x = pos.random(600);
    this.y = pos.randomY();
};
Collectable.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// ------------------------------------------------ Enemy Section
var Enemy = function () {

    if (Game.mode == "easy") {
        this.speed = pos.randomSpeed(150);
    } else {
        this.speed = pos.randomSpeed(300);
    }
    this.name = 'enemy';
    this.height = 25;
    this.width = 15;
    this.x = pos.randomX();
    this.y = pos.randomY();

    this.sprite = 'images/enemy.png';

};

Enemy.prototype.update = function (dt) {

    this.x += (this.speed * dt);
    // move across the screen 
    if (this.x > 750) { // randomly place enemies at different y's        
        this.x = pos.randomX(); // find a place behind the screen to spawn
        this.y = pos.randomY(); // find a height to spawn at
    }
};
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// ------------------------------------------------ Player Section
let Player = function (x, y) {
    this.sprite = 'images/hero.png';
    this.x = x;
    this.y = y;
    this.height = 18;
    this.width = 18;
    this.speed = 300;
    
}
Player.prototype.update = function (dt) {
    
    movePlayer = function(e){
        if(e == 'down'){
            player.y += (player.speed * dt);
            bulletDirection = 'down';
        }
        if(e == 'up'){
            player.y -= (player.speed * dt);
            bulletDirection = 'up';
        }
        if(e == 'right'){
            player.x += (player.speed * dt);
            bulletDirection = 'right';
        }
        if(e == 'left'){
            player.x -= (player.speed * dt);
            bulletDirection = 'left';
        }
    }
    if (player.y <= 0) {
        
        this.x = 340;
        this.y = 675;
        Game.levelUp();

    }
    let collisionBox = {
        leftBox: this.x - 10,
        rightBox: this.x + 10,
        bottomBox: this.y + 10, // this bounding box/collision can stay for now
        topBox: this.y - 10
    };
    // ---------------------------------------- WALL collision
    walls.forEach(element => {
        if (Game.checkCollision(player, element)) {}
    });
    // ------------------------------------------------- WALL COLLISION
    allEnemies.forEach(element => {
        // console.log('X: '+Math.ceil(element.x), 'Y:' + element.y);
        if ((element.x >= collisionBox.leftBox) && (element.x <= collisionBox.rightBox) && (element.y <= collisionBox.bottomBox) && (element.y >= collisionBox.topBox)) {

            Game.itemCount = 0;
            Game.updateItemsMsgArea();
            this.x = 340;
            this.y = 675;
            Game.lives -= 1;
            Game.updateLivesMsgArea();
        }
    });
    allCollectables.forEach(element => {
        if ((element.x >= collisionBox.leftBox) && (element.x <= collisionBox.rightBox) && (element.y <= collisionBox.bottomBox) && (element.y >= collisionBox.topBox)) {

            Game.itemCount += 1;
            Game.scoreUp(1000);
            Game.updateItemsMsgArea();
            delete element;
            element.x = -500; // just move offscreen for now
            element.y = -600;
        }
    })
};
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function (e) {

    // make sure the player cannot go out of bounds
    if (this.x < 0)
        this.x = 0;
    if (this.y < 0)
        this.y = 0;
    if (this.x + this.width > canvas.width) {
        this.x = canvas.width - this.width;
    }
    if (this.y >= canvas.height) {
        this.y = canvas.height;
    }
    if (e == 'down' || e == 'up' || e == 'right' || e == 'left') {
        movePlayer(e);
    }
    if (e == 'space') {
        fireBullet();
    }

}
let addEntities = (function () {
    Game.spawnEnemies();
});
Game.spawnEnemies();

player = new Player(340, 675) // spawn player

document.addEventListener('keydown', function (e) {
    
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        65: 'left',
        68: 'right',
        83: 'down',
        87: 'up',
        32: 'space'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
document.addEventListener('keyup', function (e) {

    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',

    };

    player.handleInput(allowedKeys[e.keyCode]);
});
bgMusic.play();
let music = setInterval(() => {
    bgMusic.pause(); 
    bgMusic.currentTime = 0;
    bgMusic.play(); 
}, 30000);
