class Juego extends Phaser.Scene{
    constructor(){
        super("Juego");
    }

    preload(){
        this.load.image('walls', 'assets/walls.png');
        this.load.image('blocks', 'assets/blocks.png');
        this.load.tilemapTiledJSON('mapa', 'assets/mapa.json');
        this.load.atlas('arkanoid', 'assets/arkanoid.png', 'assets/arkanoid_atlas.json');
        
    }
    
    create(){
        mapa = this.make.tilemap({key: 'mapa'});
        var tileset = mapa.addTilesetImage('walls', 'walls');
        var tileset2 = mapa.addTilesetImage('blocks', 'blocks');
        var layer = mapa.createStaticLayer('Paredes', tileset);
        var layer2 = mapa.createStaticLayer('Bloques', tileset2);

        mapa.setCollisionByProperty({collides: true});

        lanzamiento = true;

        barra = this.add.sprite(200, 380, 'arkanoid', 'arkanoid_barralarga');
        bola = this.physics.add.sprite(200, barra.y - 12, 'arkanoid', 'arkanoid_bola').setScale(1.5);
        bola.setCollideWorldBounds(false);
        bola.body.bounce.set(1);

        this.physics.add.collider(barra, bola, this.hitBarra, null, this);
        this.physics.add.collider(bola, layer, this.hitPared, null, self);

        this.input.on('pointerdown', () => this.lanzar());
    }

    update(){

        if (bola.y >= 390){
            this.gameOver()
        }

        barra.x = game.input.mousePointer.x;

        if (barra.x < 57)
        {
            barra.x = 57;
        }
        else if (barra.x > 343)
        {
            barra.x = 343;
        }

        if (lanzamiento == true)
        {
            bola.x = barra.x;
        }

    
    }

    lanzar(){
        if (lanzamiento == true)
        {
            bola.setVelocity (-300)
            bola.setVelocityX (-75)
            lanzamiento = false;
        }
    }

    gameOver(){
        bola.body.setVelocity(0, 0);
    }
}