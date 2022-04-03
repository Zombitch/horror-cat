import 'phaser';
import LevelObject from '../Objects/LevelObject';
import TempTextZoneScene from './TextZoneScene'
import Cat from "../Objects/Cat";
import config from "../config";
import { GameObjects } from 'phaser';
import GameScene from './GameScene';
import {Enemy} from "../Objects/Enemy";

/**
 * Scène du jeu
 */
export default class CellarScene extends GameScene {

    mechant: Enemy;

    constructor () {
        super('Cellar');

        this.levelObjects = [
            new LevelObject('cellar', 'cellar', 0, 0, false, 1),
        ];

        for(let idx=0; idx < Math.random() * (15 - 7) + 7; idx++){
            const carton: LevelObject = new LevelObject('carton_'+idx, 'carton',  Math.random() * (1060 - 75) + 75, Math.random() * (597 - 136) + 136, true);
            this.levelObjects.push(carton);
        }

        this.ambiantLight = 0x101010;
    }
    
    preload(): void {
        super.preload();
    }

    create():void {
        // ajout des méchants avant le super create pour que les méthodes de follow / game over etc soient prises en compte dans la classe parente
        super.create();
        const miaous: string[] = ['...miaou...', 'Miaou !!', 'Miaou', 'Miaou...', 'Mew...'];
        LevelObject.find("bedroom", this.levelObjects)?.objectRef.setInteractive().on('pointerdown', evt => console.log(`${evt.position.x} ; y : ${evt.position.y}`))

        setInterval(() => {
            this.ajouterTexte(miaous[Math.floor(Math.random() * ((miaous.length-1) - 0 +1)) + 0], 'Nestor le chat', 80);
        }, 10*1000);
    }

    update(time: number, delta: number): void {
        this.cat.updateCat();
        this.updatePlayerSpotlight();
    }

    gameOver():void{
        this.scene.start('GameOver', {isGameOver: false});
    }
};