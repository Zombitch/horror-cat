import 'phaser';
import {Physics, Scene} from "phaser";

export default class Vision  extends Physics.Arcade.Sprite {
    dir : string;

    constructor(scene : Scene, x : number, y : number, dir : string){
        super(scene, x, y, "vision_cone");
        this.dir = dir;

        scene.add.existing(this);
        scene.physics.add.existing(this);
        // this.body.setSize(300, 150);
        this.majVisionDir(x,y);
        this.alpha = 0.5

    }

    majVisionDir(x, y){
        if(this.dir == "up"){
            this.body.setSize(150, 300);
            this.y = y-150
            this.x = x;
            this.angle = 180;
            
        }
        else if(this.dir == "right"){
            this.body.setSize(300, 150);
            this.x = x+150;
            this.y = y;
            this.angle = 270;
        }
        else if(this.dir == "left"){
            this.body.setSize(300, 150);
            this.x = x-150;
            this.y = y;
            this.angle = 90;

        }
        else{
            this.body.setSize(150, 300);
            this.y = y+150;
            this.x = x;
            this.angle = 0;
        }
    }
}