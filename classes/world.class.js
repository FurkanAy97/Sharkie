class World {
  character = new Character();
  enemies = [new PufferFish(), new JellyFish(), new PufferFish()];
  background = [
    new Background('img/3. Background/Layers/5. Water/D1.png', 0),
    new Background('img/3. Background/Layers/1. Light/1.png', 0),
    new Background('img/3. Background/Layers/4.Fondo 2/D1.png', 0),
    new Background('img/3. Background/Layers/3.Fondo 1/D1.png', 0),
    new Background('img/3. Background/Layers/2. Floor/D1.png', 0),
  ];
  canvas;
  ctx;

  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.draw();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  
    this.addObjectsToMap(this.background);

    this.addObjectsToMap(this.enemies);

    this.addToMap(this.character);

    let self = this;
    requestAnimationFrame(() => {
      self.draw();
    });
  }

  addObjectsToMap(objects){
    objects.forEach(o => {
      this.addToMap(o)
    });
  }

  addToMap(mo){
    this.ctx.drawImage(
      mo.img,
      mo.x,
      mo.y,
      mo.width,
      mo.height
    );
  }
}
