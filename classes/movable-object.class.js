class MovableObject extends DrawableObject {
  otherDirection = false;
  energy = 100;
  lastHitType = "none";
  hitType = "none";
  lastHitTime = 0;
  lastShootTime = 0;
  isDead = false;
  cooldown = false;
  offset = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  };

  constructor() {
    super();
  }

  hit() {
    this.energy -= 20;
    if (this.energy <= 0) {
      this.energy = 0;
    } else {
      this.lastHitTime = new Date().getTime();
    }
  }

  isHurt() {
    let timePassed = new Date().getTime() - this.lastHitTime;
    timePassed = timePassed / 1000;
    return timePassed < 1;
  }

  cooldownTime() {
    let timePassed = new Date().getTime() - this.lastShootTime;
    timePassed = timePassed / 1000;
    return timePassed < 1;
  }

  isColliding(obj) {
    return (
      this.x + this.offset.left + this.width - this.offset.right > obj.x + obj.offset.left &&
      this.x + this.offset.left < obj.x + obj.offset.left + obj.width - obj.offset.right &&
      this.y + this.offset.top + this.height - this.offset.bottom > obj.y + obj.offset.top &&
      this.y + this.offset.top < obj.y + obj.offset.top + obj.height - obj.offset.bottom
    );
  }

  isBubbleColliding(obj) {
    return (
      this.x  + this.width > obj.x  &&
      this.x  < obj.x  + obj.width  &&
      this.y  + this.height  > obj.y  &&
      this.y < obj.y  + obj.height 
    );
  }

  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  playAnimationOnce(images) {
    let i = this.currentShootingImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentShootingImage++;
  }

  enemyMoveLeft() {
    setInterval(() => {
      this.x -= this.speed;
    }, 1000 / 60);
  }

  navigateCharacter() {
    if (this.world.keyboard.RIGHT && this.x < level1.level_end_x) {
      this.x += this.speed;
      this.otherDirection = false;
    }
    if (this.world.keyboard.LEFT && this.x > 0) {
      this.x -= this.speed;
      this.otherDirection = true;
    }
    if (this.world.keyboard.UP && this.y > -100) {
      this.y -= this.speed;
    }
    if (this.world.keyboard.DOWN && this.y < 280) {
      this.y += this.speed;
    }
  }



 
  checkIfSwimming() {
    if (
      this.world.keyboard.RIGHT ||
      this.world.keyboard.LEFT ||
      this.world.keyboard.UP ||
      this.world.keyboard.DOWN
    ) {
      this.isSwimming = true;
    } else {
      this.isSwimming = false;
    }
  }
}
