export default class Boot extends Phaser.Scene 
{
    /**
     * Constructor de la escena
     */
    constructor() {
      super({
        key: 'boot'
      });
    }

    preload() 
    {
        console.log("Boot scene")

        // player spritesheet
        this.load.spritesheet('jetpac', "./assets/sprites/jetpac.png", 
            { frameWidth: 17, frameHeight: 24 }) 

        // platform
        this.load.image('platform', './assets/sprites/tileset.png')

        // button
        this.load.image('button', './assets/images/button.png')

        // fuel
        this.load.image('fuel', './assets/sprites/fuel.png')
        this.load.audio('pick', './assets/sounds/pick.wav')

        // spaceShip
        this.load.image('ship', './assets/sprites/spaceship.png')
        this.load.audio('drop', './assets/sounds/drop.wav')

        // map
        this.load.image('img_tilemap', './assets/sprites/tileset.png')
        this.load.tilemapTiledJSON('nivel', './assets/map/space-jetpac.json')

        // jetpack audio
        this.load.audio('jetpack', './assets/sounds/jetpack2.wav')

        // walking audio
        this.load.audio('walk-audio', './assets/sounds/soldier-walk.wav')

        // combustion space-ship
        this.load.spritesheet('combustion', "./assets/sprites/combustion.png", 
            { frameWidth: 18, frameHeight: 17 })

        // explosion audio
        this.load.audio('explode', './assets/sounds/explosion.wav')

        // win audio
        this.load.audio('explode', './assets/sounds/win.wav')
    }

    create() 
    {
        // creates walk animation for player
        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNames('jetpac', { start: 4, end: 7 }),
            frameRate: 10,
            repeat: -1
        })

        // creates jump animation for player
        this.anims.create({
          key: 'jump',
          frames: this.anims.generateFrameNames('jetpac', { start: 0, end: 3 }),
          frameRate: 10,
          repeat: -1
        })

        // inits the game menu scene
        this.scene.start('menuGeomGame')
    }

    update() 
    {

    }

}