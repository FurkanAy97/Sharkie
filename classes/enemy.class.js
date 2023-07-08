class Enemy extends MovableObject {
    enemyType;

    constructor(){
        super()
    }

    animate(images){
        setInterval(() => {
            this.playAnimation(images)
        }, 200);
    }

    
}