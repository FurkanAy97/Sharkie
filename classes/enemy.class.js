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
