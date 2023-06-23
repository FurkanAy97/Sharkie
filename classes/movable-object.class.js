class MovableObject {
    x;
    y;
    img; 

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