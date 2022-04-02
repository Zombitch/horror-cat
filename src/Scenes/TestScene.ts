import 'phaser';
import LevelObject from '../Models/LevelObject';
import TempTextZoneScene from './TempTextZoneScene'
import {Cat} from "../Objects/Cat";

/**
 * Scène du jeu
 */
export default class TestScene extends TempTextZoneScene {

    cat: Cat;

    protected levelObjects: LevelObject[] = [
        new LevelObject('bedroom', 0, 0, false),
        new LevelObject('bedroom-dresser', 990, 313, true),
        new LevelObject('bedroom-dresser', 840, 313, true),
        new LevelObject('bedroom-table', 836, 562, true),
        new LevelObject('bedroom-table', 935, 562, true),
        new LevelObject('bed', 982, 473, false),
        new LevelObject('bed', 735, 473, false),
    ]

    constructor () {
        super('Test');
    }
    
    preload(): void {
        super.preload();
        let loadedImages: string[] = [];
        this.levelObjects.forEach(obj => {
            // On ne charge les images qu'une seule fois, même si dans la propriété 'levelObjects' de la scene nous avons plusieurs fois la même image
            if(!loadedImages.includes(obj.name)){
                this.load.image(obj.name, '../assets/'+obj.name+'.png');
                loadedImages.push(obj.name);
            }
        });
    }

    create():void {
        this.levelObjects.forEach(obj => this.add.image(obj.x, obj.y, obj.name).setOrigin(0, 0));
        
        this.input.on('pointerdown', (evt) => {
            this.ajouterTexte(this, `Debugger`, `x : ${evt.position.x} ; y : ${evt.position.y}`, 80);
        })
        this.cat = new Cat(this, 0,0);
    }

    update(time: number, delta: number): void {
        this.cat.updateCat();
    }
};