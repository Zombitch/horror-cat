import 'phaser';
import config from './config';
import BootScene from './Scenes/BootScene';
import PreloaderScene from './Scenes/PreloaderScene';
import TitleScene from './Scenes/TitleScene';
import OptionsScene from './Scenes/OptionsScene';
import CreditScene from './Scenes/CreditScene';
import GameScene from './Scenes/GameScene';
import GameSceneTest from './Scenes/GameSceneTest';
import BedroomScene from './Scenes/BedroomScene';
import Model from "./Model";
import GameOverScene from "./Scenes/GameOverScene";
import CellarScene from "./Scenes/CellarScene";
import KitchenScene from "./Scenes/KitchenScene";

class Jeu extends Phaser.Game {


    constructor () {
        super(config);

        // instanciation modele global
        const model = new Model();
        this.registry.set('model', model);
        // ajout des scenes au jeu
        this.scene.add('Game', GameScene);
        this.scene.add('GameTest', GameSceneTest);
        this.scene.add('Bedroom', BedroomScene);
        this.scene.add('Boot', BootScene);
        this.scene.add('Preloader', PreloaderScene);
        this.scene.add('Title', TitleScene);
        this.scene.add('Options', OptionsScene);
        this.scene.add('Credits', CreditScene);
        this.scene.add('GameOver', GameOverScene);
        this.scene.add('Cellar', CellarScene);
        this.scene.add('Kitchen', KitchenScene);
        this.scene.start('Boot');
    }
}

new Jeu();