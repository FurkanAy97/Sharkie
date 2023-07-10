class ThrowableObject extends MovableObject {
  speedX = 20;
  world;
  throwInterval;
  otherDirection;
  offset = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  };
  
  

  constructor(x, y, world, offset, otherDirection) { 
    super();
    this.offset = offset
    this.otherDirection = otherDirection
    if (this.otherDirection) {
      this.x = x + offset.left - 50;
    } else {
      this.x = x + this.width - offset.right + 150; 
    }
    this.y = y + 10;
    this.width = 40;
    this.height = 40;
    this.world = world;
    this.offset = this.offset
    this.loadImage("img/1.Sharkie/4.Attack/Bubble trap/Bubble.png");
    this.throw();
  } 

  throw() {
    this.throwInterval = setInterval(() => {
      if (this.otherDirection) {
        this.x -= 5;
      } else {
        this.x += 5;
      }
    }, 1000 / 60);

    setTimeout(() => {
      clearInterval(this.throwInterval);
      this.world.throwableObjects.shift();
    }, 1000);
  }
}

