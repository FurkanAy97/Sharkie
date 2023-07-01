class PufferFish extends MovableObject {
    width = 80;
    height = 80;
    IMAGES_SWIMMING = [
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim1.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim2.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim4.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim5.png',
    ];

    constructor(){
        super().loadImage('img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim1.png')

        this.x = 200 + Math.random() * 500;
        this.y = Math.random() * 400;
        this.loadImages(this.IMAGES_SWIMMING)
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
    }
    
    animate(){
        this.moveLeft()

        setInterval( () => {
          let i = this.currentImage % this.IMAGES_SWIMMING.length;
          let path = this.IMAGES_SWIMMING[i];
          this.img = this.imageCache[path];
          this.currentImage++;
          
        }, 1000 / 3)
      }


}