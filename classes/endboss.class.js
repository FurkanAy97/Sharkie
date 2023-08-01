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
  imgIndex = 0;
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

  /**
   * Animates the boss character by repeatedly calling `pickAnimation()` and updating image indexes.
   * If the character's position is beyond 1500 units on the x-axis and the first boss spawn has not occurred,
   * it calls the `spawnBoss()` function to initialize the boss.
   */
  animateBoss() {
    setInterval(() => {
      this.pickAnimation();
      this.imgIndex++;
      if (this.world.character.x > 1500 && !this.firstBossSpawn) {
        this.spawnBoss();
      }
    }, 1000 / 8);
  }

  /**
   * Picks the appropriate animation for the boss character based on its current state.
   * It plays different animations (`IMAGES_INTRO`, `IMAGES_FLOATING`, or `IMAGES_ATTACK`)
   * depending on whether the boss has spawned, is attacking, or floating normally.
   */
  pickAnimation() {
    if (!this.bossSpawned) {
    } else if (this.isAttacking) {
      this.playAnimation(this.IMAGES_ATTACK);
    } else if (this.imgIndex < 10 && !this.isDead && !this.isHurt && !this.isAttacking) {
      this.playAnimation(this.IMAGES_INTRO);
    } else if (!this.isDead && !this.isHurt && !this.isAttacking) {
      this.playAnimation(this.IMAGES_FLOATING);
    }
  }

  /**
   * Initializes the boss character when it is first spawned.
   * It resets the image index and other necessary properties and plays endboss audio.
   */
  spawnBoss() {
    this.currentImage = 0;
    this.imgIndex = 0;
    this.firstBossSpawn = true;
    this.bossSpawned = true;
    this.world.playEndbossAudio();
  }

  /**
   * Handles the movement of the boss character by periodically updating its position.
   * The movement is controlled by the `checkIfUpOrDown()` and `changeDirection()` functions.
   * It runs at a frequency of 60 frames per second (FPS).
   */
  handleEndbossMovement() {
    setInterval(() => {
      if (this.bossSpawned) {
        this.checkIfUpOrDown();
        this.changeDirection();
      }
    }, 1000 / 60);
  }

  /**
   * Updates the vertical and horizontal position of the boss character based on its movement direction.
   * The character moves up and down and left and right based on the boolean flags `moveDown`, `moveLeft`, etc.
   */
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

  /**
   * Updates the movement direction of the boss character when it reaches certain boundaries.
   * If the boss is close to the top or bottom boundary, it changes the vertical movement direction.
   * If the boss is close to the left or right boundary, it changes the horizontal movement direction.
   */
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

  /**
   * Plays the death animation of the boss character by repeatedly updating its image with each frame.
   * After playing the animation, it triggers the `youwinScreen()` function and sets the `youWin` flag to true.
   */
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

  /**
   * Displays the "You Win" screen and performs various UI-related tasks when the boss is defeated.
   * It hides the game canvas, mainDiv, and game over screen while displaying the end screen.
   * Additionally, it plays the victory audio, mutes the world audio, and sets `youWin` and `gameIsRunning` flags.
   * Finally, it exits full screen and handles window resize.
   */
  youwinScreen() {
    document.getElementById("endScreen").style.display = "flex";
    document.getElementById("gameoverScreen").style.display = "none";
    document.getElementById("canvas").style.display = "none";
    document.getElementById("mainDiv").style.display = "none";
    this.world.hideUI();
    this.world.playAudio("audio/victory.wav");
    this.world.muted = true;
    youWin = true;
    gameIsRunning = false;
    exitFullscreen();
    handleWindowResize();
  }

  /**
   * Plays the hurt animation of the boss character by repeatedly updating its image with each frame
   * for a certain number of iterations when the boss is hurt (`isHurt` flag is true).
   * After playing the animation, it sets the `isHurt` flag to false.
   */
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

  /**
   * Inflicts damage to the boss character by reducing its health.
   * If the health reaches zero, it triggers the `deathAnimation()` function.
   * Otherwise, it sets the `isHurt` flag to true and plays the hurt animation.
   */
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
