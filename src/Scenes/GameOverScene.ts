import GameScene from "./GameScene";
import Cat from "../Objects/Cat";
import {Enemy} from "../Objects/Enemy";
import LevelObject from "../Objects/LevelObject";

export default class GameOverScene extends GameScene {

    isGameOver: boolean = true;

    constructor() {
        super('GameOver');
        this.levelObjects = [
            new LevelObject('gameover_false', 'gameover_bg', 0, 0, false, 1000),
            new LevelObject('gameover_bad', 'gameover_badending_bg', 0, 0, false, 1000),
        ];
        this.ambiantLight = 0x555555;
    }

    init(data): void{
        this.enemies.push(data.mechant);
        this.cat = data.cat;
        this.isGameOver = data.isGameOver;
    }

    preload() : void {
        super.preload();
    }

    create(): void {
        const texte: string = `Con de chat enfin je t'attrape!` +
                                `\nTu vas prendre cher après m'avoir fait courir comme ça !`
        this.ajouterTexte(texte, 'Archi', 80);

        if(this.isGameOver){
            const bgBad = this.levelObjects.find(object => object.identifier === 'gameover_bad');
            this.add.image(bgBad.x, bgBad.y, bgBad.name).setOrigin(0)
        }else {
            const bgFalse = this.levelObjects.find(object => object.identifier === 'gameover_false');
            this.add.image(bgFalse.x, bgFalse.y, bgFalse.name).setOrigin(0)
        }

        this.cat = new Cat(this, this.cat.x, this.cat.y);
        this.enemies.forEach(enemy => {
            new Enemy(this, enemy.x, enemy.y, enemy.dir).setDepth(10);
        });



        if(this.isGameOver) setTimeout(() => {
            this.scene.start('Title')
        }, 1000 * 10);
        else if(!this.isGameOver) setTimeout(() => {
            this.scene.start('Cellar')
        }, 1000 * 10);
    }

}