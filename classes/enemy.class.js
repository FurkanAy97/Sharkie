class Enemy extends MovableObject {
  enemyType;
  IMAGES_DEATH;
  IMAGES_BUBBLESWIM;
  IMAGES_TRANSITION;
  swimLeft = true;
  transition = false;
  switchToBubbles = false;

  constructor() {
    super();
  }

  /**
   * Animates the enemy based on its state and the provided images.
   *
   * @param {string[]} images - An array of image URLs to animate the enemy with.
   */
  animate(images) {
    setInterval(() => {
      if (this.isDead) {
        this.playAnimation(this.IMAGES_DEATH);
      } else if (this.transition) {
        setTimeout(() => {
          this.switchToBubbles = true;
        }, 900);
        if (this.switchToBubbles) {
          this.playAnimation(this.IMAGES_BUBBLESWIM);
        } else {
          this.playTransAnimation(this.IMAGES_TRANSITION);
        }
      } else {
        this.playAnimation(images);
      }
    }, 200);
  }
}
