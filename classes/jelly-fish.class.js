class JellyFish extends Enemy {
  width = 80;
  height = 80;
  enemyType = "jelly-fish";

  IMAGES_SWIMMING = [
    "img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png",
    "img/2.Enemy/2 Jelly fish/Regular damage/Lila 2.png",
    "img/2.Enemy/2 Jelly fish/Regular damage/Lila 3.png",
    "img/2.Enemy/2 Jelly fish/Regular damage/Lila 4.png",
  ];

  IMAGES_DEATH = [
    "img/2.Enemy/2 Jelly fish/Dead/Lila/L1.png",
    "img/2.Enemy/2 Jelly fish/Dead/Lila/L2.png",
    "img/2.Enemy/2 Jelly fish/Dead/Lila/L3.png",
    "img/2.Enemy/2 Jelly fish/Dead/Lila/L4.png",
  ];

  constructor(x, y) {
    super().loadImage("img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png");

    /* this.x = 400 + Math.random() * 500;
    this.y = Math.random() * 400; */
    this.x = x;
    this.y = y;
    this.loadImages(this.IMAGES_SWIMMING);
    this.loadImages(this.IMAGES_DEATH);
    this.animate(this.IMAGES_SWIMMING);
  }
}
