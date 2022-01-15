/** @type {Phaser.GameObjects.GameObject} */
export default class SpaceShip extends Phaser.GameObjects.Container
{
    /** @type {Phaser.Scene} */
    scene

    /** @type {Boolean} */
    listaParaDespegue

    /** @type {Phaser.Physics.Arcade.Image} */
    spaceShip

    /** @type {Phaser.Physics.Arcade.Sprite} */
    combustion

    /** @type {Phaser.Sound.BaseSound} */
    explode

    /** @type {Phaser.Sound.BaseSound} */
    win

    /**
     * Constructor del objeto combustible
     * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
     * @param {number} x Coordenada X
     * @param {number} y Coordenada Y
     * @param {Phaser.Physics.Arcade.Image} aspecto Imagen que representa a la nave espacial
     */
    constructor(scene, x, y, aspecto) 
    {        
        // Constructor del container //
        super(scene, x, y, aspecto)
        this.scene = scene
        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)

        // set active and visible
        this.setActive(true)
        this.setVisible(true)

        // colisiona con los limites del mundo
        this.body.collideWorldBounds = true

        // ajustes de la nave
        this.spaceShip = aspecto
        this.body.setSize(this.spaceShip.width, this.spaceShip.height)
        this.spaceShip.setOrigin(0)
        
        // inicialización de variables
        this._aceleration = -250
        this.listaParaDespegue = false

        // inicialización de audios fx
        this.explode = this.scene.sound.add('jetpack')
        this.win = this.scene.sound.add('walk-audio')
    }

    preUpdate(t,dt) 
    {
        /** @type {PlayerContainer} */
        let player = this.scene.playerContainer

        // checks if the player overlap with this GameObject
        if (player.carriesObject && this.scene.physics.overlap(this, player))
        {
            player.dropObject()
            this.scene.sound.play('drop')   // sound feedback
        }

        // Cuando finaliza el juego: Despega!
        if (this.listaParaDespegue)
        {
            this.body.setAccelerationY(this._aceleration)
        }
    }

}