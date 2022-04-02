import 'phaser';
import {Physics, Scene} from "phaser";
import config from "../config";

export class Cat extends Physics.Arcade.Sprite {
    scene: Scene;

    constructor(scene: Phaser.Scene, x: number, y: number){
        super(scene, x, y, 'cat'); //key is texture
        console.log(scene);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.getBody().setCollideWorldBounds(true);
        this.getBody().setSize(337, 88);

    }

    updateCat(): void {
        this.getBody().setVelocity(0);
        if (this.scene.input.keyboard.addKey('UP').isDown) {
            this.body.velocity.y = -210;
        }
        if (this.scene.input.keyboard.addKey('LEFT').isDown) {
            this.body.velocity.x = -210;
        }
        if (this.scene.input.keyboard.addKey('DOWN').isDown) {
            this.body.velocity.y = 210;
        }
        if (this.scene.input.keyboard.addKey('RIGHT').isDown) {
            this.body.velocity.x = 210;
        }
    }

    protected getBody(): Physics.Arcade.Body {
        return this.body as Physics.Arcade.Body;
    }
}

