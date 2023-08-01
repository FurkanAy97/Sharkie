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
  muted;
  framesActive;
  fullscreenOn = false;

  constructor(canvas, keyboard, muted, fullscreenOn) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.muted = muted;
    this.fullscreenOn = fullscreenOn;
    this.draw();
    this.setWorld();
    this.checkCollisions();
    this.handleBossAttack();
    this.playWorldAudio();
    document.removeEventListener("click", this.playWorldAudio);
  }

  /**
   * Plays the background music for the world.
   * If not muted, starts playing the level music in a loop.
   * Pauses the music if the end boss is spawned or the game is muted.
   *
   * @param {number} delay - The delay in milliseconds before starting the audio.
   */
  playWorldAudio() {
    setTimeout(() => {
      if (!this.muted) {
        let audio = new Audio("audio/level-music.mp3");
        audio.loop = true;
        audio.play();
        setInterval(() => {
          if (this.endboss.bossSpawned || this.muted) {
            audio.pause(audio);
          }
        }, 1000 / 8);
      }
    }, 100);
  }

  /**
   * Plays the background music for the end boss fight.
   * If not muted and the end boss is spawned, starts playing the boss fight music in a loop.
   * Pauses the music if the game is muted.
   */
  playEndbossAudio() {
    if (!this.muted && this.endboss.bossSpawned) {
      let audio = new Audio("audio/bossfight.mp3");
      audio.loop = true;
      audio.play();
      setInterval(() => {
        if (this.muted) {
          audio.pause(audio);
        }
      }, 1000 / 8);
    }
  }

  /**
   * Plays audio from the provided audio URL if not muted.
   *
   * @param {string} audioUrl - The URL of the audio file to be played.
   */
  playAudio(audioUrl) {
    if (!this.muted) {
      let audio = new Audio(audioUrl);
      audio.play();
    }
  }

  /**
   * Sets the world for the character and the end boss.
   * Updates the `world` property of both the character and end boss to reference this world instance.
   */
  setWorld() {
    this.character.world = this;
    this.endboss.world = this;
  }

  /**
   * Checks collisions between various game elements.
   * Calls individual collision checking functions for enemies, barriers, coins, hearts, and potions.
   */
  checkCollisions() {
    this.checkEnemyCollisions();
    this.checkBarrierCollisions();
    this.checkCoinCollisions();
    this.checkHeartCollisions();
    this.checkPotionCollisons();
  }

  /**
   * Handles the boss attack state based on the character's collision with the end boss.
   * Sets the end boss's `isAttacking` property to true if the character is colliding with it, otherwise, sets it to false.
   */
  handleBossAttack() {
    setInterval(() => {
      if (this.character.isColliding(this.endboss)) {
        this.endboss.isAttacking = true;
      } else {
        this.endboss.isAttacking = false;
      }
    }, 1000 / 8);
  }

  /**
   * Checks collisions between the character and potions.
   * If the character collides with a potion and the poison meter percentage is not 100,
   * increases the poison meter by 20, plays the bottle sound, and removes the potion from the level.
   */
  checkPotionCollisons() {
    setInterval(() => {
      this.level.potions.forEach((potion) => {
        if (this.character.isColliding(potion) && this.statusBars[2].percentage !== 100) {
          this.playAudio("audio/bottle.wav");
          let percentage = this.statusBars[2].percentage;
          percentage += 20;
          this.statusBars[2].setPercentage(percentage);
          this.removeItem(this.level.potions, potion);
        }
      });
    }, 100);
  }
  /**
   * Checks collisions between the character and hearts.
   * If the character collides with a heart and the health percentage is not 100,
   * increases the health by 20, plays the heal sound, and removes the heart from the level.
   */
  checkHeartCollisions() {
    setInterval(() => {
      this.level.hearts.forEach((heart) => {
        if (this.character.isColliding(heart) && this.statusBars[0].percentage !== 100) {
          this.playAudio("audio/heal.wav");
          let percentage = this.statusBars[0].percentage;
          percentage += 20;
          this.statusBars[0].setPercentage(percentage);
          this.removeItem(this.level.hearts, heart);
        }
      });
    }, 100);
  }

  /**
   * Checks collisions between the character and coins.
   * If the character collides with a coin and the score percentage is not 100,
   * increases the score by 20, plays the coin sound, and removes the coin from the level.
   */
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

  /**
   * Removes the specified item from the items array.
   *
   * @param {Array} items - The array containing the items.
   * @param {any} item - The item to be removed from the array.
   */
  removeItem(items, item) {
    const index = items.indexOf(item);
    items.splice(index, 1);
  }

  /**
   * Checks collisions between the character and enemies.
   * Calls checkCharacterCollision() and checkBubbleCollision() for each enemy in the level.
   */
  checkEnemyCollisions() {
    setInterval(() => {
      this.level.enemies.forEach((enemy) => {
        this.checkCharacterCollision(enemy);
        this.checkBubbleCollision(enemy);
      });
    }, 100);
  }

  /**
   * Checks collisions between the character and barriers.
   * Calls checkBarrierCollision(), checkIfCollisionOver(), and checkBubbleBarrierCollision() for each barrier in the level.
   */
  checkBarrierCollisions() {
    setInterval(() => {
      this.level.barriers.forEach((barrier) => {
        this.checkBarrierCollision(barrier);
        this.checkIfCollisionOver(barrier);
        this.checkBubbleBarrierCollision(barrier);
      });
    }, 1000 / 60);
  }

  /**
   * Checks for collision between the character and a barrier,
   * and moves the character away from the barrier based on the keyboard input.
   *
   * @param {Object} barrier - The barrier to check collision with.
   */
  checkBarrierCollision(barrier) {
    if (this.character.isColliding(barrier) && this.keyboard.RIGHT) {
      this.checkDirection(this.character.blockedSwimDirections.right);
      this.character.x -= 5;
    }
    if (this.character.isColliding(barrier) && this.keyboard.LEFT) {
      this.checkDirection(this.character.blockedSwimDirections.left);
      this.character.x += 5;
    }
    if (this.character.isColliding(barrier) && this.keyboard.UP) {
      this.checkDirection(this.character.blockedSwimDirections.up);
      this.character.y += 5;
    }
    if (this.character.isColliding(barrier) && this.keyboard.DOWN) {
      this.checkDirection(this.character.blockedSwimDirections.down);
      this.character.y -= 5;
    }
  }

  /**
   * Sets the specified direction to true in the blockedSwimDirections property
   * of the character and initiates a timeout to reset it after 200ms.
   *
   * @param {string} direction - The direction to set as blocked (right, left, up, or down).
   */
  checkDirection(direction) {
    direction = true;
    this.blockSwimmingTimeout();
  }

  /**
   * Sets the blockSwimming property to true and initiates a timeout to reset it after 200ms.
   */
  blockSwimmingTimeout() {
    this.blockSwimming = true;
    setTimeout(() => {
      this.blockSwimming = false;
    }, 200);
  }

  /**
   * Checks if the character is not colliding with a barrier,
   * and resets the blockedSwimDirections property accordingly.
   *
   * @param {Object} barrier - The barrier to check collision with.
   */
  checkIfCollisionOver(barrier) {
    if (this.character.isColliding(barrier) == false) {
      this.resetBlockedDirections();
    }
  }

  /**
   * Resets the blockedSwimDirections property of the character to all false.
   */
  resetBlockedDirections() {
    this.character.blockedSwimDirections = {
      right: false,
      left: false,
      up: false,
      down: false,
    };
  }

  /**
   * Checks for collision between bubbles and the boss/enemy,
   * and handles the appropriate collision events.
   *
   * @param {Object} enemy - The enemy to check bubble collision with.
   */
  checkBubbleCollision(enemy) {
    const boss = this.endboss;
    const poisonBar = this.statusBars[2];
    this.throwableObjects.forEach((bubble) => {
      if (bubble.isBubbleColliding(boss)) {
        this.handleBubbleBossCollision(boss, poisonBar);
      } else if (bubble.isBubbleColliding(enemy)) {
        this.handleEnemyBubbleCollision(enemy);
      }
    });
  }

  /**
   * Handles the collision between a bubble and the boss,
   * inflicts damage to the boss if poisonBar percentage is above 0, otherwise plays a sound.
   *
   * @param {Object} boss - The boss object to handle collision with.
   * @param {Object} poisonBar - The poison bar object associated with the boss.
   */
  handleBubbleBossCollision(boss, poisonBar) {
    if (poisonBar.percentage > 0) {
      boss.damage();
      this.playAudio("audio/damage.wav");
    } else {
      this.playAudio("audio/bluh.wav");
    }
    this.throwableObjects.shift();
  }

  /**
   * Handles the collision between a bubble and an enemy,
   * depending on the type of enemy (JellyFish, SuperJellyFish, or PufferFish).
   *
   * @param {Object} enemy - The enemy object to handle collision with.
   */
  handleEnemyBubbleCollision(enemy) {
    if (enemy instanceof JellyFish || enemy instanceof SuperJellyFish) {
      enemy.isDead = true;
      this.removeJellyFish(enemy);
    } else if (enemy instanceof PufferFish) {
      this.initPufferfishTransform(enemy);
    }
  }

  /**
   * Initializes the pufferfish transformation upon collision with a bubble.
   *
   * @param {Object} enemy - The pufferfish enemy object to transform.
   */
  initPufferfishTransform(enemy) {
    this.playAudio("audio/bluh.wav");
    enemy.transition = true;
    enemy.XSpeed = 4;
    enemy.offset.bottom = 0;
    this.throwableObjects.shift();
  }

  /**
   * Removes the jellyfish enemy upon collision with a bubble.
   *
   * @param {Object} enemy - The jellyfish enemy object to remove.
   */
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

  /**
   * Checks for collision between bubbles and a barrier,
   * and removes the bubbles if there is a collision.
   *
   * @param {Object} barrier - The barrier to check collision with.
   */
  checkBubbleBarrierCollision(barrier) {
    this.throwableObjects.forEach((throwableObject) => {
      if (barrier.isColliding(throwableObject)) {
        this.throwableObjects.shift();
      }
    });
  }

  /**
   * Checks for collision between the character and an enemy/boss,
   * and handles the appropriate collision events based on the enemy type.
   *
   * @param {Object} enemy - The enemy object to check collision with.
   */
  checkCharacterCollision(enemy) {
    if (this.character.isColliding(enemy) || this.character.isColliding(this.endboss)) {
      if (this.character.isColliding(this.endboss)) {
        this.handleEnemyHitType(this.endboss);
        this.character.hit();
      } else {
        this.handleEnemyHitType(enemy);
        this.handleStandardEnemyHit(enemy);
      }
      this.updateLifeBar();
      this.checkIfCharDead(enemy);
    }
  }

  /**
   * Handles the collision event with a standard enemy (non-boss) and takes appropriate actions
   * based on the type of enemy and the character's attacking status.
   *
   * @param {Object} enemy - The enemy object to handle the hit event with.
   */
  handleStandardEnemyHit(enemy) {
    if (
      enemy instanceof PufferFish &&
      this.character.attacking &&
      !this.character.isColliding(this.endboss)
    ) {
      this.handlePufferfishDamage(enemy);
    } else {
      this.character.hit();
    }
  }

  /**
   * Checks if the character is dead (energy is depleted) and triggers the game over sequence.
   *
   * @param {Object} enemy - The enemy that caused the character's death.
   */
  checkIfCharDead(enemy) {
    if (this.character.energy <= 0 && !this.character.isDead) {
      this.character.isDead = true;
      this.character.lastHitType = enemy.enemyType === "puffer-fish" ? "poisoned" : "shocked";
      this.playAudio("audio/game-over.wav");
      this.muted = true;
      this.gameOverScreen();
      handleWindowResize();
    }
  }

  /**
   * Shows the game over screen and hides the UI elements.
   */
  gameOverScreen() {
    if (gameIsRunning) {
      exitFullscreen();
      document.getElementById("gameoverScreen").style.display = "flex";
      document.getElementById("canvas").style.display = "none";
      gameIsRunning = false;
      gameOver = true;
      this.hideUI();
    }
  }

  /**
   * Hides specific UI elements in the game.
   */
  hideUI() {
    document.getElementById("muteButton").style.visibility = "hidden";
    document.getElementById("hitboxButton").style.visibility = "hidden";
    document.getElementById("title").style.visibility = "hidden";
    document.getElementById("mainDiv").style.display = "none";
  }

  /**
   * Sets the character's hitType property based on the type of enemy encountered.
   *
   * @param {Object} enemy - The enemy object to determine the character's hit type.
   */
  handleEnemyHitType(enemy) {
    if (enemy instanceof JellyFish || enemy instanceof SuperJellyFish) {
      this.character.hitType = "shocked";
    } else {
      this.character.hitType = "poisoned";
    }
  }

  /**
   * Handles the pufferfish enemy damage event when hit by the character.
   *
   * @param {Object} enemy - The pufferfish enemy object to handle damage.
   */
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

  /**
   * Removes the pufferfish enemy from the level after it's defeated.
   *
   * @param {Object} enemy - The pufferfish enemy object to remove from the level.
   */
  removePufferfish(enemy) {
    const index = this.level.enemies.indexOf(enemy);
    if (index !== -1) {
      this.level.enemies.splice(index, 1);
    }
  }

  /**
   * Updates the life bar percentage based on the character's current energy level.
   */
  updateLifeBar() {
    this.statusBars.forEach((bar) => {
      if (bar.barType === "life-bar") {
        bar.setPercentage(this.character.energy);
      }
    });
  }

  /**
   * Performs a knockback animation on a jellyfish enemy.
   *
   * @param {Object} enemy - The jellyfish enemy object to apply knockback.
   */
  jellyfishKnockback(enemy) {
    let Yspeed = 0.1;
    setInterval(() => {
      enemy.y -= Yspeed;
      Yspeed += 0.1;
    }, 1000 / 60);
  }

  /**
   * Draws the game objects and updates the game loop.
   */
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

  /**
   * Adds an array of objects to the game map and draws them on the canvas.
   *
   * @param {Array} objects - The array of objects to be added to the game map and drawn on the canvas.
   */
  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  /**
   * Adds an object to the game map and draws it on the canvas.
   *
   * @param {Object} o - The object to be added to the game map and drawn on the canvas.
   */
  addToMap(o) {
    if (o.otherDirection) {
      this.flipImage(o);
    }

    o.draw(this.ctx);
    if (this.framesActive) {
      o.drawFrame(this.ctx);
    }

    if (o.otherDirection) {
      this.flipImageBack(o);
    }
  }

  /**
   * Flips the image horizontally for the provided object during drawing.
   *
   * @param {Object} mo - The object to flip the image for.
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  /**
   * Reverses the image flip transformation for the provided object during drawing.
   *
   * @param {Object} mo - The object to reverse the image flip transformation for.
   */
  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
