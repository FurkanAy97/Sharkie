class HealthBar extends StatusBar {
  barType = "life-bar";

  IMAGES = [
    "img/4. Marcadores/green/Life/0_  copia 3.png",
    "img/4. Marcadores/green/Life/20_ copia 4.png",
    "img/4. Marcadores/green/Life/40_  copia 3.png",
    "img/4. Marcadores/green/Life/60_  copia 3.png",
    "img/4. Marcadores/green/Life/80_  copia 3.png",
    "img/4. Marcadores/green/Life/100_  copia 2.png",
  ];

  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.y = -10;
    this.width = 220;
    this.height = 70;
    this.setPercentage(100);
  }
}
