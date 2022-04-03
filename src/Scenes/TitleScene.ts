import 'phaser';
import config from '../config';
import {Game} from "phaser";
import Model from "../Model";
import BaseSound = Phaser.Sound.BaseSound;
import Button from "../Objects/Button";

/**
 * Scène titre
 */
export default class TitleScene extends Phaser.Scene {

    // config globale
    model: Model;

    // boutons de l'écran titre
    gameButton: Button;
    optionsButton: Button;
    creditsButton: Button;
    // le son joué en fond
    bgMusic: BaseSound;

    constructor () {
        super('Title');
    }

    init(): void {
        // récupération de la conf globale
        this.model = this.registry.get('model');
    }

    create(): void {
        // création des boutons
        this.gameButton = new Button(this, config.width/2, config.height/2 - 100, 'blueButton1', 'blueButton2', 'Play', 'Bedroom');
        this.optionsButton = new Button(this, config.width/2, config.height/2, 'blueButton1', 'blueButton2', 'Options', 'Options');
        this.creditsButton = new Button(this, config.width/2, config.height/2 + 100, 'blueButton1', 'blueButton2', 'Credits', 'Credits');
        this.add.text(275, 100, 'Il est où ce con de chat', { fontSize: "48px" })

        // si la musique est On et qu'elle n'est pas déjà jouée, on la déclenche
        if (this.model.musicOn && !this.model.bgMusicPlaying) {
            this.bgMusic = this.sound.add('bgMusic', { volume: 0.5, loop: true });
            this.bgMusic.play();
            this.model.bgMusicPlaying = true;
            this.model.bgMusic = this.bgMusic;
        }

        this.input.keyboard.on('keydown-A', () => {
            this.scene.run("Bedroom");
            this.scene.stop();
        })

        this.input.keyboard.on('keydown-Z', () => {
            this.scene.run("GameTest");
            this.scene.stop();
        })
        this.input.keyboard.on('keydown-E', () => {
            this.scene.run("GameOver");
            this.scene.stop();
        })
        this.input.keyboard.on('keydown-Q', () => {
            this.scene.run("Cellar");
            this.scene.stop();
        })

    }
};