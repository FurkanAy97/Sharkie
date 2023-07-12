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

  IMAGES_DEATH = [
    "img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 1.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 2.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 3.png",
  ];

  constructor() {
    super();
    this.loadImage("img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim1.png");
    this.x = 800 + Math.random() * 500;
    this.y = Math.random() * 400;
    this.loadImages(this.IMAGES_SWIMMING);
    this.loadImages(this.IMAGES_TRANSITION);
    this.loadImages(this.IMAGES_BUBBLESWIM);
    this.loadImages(this.IMAGES_DEATH);
    this.speed = 0.15 + Math.random() * 0.25;
    this.animate(this.IMAGES_SWIMMING);
    this.swim();
    this.changeSwimDirection()
  }
  
  swim() {
    setInterval(() => {
      if (this.swimLeft) {
        this.x -= this.XSpeed;
      } else {
        this.x += this.XSpeed;
      }
    }, 1000 / 60);
  }
  
  changeSwimDirection() {
    setTimeout(() => {
      this.swimLeft = !this.swimLeft;
      this.otherDirection = !this.otherDirection;
      this.changeSwimDirection();
    }, Math.floor(Math.random() * 2000) + 2000);
  }
  
  
}
