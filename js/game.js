var config = {
    type: Phaser.AUTO,
    width: 416,
    height: 416,
    physics: {
        default: "arcade",
        arcade: {
            debug: false
        }
    },

    scene: [Level1, Level2]
};

var game = new Phaser.Game(config);

var map;
var paddle;
var ball;
var launch;
var score;
var scoreText;
var lifes;
var lifesText;