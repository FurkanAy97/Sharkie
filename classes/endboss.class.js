class Endboss extends Enemy {
  width = 400;
  height = 400;
  y = -50;
  x = 2000;
  offset = {
    top: 190,
    bottom: 270,
    left: 20,
    right: 40,
  };
  otherDirection = true;
  moveDown = false;
  moveLeft = false;
  enemyType = "endBoss";
  bossSpawned = false;
  firstBossSpawn = false;
  attackCooldown = false;
  world;
  health = 3;
  isDead = false;
  isHurt = false;
  isAttacking = false;

  IMAGES_INTRO = [
    "img/2.Enemy/3 Final Enemy/1.Introduce/1.png",
    "img/2.Enemy/3 Final Enemy/1.Introduce/2.png",
    "img/2.Enemy/3 Final Enemy/1.Introduce/3.png",
    "img/2.Enemy/3 Final Enemy/1.Introduce/4.png",
    "img/2.Enemy/3 Final Enemy/1.Introduce/5.png",
    "img/2.Enemy/3 Final Enemy/1.Introduce/6.png",
    "img/2.Enemy/3 Final Enemy/1.Introduce/7.png",
    "img/2.Enemy/3 Final Enemy/1.Introduce/8.png",
    "img/2.Enemy/3 Final Enemy/1.Introduce/9.png",
    "img/2.Enemy/3 Final Enemy/1.Introduce/10.png",
  ];

  IMAGES_FLOATING = [
    "img/2.Enemy/3 Final Enemy/2.floating/1.png",
    "img/2.Enemy/3 Final Enemy/2.floating/2.png",
    "img/2.Enemy/3 Final Enemy/2.floating/3.png",
    "img/2.Enemy/3 Final Enemy/2.floating/4.png",
    "img/2.Enemy/3 Final Enemy/2.floating/5.png",
    "img/2.Enemy/3 Final Enemy/2.floating/6.png",
    "img/2.Enemy/3 Final Enemy/2.floating/7.png",
    "img/2.Enemy/3 Final Enemy/2.floating/8.png",
    "img/2.Enemy/3 Final Enemy/2.floating/9.png",
    "img/2.Enemy/3 Final Enemy/2.floating/10.png",
    "img/2.Enemy/3 Final Enemy/2.floating/11.png",
  ];

  IMAGES_HURT = [
    "img/2.Enemy/3 Final Enemy/Hurt/1.png",
    "img/2.Enemy/3 Final Enemy/Hurt/2.png",
    "img/2.Enemy/3 Final Enemy/Hurt/3.png",
    "img/2.Enemy/3 Final Enemy/Hurt/4.png",
  ];

  IMAGES_ATTACK = [
    "img/2.Enemy/3 Final Enemy/Attack/1.png",
    "img/2.Enemy/3 Final Enemy/Attack/2.png",
    "img/2.Enemy/3 Final Enemy/Attack/3.png",
    "img/2.Enemy/3 Final Enemy/Attack/4.png",
    "img/2.Enemy/3 Final Enemy/Attack/5.png",
    "img/2.Enemy/3 Final Enemy/Attack/6.png",
  ];

  IMAGES_DEATH = [
    "img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 6.png",
    "img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 7.png",
    "img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 8.png",
    "img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 9.png",
    "img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 10.png",
  ];

  constructor() {
    super();

    this.loadImage("img/2.Enemy/3 Final Enemy/1.Introduce/1.png");
    this.loadImages(this.IMAGES_FLOATING);
    this.loadImages(this.IMAGES_INTRO);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_DEATH);
    setTimeout(() => {
      this.animateBoss(this.IMAGES_FLOATING);
      this.handleEndbossMovement();
    }, 500);
  }

  animateBoss() {
    let i;
    setInterval(() => {
      if (!this.bossSpawned) {
      } else if (this.isAttacking) {
        this.playAnimation(this.IMAGES_ATTACK);
      } else if (i < 10 && !this.isDead && !this.isHurt && !this.isAttacking) {
        this.playAnimation(this.IMAGES_INTRO);
      } else if (!this.isDead && !this.isHurt && !this.isAttacking) {
        this.playAnimation(this.IMAGES_FLOATING);
      }
      i++;

      if (this.world.character.x > 1500 && !this.firstBossSpawn) {
        this.currentImage = 0;
        i = 0;
        this.firstBossSpawn = true;
        this.bossSpawned = true;
        this.world.playEndbossAudio();
      }
    }, 1000 / 8);
  }

  handleEndbossMovement() {
    setInterval(() => {
      if (this.bossSpawned) {
        this.checkIfUpOrDown();
        this.changeDirection();
      }
    }, 1000 / 60);
  }

  checkIfUpOrDown() {
    if (this.moveDown) {
      this.y += 2;
    } else {
      this.y -= 2;
    }
    if (this.moveLeft) {
      this.x -= 1;
    } else {
      this.x += 1;
    }
  }

  changeDirection() {
    if (this.y <= -200) {
      this.moveDown = !this.moveDown;
    }
    if (this.y >= 130) {
      this.moveDown = !this.moveDown;
    }
    if (this.x < 1500) {
      this.moveLeft = !this.moveLeft;
      this.otherDirection = !this.otherDirection;
    }
    if (this.x > 2100) {
      this.moveLeft = !this.moveLeft;
      this.otherDirection = !this.otherDirection;
    }
  }

  deathAnimation() {
    let i = 0;
    const intervalId = setInterval(() => {
      if (i < 4) {
        this.playDeathAnimation(this.IMAGES_DEATH);
        i++;
      } else {
        clearInterval(intervalId);
        this.isDead = false;
        this.youwinScreen();
      }
    }, 1000 / 10);
  }

  youwinScreen() {
    document.getElementById("endScreen").style.display = "block";
    document.getElementById("gameoverScreen").style.display = "none";
    document.getElementById("canvas").style.display = "none";
    this.world.hideUI();
    this.world.playAudio("audio/victory.wav");
    this.world.muted = true;
    this.world.gameOver = true;
    gameStarted = false;
    handleWindowResize();
  }

  hurtAnimation() {
    let i = 0;
    const intervalId = setInterval(() => {
      if (i < 4 && this.isHurt) {
        this.playAnimation(this.IMAGES_HURT);
        i++;
      } else {
        this.isHurt = false;
        clearInterval(intervalId);
      }
    }, 1000 / 10);
  }

  damage() {
    this.health -= 1;
    if (this.health == 0) {
      this.isDead = true;
      this.deathAnimation();
    } else {
      this.isHurt = true;
      this.hurtAnimation();
    }
  }
}
