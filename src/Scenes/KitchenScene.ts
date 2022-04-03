import GameScene from "./GameScene";
import LevelObject from "../Objects/LevelObject";
import {Enemy} from "../Objects/Enemy";

export default class KitchenScene extends GameScene {

    constructor() {
        super('Kitchen');
        this.levelObjects = [
            new LevelObject('kitchen', 'kitchen', 0, 0, false, 1),
            new LevelObject('kitchenboard', 'kitchenboard', 65, 90, true, 3),
            new LevelObject('table', 'table', 600, 350, true, 3),
            new LevelObject('closet', 'closet', 1000, 30, true, 3),
        ];
        for(let idx=0; idx < Math.random() * (15 - 7) + 7; idx++){
            const carton: LevelObject = new LevelObject('bouteille'+idx, 'bouteille',  Math.random() * (1060 - 75) + 75, Math.random() * (597 - 136) + 136, true);
            this.levelObjects.push(carton);
        }

    }

    preload(): void {
        super.preload();
    }

    create():void {
        // ajout des méchants avant le super create pour que les méthodes de follow / game over etc soient prises en compte dans la classe parente
        this.enemies.push(new Enemy(this,1000, 600, 'left'));
        this.enemies.push(new Enemy(this,400, 600, 'up'));
        super.create();
        const miaous: string[] = ['...miaou...', 'Miaou !!', 'Miaou', 'Miaou...', 'Mew...'];
        LevelObject.find("cellar", this.levelObjects)?.objectRef.setInteractive().on('pointerdown', evt => console.log(`${evt.position.x} ; y : ${evt.position.y}`))

        // Chat qui miaule aléatoirement
        this.ajouterTexte(miaous[Math.floor(Math.random() * ((miaous.length-1) - 0 +1)) + 0], 'Nestor le chat', 80, 3);
        setInterval(() => {
            this.ajouterTexte(miaous[Math.floor(Math.random() * ((miaous.length-1) - 0 +1)) + 0], 'Nestor le chat', 80, 3);
        }, 10*1000);

        this.createExit(622, 122, 'GameOver', {isGameOver:false, isWin: true});

        this.enemies.forEach(enemy =>
            {this.time.addEvent({
                delay: 2000,
                callback: ()=>enemy.turnEnemy(),
                loop: true,
            });
        })
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




}