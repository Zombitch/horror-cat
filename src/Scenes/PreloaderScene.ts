import 'phaser';
import Graphics = Phaser.GameObjects.Graphics;
import Text = Phaser.GameObjects.Text;

/**
 * Scène de chargement des ressources
 */
export default class PreloaderScene extends Phaser.Scene {


    constructor () {
        super('Preloader');
    }

    preload(): void {

        // chargement des ressources
        this.load.image('blueButton1', 'assets/ui/blue_button02.png');
        this.load.image('blueButton2', 'assets/ui/blue_button03.png');
        this.load.image('phaserLogo', 'assets/logo.png');
        this.load.image('box', 'assets/ui/grey_box.png');
        this.load.image('checkedBox', 'assets/ui/blue_boxCheckmark.png');
        this.load.audio('bgMusic', ['assets/TownTheme.mp3']);


        // une fois le chargement terminé on passe à l'écran titre
        this.load.on('complete',  () => {
            this.scene.start('Title');
        });

    }

};