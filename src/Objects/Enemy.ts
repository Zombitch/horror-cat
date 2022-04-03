import 'phaser';
import {Physics, Scene} from "phaser";
import Vision from './Vision'

export class Enemy extends Physics.Arcade.Sprite {

    vision : Vision;

    constructor(scene : Scene, x, y, dir : string){
        super(scene, x, y, 'enemy_sprites', 58);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setCircle(50);


        this.vision = new Vision(scene, this.x, this.y, dir);
        // if(dir == "north"){
        //     this.angle =  180;           
        // }
        // else if(dir == "west"){
        //     this.angle = 90;

        // }
        // else if(dir == "east"){
        //     this.angle = 270;
        // }

        this.anims.create({
            key:"left",
            frames: this.anims.generateFrameNumbers('enemy_sprites', { start: 69, end: 71 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key:"right",
            frames: this.anims.generateFrameNumbers('enemy_sprites', { start: 81, end: 83 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key:"up",
            frames: this.anims.generateFrameNumbers('enemy_sprites', { start: 93, end: 95 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key:"down",
            frames: this.anims.generateFrameNumbers('enemy_sprites', { start: 57, end: 59 }),
            frameRate: 10,
            repeat: -1
        });
    }

    catSeen(currentScene){
        currentScene.start('GameOver')
    }


}