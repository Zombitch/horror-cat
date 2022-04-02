import 'phaser';
import { Cat } from '../Objects/Cat'
import config from "../config";

/**
 * Scène du jeu
 */
export default class GameSceneTest extends Phaser.Scene {

    cat : Cat;

    constructor () {
        super('GameTest');
    }

    preload(): void {
        // load images
        this.load.image('logo', '../assets/img.png');

    }

    create():void {
        // ajout de l'image à la scène
        this.add.image(400, 300, 'logo');
        this.cat = new Cat(this, 400, 300);
    }

    update():void {
        //this.cat.updateCat();
    }


};