class Potion extends Collectable {
  IMAGE = "img/4. Marcadores/Posión/Dark - Left.png";

  width = 50;
  height = 70;
  constructor(x, y) {
    super();
    this.loadImage("img/4. Marcadores/Posión/Dark - Left.png");
    this.x = x;
    this.y = y;
  }
}
