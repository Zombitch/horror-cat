import 'phaser';
import {Scene} from "phaser";
import config from "../config";


export default class TextZone extends Phaser.GameObjects.Container {

    zone;
    text;

    constructor(scene : Scene, text: string) {
        super(scene);
        this.zone = this.scene.add.zone(0, config.height - (0.1 * config.height), config.width, config.height * 0.1);
        this.text = this.scene.add.text(0, 0, text, { fontSize: '22px', color: '#fff' });


        Phaser.Display.Align.In.Center(this.text, this.zone);
        this.add(this.zone);
        this.add(this.text);
        this.scene.add.existing(this);
        this.zone.setOrigin(0)
    }

}