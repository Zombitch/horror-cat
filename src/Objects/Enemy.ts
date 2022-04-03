import 'phaser';
import {Physics, Scene} from "phaser";
import Vision from './Vision'

export class Enemy extends Physics.Arcade.Sprite {

    vision : Vision;
    dir : string;

    constructor(scene : Scene, x, y, dir : string){

        let frameE : number = 58;


        if(dir == "north"){
            frameE = 94;
        }else if(dir == "west"){
            frameE = 70;
        } else if(dir == "east"){
            frameE = 82;
        }

        super(scene, x, y, 'enemy_sprites', frameE);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setCircle(50);
        this.dir = dir;

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

        console.log(this);
    }

    catSeen(currentScene){
        
    }

    updateEnemy(){
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
    }

}