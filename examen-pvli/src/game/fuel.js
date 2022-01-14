export default class Fuel extends Phaser.Physics.Arcade.Image
{

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
        this.scene.physics.add.existing(this)
 
        // colisiona con los limites del mundo pero no por arriba
        this.body.collideWorldBounds = true
    }

    // preUpdate(t,dt) 
    // {
    //     super.preUpdate(t,dt)
    // }

}