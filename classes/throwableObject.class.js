class ThrowableObject extends MovableObject {
  speedX = 20;
  world;
  throwInterval;
  otherDirection;

  offset = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  };

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
    this.loadImage(this.checkIfPoisonBubble());
    this.throw();
  }

  /**
   * Checks if poison bubble can be used for the attack.
   * Depletes poison meter after 1000ms delay if possible.
   * Returns path to poisoned bubble image or regular bubble image.
   *
   * @returns {string} - The path to the bubble image.
   */
  checkIfPoisonBubble() {
    if (this.world.statusBars[2].percentage > 0) {
      setTimeout(() => {
        this.depletePoisonMeter();
      }, 1000);
      return "img/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png";
    } else {
      return "img/1.Sharkie/4.Attack/Bubble trap/Bubble.png";
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
   * Initiates the throwing action for the enemy object.
   * Creates throwing animation using setInterval.
   * Lasts for 1000ms before removing enemy from throwableObjects array.
   *
   */
  throw() {
    this.throwInterval = setInterval(() => {
      if (this.otherDirection) {
        this.x -= 5;
      } else {
        this.x += 5;
      }
    }, 1000 / 60);

    setTimeout(() => {
      clearInterval(this.throwInterval);
      this.world.throwableObjects.shift();
    }, 1000);
  }
}
