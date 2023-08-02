class ThrowableObject extends MovableObject {
  speedX = 20;
  world;
  throwInterval;
  otherDirection;
  bubbleCount = 0;
  offset = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  };

  IMAGES_BUBBLE = ["img/1.Sharkie/4.Attack/Bubble trap/Bubble.png"];
  IMAGES_POISONBUBBLE = ["img/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png"];

  constructor(x, y, world, offset, otherDirection) {
    super();
    this.offset = offset;
    this.otherDirection = otherDirection;
    if (this.otherDirection) {
      this.x = x + offset.left - 50;
    } else {
      this.x = x + this.width - offset.right + 150;
    }
    this.y = y + 10;
    this.width = 40;
    this.height = 40;
    this.world = world;
    this.offset = this.offset;
    this.loadImages(this.IMAGES_BUBBLE);
    this.loadImages(this.IMAGES_POISONBUBBLE);
    this.checkIfPoisonBubble();
    this.throw();
  }

  /**
   * Checks if poison bubble can be used for the attack.
   * Depletes poison meter after 1000ms delay if possible.
   * Plays animation with the correct bubble type.
   *
   * @returns {string} - The path to the bubble image.
   */
  checkIfPoisonBubble() {
    if (this.world.statusBars[2].percentage > 0) {
      setTimeout(() => {
        this.depletePoisonMeter();
      }, 1000);
      this.playAnimation(this.IMAGES_POISONBUBBLE);
    } else {
      this.playAnimation(this.IMAGES_BUBBLE);
    }
  }

  /**
   * Depletes the poison meter by reducing the percentage.
   * Updates poison meter after depletion if percentage is > 0.
   *
   */
  depletePoisonMeter() {
    if (this.world.statusBars[2].percentage > 0) {
      this.world.statusBars[2].percentage -= 20;
      this.world.statusBars[2].setPercentage(this.world.statusBars[2].percentage);
    }
  }

  /**
   * Initiates the throwing action for the throwableObjects.
   * Creates throwing animation using setInterval.
   * Lasts for 900ms before removing bubble from throwableObjects array.
   *
   */
  throw() {
    this.throwInterval = setInterval(() => {
      if (this.otherDirection) {
        this.x -= 10;
      } else {
        this.x += 10;
      }
    }, 1000 / 60);

    setTimeout(() => {
      clearInterval(this.throwInterval);
      this.world.throwableObjects.shift();
    }, 900);
  }
}
