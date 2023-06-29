class MovableObject {
  x = 0;
  y = 70;
  img;
  height = 150;
  width = 150;
  imageCache = {};

  constructor() {}

  loadImage(imagePath) {
    this.img = new Image();
    this.img.src = imagePath;
  }

  loadImages(arr){
    arr.forEach((path) => {
      
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  moveRight() {
    console.log("move right");
  }
}
