class Level2 extends Phaser.Scene{
    constructor(){
        super("Level2");
    }
    preload(){
        this.load.image('walls', 'assets/images/walls.png');
        this.load.image('blocks', 'assets/images/blocks.png');

        this.load.tilemapTiledJSON('mapa', 'assets/Json/Nivel2.json');
        this.load.atlas('arkanoid', 'assets/Images/arkanoid.png', 'assets/Json/arkanoid_atlas.json');
    }
    
    create(){
        score = 0;
        lifes = 3;
        map = this.make.tilemap({key: 'mapa'});
        var walls = map.addTilesetImage('walls');
        var wallsLayer = map.createStaticLayer('Walls', walls);

        var blocks = map.addTilesetImage('blocks');
        var redBlocksLayer = map.createDynamicLayer('Red Blocks', blocks);
        var blueBlocksLayer = map.createDynamicLayer('Blue Blocks', blocks);
        var yellowBlocksLayer = map.createDynamicLayer('Yellow Blocks', blocks);

        wallsLayer.setCollisionBetween(0,8).setTileIndexCallback(2, this.wallBoost, this);
        redBlocksLayer.setCollisionBetween(10, 13).setTileIndexCallback(12, this.hitRedBlock, this);
        blueBlocksLayer.setCollisionBetween(10, 13).setTileIndexCallback(10, this.hitBlueBlock, this);
        yellowBlocksLayer.setCollisionBetween(17, 18).setTileIndexCallback(10, this.hitYellowBlock, this);

        launch = true;

        paddle = this.physics.add.sprite(206, 400,'arkanoid', 'arkanoid_barralarga').setImmovable();
        
        this.input.on('pointermove', function () {

            paddle.x = game.input.mousePointer.x;
        
        }, this);

        this.input.on('pointerdown', () => this.launch());

        ball = this.physics.add.sprite(paddle.x, paddle.y - 12, 'arkanoid', 'arkanoid_bola').setScale(1.5);
        ball.body.bounce.set(1);

        this.physics.add.collider(paddle, ball, this.hitPaddle, null, this);
        this.physics.add.collider(ball, wallsLayer);
        this.physics.add.collider(ball, redBlocksLayer);
        this.physics.add.collider(ball, blueBlocksLayer);
        this.physics.add.collider(ball, yellowBlocksLayer);

        let scoreText = new Score({scene: this, x:150, y:280});
        lifesText = this.add.text(40, 390, 'Vidas:' + lifes, { fontSize: '16px', color: 'red' });
    }

    update(){
        
        lifesText.setText('Vidas:' + lifes);

        scoreText.setText('Puntaje:'+ score);

        if (ball.y >= 420){
            this.oneLife()
        }

        if (paddle.x < 57)
        {
            paddle.x = 57;
        }
        else if (paddle.x > 355)
        {
            paddle.x = 355;
        }

        if (launch == true)
        {
            ball.x = paddle.x;
        }

        if (score >= 300){
            this.scene.stop(Level2);
        }
    }

    launch(){
        if (launch == true)
        {
            ball.setVelocityY (-255).setVelocityX (-75);
            launch = false;
        }
    }

    hitPaddle(paddle, ball){

        ball.body.setVelocityX(-255);

        var pos = 0;
  
        if (ball.x < paddle.x)
        {
            pos = paddle.x - ball.x;
            ball.setVelocityX(-10 * pos);
        }
        else if (ball.x > paddle.x)
        {
            pos = ball.x - paddle.x;
            ball.setVelocityX(10 * pos);
        }
        else
        {
            ball.setVelocityX(2 + Math.random() * 8);
        }
    }

    hitRedBlock(ball, tile){
        //redBlocksLayer.removeTileAt(tile.x, tile.y);
        score = score + 5;
    }

    hitBlueBlock(){
        //blueBlocksLayer.removeTileAt(tile.x, tile.y);
        score = score + 10;
    }

    hitYellowBlock(){
        //yellowBlocksLayer.removeTileAt(tile.x, tile.y);
        score = score + 15;
    }

    wallBoost(ball){
        if(ball.x <= 200){
            ball.body.setVelocityX(300);
        }
        else if (ball.x >= 200){
            ball.setVelocityX(-300);
        }
    }

    oneLife(){
        ball.body.setVelocity(0, 0);
        lifes = lifes - 1;
        ball.y = paddle.y - 12;
        launch = true;
        if(lifes <= 0){
            this.gameOver()
        }
    }

    gameOver(){
        ball.body.setVelocity(0, 0);
        this.scene.restart();
    }
}