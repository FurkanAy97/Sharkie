class Level {
  enemies;
  endboss;
  background;
  barriers;
  coins;
  potions;
  hearts;
  level_end_x = 720 * 3;

  constructor(enemies, endboss, background, barriers, coins, potions, hearts) {
    this.enemies = enemies;
    this.background = background;
    this.barriers = barriers;
    this.coins = coins;
    this.potions = potions;
    this.endboss = endboss;
    this.hearts = hearts;
  }
}
