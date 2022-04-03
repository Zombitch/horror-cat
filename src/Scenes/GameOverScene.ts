import GameScene from "./GameScene";

export default class GameOverScene extends GameScene {

    constructor() {
        super('GameOver');
        this.levelObjects = [];
    }

    init(data): void{
        console.log(data);
    }

    preload() : void {
        super.preload();
    }

    create(): void {
        super.preload();
        const texte: string = `Con de chat enfin je t'attrape!` +
                                `\nTu vas prendre cher après m'avoir fait courir comme ça !`
        this.ajouterTexte(texte, 'Humain', 80);
    }

}