class MovableObject {
  x = 0;
  y = 70;
  img;
  height = 150;
  width = 150;

  constructor() {}

  loadImage(imagePath) {
    this.img = new Image();
    this.img.src = imagePath;
  }

  moveRight() {
    console.log("move right");
  }
}
