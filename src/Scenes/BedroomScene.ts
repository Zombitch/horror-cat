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
export default class BedroomScene extends GameScene {

    mechant: Enemy;

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
        // ajout des méchants avant le super create pour que les méthodes de follow / game over etc soient prises en compte dans la classe parente
        this.enemies.push(new Enemy(this, 580,400, 'north'));
        super.create();
        LevelObject.find("bedroom", this.levelObjects)?.objectRef.setInteractive().on('pointerdown', evt => console.log(`${evt.position.x} ; y : ${evt.position.y}`))
    }

    update(time: number, delta: number): void {
        this.cat.updateCat();
        this.enemies.forEach(enemy => { 
            enemy.updateEnemy();
            if(this.cat.isHidden){
                enemy.setVelocity(0,0)
            } else if(enemy.catSeen){
                this.physics.moveToObject(enemy, this.cat);
            }
        });
        
    }

    gameOver(enemy):void{
        this.scene.start('GameOver', {isGameOver: false, cat: this.cat, mechant: enemy});
    }
};