class Barrier extends MovableObject {
  offset = {
    top: 60,
    bottom: 0,
    left: 80,
    right: 140,
  };
  constructor(imagePath, x, y, width, height) {
    super();
    this.loadImage(imagePath);
    
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
}
