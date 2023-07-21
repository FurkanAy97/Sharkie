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
  audioTimeout = false;
  audioIsPlaying;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.checkCollisions();
    this.handleBossAttack();
    document.addEventListener("click", () => {
      this.playWorldAudio();
      document.removeEventListener("click", this.playWorldAudio);
    });
  }

  playWorldAudio() {
    if (!this.audioIsPlaying) {
      let audio = new Audio("audio/level-music.mp3");
      audio.loop = true;
      this.audioIsPlaying = true;
      audio.play();
      setInterval(() => {
        if (this.endboss.bossSpawned) {
          audio.pause();
        }
      }, 1000 / 8);
    }
  }

  playEndbossAudio() {
    let audio = new Audio("audio/bossfight.mp3");
    audio.loop = true;
    audio.play();
  }

  playAudio(audioUrl) {
    let audio = new Audio(audioUrl);
    audio.play();
  }

  setWorld() {
    this.character.world = this;
    this.endboss.world = this;
  }

  checkCollisions() {
    this.checkEnemyCollisions();
    this.checkBarrierCollisions();
    this.checkCoinCollisions();
    this.checkHeartCollisions();
    this.checkPotionCollisons();
  }

  handleBossAttack() {
    setInterval(() => {
      if (this.character.isColliding(this.endboss)) {
        this.endboss.isAttacking = true;
      } else {
        this.endboss.isAttacking = false;
      }
    }, 1000 / 8);
  }

  checkPotionCollisons() {
    setInterval(() => {
      this.level.potions.forEach((potion) => {
        if (this.character.isColliding(potion) && this.statusBars[2].percentage !== 100) {
          this.playAudio("audio/bottle.wav");
          let percentage = this.statusBars[2].percentage;
          percentage += 20;
          this.statusBars[2].setPercentage(percentage);
          this.removeItem(this.level.potions,potion);
        }
      });
    }, 100);
  }

  checkHeartCollisions(){
    setInterval(() => {
      this.level.hearts.forEach((heart) => {
        if (this.character.isColliding(heart) && this.statusBars[0].percentage !== 100) {
          this.playAudio("audio/heal.wav");
          let percentage = this.statusBars[0].percentage;
          percentage += 20;
          this.statusBars[0].setPercentage(percentage);
          this.removeItem(this.level.hearts ,heart);
        }
      });
    }, 100);
  }

  checkCoinCollisions() {
    setInterval(() => {
      this.level.coins.forEach((coin) => {
        if (this.character.isColliding(coin) && this.statusBars[1].percentage !== 100) {
          this.playAudio("audio/coin.mp3");
          let percentage = this.statusBars[1].percentage;
          percentage += 20;
          this.statusBars[1].setPercentage(percentage);
          this.removeItem(this.level.coins, coin);
        }
      });
    }, 100);
  }

  removeItem(items,item){
    const index = items.indexOf(item);
    items.splice(index, 1);
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
    const boss = this.endboss;
    const poisonBar = this.statusBars[2];

    this.throwableObjects.forEach((bubble) => {
      if (bubble.isBubbleColliding(boss)) {
        if (poisonBar.percentage > 0) {
          boss.damage();
          this.playAudio("audio/damage.wav");
        } else {
          this.playAudio("audio/bluh.wav");
        }
        this.throwableObjects.shift();
      } else if (bubble.isBubbleColliding(enemy)) {
        if (enemy instanceof JellyFish || enemy instanceof SuperJellyFish) {
          enemy.isDead = true;
          this.removeJellyFish(enemy);
        } else if (enemy instanceof PufferFish) {
          this.initPufferfishTransform(enemy);
        }
      }
    });
  }

  initPufferfishTransform(enemy) {
    this.playAudio("audio/bluh.wav");
    enemy.transition = true;
    enemy.XSpeed = 4;
    enemy.offset.bottom = 0;
    this.throwableObjects.shift();
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
    if (this.character.isColliding(enemy) || this.character.isColliding(this.endboss)) {
      if (enemy instanceof PufferFish && this.character.attacking) {
        this.handlePufferfishDamage(enemy);
      } else {
        this.handleEnemyHitType(enemy);
        this.character.hit();
      }
      this.updateLifeBar();
      this.checkIfCharDead(enemy);
    }
  }

  checkIfCharDead(enemy) {
    if (this.character.energy <= 0 && !this.character.isDead) {
      this.character.isDead = true;
      this.character.lastHitType = enemy.enemyType === "puffer-fish" ? "poisoned" : "shocked";
    }
  }

  handleEnemyHitType(enemy) {
    if (enemy.enemyType === "jelly-fish") {
      this.character.hitType = "shocked";
    } else if (enemy.enemyType === "puffer-fish" || enemy.enemyType === "endBoss") {
      this.character.hitType = "poisoned";
    }
  }

  handlePufferfishDamage(enemy) {
    enemy.isDead = true;
    enemy.knockBack();
    if (!this.audioTimeout) {
      this.playAudio("audio/damage.wav");
      this.audioTimeout = true;
    }
    setTimeout(() => {
      this.removePufferfish(enemy);
      this.audioTimeout = false;
    }, 500);
  }

  removePufferfish(enemy) {
    const index = this.level.enemies.indexOf(enemy);
    if (index !== -1) {
      this.level.enemies.splice(index, 1);
    }
  }

  updateLifeBar() {
    this.statusBars.forEach((bar) => {
      if (bar.barType === "life-bar") {
        bar.setPercentage(this.character.energy);
      }
    });
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
    this.addObjectsToMap(this.level.hearts);
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
