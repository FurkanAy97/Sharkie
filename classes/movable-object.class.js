/**
 * Represents a movable object that extends the DrawableObject class.
 * @extends DrawableObject
 */
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

  /**
   * Decreases the energy of the object by 20 and updates the last hit time.
   */
  hit() {
    this.energy -= 20;
    if (this.energy <= 0) {
      this.energy = 0;
    } else {
      this.lastHitTime = new Date().getTime();
    }
  }

  /**
   * Checks if the object was recently hit.
   * @returns {boolean} True if the object was hit within the last second, false otherwise.
   */
  isHurt() {
    let timePassed = new Date().getTime() - this.lastHitTime;
    timePassed = timePassed / 1000;
    return timePassed < 1;
  }

  /**
   * Checks if the object is in cooldown after shooting.
   * @returns {boolean} True if the object is in cooldown after shooting within the last second, false otherwise.
   */
  cooldownTime() {
    let timePassed = new Date().getTime() - this.lastShootTime;
    timePassed = timePassed / 1000;
    return timePassed < 1;
  }

  /**
   * Checks if the object is colliding with another object.
   * @param {Object} obj - The object to check collision against.
   * @returns {boolean} True if the object is colliding with the given object, false otherwise.
   */
  isColliding(obj) {
    return (
      this.x + this.offset.left + this.width - this.offset.right > obj.x + obj.offset.left &&
      this.x + this.offset.left < obj.x + obj.offset.left + obj.width - obj.offset.right &&
      this.y + this.offset.top + this.height - this.offset.bottom > obj.y + obj.offset.top &&
      this.y + this.offset.top < obj.y + obj.offset.top + obj.height - obj.offset.bottom
    );
  }

  /**
   * Checks if the object's bubble is colliding with another object.
   * @param {Object} obj - The object to check bubble collision against.
   * @returns {boolean} True if the object's bubble is colliding with the given object, false otherwise.
   */
  isBubbleColliding(obj) {
    return (
      this.x + this.width > obj.x &&
      this.x < obj.x + obj.width &&
      this.y + this.height > obj.y &&
      this.y < obj.y + obj.height
    );
  }

  /**
   * Plays the animation by cycling through the given images.
   * @param {string[]} images - An array of image paths.
   */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
   * Plays the shooting animation once by cycling through the given images.
   * @param {string[]} images - An array of image paths.
   */
  playShootingAnimation(images) {
    let i = this.currentShootingImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentShootingImage++;
  }


  playTransAnimation(images) {
    let i = this.currentTransImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentTransImage++;
  }

  /**
   * Moves the enemy character to the left continuously.
   */
  enemyMoveLeft() {
    setInterval(() => {
      this.x -= this.speed;
    }, 1000 / 60);
  }

  /**
   * Moves the character based on keyboard input.
   */
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

  /**
   * Checks if the character is swimming based on keyboard input.
   */
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
