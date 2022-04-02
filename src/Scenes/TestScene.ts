import 'phaser';
import LevelObject from '../Models/LevelObject';
import TempTextZoneScene from './TempTextZoneScene'

/**
 * Scène du jeu
 */
export default class TestScene extends TempTextZoneScene {

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
            this.ajouterTexte(this, `${evt.position.x} ; y : ${evt.position.y} Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum`, 'Alexouille', 80);
        })
        super.create();
    }
};