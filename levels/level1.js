const level1 = new Level(
  [new PufferFish(), new JellyFish(), new PufferFish(), new SuperJellyFish(), new Endboss()],
  [
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
  ],
  [
    new Barrier("img/3. Background/Barrier/3.png", 350, 180, 100, 300),
    /* new Barrier("img/3. Background/Barrier/2.png", 150, 0, 500, 100), */
  ]
);
