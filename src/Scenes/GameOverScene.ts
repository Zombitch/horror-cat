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
        this.ajouterTexte('Con de chat enfin je t\'attrape', 'Humain', 80);
    }

}