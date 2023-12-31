class PufferFish extends Enemy {
  width = 80;
  height = 80;
  enemyType = "puffer-fish";
  otherDirection = false;
  XSpeed = 1;
  offset = {
    top: 0,
    bottom: 20,
    left: 0,
    right: 0,
  };

  IMAGES_SWIMMING = [
    "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim1.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim2.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim3.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim4.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim5.png",
  ];

  IMAGES_TRANSITION = [
    "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/3.transition1.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/3.transition2.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/3.transition3.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/3.transition4.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/3.transition5.png",
  ];

  IMAGES_BUBBLESWIM = [
    "img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/3.bubbleswim1.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/3.bubbleswim2.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/3.bubbleswim3.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/3.bubbleswim4.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/3.bubbleswim5.png",
  ];

  IMAGES_DEATH = ["img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/3.png"];

  constructor(x, y) {
    super();
    this.loadImage("img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim1.png");
    this.x = x;
    this.y = y;
    this.loadImages(this.IMAGES_SWIMMING);
    this.loadImages(this.IMAGES_TRANSITION);
    this.loadImages(this.IMAGES_BUBBLESWIM);
    this.loadImages(this.IMAGES_DEATH);
    this.speed = 0.15 + Math.random() * 0.25;
    this.animate(this.IMAGES_SWIMMING);
    if (!this.isDead) {
      this.swim();
      this.changeSwimDirection();
    }
  }

  /**
   * Moves the enemy object left and right in a swimming motion.
   * The direction of the swimming motion is determined by the `swimLeft` property.
   * The function repeats using setInterval to create a smooth animation.
   */
  swim() {
    setInterval(() => {
      if (this.swimLeft) {
        this.x -= this.XSpeed;
      } else {
        this.x += this.XSpeed;
      }
    }, 1000 / 60);
  }

  /**
   * Changes the swim direction of the enemy object after a random time interval.
   * The `swimLeft` property is toggled, and the function is recursively called to keep changing the direction.
   * The time interval is randomly generated between 2000ms and 4000ms (inclusive).
   */
  changeSwimDirection() {
    setTimeout(() => {
      this.swimLeft = !this.swimLeft;
      this.otherDirection = !this.otherDirection;
      this.changeSwimDirection();
    }, Math.floor(Math.random() * 2000) + 2000);
  }

  /**
   * Applies a knockback effect to the enemy object.
   * The enemy moves backward and upward in response to a hit or impact.
   * The knockback effect is applied once using setTimeout to create a brief knockback motion.
   * The knockback motion is implemented using setInterval for smooth animation.
   */
  knockBack() {
    setTimeout(() => {
      setInterval(() => {
        this.x -= 5;
        this.y -= 5;
      }, 1000 / 60);
    }, 100);
  }
}
