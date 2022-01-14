export default class Menu extends Phaser.Scene 
{
    /**
     * Constructor de la escena
     */
    constructor() 
    {
        super({
            key: 'menuGame'
        });
    }

    preload() 
    {
        console.log("Menu scene")
    }

    create() 
    {
        // gets the sizes of the screen
        const{width,height} = this.scale

        // compone el titulo y subtitulo del menu principal del juego
        this.add.text(width * 0.5, 25, 'JetPac Game', {
                fontSize: 14,
                fontFamily: 'Pixeled',
                fontStyle: 'bold', 
                color: '#FFFFFF'
            })
            .setOrigin(0.5)

        this.add.text(width * 0.5, 45, 'Selecciona un nivel de dificultad', {
                fontSize: 8,
                fontFamily: 'Pixeled',
                color: '#FFFFFF'
            })
            .setOrigin(0.5)

        // three buttons, three levels on difficulty
        this.createButtonGame(width * 0.5, height * 0.35, 'button', 'Fácil', 1)
        this.createButtonGame(width * 0.5, height * 0.55, 'button', 'Intermedio', 2)
        this.createButtonGame(width * 0.5, height * 0.75, 'button', 'Difícil', 3)
    }

    update() 
    {
        
    }

    initGame()
    {
        // inits the game main scene
        this.scene.start('jetpacGame')
    }

    /**
     * Constructor del button
     * @param {number} x Coordenada X
     * @param {number} y Coordenada Y
     * @param {Phaser.Textures.Texture} texture Textura usada en el fondo del button (image)
     * @param {String} name Texto ubicado en en el button
     * @param {number} lv Nivel de dificultad
     */
    createButtonGame(x, y, texture, name, lv)
    {
        // crea el button y lo hace interactivo
        this.add.image(x, y, texture)
            .setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, ()=>{
                this.initGame(lv)
            })
            .setScale(2.25, 1)

        // compone el button con un texto
        this.add.text(x, y, name, {
                fontSize: 14,
                fontFamily: 'Pixeled',
                fontStyle: 'bold', 
                color: '#00FF00'
            })
            .setOrigin(0.5)
    }
}
