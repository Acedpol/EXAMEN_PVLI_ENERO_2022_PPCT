/** @type {Phaser.GameObjects.GameObject} */
export default class Player extends Phaser.GameObjects.Container
{
    /** @type {Phaser.Scene} */
    scene

    /** @type {Phaser.Types.Input.Keyboard.CursorKeys} */
    cursors

    /** @type {Number} */
    _speed

    /** @type {Phaser.Physics.Arcade.Sprite} */
    player

    /**
     * Constructor del container del jugador
     * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
     * @param {number} x Coordenada X
     * @param {number} y Coordenada Y
     * @param {Phaser.Physics.Arcade.Sprite} aspecto Sprite que representa al jugador
     */
    constructor(scene, x, y, aspecto)
    {
        // Constructor del container //
        super(scene, x, y, aspecto)
        this.scene = scene
        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)

        // disable some direction colliders from player
        this.body.checkCollision.up = false
        this.body.checkCollision.right = false
        this.body.checkCollision.left = false

        // colisiona con los bordes del mundo de juego
        this.body.collideWorldBounds = true

        // ajustes del jugador
        this.player = aspecto
        this.body.setSize(this.player.width, this.player.height)
        this.player.setOrigin(0)

        // eventos de teclado
        this.cursors = scene.input.keyboard.createCursorKeys() // init cursors

        // inicialización de variables
        this._speed = 100
    }

    preUpdate(t,dt)
    {
        this.iterate( (child) => child.preUpdate(t,dt) ) // for animations

        // check if player is touching something below it
        const touchingDown = this.body.onFloor()

        // walk animation
        if (touchingDown && (this.cursors.left.isDown || this.cursors.right.isDown))
        {
            if (this.player.anims.currentAnim.key != 'walk')
            {
                this.player.play('walk')
            }
            // resume animation
            this.player.anims.resume()
        }
        else if (touchingDown)
        {
            // initial animation pause
            this.player.play('walk')
            this.player.anims.pause()
        }

        // flying animation
        if (!touchingDown)
        {
            if (this.player.anims.currentAnim.key != 'jump')
                this.player.play('jump')
        }

        // left and right input logic
        if (this.cursors.left.isDown)
        {
            this.body.setVelocityX(-100)
            // this.x += -100 * dt / 1000
            this.player.flipX = true
        }
        else if (this.cursors.right.isDown)
        {
            this.body.setVelocityX(100)
            // this.x += +100 * dt / 1000
            this.player.flipX = false
        }
        else
        {
            this.body.setVelocityX(0)
        }

        // jump input logic
        if (this.cursors.up.isDown)
        {
            this.body.setVelocityY(-100)
            // this.y += -200 * dt / 1000
            // console.log('t: '+ t + ', dt: ' + dt)
        }

        // wraps the player (movimiento toroidal)
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