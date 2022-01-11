import Boot from './boot.js';
import Jetpac from './jetpac.js';

window.onload = ()=>{

    const config = {
        type: Phaser.AUTO,
        scale: {
            width: 256,
            height: 192,
            zoom: 3,
            autoCenter: Phaser.Scale.Center.CENTER_HORIZONTALLY
        },
        pixelArt: true,
        scene: [ Boot, Jetpac ]
    };

    new Phaser.Game(config);
};

export class JetPacGame extends Phaser.Game {
    constructor(config_aves) {
        super(config_aves, { key:'game' });
    }

    preload() {
        
    }

    create() {
        // main settings:
        game.world.setBounds(0, 0, 5000, 600);
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.arcade.checkCollision.up = false; // colision con el techo
        game.physics.arcade.checkCollision.down = false; // colision con el suelo

        this.scene.start('boot');

    }

    update() {

    }
}


