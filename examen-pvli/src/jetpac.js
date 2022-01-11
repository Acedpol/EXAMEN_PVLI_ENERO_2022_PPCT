export default class JetPac extends Phaser.Scene {
    /**
     * Constructor de la escena
     */
    constructor() {
        super({
            key: 'jetpac'
        });
        this.player;
        this.arrowKey;
        this.fireKey;

        this.sky, this.mountains, this.city;
        this.platformGroup, this.wallGroup, this.coinGroup;

        this.score = 0, this.scoreText;
        this.coinSound, this.dieSound;
    }
    preload() {
        
    }

    create() {
        this.background = this.add.image(0, 0, "clouds-skyline");
        this.arrowKey = this.input.keyboard.createCursorKeys();
        this.fireKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
        
    }
}
