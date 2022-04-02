import 'phaser';
import LevelObject from '../Models/LevelObject';
import TempTextZoneScene from './TempTextZoneScene'
import {Cat} from "../Objects/Cat";
import config from "../config";

/**
 * Scène du jeu
 */
export default class TestScene extends TempTextZoneScene {

    cat: Cat;
    obstacles = [];
    exit;

    protected levelObjects: LevelObject[] = [
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
        this.load.spritesheet('cat_sprites', 'assets/cat_sprites',  { frameWidth: 48, frameHeight: 48 });
    }

    create():void {
        super.create();
        this.levelObjects.forEach(obj => {
            const img = this.add.image(obj.x, obj.y, obj.name).setOrigin(0, 0);
            img.setDepth(1);
            obj.objectRef = img;
            if(obj.hasCollider){
                this.obstacles.push(img);
            }else if(img.x && img.y) {
                img.setDepth(5);
            }
        });
        // mur haut
        this.obstacles.push(this.add.rectangle(0,0, config.width, 100).setOrigin(0));
        // mur bas
        this.obstacles.push(this.add.rectangle(0,config.height - 150, 180, 100).setOrigin(0));
        this.obstacles.push(this.add.rectangle(260,config.height - 150, config.width, 100).setOrigin(0));
        this.obstacles.push(this.add.rectangle(0,config.height - 70, config.width, 100).setOrigin(0));
        // mur gauche
        this.obstacles.push(this.add.rectangle(0,0, 60, config.height).setOrigin(0));
        // mur droit
        this.obstacles.push(this.add.rectangle(config.width - 60,0, 60, config.height).setOrigin(0));

        this.physics.add.staticGroup(this.obstacles);

        LevelObject.find("bedroom", this.levelObjects)?.objectRef.setInteractive().on('pointerdown', (evt) => {
            this.ajouterTexte(this, `${evt.position.x} ; y : ${evt.position.y} Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum`, 'Alexouille', 80);
        })

        this.cat = new Cat(this, 210,680);
        this.exit = this.add.rectangle(960,100, 60, 10).setOrigin(0,0);
        this.physics.add.staticGroup(this.exit);
        this.physics.add.collider(this.cat, this.obstacles);
        this.physics.add.collider(this.cat, this.exit, () => {console.log('exit')})
    }

    update(time: number, delta: number): void {
        this.cat.updateCat();
    }
};