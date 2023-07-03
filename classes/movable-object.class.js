class MovableObject {
  x = 0;
  y = 70;
  img;
  height = 150;
  width = 150;
  imageCache = {};
  currentImage = 0;
  speed = 0.15;
  otherDirection = false;

  constructor() {}

  loadImage(imagePath) {
    this.img = new Image();
    this.img.src = imagePath;
  }

  draw(ctx){
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    
  }

  drawFrame(ctx){
    ctx.beginPath();
    ctx.lineWidth = '5';
    ctx.strokeStyle = 'blue';
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.stroke();
  }

  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  enemyMoveLeft() {
    setInterval(() => {
      this.x -= this.speed;
    }, 1000 / 60);
  }

  accelerate() {
    if (this.speed < 8) {
      this.speed += this.acceleration;
    }
  }

  resetSpeed() {
    if (
      !this.world.keyboard.RIGHT &&
      !this.world.keyboard.LEFT &&
      !this.world.keyboard.UP &&
      !this.world.keyboard.DOWN
    ) {
      this.speed = 5;
    }
  }

  checkIfSwimming() {
    if (
      this.world.keyboard.RIGHT ||
      this.world.keyboard.LEFT ||
      this.world.keyboard.UP ||
      this.world.keyboard.DOWN
    ) {
      this.isSwimming = true;
    } else {
      this.isSwimming = false;
    }
  }
}
