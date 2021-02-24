import 'phaser';

export default class BootScene extends Phaser.Scene {
  constructor () {
    super('Boot');
  }

  preload () {
    this.load.image('logo', './assets/ps5_logo.jpg');
  }

  create () {
    //transition to the Preloader scene
    this.scene.start('Preloader');
  }
};
