class World {
  character = new Character();
  level = level1;
  endboss = this.level.endboss.find((e) => e instanceof Endboss);
  canvas;
  keyboard;
  ctx;
  camera_x = 0;
  statusBars = [new HealthBar(), new CoinBar(), new PoisonBar()];
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
    this.endboss.world = this;
  }

  checkCollisions() {
    this.checkEnemyCollisions();
    this.checkBarrierCollisions();
    this.checkCoinCollisions();
    this.checkPotionCollisons();
  }

  checkPotionCollisons() {
    setInterval(() => {
      this.level.potions.forEach((potion) => {
        if (this.character.isColliding(potion) && this.statusBars[2].percentage !== 100) {
          let percentage = this.statusBars[2].percentage;
          percentage += 20;
          this.statusBars[2].setPercentage(percentage);
          this.removePotion(potion);
        }
      });
    }, 100);
  }

  checkCoinCollisions() {
    setInterval(() => {
      this.level.coins.forEach((coin) => {
        if (this.character.isColliding(coin) && this.statusBars[1].percentage !== 100) {
          let percentage = this.statusBars[1].percentage;
          percentage += 20;
          this.statusBars[1].setPercentage(percentage);
          this.removeCoin(coin);
        }
      });
    }, 100);
  }

  removeCoin(coin) {
    const index = this.level.coins.indexOf(coin);
    this.level.coins.splice(index, 1);
  }

  removePotion(potion) {
    const index = this.level.potions.indexOf(potion);
    this.level.potions.splice(index, 1);
  }

  checkEnemyCollisions() {
    setInterval(() => {
      this.level.enemies.forEach((enemy) => {
        this.checkCharacterCollision(enemy);
        this.checkBubbleCollision(enemy);
      });
    }, 100);
  }

  checkBarrierCollisions() {
    setInterval(() => {
      this.level.barriers.forEach((barrier) => {
        this.checkBarrierCollision(barrier);
        this.checkIfCollisionOver(barrier);
        this.checkBubbleBarrierCollision(barrier);
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
      if (o.isBubbleColliding(enemy) && enemy instanceof Endboss) {
        
        if (this.statusBars[2].percentage > 0) {
          this.endboss.damage();
          this.throwableObjects.shift();
        } else {
          this.throwableObjects.shift();
        }
      }
      if (
        o.isBubbleColliding(enemy) &&
        (enemy instanceof JellyFish || enemy instanceof SuperJellyFish)
      ) {
        console.log("colliding");
        enemy.isDead = true;
        this.removeJellyFish(enemy);
      }
      if (o.isBubbleColliding(enemy) && enemy instanceof PufferFish) {
        enemy.transition = true;
        enemy.XSpeed = 4;
        enemy.offset.bottom = 0;
        this.throwableObjects.shift();
      }
    });
  }

  removeJellyFish(enemy) {
    const index = this.level.enemies.indexOf(enemy);
    if (index !== -1) {
      this.throwableObjects.shift();
      this.jellyfishKnockback(enemy);
      setTimeout(() => {
        this.level.enemies.splice(index, 1);
      }, 2000);
    }
  }

  checkBubbleBarrierCollision(barrier) {
    this.throwableObjects.forEach((throwableObject) => {
      if (barrier.isColliding(throwableObject)) {
        this.throwableObjects.shift();
      }
    });
  }

  checkCharacterCollision(enemy) {
    if (this.character.isColliding(enemy)) {
      if (enemy instanceof PufferFish && this.character.attacking) {
        enemy.isDead = true;
        enemy.knockBack();
        setTimeout(() => {
          this.removePufferfish(enemy);
        }, 500);
      } else {
        this.character.hit();
      }
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

  removePufferfish(enemy) {
    const index = this.level.enemies.indexOf(enemy);
    if (index !== -1) {
      this.level.enemies.splice(index, 1);
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

    
    this.addObjectsToMap(this.level.potions);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.endboss);
    this.ctx.translate(-this.camera_x, 0);
    this.addObjectsToMap(this.statusBars);
    this.ctx.translate(this.camera_x, 0);
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
