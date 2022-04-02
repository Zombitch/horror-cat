import 'phaser';
import {Physics, Scene} from "phaser";
import config from "../config";

export class Cat extends Physics.Arcade.Sprite {
    scene: Scene;

    constructor(scene: Phaser.Scene, x: number, y: number){
        super(scene, x, y, 'cat'); //key is texture
        console.log(scene);
        //scene.add.existing(this);
        //scene.physics.add.existing(this);
        //this.getBody().setCollideWorldBounds(true);
        this.getBody().setSize(337, 88);

    }

    updateCat(): void {
        // this.getBody().setVelocity(0);
        // if (this.scene.input.keyboard.addKey('UP')) {
        //     this.body.velocity.y = -110;
        // }
        // if (this.scene.input.keyboard.addKey('LEFT')) {
        //     this.body.velocity.x = -110;
        //     this.getBody().setOffset(48, 15);
        // }
        // if (this.scene.input.keyboard.addKey('DOWN')) {
        //     this.body.velocity.y = 110;
        // }
        // if (this.scene.input.keyboard.addKey('RIGHT')) {
        //     this.body.velocity.x = 110;
        //     this.getBody().setOffset(15, 15);
        // }
    }

    protected getBody(): Physics.Arcade.Body {
        return this.body as Physics.Arcade.Body;
    }
}

