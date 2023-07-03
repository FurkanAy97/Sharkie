class Level {
  enemies;
  background;
  level_end_x = 720*3;

  constructor(enemies, background) {
    this.enemies = enemies;
    this.background = background;
  }
}
