import Play from "./play.js";
import hud from "./hud.js"

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 },
            debug: false
        }
    },
};

var game = new Phaser.Game (config);

game.scene.add('play', Play)

game.scene.add('hud', hud)

game.scene.start('play')