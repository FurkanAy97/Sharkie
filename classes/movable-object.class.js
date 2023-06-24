class MovableObject {
  x = 20;
  y = 150;
  img;
  height = 150;
  width = 150;

  constructor() {}

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  moveRight() {
    console.log("move right");
  }
}
