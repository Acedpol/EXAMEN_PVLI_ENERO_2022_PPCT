import player from '../game/player.js'

export default class JetPac extends Phaser.Scene 
{
    /** @type {Phaser.Physics.Arcade.Sprite} */
    player

    /** @type {Phaser.Physics.Arcade.StaticBody} */
    platform

    /** @type {Phaser.GameObjects.Text} */
    fuelCollectedText

    /** @type {Number} */
    level
    fuelCollected
    fuelToFinish
    cooldownAsteroids

    /**
     * Constructor de la escena
     */
    constructor() 
    {
        super({
            key: 'jetpacGame'
        });
    }

    init(level)
    {
        // Level select assignment
        this.level = level
        console.log('Level = ' + this.level)

        // Level parameters by difficulty
        this.fuelCollected = 0

        if (this.level == 1)
        {
            this.fuelToFinish = 2
            this.cooldownAsteroids = 2
        }
        else if (this.level == 2)
        {
            this.fuelToFinish = 3
            this.cooldownAsteroids = 1
        }
        else if (this.level == 3)
        {
            this.fuelToFinish = 5
            this.cooldownAsteroids = 0.5
        }
    }

    preload() 
    {
        console.log("Jetpac scene")
    }

    create() 
    {
        // gets the sizes of the screen
        const{width,height} = this.scale
        this.physics.world.setBounds(-256/2, 0, 256*2, 192)

        // creates the player in the middle of the screen
        this.player = new player(this, width * 0.5, height * 0.5, 'jetpac', 7)

        // add centralize platform with physics collides
        this.platform = this.physics.add.staticSprite(width * 0.5, height - 25, 'platform')
        this.physics.add.collider(this.player, this.platform)

        // follow the player
        this.cameras.main.startFollow(this.player)

        // set the horizontal dead zone to 1.5x game width
        this.cameras.main.setDeadzone(width * 1.25, height)
    }

    update() 
    {
        
    }
}
