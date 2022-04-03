import 'phaser';
import {Physics, Scene} from "phaser";
import Vision from './Vision'

export class Enemy extends Physics.Arcade.Sprite {

    vision : Vision;

    constructor(scene : Scene, x, y, dir : string){
        super(scene, x, y, 'baddy');
        this.scene = scene;
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setCircle(50);


        this.vision = new Vision(scene, this.x, this.y, dir);
        if(dir == "north"){
            this.angle =  180;           
        }
        else if(dir == "west"){
            this.angle = 90;

        }
        else if(dir == "east"){
            this.angle = 270;
        }
    }

    catSeen(currentScene){
        
    }


}