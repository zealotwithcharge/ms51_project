import Levels from "/src/levels";

export default class Game {
  constructor(gameWidth, gameHeight) {
    this.gameHeight = gameHeight;
    this.gameWidth = gameWidth;
    this.deviance = 0;
    this.chosen_layout = 0;
    this.pixel_size = 10;
    this.gravity = 10;
    this.current_level = 3;
    this.score = 0;
    this.allowance = false;
  }
  toggle_allowance() {
    if (this.allowance) {
      this.allowance = false;
    } else {
      this.allowance = true;
    }
  }

  start() {
    this.level = new Levels(this, this.current_level);
    this.level.start();
  }
  update(dt) {
    this.level.update(dt);
  }
  draw(ctx) {
    this.level.draw(ctx);
  }
  next() {
    this.current_level++;
    this.start();
  }
  restart() {
    this.start();
  }
  set_layout(flag) {
    if (flag) {
      this.chosen_layout = 1;
    } else {
      this.chosen_layout = 0;
    }
  }
  set_score(new_score) {
    this.score = new_score;
  }
}
