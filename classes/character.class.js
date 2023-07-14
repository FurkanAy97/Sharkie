class Character extends MovableObject {
  width = 250;
  height = 250;
  x = 50;
  speed = 4;
  coins = 0;
  poisonMeter = 0;
  currentShootingImage = 0;
  shooting = false;
  isSwimming = false;
  offset = {
    top: 115,
    bottom: 170,
    left: 45,
    right: 90,
  };

  IMAGES_IDLE = [
    "img/1.Sharkie/1.IDLE/1.png",
    "img/1.Sharkie/1.IDLE/2.png",
    "img/1.Sharkie/1.IDLE/3.png",
    "img/1.Sharkie/1.IDLE/4.png",
    "img/1.Sharkie/1.IDLE/5.png",
    "img/1.Sharkie/1.IDLE/6.png",
    "img/1.Sharkie/1.IDLE/7.png",
    "img/1.Sharkie/1.IDLE/8.png",
    "img/1.Sharkie/1.IDLE/9.png",
    "img/1.Sharkie/1.IDLE/10.png",
    "img/1.Sharkie/1.IDLE/11.png",
    "img/1.Sharkie/1.IDLE/12.png",
    "img/1.Sharkie/1.IDLE/13.png",
    "img/1.Sharkie/1.IDLE/14.png",
    "img/1.Sharkie/1.IDLE/15.png",
    "img/1.Sharkie/1.IDLE/16.png",
    "img/1.Sharkie/1.IDLE/17.png",
    "img/1.Sharkie/1.IDLE/18.png",
  ];

  IMAGES_SWIMMING = [
    "img/1.Sharkie/3.Swim/1.png",
    "img/1.Sharkie/3.Swim/2.png",
    "img/1.Sharkie/3.Swim/3.png",
    "img/1.Sharkie/3.Swim/4.png",
    "img/1.Sharkie/3.Swim/5.png",
    "img/1.Sharkie/3.Swim/6.png",
  ];

  IMAGES_SHOOTING = [
    "img/1.Sharkie/4.Attack/Bubble trap/For Whale/Whitout bubbles/1.png",
    "img/1.Sharkie/4.Attack/Bubble trap/For Whale/Whitout bubbles/2.png",
    "img/1.Sharkie/4.Attack/Bubble trap/For Whale/Whitout bubbles/3.png",
    "img/1.Sharkie/4.Attack/Bubble trap/For Whale/Whitout bubbles/4.png",
    "img/1.Sharkie/4.Attack/Bubble trap/For Whale/Whitout bubbles/5.png",
    "img/1.Sharkie/4.Attack/Bubble trap/For Whale/Whitout bubbles/6.png",
    "img/1.Sharkie/4.Attack/Bubble trap/For Whale/Whitout bubbles/7.png",
    "img/1.Sharkie/4.Attack/Bubble trap/For Whale/Whitout bubbles/8.png",
  ];

  IMAGES_POISONED = [
    "img/1.Sharkie/5.Hurt/1.Poisoned/1.png",
    "img/1.Sharkie/5.Hurt/1.Poisoned/2.png",
    "img/1.Sharkie/5.Hurt/1.Poisoned/3.png",
    "img/1.Sharkie/5.Hurt/1.Poisoned/4.png",
    "img/1.Sharkie/5.Hurt/1.Poisoned/5.png",
  ];

  IMAGES_SHOCKED = [
    "img/1.Sharkie/5.Hurt/2.Electric shock/1.png",
    "img/1.Sharkie/5.Hurt/2.Electric shock/2.png",
    "img/1.Sharkie/5.Hurt/2.Electric shock/3.png",
  ];

  IMAGES_POISONED_DEATH = [
    "img/1.Sharkie/6.dead/1.Poisoned/1.png",
    "img/1.Sharkie/6.dead/1.Poisoned/2.png",
    "img/1.Sharkie/6.dead/1.Poisoned/3.png",
    "img/1.Sharkie/6.dead/1.Poisoned/4.png",
    "img/1.Sharkie/6.dead/1.Poisoned/5.png",
    "img/1.Sharkie/6.dead/1.Poisoned/6.png",
    "img/1.Sharkie/6.dead/1.Poisoned/7.png",
    "img/1.Sharkie/6.dead/1.Poisoned/8.png",
    "img/1.Sharkie/6.dead/1.Poisoned/9.png",
    "img/1.Sharkie/6.dead/1.Poisoned/10.png",
    "img/1.Sharkie/6.dead/1.Poisoned/11.png",
    "img/1.Sharkie/6.dead/1.Poisoned/12.png",
  ];

  IMAGES_SHOCKED_DEATH = [
    "img/1.Sharkie/6.dead/2.Electro_shock/1.png",
    "img/1.Sharkie/6.dead/2.Electro_shock/2.png",
    "img/1.Sharkie/6.dead/2.Electro_shock/3.png",
    "img/1.Sharkie/6.dead/2.Electro_shock/4.png",
    "img/1.Sharkie/6.dead/2.Electro_shock/5.png",
    "img/1.Sharkie/6.dead/2.Electro_shock/6.png",
    "img/1.Sharkie/6.dead/2.Electro_shock/7.png",
    "img/1.Sharkie/6.dead/2.Electro_shock/8.png",
    "img/1.Sharkie/6.dead/2.Electro_shock/9.png",
    "img/1.Sharkie/6.dead/2.Electro_shock/10.png",
  ];

  world;

  constructor() {
    super();
    this.loadImage("img/1.Sharkie/1.IDLE/1.png");
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_SWIMMING);
    this.loadImages(this.IMAGES_SHOOTING);
    this.loadImages(this.IMAGES_POISONED);
    this.loadImages(this.IMAGES_POISONED_DEATH);
    this.loadImages(this.IMAGES_SHOCKED);
    this.loadImages(this.IMAGES_SHOCKED_DEATH);
    this.animate();
  }

  animate() {
    setInterval(() => {
      if (!this.world.blockSwimming) {
        this.navigateCharacter();
      }
      this.checkIfSwimming();
      if (this.world.keyboard.SPACE && !this.cooldown) {
        this.shoot();
        this.isShooting();
      }
      this.world.camera_x = -this.x + 70;
    }, 1000 / 60);

    setInterval(() => {
      if (this.shooting) {
        this.playShootingAnimation(this.IMAGES_SHOOTING);
      } else if (this.isHurt() && this.hitType == "poisoned") {
        this.playAnimation(this.IMAGES_POISONED);
      } else if (this.isHurt() && this.hitType == "shocked") {
        this.playAnimation(this.IMAGES_SHOCKED);
      } else if (this.lastHitType == "poisoned") {
        this.playAnimation(this.IMAGES_POISONED_DEATH);
      } else if (this.lastHitType == "shocked") {
        this.playAnimation(this.IMAGES_SHOCKED_DEATH);
      } else if (this.isSwimming) {
        this.playAnimation(this.IMAGES_SWIMMING);
      } else {
        this.playAnimation(this.IMAGES_IDLE);
      }
    }, 1000 / 8);
  }

  shoot() {
    setTimeout(() => {
      this.world.throwableObjects.push(
        new ThrowableObject(
          this.x,
          this.y + this.height / 2,
          this.world,
          this.offset,
          this.otherDirection
        )
      );
    }, 800);
    this.cooldown = true;
    setTimeout(() => {
      this.cooldown = false;
    }, 1000);
  }

  isShooting() {
    this.shooting = true;
    setTimeout(() => {
      this.shooting = false;
      this.currentShootingImage = 0;
    }, 1000);
  }
}
