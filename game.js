var config = {
    type: Phaser.AUTO,
    width: 400,
    height: 400,
    physics: {
        default: "arcade",
        arcade: {
            debug: false
        }
    },

    scene: [Juego]
};

var game = new Phaser.Game(config);

var mapa
var barra
var bola
var lanzamiento