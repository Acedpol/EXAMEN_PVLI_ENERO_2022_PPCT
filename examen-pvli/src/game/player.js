export default class Player extends Phaser.Physics.Arcade.Sprite
{
    /** @type {Phaser.Physics.Arcade.Sprite} */
    scene

    /** @type {Phaser.Types.Input.Keyboard.CursorKeys} */
    cursors

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
        this.scene.physics.add.existing(this)
        this.play('walk')
        this.cursors = scene.input.keyboard.createCursorKeys() // init cursors
    }

    preUpdate(t,dt) 
    {
        super.preUpdate(t,dt)

        // left and right input logic
        if (this.cursors.left.isDown)
        {
            this.setVelocityX(-200)
            this.flipX = true
        }
        else if (this.cursors.right.isDown)
        {
            this.setVelocityX(200)
            this.flipX = false
        }
        else
        {
            // stop movement if not left or right
            this.setVelocityX(0)
        }

        // jump input logic
        if (this.cursors.up.isDown)
        {
            this.setVelocityY(-300)
            this.play('jump')
        }
        else
        {
            // stop movement if not up
            this.setVelocityY(0)
        }
    }
}
