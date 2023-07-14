class World {
  character = new Character();
  level = level1;
  canvas;
  keyboard;
  ctx;
  camera_x = 0;
  statusBars = [new LifeBar(), new CoinBar(), new PoisonBar()];
  throwableObjects = [];
  blockSwimming = false;

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
        this.checkCharacterCollision(enemy);
        this.checkBubbleCollision(enemy);
      });
    }, 100);
    setInterval(() => {
      this.level.barriers.forEach((barrier) => {
        this.checkBarrierCollision(barrier);
        this.checkIfCollisionOver(barrier);
        /* console.log(this.blockSwimming);   */
      });
    }, 1000 / 60);
  }

  checkBarrierCollision(barrier) {
    if (this.character.isColliding(barrier) && this.keyboard.RIGHT) {
      this.character.blockedSwimDirections.right = true;
      this.character.x -= 5;
      this.blockSwimmingTimeout();
    }
    if (this.character.isColliding(barrier) && this.keyboard.LEFT) {
      this.character.blockedSwimDirections.left = true;
      this.character.x += 5;
      this.blockSwimmingTimeout();
    }
    if (this.character.isColliding(barrier) && this.keyboard.UP) {
      this.character.blockedSwimDirections.up = true;
      this.character.y += 5;
      this.blockSwimmingTimeout();
    }
    if (this.character.isColliding(barrier) && this.keyboard.DOWN) {
      this.character.blockedSwimDirections.down = true;
      this.character.y -= 5;
      this.blockSwimmingTimeout();
    }
  }

  blockSwimmingTimeout() {
    this.blockSwimming = true;
    setTimeout(() => {
      this.blockSwimming = false;
    }, 200);
  }

  checkIfCollisionOver(barrier) {
    if (this.character.isColliding(barrier) == false) {
      this.resetBlockedDirections();
    }
  }

  resetBlockedDirections() {
    this.character.blockedSwimDirections = {
      right: false,
      left: false,
      up: false,
      down: false,
    };
  }

  checkBubbleCollision(enemy) {
    this.throwableObjects.forEach((o) => {
      if (
        o.isBubbleColliding(enemy) &&
        (enemy instanceof JellyFish || enemy instanceof SuperJellyFish)
      ) {
        console.log("colliding");
        enemy.isDead = true;
        const index = this.level.enemies.indexOf(enemy);
        if (index !== -1) {
          this.throwableObjects.shift();
          this.jellyfishKnockback(enemy);
          setTimeout(() => {
            this.level.enemies.splice(index, 1);
          }, 2000);
        }
      }
      if (o.isBubbleColliding(enemy) && enemy instanceof PufferFish) {
        enemy.transition = true;
        enemy.XSpeed = 4;
        enemy.offset.bottom = 0;
        this.throwableObjects.shift();
      }
    });
  }

  checkCharacterCollision(enemy) {
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
  }

  jellyfishKnockback(enemy) {
    let Yspeed = 0.1;
    setInterval(() => {
      enemy.y -= Yspeed;
      Yspeed += 0.1;
    }, 1000 / 60);
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.background);
    this.addObjectsToMap(this.level.barriers);

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
