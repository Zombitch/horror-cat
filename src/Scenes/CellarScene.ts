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
        this.enemies.push(new Enemy(this,750, 130, 'left'));
        this.enemies.push(new Enemy(this,400, 300, 'right'));
        super.create();
        const miaous: string[] = ['...miaou...', 'Miaou !!', 'Miaou', 'Miaou...', 'Mew...'];
        LevelObject.find("cellar", this.levelObjects)?.objectRef.setInteractive().on('pointerdown', evt => console.log(`${evt.position.x} ; y : ${evt.position.y}`))
        
        // Chat qui miaule aléatoirement
        this.ajouterTexte(miaous[Math.floor(Math.random() * ((miaous.length-1) - 0 +1)) + 0], 'Nestor le chat', 80, 3);
        setInterval(() => {
            this.ajouterTexte(miaous[Math.floor(Math.random() * ((miaous.length-1) - 0 +1)) + 0], 'Nestor le chat', 80, 3);
        }, 10*1000);
        
        this.enemies.forEach(enemy =>
            {this.time.addEvent({
                delay: 2000,
                callback: ()=>enemy.turnEnemy(),
                loop: true,
            });
        })

        this.createExit(622, 122, 'Kitchen', {isGameOver:false, isWin: true});
    }

    update(time: number, delta: number): void {
        this.cat.updateCat();
        this.updatePlayerSpotlight();
        this.enemies.forEach(enemy => {
            enemy.updateEnemy(this, this.cat);
        });
    }

    gameOver(enemy):void {
        this.scene.start('GameOver', {isGameOver: true, cat: this.cat, mechant: enemy, isWin: false});
    }
};