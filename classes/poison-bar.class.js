class PoisonBar extends StatusBar {
    barType = "poison-bar";
  IMAGES = [
    "img/4. Marcadores/green/poisoned bubbles/0_ copia 2.png",
    "img/4. Marcadores/green/poisoned bubbles/20_ copia 3.png",
    "img/4. Marcadores/green/poisoned bubbles/40_ copia 2.png",
    "img/4. Marcadores/green/poisoned bubbles/60_ copia 2.png",
    "img/4. Marcadores/green/poisoned bubbles/80_ copia 2.png",
    "img/4. Marcadores/green/poisoned bubbles/100_ copia 3.png",
  ];

  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.y = 90;
    this.width = 220;
    this.height = 70;
    this.setPercentage(0);
  }
}
