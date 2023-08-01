class SuperJellyFish extends Enemy {
  width = 100;
  height = 100;
  enemyType = "jelly-fish";
  superDangerous;

  IMAGES_SWIMMING = [
    "img/2.Enemy/2 Jelly fish/Súper dangerous/Green 1.png",
    "img/2.Enemy/2 Jelly fish/Súper dangerous/Green 2.png",
    "img/2.Enemy/2 Jelly fish/Súper dangerous/Green 3.png",
    "img/2.Enemy/2 Jelly fish/Súper dangerous/Green 4.png",
  ];

  IMAGES_DEATH = [
    "img/2.Enemy/2 Jelly fish/Dead/green/g1.png",
    "img/2.Enemy/2 Jelly fish/Dead/green/g2.png",
    "img/2.Enemy/2 Jelly fish/Dead/green/g3.png",
    "img/2.Enemy/2 Jelly fish/Dead/green/g4.png",
  ];

  constructor(x, y) {
    super().loadImage("img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png");
    this.x = x;
    this.y = y;
    this.loadImages(this.IMAGES_SWIMMING);
    this.loadImages(this.IMAGES_DEATH);
    this.animate(this.IMAGES_SWIMMING);
  }
}
