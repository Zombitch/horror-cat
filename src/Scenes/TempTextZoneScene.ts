import 'phaser';
import config from "../config";
import Zone = Phaser.GameObjects.Zone;
import Text = Phaser.GameObjects.Text;
import GetValue = Phaser.Utils.Objects.GetValue;
import {Scene} from "phaser";

/**
 * Scène du jeu
 */
export default class TempTextZoneScene extends Phaser.Scene {


    zoneTexte: Zone;
    dialogue: Text;
    COLOR_PRIMARY = 0x4e342e;
    COLOR_LIGHT = 0x7b5e57;
    COLOR_DARK = 0x260e04;


    constructor () {
        super('Texte');
    }
    preload() {
        this.load.scenePlugin({
            key: 'rexuiplugin',
            url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
            sceneKey: 'rexUI'
        });
    }

    create():void {
        // ajout de l'image à la scène
        const content = 'miaou miaou miaou miaou miaou miaou miaou miaoumiaou miaou miaou miaou miaou miaou miaou miaou miaou miaou miaou miaou miaou miaou miaou miaou';
        //this.ajouterTexte(this, content, 'boule de neige', config.height * 0.1)
    }

    ajouterTexte(scene: Scene, dialogue: string, nom: string, hauteur: number) {
        this.createTextBox(scene, 10, config.height - (hauteur + hauteur * 0.6 ) , nom, {
            wrapWidth: config.width,
            fixedWidth: config.width - 400,
            fixedHeight: hauteur,
        }).start(dialogue, 50);
    }

    createTextBox(scene, x, y, nom: string, config) {
        const wrapWidth = GetValue(config, 'wrapWidth', 0);
        const fixedWidth = GetValue(config, 'fixedWidth', 0);
        const fixedHeight = GetValue(config, 'fixedHeight', 0);
        const textBox = scene.rexUI.add.textBox({
            x: x,
            y: y,
            background: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 20, this.COLOR_PRIMARY)
                .setStrokeStyle(2, this.COLOR_LIGHT),
            icon: scene.add.text(x, y, nom, {fontSize:'24px'}),
            text: this.getBBcodeText(scene, wrapWidth, fixedWidth, fixedHeight),
            action: scene.add.image(0, 0, 'nextPage').setTint(this.COLOR_LIGHT).setVisible(false),
            space: {
                left: 20,
                right: 20,
                top: 20,
                bottom: 20,
                icon: 10,
                text: 10,
            }
        }).setOrigin(0).layout();

        textBox
            .setInteractive()
            .on('type', () => {
                const who = scene.add.text(config.width - 150, textBox.y, nom);
                who.setDepth(1000000)
            }, textBox)
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
                if (this.isLastPage) {
                    return;
                }

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
            }, textBox)
        //.on('type', function () {
        //})
        textBox.on('complete', function() {
           setTimeout(() => {textBox.destroy()}, 5000)
        }, scene);
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