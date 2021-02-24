import 'phaser';

export default class GameScene extends Phaser.Scene {
  constructor () {
    super('Game');
  };

  create () {
    this.gameSpeed = 10;
    const { height, width } = this.game.config;
    this.isGameRunning = false;
    this.respawnTime = 0;
    this.score = 0;

    // trigger for starting game 
    this.startTrigger = this.physics.add.sprite(0, 200).setOrigin(0, 1).setImmovable();

    this.ground = this.add.tileSprite(0, height, 88, 56, 'ground').setOrigin(0, 1);
    this.man = this.physics.add.sprite(0, height, 'man-idle')
      .setOrigin(0, 1)
      .setCollideWorldBounds(true)
      .setGravityY(5000);
      
    // this.scoreText = this.add.text(width, 0, "00000", {fill: "#535353", font: '900 35px Courier', resolution: 5})
    //   .setOrigin(1, 0)
    //   .setAlpha(0);

    this.scoreText = this.add.text(800, 100, '00000', {fill: "#535353", font: '900 20px Courier', resolution: 5});

    // this.scoreText = this.make.text({
    //   x: width,
    //   y: 0,
    //   text: '00000',
    //   style: {
    //     font: '900 35px monospace',
    //     fill: '#535353',
    //     resolution: 5
    //   }
    // });
    
    this.gameOverScreen = this.add.container(width / 2, height / 2 - 50).setAlpha(0);
    this.gameOverText = this.add.image(0, 0, 'game-over');
    this.restart = this.add.image(0, 80, 'restart').setInteractive();

    this.gameOverScreen.add([
      this.gameOverText, this.restart
    ])

    this.obsticles = this.physics.add.group();
    this.initAnims();
    this.initStartTrigger();
    this.initColliders();
    this.handleInputs();
    this.handleScore();
  }

  initColliders() {
    this.physics.add.collider(this.man, this.obsticles, () => {
      this.physics.pause();
      this.isGameRunning = false;
      this.anims.pauseAll();
      this.man.setTexture('man-idle');
      this.respawnTime = 0;
      this.gameSpeed = 10;
      this.gameOverScreen.setAlpha(1);
    }, null, this);
  }

  initStartTrigger() {
    const { width, height } = this.game.config;
    this.physics.add.overlap(this.startTrigger, this.man, () => {
      if (this.startTrigger.y === 200) {
        this.startTrigger.body.reset(0, height);
        return;
      }

      this.startTrigger.disableBody(true, true);

      const startEvent =  this.time.addEvent({
        delay: 1000/60,
        loop: true,
        callbackScope: this,
        callback: () => {
          this.man.setVelocityX(80);
          this.man.play('man-run-anim', 1);

          if (this.ground.width < width) {
            this.ground.width += 17 * 2;
          }

          if (this.ground.width >= width) {
            this.ground.width = width;
            this.isGameRunning = true;
            this.man.setVelocityX(0);
            startEvent.remove();
          }
        }
      });
    }, null, this)
  }

  initAnims() {
    this.anims.create({
      key: 'man-run-anim',
      frames: [
        { key: 'man-run-0' },
        { key: 'man-run-1' },
        { key: 'man-run-2' },
        { key: 'man-run-3' },
        { key: 'man-run-4' },
        { key: 'man-run-5' },
      ],
      frameRate: 10,
      repeat: -1
    })

    this.anims.create({
      key: 'man-down-anim',
      frames: [
        { key: 'man-run-3', duration: 50 },
      ],
      frameRate: 10,
      repeat: -1
    })

    this.anims.create({
      key: 'enemy-fly-anim',
      frames: [
        { key: 'enemy-fly-1' },
        { key: 'enemy-fly-2' },
        { key: 'enemy-fly-3' },
        { key: 'enemy-fly-4' },
        { key: 'enemy-fly-5' },
        { key: 'enemy-fly-6' },
        { key: 'enemy-fly-7' },
        { key: 'enemy-fly-8' },
      ],
      frameRate: 6,
      repeat: -1
    })

    // this.anims.create({
    //   key: 'enemy-fly-anim',
    //   frames: this.anims.generateFrameNumbers('enemy-bird', {start: 0, end: 1}),
    //   frameRate: 6,
    //   repeat: -1
    // })
  }

  handleScore() {
    this.time.addEvent({
      delay: 1000/10,
      loop: true,
      callbackScope: this,
      callback: () => {
        if (!this.isGameRunning) { return; }

        this.score++;
        this.gameSpeed += 0.01


        const score = Array.from(String(this.score), Number);
        for (let i = 0; i < 5 - String(this.score).length; i++) {
          score.unshift(0);
        }

        this.scoreText.setText(score.join(''));
      }
    })
  }

  handleInputs() {

    this.restart.on('pointerdown', () => { 
      this.man.setVelocityY(0);
      this.man.body.height = 244;
      this.man.body.offset.y = 0;
      this.physics.resume();
      this.obsticles.clear(true, true);
      this.isGameRunning = true;
      this.gameOverScreen.setAlpha(0);
      this.anims.resumeAll();
    })

    this.input.keyboard.on('keydown-SPACE', () => {
      if (!this.man.body.onFloor()) {
        return;
      }
      this.man.body.height = 244;
      this.man.body.offset.y = 0;

      this.man.setVelocityY(-1800);
      console.log(this.man.body.height);
    });

    this.input.keyboard.on('keydown-DOWN', () => {
      if (!this.man.body.onFloor()) {
        return;
      }
      this.man.body.height = 158;
      this.man.body.offset.y = 86;
    });

    this.input.keyboard.on('keyup-DOWN', () => {
      this.man.body.height = 244;
      this.man.body.offset.y = 0;
    });


  }

  placeObsticle() {
    const obsticleNum = Math.floor(Math.random() * 7) + 1;
    const distance = Phaser.Math.Between(600, 900);

    let obsticle;
    if (obsticleNum > 6) {
      console.log('obstacle > 6');
      const enemyHeight = [60, 80];
      obsticle = this.obsticles.create(this.game.config.width + distance, this.game.config.height - enemyHeight[Math.floor(Math.random() * 2)], 'enemy-bird')
        .setOrigin(0, 1);
      obsticle.play('enemy-fly-anim', 1);
      obsticle.body.height = obsticle.body.height / 1.5;
    } else {
      obsticle = this.obsticles.create(this.game.config.width + distance, this.game.config.height - 25, `obsticle-${obsticleNum}`)
        .setOrigin(0, 1);
      obsticle.body.offset.y = +10;
    }

    obsticle.setImmovable();
  }

  update(time, delta) {

    if (!this.isGameRunning) { return; }

    this.ground.tilePositionX += this.gameSpeed;
    Phaser.Actions.IncX(this.obsticles.getChildren(), -this.gameSpeed);

    this.respawnTime += delta * this.gameSpeed * 0.08;

    if (this.respawnTime >= 1500) {
      this.placeObsticle();
      this.respawnTime = 0;
    }

    this.obsticles.getChildren().forEach(obsticle => {
      if (obsticle.getBounds().right < 0) {
        // this.obsticles.killAndHide(obsticle);
        obsticle.destroy();
      }
    })

    if (this.man.body.deltaAbsY() > 0) {
      this.man.anims.stop();
      this.man.setTexture('man-idle');
    }
    else {
      this.man.body.height <= 58 ? 
        this.man.play('man-down-anim', true) :
        this.man.play('man-run-anim', true);
    }

  }
};
