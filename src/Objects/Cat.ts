import 'phaser';
import {Physics, Scene} from "phaser";
import config from "../config";

export class Cat extends Physics.Arcade.Sprite {
    scene: Scene;

    constructor(scene: Phaser.Scene, x: number, y: number){
        super(scene, x, y, 'cat_sprites', 34); //key is texture
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.getBody().setCollideWorldBounds(true);
        this.getBody().setSize(48, 48);
        this.setDepth(3);

        this.anims.create({
            key:"left",
            frames: this.anims.generateFrameNumbers('cat_sprites', { start: 21, end: 23 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key:"right",
            frames: this.anims.generateFrameNumbers('cat_sprites', { start: 33, end: 35 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key:"up",
            frames: this.anims.generateFrameNumbers('cat_sprites', { start: 45, end: 47 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key:"down",
            frames: this.anims.generateFrameNumbers('cat_sprites', { start: 9, end: 11 }),
            frameRate: 10,
            repeat: -1
        });

    }

    updateCat(): void {
        this.getBody().setVelocity(0);
        if (this.scene.input.keyboard.addKey('UP').isDown) {
            this.body.velocity.y = -210;
            this.anims.play('up', true);
        }
        if (this.scene.input.keyboard.addKey('LEFT').isDown) {
            this.body.velocity.x = -210;
            this.anims.play('left', true);
        }
        if (this.scene.input.keyboard.addKey('DOWN').isDown) {
            this.body.velocity.y = 210;
            this.anims.play('down', true);
        }
        if (this.scene.input.keyboard.addKey('RIGHT').isDown) {
            this.body.velocity.x = 210;
            this.anims.play('right', true);
        }

        if(this.getBody().velocity.x === 0 && this.getBody().velocity.y === 0 ){
            this.anims.stop();
        }
    }

    protected getBody(): Physics.Arcade.Body {
        return this.body as Physics.Arcade.Body;
    }
}

