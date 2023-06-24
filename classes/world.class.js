class World {
  character = new Character();
  enemies = [new PufferFish(), new JellyFish(), new PufferFish()];
  background = [
    new Background('img/3. Background/Layers/5. Water/D1.png'),
    new Background('img/3. Background/Layers/1. Light/1.png'),
    new Background('img/3. Background/Layers/2. Floor/D1.png'),
  ];
 /*  floor1 = new Floor1();
  water1 = new Water1();
  light1 = new Light1(); */
  canvas;
  ctx;

  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.draw();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.background.forEach((bg) => [
      this.ctx.drawImage(
        this.bg.img,
        this.bg.x,
        this.bg.y,
        this.bg.width,
        this.bg.height,
      )
    ])

    /* this.ctx.drawImage(
      this.water1.img,
      this.water1.x,
      this.water1.y,
      this.water1.width,
      this.water1.height
    );

    this.ctx.drawImage(
      this.light1.img,
      this.light1.x,
      this.light1.y,
      this.light1.width,
      this.light1.height
    );

    this.ctx.drawImage(
      this.floor1.img,
      this.floor1.x,
      this.floor1.y,
      this.floor1.width,
      this.floor1.height
    );
 */
    this.enemies.forEach((e) => {
      this.ctx.drawImage(e.img, e.x, e.y, e.width, e.height);
    });

    this.ctx.drawImage(
      this.character.img,
      this.character.x,
      this.character.y,
      this.character.width,
      this.character.height
    );

    let self = this;
    requestAnimationFrame(() => {
      self.draw();
    });
  }
}
