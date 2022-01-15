import Fuel from '../game/fuel.js'
import PlayerContainer from '../game/playerContainer.js'

export default class JetPac extends Phaser.Scene 
{
    /** @type {Phaser.GameObjects.Container} */
    playerContainer

    /** @type {Phaser.Physics.Arcade.Group} */
    fuels

    /** @type {Phaser.Physics.Arcade.StaticBody} */
    platform

    /** @type {Phaser.GameObjects.Text} */
    fuelCollectedText

    /** @type {Number} */
    level
    fuelCollected
    fuelToFinish
    cooldownAsteroids

    /** @type {Phaser.Tilemaps.Tilemap} */
    map

    /** @type {Phaser.Tilemaps.TilemapLayer} */
    groundLayer

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
        this.fuelToFinish = 2

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

        // cancela las colisiones con el techo
        this.physics.world.checkCollision.up = false
    }

    preload() 
    {
        console.log("Jetpac scene")
    }

    create() 
    {
        // gets the sizes of the screen
        const{width,height} = this.scale

        // Añade al jugador como Sprite
        let player = this.add.sprite(0, 0, 'jetpac', 7)

        // creates the player in the middle of the screen
        this.playerContainer = new PlayerContainer(this, width * 0.5, height * 0.5, player)

        // follow the player
        this.cameras.main.startFollow(this.playerContainer)

        // creates the game map
        this.map = this.createMap('nivel', 8, 8, 'platform', 'img_tilemap', 'platforms')
        this.physics.add.collider(this.playerContainer, this.groundLayer)

        // World Bounds and Camera dead zones properties
        this.worldBoundsNCameraDeadZones(this.map)

        // Grupo de Combustibles
        this.fuels = this.physics.add.group({
            classType: Fuel
        })

        this.physics.add.collider(this.fuels, this.groundLayer)

        // Crea todos los combustibles a recoger de la escena
        for (let i = 0; i < this.fuelToFinish; i++) {
            this.fuels.get(Phaser.Math.Between(25, width - 25), Phaser.Math.Between(25, height - 25), 'fuel')
        }        

        // text score for fuels
        const style = { color: '#fff', fontSize: 8, fontFamily: 'Pixeled' }
        this.fuelCollectedText = this.add.text(240, 10, '0/' + this.fuelToFinish, style)
            .setScrollFactor(0)
            .setOrigin(0.5, 0)
    }

    update() 
    {
        
    }

    /**
     * Constructor del mapa
     * @param {String} clave Nombre dado al 'mapa.json' en 'boot.js'
     * @param {number} tileWidth Tamaño horizontal en pixeles de cada tile
     * @param {number} tileHeight Tamaño vertical en pixeles de cada tile
     * @param {String} tileset Nombre dado al 'tileset' en 'mapa.json'
     * @param {String} tilesetImg Nombre dado a la imagen asociada al 'tileset' en 'boot.js'
     * @param {String} layer Nombre dado a la capa de tiles (tilemap) en 'mapa.json'
     */
    createMap(clave, tileWidth, tileHeight, tileset, tilesetImg, layer) 
    {
        // creación del mapa:
        const map = this.make.tilemap({
          key: clave,
          tileWidth: tileWidth,
          tileHeight: tileHeight
        });
    
        // asignación de imagenes
        const _tileset = map.addTilesetImage(tileset, tilesetImg)
    
        // creación de layers: 3 principales (fondo, fore y colliders)
        this.groundLayer = map.createLayer(layer, [_tileset]).setDepth(1)  // 'GroundLayer'        
    
        // definición de colisiones: -> con propiedad en TILED
        this.groundLayer.setCollisionByProperty({ suelo: true })
        
        return map
    }

    /**
     * Ajusta los límites del mundo de juego y
     * los parámetros de seguimiento de la cámara
     * al tamaño del mapa ya creado
     * @param {Phaser.Tilemaps.Tilemap} map Mapa del juego ya creado
     */ 
    worldBoundsNCameraDeadZones(map)
    {
        // dimensiones del mapa
        const mapWidth = map.width * map.tileWidth
        const mapHeight = map.height * map.tileHeight
    
        // tamaño del mundo de juego
        this.physics.world.setBounds(mapWidth * (-0.5), 0, mapWidth * 2, mapHeight);

        // set the horizontal dead zone to 1.5x game width         
        this.cameras.main.setDeadzone(mapWidth * 1.25, mapHeight * 0.655)
    }
}
