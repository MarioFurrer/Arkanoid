class Paddle extends Phaser.Scene{
    constructor(config){
        super(config.scene, config.x, config.y);
        config.scene.add.existing(this);
        paddle = config.scene.physics.add.sprite(config.x, config.y,'arkanoid', 'arkanoid_barralarga').setImmovable();
        config.scene.input.on('pointermove', function () {

            paddle.x = game.input.mousePointer.x;
        
        }, this);
    }
}