class ThrowableObject extends MovableObject {
  speedX = 20;
  world;
  throwInterval;

  constructor(x, y, world) {
    super();
    this.x = x + this.offset.left / 2;
    this.y = y;
    this.width = 40;
    this.height = 40;
    this.world = world;
    this.loadImage("img/1.Sharkie/4.Attack/Bubble trap/Bubble.png");
    this.throw();
  }

  throw() {
    this.throwInterval = setInterval(() => {
      this.x += 5;
    }, 1000 / 60);

    setTimeout(() => {
      clearInterval(this.throwInterval);
      this.world.throwableObjects.shift();
    }, 1000);
  }
}

