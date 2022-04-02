import 'phaser';
import config from './config';
import BootScene from './Scenes/BootScene';
import PreloaderScene from './Scenes/PreloaderScene';
import TitleScene from './Scenes/TitleScene';
import OptionsScene from './Scenes/OptionsScene';
import CreditScene from './Scenes/CreditScene';
import GameScene from './Scenes/GameScene';
import TestScene from './Scenes/TestScene';
import Model from "./Model";

class Jeu extends Phaser.Game {


    constructor () {
        super(config);

        // instanciation modele global
        const model = new Model();
        this.registry.set('model', model);
        // ajout des scenes au jeu
        this.scene.add('Game', GameScene);
        this.scene.add('Test', TestScene);
        this.scene.add('Boot', BootScene);
        this.scene.add('Preloader', PreloaderScene);
        this.scene.add('Title', TitleScene);
        this.scene.add('Options', OptionsScene);
        this.scene.add('Credits', CreditScene);
        this.scene.start('Test');

    }
}

new Jeu();