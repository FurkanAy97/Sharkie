class DrawableObject {
  x = 0;
  y = 70;
  height = 150;
  width = 150;
  img;
  imageCache = {};
  currentImage = 0;
  currentTransImage = 0;
  currentDeathImage = 0;

  constructor() {}

  /**
   * Loads an image from the specified imagePath.
   *
   * @param {string} imagePath - The path to the image file.
   */
  loadImage(imagePath) {
    this.img = new Image();
    this.img.src = imagePath;
  }

  /**
   * Loads multiple images and caches them in the imageCache object.
   *
   * @param {string[]} arr - An array of image paths to be loaded.
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  /**
   * Draws the image on the canvas context.
   *
   * @param {CanvasRenderingContext2D} ctx - The canvas 2D rendering context.
   */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  /**
   * Draws a frame around the object based on its position, size, and offset.
   * The color of the frame depends on the object type (blue for certain types, red for ThrowableObject).
   *
   * @param {CanvasRenderingContext2D} ctx - The canvas 2D rendering context.
   */
  drawFrame(ctx) {
    if (
      this instanceof Character ||
      this instanceof PufferFish ||
      this instanceof JellyFish ||
      this instanceof SuperJellyFish ||
      this instanceof Barrier ||
      this instanceof Coin ||
      this instanceof Heart ||
      this instanceof Potion ||
      this instanceof Endboss
    ) {
      this.drawBlueFrame(ctx);
    }
    if (this instanceof ThrowableObject) {
      this.drawRedFrame(ctx);
    }
  }

  /**
   * Draws a blue frame around the object based on its position, size, and offset.
   * This function is intended to be used for specific object types.
   *
   * @param {CanvasRenderingContext2D} ctx - The canvas 2D rendering context.
   */
  drawBlueFrame(ctx) {
    ctx.beginPath();
    ctx.lineWidth = "5";
    ctx.strokeStyle = "blue";
    ctx.rect(
      this.x + this.offset.left,
      this.y + this.offset.top,
      this.width - this.offset.right,
      this.height - this.offset.bottom
    );
    ctx.stroke();
  }

  /**
   * Draws a red frame around the throwable object based on its position and size.
   * This function is intended to be used for ThrowableObject instances.
   *
   * @param {CanvasRenderingContext2D} ctx - The canvas 2D rendering context.
   */
  drawRedFrame(ctx) {
    ctx.beginPath();
    ctx.lineWidth = "2";
    ctx.strokeStyle = "red";
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.stroke();
  }
}
