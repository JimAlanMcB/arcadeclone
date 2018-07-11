// TODO: Reset function
// Make sure everything gets reset
// ADD star rating or score
// ADJUST CSS
// CHANGE STARS TO BONES
// ADD README
// REFACTOR
// EASY / HARD MODE
// DIFFERENT ENEMY COLORS
let game = {
    mode: "easy",
    itemCount: 0,
    level: 1,
    lives: 10, 
    updateItemsMsgArea: function(){
       itemsMsgArea = document.getElementById('game_msg_area_items');
       itemsMsgArea.innerHTML = this.itemCount;
    },
    updateLevelMsgArea: function (){
        levelMsgArea = document.getElementById('game_msg_area_level');
        levelMsgArea.innerHTML = this.level;
    },
    levelUp: function(){
        this.itemCount = 0;
        this.level += 1;
        this.updateItemsMsgArea();
        this.updateLevelMsgArea();
        ctx.clearRect(0,0,707,808);
        addEntities();
    },
    reset: function() {
        ctx.clearRect(0,0,707,808);
        this.itemCount = 0;
        this.level = 1;
        this.updateItemsMsgArea();
        this.updateLevelMsgArea();
        addEntities();
    }
}
let pos = {
    randomX: function () {
        x = this.random(-600);
        return x;
    },
    randomY: function () {
        y = this.random(500);
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

var Collectable = function () {
    this.sprite = 'images/dog-bone.png';
    this.x = pos.random(600);
    this.y = pos.randomY();
};
Collectable.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Collectable.prototype.collision = function () {

};

var Enemy = function () {

    if (game.mode == "easy") {
        this.speed = pos.randomSpeed(150);
    } else {
        this.speed = pos.randomSpeed(300);
    }
    this.x = pos.randomX();
    this.y = pos.randomY();

    this.sprite = 'images/running-cat.png';

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
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

let Player = function (x, y) {
    this.sprite = 'images/fido.png';
    this.x = x;
    this.y = y;
}

Player.prototype.update = function (dt) {
    // console.log('x: ' + this.x + ' y: ' + this.y)
    if (player.y <= -25) {
        alert('Going to level ' + (game.level + 1)  + ' You collected ' + game.itemCount + ' items');
        this.x = 300;
        this.y = 500;
        game.levelUp();
        
    }
    let collisionBox = {
        leftBox: this.x - 80,
        rightBox: this.x + 80,
        bottomBox: this.y + 80,
        topBox: this.y - 80
    };

    allEnemies.forEach(element => {
        // console.log('X: '+Math.ceil(element.x), 'Y:' + element.y);
        if ((element.x >= collisionBox.leftBox) && (element.x <= collisionBox.rightBox) && (element.y <= collisionBox.bottomBox) && (element.y >= collisionBox.topBox)) {
            console.log('collision');
            game.itemCount = 0;
            game.updateItemsMsgArea();
            this.x = 300;
            this.y = 500;
            game.lives -= 1;
        }
    });
    allCollectables.forEach(element => {
        if ((element.x >= collisionBox.leftBox) && (element.x <= collisionBox.rightBox) && (element.y <= collisionBox.bottomBox) && (element.y >= collisionBox.topBox)) {
            console.log('collision with item');
            game.itemCount += 1;
            game.updateItemsMsgArea();
            element.x = -500; // just move offscreen for now
            element.y = -600;
        }
    })
};
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
Player.prototype.handleInput = function (e) {
   
    if (this.y > 500) {
        this.y = 500;
    }
    if (this.x < 25) {
        this.x = 25;
    }
    if (this.x > 600) {
        this.x = 600;
    }
    if (e == 'down') {
        this.y += 25;
    } else if (e == 'up') {
        this.y -= 25;
    } else if (e == 'right') {
        this.x += 25;
    } else if (e == 'left') {
        this.x -= 25;
    }

}

// LOOK INTO DIFFERENT WAY TO DO THIS. (THINK ABOUT IT)

let addEntities = (function (){
    allCollectables = [
        new Collectable,
        new Collectable,
        new Collectable,
        new Collectable,
        new Collectable
    ]
    allEnemies = [
        new Enemy,
        new Enemy,
        new Enemy,
        new Enemy,
    ]
});
allCollectables = [
    new Collectable,
    new Collectable,
    new Collectable,
    new Collectable,
    new Collectable
]

allEnemies = [
    new Enemy,
    new Enemy,
    new Enemy,
    new Enemy,
]
player = new Player(300, 500)
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {

    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});