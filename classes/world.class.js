class World {
  character = new Character();
  level = level1;
  canvas;
  keyboard;
  ctx;
  camera_x = 0;
  statusBars = [new LifeBar(), new CoinBar(), new PoisonBar()];
  throwableObjects = []

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    /* this.playWorldAudio() */
    this.checkCollisions();
  }

  playWorldAudio() {
    let worldAudio = new Audio("audio/world-audio.mp3");
    worldAudio.play();
  }

  setWorld() {
    this.character.world = this;
  }

  
  checkCollisions() {
    setInterval(() => {
      this.level.enemies.forEach((enemy) => {
        if (this.character.isColliding(enemy)) {
          this.character.hit();
          this.statusBars.forEach((bar) => {
            if (bar.barType == "life-bar") {
              bar.setPercentage(this.character.energy);
            }
          });
          if (enemy.enemyType === "puffer-fish") {
            this.character.hitType = "poisoned";
          } else if (enemy.enemyType === "jelly-fish") {
            this.character.hitType = "shocked";
          }
          if (this.character.energy <= 0 && this.character.isDead == false) {
            this.character.isDead = true;
            this.character.lastHitType = enemy.enemyType === "puffer-fish" ? "poisoned" : "shocked";
            console.log("dead");
          }
          console.log(this.character.energy, this.character.lastHitType, this.character.hitType);
        }
      });
    }, 400);
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.background);

    this.ctx.translate(-this.camera_x, 0);
    this.addObjectsToMap(this.statusBars);
    this.ctx.translate(this.camera_x, 0);

    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.throwableObjects);
    this.addToMap(this.character);

    this.ctx.translate(-this.camera_x, 0);

    let self = this;
    requestAnimationFrame(() => {
      self.draw();
    });
  }

  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  addToMap(o) {
    if (o.otherDirection) {
      this.flipImage(o);
    }

    o.draw(this.ctx);
    o.drawFrame(this.ctx);

    if (o.otherDirection) {
      this.flipImageBack(o);
    }
  }

  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
