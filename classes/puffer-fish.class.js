class PufferFish extends MovableObject {
  width = 80;
  height = 80;
  enemyType = 'puffer-fish'
  IMAGES_SWIMMING = [
    "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim1.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim2.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim3.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim4.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim5.png",
  ];

  constructor() {
    super().loadImage("img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim1.png");

    this.x = 800 + Math.random() * 500;
    this.y = Math.random() * 400;
    this.loadImages(this.IMAGES_SWIMMING);
    this.speed = 0.15 + Math.random() * 0.25;
    this.animate();
  }

  animate() {
    
    /* this.enemyMoveLeft(); */

    setInterval(() => {
      this.playAnimation(this.IMAGES_SWIMMING)
    }, 1000 / 3);
  }
}
