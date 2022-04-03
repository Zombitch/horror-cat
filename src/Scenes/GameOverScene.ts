import GameScene from "./GameScene";
import Cat from "../Objects/Cat";
import {Enemy} from "../Objects/Enemy";
import LevelObject from "../Objects/LevelObject";

export default class GameOverScene extends GameScene {

    constructor() {
        super('GameOver');
        this.levelObjects = [
            new LevelObject('gameover_bg', 'gameover_bg', 0, 0, false, 1000),
        ];
        this.ambiantLight = 0x555555;
    }

    init(data): void{
        this.enemies.push(data.mechant);
        this.cat = data.cat;
    }

    preload() : void {
        super.preload();
    }

    create(): void {
        const texte: string = `Con de chat enfin je t'attrape!` +
                                `\nTu vas prendre cher après m'avoir fait courir comme ça !`
        this.ajouterTexte(texte, 'Humain', 80);

        this.cat = new Cat(this, this.cat.x, this.cat.y);
        this.enemies.forEach(enemy => {
            new Enemy(this, enemy.x, enemy.y, enemy.dir).setDepth(10);
        });
        this.levelObjects.forEach(object => {
            this.add.image(object.x, object.y, object.identifier).setOrigin(0);
        });
        setTimeout(() => {this.scene.start('Title')}, 1000 * 10);
    }

}