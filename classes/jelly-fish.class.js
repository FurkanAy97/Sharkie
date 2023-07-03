class JellyFish extends MovableObject {
    width = 80;
    height = 80;
    IMAGES_SWIMMING = [
        'img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Lila 2.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Lila 3.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Lila 4.png',
    ];

    constructor(){
        super().loadImage('img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png')

        this.x = 200 + Math.random() * 500;
        this.y = Math.random() * 400;
        this.loadImages(this.IMAGES_SWIMMING)
        this.animate();
    }

    animate() {
    
        setInterval(() => {
          this.playAnimation(this.IMAGES_SWIMMING)
        }, 1000 / 3);
      }


}