class JellyFish extends MovableObject {

    constructor(){
        super().loadImage('img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png')

        this.x = 200 + Math.random() * 500;
        this.y = Math.random() * 400;
        this.width = 80;
        this.height = 80;
    }


}