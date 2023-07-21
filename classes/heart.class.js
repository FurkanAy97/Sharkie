class Heart extends Collectable {
  IMAGE = "img/4. Marcadores/green/100_  copia 3.png";

  width = 70;
  height = 70;
  offset = {
    top: 20,
    bottom: 20,
    left: 5,
    right: 10,
  };
  constructor(x, y) {
    super();
    this.loadImage("img/4. Marcadores/green/100_  copia 3.png");
    this.x = x;
    this.y = y;
  }
}
