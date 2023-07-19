class Coin extends Collectable {
  IMAGES = [
    "img/4. Marcadores/1. Coins/1.png",
    "img/4. Marcadores/1. Coins/2.png",
    "img/4. Marcadores/1. Coins/3.png",
    "img/4. Marcadores/1. Coins/4.png",
  ];

  width = 50;
  height = 50;
  constructor(x, y) {
    super();
    this.loadImage("img/4. Marcadores/1. Coins/1.png");
    this.loadImages(this.IMAGES);
    this.animate();
    this.x = x;
    this.y = y;
  }

  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES);
    }, 200);
  }
}
