import 'phaser';
import {Physics, Scene} from "phaser";
import config from "../config";

export default class Cat extends Physics.Arcade.Sprite {

    _isHidden: boolean = false;

    get isHidden(): boolean{
        return this._isHidden
    }
    set isHidden(hidden: boolean) {
        this._isHidden = hidden
    }


    constructor(scene: Phaser.Scene, x: number, y: number){
        super(scene, x, y, 'cat_sprites', 34); //key is texture
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.getBody().setCollideWorldBounds(true);
        this.getBody().setSize(48, 24).setOffset(0, 24);
        this.setDepth(3);
        this.isHidden = false;
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
        if (this.scene.input.keyboard.addKey('UP').isDown || this.scene.input.keyboard.addKey('Z').isDown) {
            this.body.velocity.y = -210;
            this.anims.play('up', true);
        }
        if (this.scene.input.keyboard.addKey('LEFT').isDown || this.scene.input.keyboard.addKey('Q').isDown) {
            this.body.velocity.x = -210;
            this.anims.play('left', true);
        }
        if (this.scene.input.keyboard.addKey('DOWN').isDown || this.scene.input.keyboard.addKey('S').isDown) {
            this.body.velocity.y = 210;
            this.anims.play('down', true);
        }
        if (this.scene.input.keyboard.addKey('RIGHT').isDown || this.scene.input.keyboard.addKey('D').isDown) {
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

