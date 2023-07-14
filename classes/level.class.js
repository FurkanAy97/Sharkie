class Level {
  enemies;
  background;
  barriers;
  level_end_x = 720*3;

  constructor(enemies, background, barriers) {
    this.enemies = enemies;
    this.background = background;
    this.barriers = barriers;
  }
}
