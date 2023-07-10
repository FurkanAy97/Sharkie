class Enemy extends MovableObject {
  enemyType;
  IMAGES_DEATH;

  constructor() {
    super();
  }

  animate(images) {
    setInterval(() => {
      if (this.isDead) {
        this.playAnimation(this.IMAGES_DEATH);
      } else {
        this.playAnimation(images);
      }
    }, 200);
  }
}
