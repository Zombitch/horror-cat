import 'phaser';
import { GameObjects } from 'phaser';
import LevelObject from '../Objects/LevelObject';
import Cat  from '../Objects/Cat';
import TextZoneScene from './TextZoneScene';
import config from "../config";
import {Enemy} from "../Objects/Enemy";

/**
 * Scène du jeu
 */
export default class GameScene extends TextZoneScene {

    protected cat: Cat;
    protected enemies: Enemy[] = [];
    protected obstacles: GameObjects.GameObject[] = [];
    protected cachettes: GameObjects.GameObject[] = [];
    protected exitRectangle: GameObjects.GameObject;

    protected ambiantLight: number = 0xFFFFFF;
    protected playerSpotlight: GameObjects.Light;

    protected levelObjects: LevelObject[]

    constructor(sceneName) {
        super(sceneName);
    }

    preload(): void {
        super.preload();
        let loadedImages: string[] = [];
        this.levelObjects.forEach(obj => {
            // On ne charge les images qu'une seule fois, même si dans la propriété 'levelObjects' de la scene nous avons plusieurs fois la même image
            if(!loadedImages.includes(obj.name)){
                this.load.image(obj.name, 'assets/'+obj.name+'.png');
                loadedImages.push(obj.name);
            }
        });
        this.load.spritesheet('cat_sprites', 'assets/cat_sprites',  { frameWidth: 48, frameHeight: 48 });
        this.load.spritesheet('enemy_sprites', 'assets/enemy_sprites',  { frameWidth: 48, frameHeight: 72 });
        this.load.image('baddy', 'assets/baddy.png');
        this.load.image('vision_cone', 'assets/vision_cone.png');
    }

    create():void {
        super.create();
        this.levelObjects.forEach(obj => {
            const img = this.physics.add.image(obj.x, obj.y, obj.name).setOrigin(0, 0).setPipeline('Light2D');
            img.setDepth(obj.depth);
            obj.objectRef = img;
            if (obj.hasCollider) {
                this.obstacles.push(img);
                img.setImmovable(true)
            } else if (obj.name === 'bed') {
                this.cachettes.push(img);
            }
        });

        // mur haut
        this.obstacles.push(this.add.rectangle(0, 0, config.width, 124).setOrigin(0));
        // mur bas
        this.obstacles.push(this.add.rectangle(0, config.height - 150, 180, 100).setOrigin(0));
        this.obstacles.push(this.add.rectangle(260, config.height - 150, config.width, 100).setOrigin(0));
        this.obstacles.push(this.add.rectangle(0, config.height - 70, config.width, 100).setOrigin(0));
        // mur gauche
        this.obstacles.push(this.add.rectangle(0, 0, 60, config.height).setOrigin(0));
        // mur droit
        this.obstacles.push(this.add.rectangle(config.width - 60, 0, 60, config.height).setOrigin(0));

        this.physics.add.staticGroup(this.obstacles);

        this.cat = new Cat(this, 210, 680);
        this.physics.add.collider(this.cat, this.obstacles);

        this.physics.add.overlap(this.cat, this.cachettes,
            (cat: Cat, bed) => {cat.isHidden = true;}
        );

        this.enemies.forEach(enemy => {
            enemy.setDepth(10).setPipeline('Light2D');
            enemy.vision.setDepth(10).setPipeline('Light2D');
        });
        this.enemies.forEach(enemy => {
            this.physics.add.overlap(this.cat, enemy, () => {
                this.gameOver(enemy);
            });
            this.physics.add.overlap(this.cat, enemy.vision, () => {
                enemy.catSeen = true;
                enemy.vision.destroy();
            });
            
        });
        this.physics.add.collider(this.obstacles, this.enemies);

        this.lights.enable();
        this.lights.setAmbientColor(this.ambiantLight);
        this.playerSpotlight = this.lights.addLight(-100, -100, 280).setIntensity(2);
    }

    gameOver(enemy: Enemy):void{
        this.scene.start('GameOver', {isGameOver: true, cat: this.cat, mechant: enemy});
    }

    updatePlayerSpotlight(): void{
        this.playerSpotlight.x = this.cat.body.position.x;
        this.playerSpotlight.y = this.cat.body.position.y;
    }

    createExit(x: number, y: number, scene: string, sceneParams:{} = {}):void {
        this.exitRectangle = this.add.rectangle(x, y, 60, 10).setOrigin(0, 0);
        this.physics.add.staticGroup(this.exitRectangle);
        this.physics.add.collider(this.cat, this.exitRectangle, () => {
            this.scene.start(scene, sceneParams);
        });
    }
};