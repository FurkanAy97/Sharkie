class MovableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  energy = 100;
  lastHitType = "none";
  hitType = "none";
  lastHitTime = 0;
  isDead = false;

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

  /*  isColliding(obj) {
    return (
      this.x + this.width >= obj.x &&
      this.x <= obj.x + obj.width &&
      this.y + this.offsetY + this.height >= obj.y &&
      this.y + this.offsetY <= obj.y + obj.height &&
      obj.onCollisionCourse
    ); // Optional: hiermit könnten wir schauen, ob ein Objekt sich in die richtige Richtung bewegt. Nur dann kollidieren wir. Nützlich bei Gegenständen, auf denen man stehen kann.
  } */

  isColliding(obj) {
    return (
      this.x + this.width >= obj.x &&
      this.y + this.height >= obj.y &&
      this.x <= obj.x &&
      this.y <= obj.y + obj.height
    );
  }

  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  enemyMoveLeft() {
    setInterval(() => {
      this.x -= this.speed;
    }, 1000 / 60);
  }

  navigateCharacter() {
    if (this.world.keyboard.RIGHT && this.x < level1.level_end_x) {
      this.x += this.speed;
      this.accelerate();
      this.otherDirection = false;
    }
    if (this.world.keyboard.LEFT && this.x > 0) {
      this.x -= this.speed;
      this.accelerate();
      this.otherDirection = true;
    }
    if (this.world.keyboard.UP && this.y > -100) {
      this.y -= this.speed;
      this.accelerate();
    }
    if (this.world.keyboard.DOWN && this.y < 280) {
      this.y += this.speed;
      this.accelerate();
    }
  }

  accelerate() {
    if (this.speed < 8) {
      this.speed += this.acceleration;
    }
  }

  resetSpeed() {
    if (
      !this.world.keyboard.RIGHT &&
      !this.world.keyboard.LEFT &&
      !this.world.keyboard.UP &&
      !this.world.keyboard.DOWN
    ) {
      this.speed = 5;
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
