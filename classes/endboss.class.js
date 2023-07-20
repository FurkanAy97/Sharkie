class Endboss extends Enemy {
  width = 450;
  height = 450;
  y = -50;
  x = 2000;
  offset = {
    top: 190,
    bottom: 270,
    left: 20,
    right: 40,
  };
  bossSpawned = false;
  world;
  health = 3;
  isDead = false;
  isHurt = false;

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
    this.loadImages(this.IMAGES_DEATH);
    setTimeout(() => {
      this.animateBoss(this.IMAGES_FLOATING);
    }, 500);
  }

  animateBoss() {
    let i;
    setInterval(() => {
      if (!this.bossSpawned) {
      } else if (i < 10 && !this.isDead && !this.isHurt) {
        this.playAnimation(this.IMAGES_INTRO);
      } else if (!this.isDead && !this.isHurt) {
        this.playAnimation(this.IMAGES_FLOATING);
      }
      i++;

      if (this.world.character.x > 100 && !this.bossSpawned) {
        this.currentImage = 0;
        i = 0;
        this.bossSpawned = true;
      }
    }, 1000 / 8);
  }

  deathAnimation() {
    let i = 0;
  const intervalId = setInterval(() => {
    if (i < 4) { // Add an additional check for this.isHurt
      this.playDeathAnimation(this.IMAGES_DEATH);
      i++;
    } else {
      clearInterval(intervalId); // Clear the interval when this.isHurt is set to false
      this.isDead = false
    }
  }, 1000 / 10);
  }

  hurtAnimation() {
  let i = 0;
  const intervalId = setInterval(() => {
    if (i < 4 && this.isHurt) { // Add an additional check for this.isHurt
      this.playAnimation(this.IMAGES_HURT);
      i++;
    } else {
      this.isHurt = false;
      clearInterval(intervalId); // Clear the interval when this.isHurt is set to false
    }
  }, 1000 / 10);
}


  damage() {
    this.health -= 1;
    if (this.health == 0) {
      this.isDead = true;
      this.deathAnimation();
    } else {
      this.isHurt = true
      this.hurtAnimation();
    }
  }
}
