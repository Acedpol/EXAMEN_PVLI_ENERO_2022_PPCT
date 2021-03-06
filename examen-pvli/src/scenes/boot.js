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

        // combustion audio
        this.load.audio('burst', './assets/sounds/combustion.wav')

        // explode audio
        this.load.audio('explode', './assets/sounds/explosion.wav')

        // win audio
        this.load.audio('win', './assets/sounds/win.wav')

        // lose audio
        this.load.audio('lose', './assets/sounds/lose.wav')

        // meteoro spritesheet
        this.load.spritesheet('meteor', "./assets/sprites/meteor.png", 
            { frameWidth: 16, frameHeight: 14 }) 

        // explosion spritesheet
        this.load.spritesheet('explosion', "./assets/sprites/explosion.png", 
            { frameWidth: 24, frameHeight: 17 }) 
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

        // creates combustion animation for spaceship
        this.anims.create({
          key: 'fly',
          frames: this.anims.generateFrameNames('combustion', { start: 0, end: 1 }),
          frameRate: 10,
          repeat: -1
        })

        // creates meteor animation for enemies
        this.anims.create({
          key: 'fly-meteor',
          frames: this.anims.generateFrameNames('meteor', { start: 0, end: 3 }),
          frameRate: 6,
          repeat: -1
        })

        // creates meteor animation for enemies
        this.anims.create({
          key: 'explote',
          frames: this.anims.generateFrameNames('explosion', { start: 0, end: 2 }),
          frameRate: 5,
          repeat: -1
        })

        // inits the game menu scene
        this.scene.start('menuGeomGame')
    }

    update() 
    {

    }

}