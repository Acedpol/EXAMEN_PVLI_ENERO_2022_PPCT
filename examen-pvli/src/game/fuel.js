export default class Fuel extends Phaser.Physics.Arcade.Image
{
    /** @type {Phaser.Scene} */
    scene

    /**
     * Constructor del objeto combustible
     * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
     * @param {number} x Coordenada X
     * @param {number} y Coordenada Y
     * @param {Phaser.Textures.Texture} texture Textura usada en el jugador (spritesheet)
     */
    constructor(scene, x, y, texture) 
    {
        super(scene, x, y, texture)
        this.scene = scene
        this.scene.add.existing(this)
        // this.scene.physics.add.existing(this)
        this.scene.physics.world.enable(this)

        console.log('new fuel x:' + x + ', y:' + y + ', texture:' + texture) // print info

        // set active and visible
        this.setActive(true)
        this.setVisible(true)
 
        // colisiona con los limites del mundo
        this.body.collideWorldBounds = true
    }

    preUpdate(t,dt) 
    {
        // checks if the player overlap with this GameObject
        if (this.scene.physics.overlap(this.scene.playerContainer, this))
        {
            this.handleCollectFuel(this.scene.playerContainer, this)
        }
    }

    /**
    * @param {Phaser.GameObjects.Container} playerContainer
    * @param {Fuel} fuel
    */
    handleCollectFuel(playerContainer, fuel)
    {
        /** @type {Phaser.GameObjects.GameObject.body} */

        // hide from display
        // this.scene.fuels.killAndHide(fuel)
        
        // disable from physics world
        this.scene.physics.world.disableBody(this.body)

        // Recoge el fuel y se lo añade a playerContainer (y lo coloca)
        playerContainer.add(fuel)
        fuel.setPosition(0, -fuel.height -2)
        fuel.setOrigin(0)
        
        this.scene.fuelCollected++
        this.scene.sound.play('pick')
        
        // create new text value and set it
        const value = this.scene.fuelCollected + '/' + this.scene.fuelToFinish
        this.scene.fuelCollectedText.text = value

        // fuel.destroy() // posible recurso (no utilizado)
    }

}