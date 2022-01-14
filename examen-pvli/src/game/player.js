export default class Player extends Phaser.Physics.Arcade.Sprite
{
    /** @type {Phaser.Physics.Arcade.Sprite} */
    scene

    /**
     * Constructor del jugador
     * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
     * @param {number} x Coordenada X
     * @param {number} y Coordenada Y
     * @param {Phaser.Textures.Texture} texture Textura usada en el jugador (spritesheet)
     * @param {number} frame Indice del frame utilizado
     */
    constructor(scene, x, y, texture, frame) 
    {
        super(scene, x, y, texture, frame)
        this.scene = scene
        this.scene.add.existing(this)
        this.scene.add.existing(this)
        this.play('walk')
    }

    preUpdate(t,dt) 
    {
        super.preUpdate(t,dt)
    }
}
