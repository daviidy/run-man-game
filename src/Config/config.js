import 'phaser';

export default {
  type: Phaser.AUTO,
  width: 1000,
  height: 600,
  pixelArt: true,
  transparent: true,
  physics: {
    default: 'arcade',
    arcade: {
      debug: true
    }
  }
};
