import 'phaser';
import LevelObject from '../Models/LevelObject';
import TempTextZoneScene from './TextZoneScene'
import {Cat} from "../Objects/Cat";
import config from "../config";
import { GameObjects } from 'phaser';
import GameScene from './GameScene';
import {Enemy} from "../Objects/Enemy";

/**
 * Scène du jeu
 */
export default class BedroomScene extends GameScene {

    constructor () {
        super('Bedroom');

        this.levelObjects = [
            new LevelObject('bedroom', 'bedroom', 0, 0, false, 1),
            new LevelObject('bedroomDresser_A', 'bedroom-dresser', 990, 313, true),
            new LevelObject('bedroomDresser_B', 'bedroom-dresser', 840, 313, true),
            new LevelObject('bedroomTable_A', 'bedroom-table', 836, 562, true),
            new LevelObject('bedroomTable_B', 'bedroom-table', 935, 562, true),
            new LevelObject('bed_A', 'bed', 982, 473, false, 5),
            new LevelObject('bed_B', 'bed', 735, 473, false, 5),
            new LevelObject('double_carton', 'double_carton', 250, 570, true),
            new LevelObject('carton_A', 'carton', 200, 400, true),
            new LevelObject('carton_B', 'carton', 400, 490, true),
            new LevelObject('tv', 'tv', 500, 50, true),
            new LevelObject('tapis', 'tapis', 465, 200, false, 2),
            new LevelObject('chair_A', 'chair', 250, 80, true),
        ];
    }
    
    preload(): void {
        super.preload();
    }

    create():void {
        super.create();
        const mechant = new Enemy(this, 580,400, 'north');
        mechant.setDepth(10);
        mechant.vision.setDepth(10);
        LevelObject.find("bedroom", this.levelObjects)?.objectRef.setInteractive().on('pointerdown', evt => console.log(`${evt.position.x} ; y : ${evt.position.y}`))
        this.physics.add.overlap(this.cat, mechant, () => mechant.catSeen(this.scene));
        this.physics.add.overlap(this.cat, mechant.vision, () => mechant.catSeen(this.scene));
    }

    update(time: number, delta: number): void {
        this.cat.updateCat();
    }
};