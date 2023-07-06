class DrawableObject {
  x = 0;
  y = 70;
  height = 150;
  width = 150;
  img;
  imageCache = {};
  currentImage = 0;

  constructor() {}

  loadImage(imagePath) {
    this.img = new Image();
    this.img.src = imagePath;
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  drawFrame(ctx) {
    if (
      this instanceof Character ||
      this instanceof PufferFish ||
      this instanceof JellyFish ||
      this instanceof Endboss
    ) {
      ctx.beginPath();
      ctx.lineWidth = "5";
      ctx.strokeStyle = "blue";
      ctx.rect(this.x + this.offsetX, this.y + this.offsetY, this.width - this.offsetWidth, this.height - this.offsetHeight);
      ctx.rect(this.x +  this.offset.left, this.y + this.offset.top , this.width - this.offset.right, this.height - this.offset.bottom);
      ctx.stroke();
    }
  }

  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }
}
