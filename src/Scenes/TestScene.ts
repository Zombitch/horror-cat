import 'phaser';
import LevelObject from '../Models/LevelObject';
import TempTextZoneScene from './TempTextZoneScene'

/**
 * Scène du jeu
 */
export default class TestScene extends TempTextZoneScene {

    protected levelObjects: LevelObject[] = [
        new LevelObject('bedroom', 0, 0, false),
        new LevelObject('bedroom-dresser', 0, 0, true),
        new LevelObject('bed', 0, 0, false),
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
        this.levelObjects.forEach(obj => this.add.image(0, 0, obj.name).setOrigin(0, 0));

        this.ajouterTexte(this, 'fucking pos', 'asshole', 80);
    }
};