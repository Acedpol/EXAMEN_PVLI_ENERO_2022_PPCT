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
        // player spritesheet
        this.load.spritesheet('jetpac', "./assets/sprites/jetpac.png", 
            { frameWidth: 17, frameHeight: 24 }) 
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

        // inits the game main scene
        this.scene.start('jetpacGame');
    }

    update() 
    {

    }

}