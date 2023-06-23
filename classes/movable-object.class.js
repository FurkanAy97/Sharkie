class MovableObject {
    x = 20;
    y = 150;
    img; 
    height = 150;
    width = 150;

    loadImage(path){
        this.img = new Image();
        this.img.src = path;
    }

    constructor(){

    }

    moveRight() {
        console.log('move right');
    }
}