export default class Boot extends Phaser.Scene {
    /**
     * Constructor de la escena
     */
    constructor() {
      super({
        key: 'boot'
      });
    }
    preload() {
        // this.load.spritesheet('dude', './assets/images/dude.png', 32, 48);
        this.load.image('clouds-skyline', './assets/sprites/clouds-skyline.jpg');
        // this.load.spritesheet('coin', './assets/images/coin.png', 32, 32); 
        this.load.audio('audio_coin-pickup','./assets/sounds/coin-pickup.wav');
        this.load.audio('audio_die','./assets/sounds/die-sound.wav');
    }

    create() {
        this.scene.start('jetpac');
    }

    update() {

    }



}