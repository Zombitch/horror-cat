import 'phaser';
import { Cat } from '../Objects/Cat'
import { Enemy } from '../Objects/Enemy'

import config from "../config";

/**
 * Scène du jeu
 */
export default class GameSceneTest extends Phaser.Scene {

    cat : Cat;
    enemy : Enemy;

    constructor () {
        super('GameTest');
    }

    preload(): void {
        // load images
        this.load.image('logo', '../assets/img.png');
        this.load.image('cat', 'assets/cat.png');
        this.load.spritesheet('cat_sprites', 'assets/cat_sprites',  { frameWidth: 48, frameHeight: 48 });
        this.load.image('baddy', 'assets/baddy.png');
        this.load.image('vision_cone', 'assets/vision_cone.png');
        this.load.spritesheet('enemy_sprites', 'assets/enemy_sprites',  { frameWidth: 48, frameHeight: 72 });

    }

    create():void {
        // ajout de l'image à la scène
        //this.add.image(400, 300, 'logo');
        this.cat = new Cat(this, 400, 300);
        this.enemy = new Enemy(this, 800, 300, "east");
        this.enemy = new Enemy(this, 200, 200, "west");
        this.enemy = new Enemy(this, 1200, 200, "north");
        this.enemy = new Enemy(this, 500, 300, "south");
        this.physics.add.overlap(this.cat, this.enemy, this.enemy.catSeen, null, this);
        this.physics.add.overlap(this.cat, this.enemy.vision, this.enemy.catSeen, null, this);
        
    }

    update():void {
        this.cat.updateCat();
    }


};