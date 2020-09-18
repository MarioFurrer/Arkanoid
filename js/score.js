class Score extends Phaser.GameObjects.Text{

    constructor(config){

        super(config.scene, config.x, config.y);
        config.scene.add.existing(this);
        scoreText = config.scene.add.text(config.x, config.y, 'Puntaje:' + score, { fontSize: '25px', color: 'red' });
    }

}