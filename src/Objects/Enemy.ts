import 'phaser';
import {Physics, Scene} from "phaser";
import Vision from './Vision';
import Cat from './Cat';

export class Enemy extends Physics.Arcade.Sprite {

    vision : Vision;
    dir : string;
    catSeen : boolean;

    constructor(scene : Scene, x, y, dir : string){

        let frameE : number = 58;

        if(dir == "up"){
            frameE = 94;
        }else if(dir == "left"){
            frameE = 70;
        } else if(dir == "right"){
            frameE = 82;
        }

        super(scene, x, y, 'enemy_sprites', frameE);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.dir = dir;
        this.body.setSize(this.body.width, this.body.height/2).setOffset(0, this.body.height);

        this.vision = new Vision(scene, this.x, this.y, dir);

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

    updateEnemy(scene: Scene, cat: Cat){
        if(this.body.velocity.x > 0 && (Math.abs(this.body.velocity.x) > Math.abs(this.body.velocity.y ))){
            this.anims.play("right", true);
        } else if(this.body.velocity.x < 0  && (Math.abs(this.body.velocity.x) > Math.abs(this.body.velocity.y ))){
            this.anims.play("left", true);
        } else if(this.body.velocity.y > 0  && (Math.abs(this.body.velocity.x) < Math.abs(this.body.velocity.y ))){
            this.anims.play("down", true);
        } else if(this.body.velocity.y < 0 && (Math.abs(this.body.velocity.x) < Math.abs(this.body.velocity.y ))){
            this.anims.play("up", true);
        }

        if(this.body.velocity.x === 0 && this.body.velocity.y === 0){
            this.anims.stop();
        }
        if(cat.isHidden){
            this.setVelocity(0,0)
        } else if(this.catSeen){
            scene.physics.accelerateToObject(this, cat, 400);
        }
    }

    turnEnemy(){
        let dirs = ["up", "down", "left", "right"];
        let dir : string = dirs[Math.floor(Math.random()*4)];

        this.dir = dir;
        this.vision.dir = dir;
        console.log("coucou tu veux voir mes bits ?");

        if(dir == "up"){
            this.setFrame(94);
        }else if(dir == "left"){
            this.setFrame(70);
        }else if(dir == "right"){
            this.setFrame(82);
        }else if( dir === "down"){
            this.setFrame(58)
        }
        
        //this.anims.play(dir, true)

        this.vision.majVisionDir(this.x, this.y);
    }

}