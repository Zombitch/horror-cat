import 'phaser';
import {Physics, Scene} from "phaser";

export default class Vision  extends Physics.Arcade.Sprite {
    constructor(scene : Scene, x : number, y : number, dir : string){
        super(scene, x, y, "vision_cone");

        scene.add.existing(this);
        scene.physics.add.existing(this);
        // this.body.setSize(300, 150);
        this.alpha = 0.5

        if(dir == "north"){
            this.body.setSize(150, 300);
            this.y = y-150
            this.angle = 180;
            
        }
        else if(dir == "south"){
            this.body.setSize(150, 300);
            this.y = y+150;
        }
        else if(dir == "west"){
            this.body.setSize(300, 150);
            this.x = x-150;
            this.angle = 90;

        }
        else{
            this.body.setSize(300, 150);
            this.x = x+150;
            this.angle = 270;
        }
    }
}