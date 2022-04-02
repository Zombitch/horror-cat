import 'phaser';
import LevelObject from '../Models/LevelObject';
import config from "../config";
import GameScene from './GameScene';
import { GameObjects } from 'phaser';

/**
 * Scène du jeu
 */
export default class BedroomScene extends GameScene {

    spotlight: GameObjects.Light;

    constructor () {
        super('Bedroom');

        this.levelObjects = [
            new LevelObject('bedroom', 'bedroom', 0, 0, false),
            new LevelObject('bedroomDresser_A', 'bedroom-dresser', 990, 313, true),
            new LevelObject('bedroomDresser_B', 'bedroom-dresser', 840, 313, true),
            new LevelObject('bedroomTable_A', 'bedroom-table', 836, 562, true),
            new LevelObject('bedroomTable_B', 'bedroom-table', 935, 562, true),
            new LevelObject('bed_A', 'bed', 982, 473, false),
            new LevelObject('bed_B', 'bed', 735, 473, false),
            new LevelObject('armoire_A', 'armoire', 420, 70, true),
            new LevelObject('armoire_B', 'armoire', 420, 170, true),
        ]
    }
    
    preload(): void {
        super.preload();
    }

    create():void {
        super.create();

        LevelObject.find("bedroom", this.levelObjects)?.objectRef.setInteractive().on('pointerdown', (evt) => {
            this.ajouterTexte(`${evt.position.x} ; y : ${evt.position.y} Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum`, 'Alexouille', 80);
        })

        this.lights.enable();
        this.lights.setAmbientColor(0x101010);

        this.spotlight = this.lights.addLight(this.cat.getBody().position.x, this.cat.getBody().position.y, 280).setIntensity(2);
    }

    update(time: number, delta: number): void {
        this.cat.updateCat();

        this.spotlight.x = this.cat.getBody().position.x;
        this.spotlight.y = this.cat.getBody().position.y;
    }
};