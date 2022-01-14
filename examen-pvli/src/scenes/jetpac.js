import player from '../game/player.js'

export default class JetPac extends Phaser.Scene 
{
    /** @type {Phaser.Physics.Arcade.Sprite} */
    player

    /**
     * Constructor de la escena
     */
    constructor() 
    {
        super({
            key: 'jetpacGame'
        });
    }

    preload() 
    {
        
    }

    create() 
    {
        // gets the sizes of the screen
        const { width, height } = this.scale

        // creates the player in the middle of the screen
        this.player = new player(this, width * 0.5, height * 0.5, 'jetpac', 7)
        
    }

    update() 
    {
        
    }
}
