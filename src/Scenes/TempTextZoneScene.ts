import 'phaser';
import config from "../config";
import Text = Phaser.GameObjects.Text;
import GetValue = Phaser.Utils.Objects.GetValue;
import {Scene} from "phaser";

/**
 * Scène du jeu
 */
export default class TempTextZoneScene extends Phaser.Scene {

    private name: Text;
    private COLOR_PRIMARY = 0x4e342e;
    private COLOR_LIGHT = 0x7b5e57;
    private textZoneSpacement = {
        left: 20,
        right: 20,
        top: 20,
        bottom: 20,
        icon: 10,
        text: 10,
    }

    constructor (sceneName) {
        super(sceneName);
    }

    preload() {
        this.load.scenePlugin({
            key: 'rexuiplugin',
            url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
            sceneKey: 'rexUI'
        });
        this.load.image('nextPage', 'assets/arrow-down-left.png');
    }

    create():void {
        this.name = this.add.text(30, 0, "azeazeqdfsdfqsfqsefezfzefsdfsfsqfqdfsqfgsgsqgsqg").setVisible(false);
    }

    ajouterTexte(scene: Scene, dialogue: string, nom: string, hauteur: number) {
        const widthReduceFactor = 65;
        this.createTextBox(scene, 10, config.height-hauteur+5 , nom, {
            wrapWidth: config.width - (this.textZoneSpacement.left + this.textZoneSpacement.right + widthReduceFactor),
            fixedWidth: config.width - (this.textZoneSpacement.left + this.textZoneSpacement.right + widthReduceFactor),
            fixedHeight: hauteur-(this.textZoneSpacement.top + this.textZoneSpacement.bottom + this.textZoneSpacement.text),
        }).start(dialogue, 0);
    }

    createTextBox(scene, x, y, nom: string, config) {
        const wrapWidth = GetValue(config, 'wrapWidth', 0);
        const fixedWidth = GetValue(config, 'fixedWidth', 0);
        const fixedHeight = GetValue(config, 'fixedHeight', 0);
        
        const textBox = scene.rexUI.add.textBox({
            x: x,
            y: y,
            background: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 20, this.COLOR_PRIMARY).setStrokeStyle(2, this.COLOR_LIGHT),
            text: this.getBBcodeText(scene, wrapWidth, fixedWidth, fixedHeight*1.25),
            action: scene.add.image(0, 0, 'nextPage').setTint(this.COLOR_LIGHT).setVisible(false),
            space: this.textZoneSpacement
        }).setOrigin(0).layout();
        
        textBox.setInteractive()
            .on('type', () => {
                this.name.setY(y+2).setVisible(true).setDepth(10).setText(nom);
            })
            .on('pointerdown', function () {
                const icon = this.getElement('action').setVisible(false);
                this.resetChildVisibleState(icon);
                if (this.isTyping) {
                    this.stop(true);
                } else {
                    this.typeNextPage();
                }
            }, textBox)
            .on('pageend', function () {
                if(this.isLastPage)  return;

                const icon = this.getElement('action').setVisible(true);
                this.resetChildVisibleState(icon);
                icon.y -= 30;
                const tween = scene.tweens.add({
                    targets: icon,
                    y: '+=30', // '+=100'
                    ease: 'Bounce', // 'Cubic', 'Elastic', 'Bounce', 'Back'
                    duration: 500,
                    repeat: 0, // -1: infinity
                    yoyo: false
                });
            }, textBox);

        textBox.on('complete', function() {
           setTimeout(() => {
               this.name.setVisible(false);
               textBox.destroy();
            }, 10*1000);
        }, this);

        return textBox;
    }

    getBuiltInText(scene, wrapWidth, fixedWidth, fixedHeight) {
        return scene.add.text(0, 0, '', {
            fontSize: '20px',
            wordWrap: {
                width: wrapWidth
            },
            maxLines: 3
        })
        .setFixedSize(fixedWidth, fixedHeight);
    }

    getBBcodeText(scene, wrapWidth, fixedWidth, fixedHeight) {
        return scene.rexUI.add.BBCodeText(0, 0, '', {
            fixedWidth: fixedWidth,
            fixedHeight: fixedHeight,
            fontSize: '20px',
            wrap: {
                mode: 'word',
                width: wrapWidth
            },
            maxLines: 3
        })
    }

};