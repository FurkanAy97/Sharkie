let level1;
function initLevel() {
  document.getElementById("startScreen").style.visibility = "hidden";
  document.getElementById("muteButton").style.visibility = "visible";
  document.getElementById("hitboxButton").style.visibility = "visible";
  document.getElementById("fullscreenBtn").style.visibility = "visible";

  level1 = new Level(
    createFishes(),
    createBoss(),
    createBackgroundObjects(),
    createBarriers(),
    createCoins(),
    createPotions(),
    createHearts()
  );
}

function createFishes() {
  return [
    new PufferFish(500, 40),
    new PufferFish(1700, 50),
    new PufferFish(1000, 110),
    new PufferFish(1700, 300),
    new JellyFish(400, 110),
    new SuperJellyFish(1300, 300),
    new SuperJellyFish(1300, 10),
  ];
}

function createBoss() {
  return [new Endboss()];
}

function createBackgroundObjects() {
  return [
    new Background("img/3. Background/Layers/5. Water/D2.png", -719),
    new Background("img/3. Background/Layers/4.Fondo 2/D2.png", -719),
    new Background("img/3. Background/Layers/3.Fondo 1/D2.png", -719),
    new Background("img/3. Background/Layers/2. Floor/D2.png", -719),
    new Background("img/3. Background/Layers/5. Water/D1.png", 0),
    new Background("img/3. Background/Layers/4.Fondo 2/D1.png", 0),
    new Background("img/3. Background/Layers/3.Fondo 1/D1.png", 0),
    new Background("img/3. Background/Layers/2. Floor/D1.png", 0),
    new Background("img/3. Background/Layers/5. Water/D2.png", 719),
    new Background("img/3. Background/Layers/1. Light/1.png", 719),
    new Background("img/3. Background/Layers/4.Fondo 2/D2.png", 719),
    new Background("img/3. Background/Layers/3.Fondo 1/D2.png", 719),
    new Background("img/3. Background/Layers/2. Floor/D2.png", 719),
    new Background("img/3. Background/Layers/5. Water/D1.png", 719 * 2),
    new Background("img/3. Background/Layers/1. Light/2.png", 719 * 2),
    new Background("img/3. Background/Layers/4.Fondo 2/D1.png", 719 * 2),
    new Background("img/3. Background/Layers/3.Fondo 1/D1.png", 719 * 2),
    new Background("img/3. Background/Layers/2. Floor/D1.png", 719 * 2),
    new Background("img/3. Background/Layers/5. Water/D2.png", 719 * 3),
    new Background("img/3. Background/Layers/4.Fondo 2/D2.png", 719 * 3),
    new Background("img/3. Background/Layers/3.Fondo 1/D2.png", 719 * 3),
    new Background("img/3. Background/Layers/2. Floor/D2.png", 719 * 3),
  ];
}

function createBarriers() {
  return [
    new Barrier("img/3. Background/Barrier/2.png", 720, 200, 400, 400),
    new Barrier("img/3. Background/Barrier/2.png", 1200, 350, 400, 200),
  ];
}

function createCoins() {
  return [
    new Coin(500, 300),
    new Coin(600, 200),
    new Coin(700, 100),
    new Coin(900, 50),
    new Coin(1200, 200),
  ];
}

function createPotions() {
  return [
    new Potion(400, 400),
    new Potion(900, 200),
    new Potion(1150, 400),
    new Potion(1700, 400),
    new Potion(1900, 400),
  ];
}

function createHearts() {
  return [
    new Heart(1000, 50),
    new Heart(1450, 10),
    new Heart(1450, 300),
    new Heart(2000, 5),
    new Heart(1800, 5),
  ];
}
