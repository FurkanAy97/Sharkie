class Background  extends MovableObject{
 
  constructor(imagePath) {
    super();
    this.loadImage(imagePath)
  }

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }
  
}
