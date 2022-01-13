export default class Player extends Phaser.Physics.Arcade.Sprite
{
    /** @type {Phaser.Physics.Arcade.Sprite} */
    scene

    /**
     * Constructor de la escena 
     */
    constructor(scene, x, y, texture, frame) 
    {
        super(scene, x, y, texture, frame)
        this.scene = scene
        this.scene.add.existing(this)
        this.scene.add.existing(this)
        this.play('walk')
    }
    
    preload() 
    {
        
    }

    create() 
    {
        // gets the sizes of the screen
        const { width, height } = this.scene.scale        
    }

    update() 
    {
        
    }
}
