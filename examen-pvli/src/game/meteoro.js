import PlayerContainer from '../game/playerContainer.js'

export default class Meteor extends Phaser.Physics.Arcade.Sprite
{
    /** @type {Phaser.Scene} */
    scene

    /** @type {Phaser.Sound.BaseSound} */
    explode

    /** @type {Boolean} */
    isExploted

    /** @type {Number} */
    incV

    /** @type {Phaser.Math.Vector2} */
    vel

    /**
     * Constructor del objeto combustible
     * @param {Phaser.Scene} scene Escena a la que pertenece el meteorito
     * @param {number} x Coordenada X
     * @param {number} y Coordenada Y
     * @param {Phaser.Textures.Texture} texture Textura usada para el meteororo (spritesheet)
     */
    constructor(scene, x, y, texture) 
    {
        super(scene, x, y, texture)
        this.scene = scene
        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)

        // set active and visible
        this.setActive(true)
        this.setVisible(true)


        // animation
        this.play('fly-meteor')

        // inicialización de audio sfx
        this.isExploted = false
    }

    preUpdate(t,dt) 
    {
        super.preUpdate(t,dt) // for animation

        // movimiento
        this.body.setAccelerationY(-200) // anula la gravedad!!
        this.setVelocity(this.vel.x, this.vel.y) // sets velocity

        // checks if the player overlap with this GameObject
        if (this.scene.physics.overlap(this, this.scene.playerContainer))
        {        
            this.scene.handleGameLose(this)
        }

        // checks if the player overlap with the groundLayer
        if (this.body.onFloor() || this.body.onWall()) 
        {
            this.play('explote', true)
            if (!this.isExploted) {
                this.scene.sound.play('explode', {
                    volume: 3,
                    rate: 1
                })
                this.isExploted = true
            }
            this.scene.physics.world.disableBody(this.body)
            this.scene.time.delayedCall(1000, () => {
                this.scene.meteoros.killAndHide(this)
            })
        }

        // wraps the meteor (movimiento toroidal)
        this.horizontalWrap(this)
    }

    /**
     * @param {Phaser.Physics.Arcade.Sprite} object
     */
    horizontalWrap(object)
    {
        const halfWidth = object.body.width * 0.25
        const gameWidth = this.scene.scale.width
        if (object.x < -halfWidth*3)
        {
            object.x = gameWidth - halfWidth
        }
        else if (object.x > gameWidth - halfWidth)
        {
            object.x = -halfWidth*3
        }
    }



}