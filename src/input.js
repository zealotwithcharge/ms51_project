export default class InputHandler {
  constructor(player) {
    this.jumping = false;
    this.player = player;
    var action1 = function (event) {
      switch (event.key) {
        case "W":
        case "w":
          //w
          this.setMouth(1);
          this.jump();
          this.deviance_jump(1);
          break;
        case "<":
        case ",":
          //,
          this.jump();
          this.setMouth(0);
          this.deviance_jump(0);
          break;
        case "S":
        case "s":
          //s
          this.deviance_pound(1);
          this.pound();
          this.setTail(1);
          break;
        case "O":
        case "o":
          //o
          this.deviance_pound(0);
          this.pound();
          this.setTail(0);
          break;
        case "1":
          this.log();
          break;
        case "2":
          this.restart();
          break;
        default:
          break;
      }
    };

    var down_action2 = function (event) {
      switch (event.key) {
        case "A":
        case "a":
          //a
          this.moveLeft();
          break;
        case "D":
        case "d":
          //d
          this.deviance_right(1);
          this.moveRight();
          this.setRight(1);
          break;
        case "E":
        case "e":
          //e
          this.deviance_right(0);
          this.moveRight();
          this.setRight(0);
          break;
        default:
          break;
      }
    };

    var release_action2 = function (event) {
      switch (event.key) {
        case "A":
        case "a":
          //a
          this.stopX();
          break;
        case "D":
        case "d":
          //d
          this.stopX();
          break;
        /*
        case "S":
        case "s":
          //s
          this.stopY();
          break;
        case "O":
        case "o":
          //o
          this.stopY();
          break;
          */
        case "E":
        case "e":
          //e
          this.stopX();
          break;
        default:
          break;
      }
    };
    var action11 = action1.bind(player);
    var down_action22 = down_action2.bind(player);
    var release_action22 = release_action2.bind(player);
    this.add_listeners = function () {
      document.addEventListener("keypress", action11, true);
      document.addEventListener("keydown", down_action22, true);
      document.addEventListener("keyup", release_action22, true);
    };
    this.remove_listeners = function () {
      document.removeEventListener("keypress", action11, true);
      document.removeEventListener("keydown", down_action22, true);
      document.removeEventListener("keyup", release_action22, true);
    };
    this.add_listeners();
  }
}

//        case "D":
//        case "d":
//          break;
//        case "E":
//        case "e":
//          break;
//        case "S":
//        case "s":
//          break;
//        case "O":
//        case "o":
//          break;
