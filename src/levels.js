import Player from "/src/player";
import InputHandler from "/src/input";
import InterfaceInputHandler from "/src/interface_input";
import Interface from "./interface";
import Static from "./statics";
import Obstacle from "./obstacle";
import Dialogue from "./dialogues";
export default class Levels {
  constructor(game, level_id) {
    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;
    this.game = game;
    this.chosen_layout = game.chosen_layout;
    this.pixel_size = game.pixel_size;
    this.gravity = game.gravity;
    this.level_id = level_id;
    this.gameObjects = [];
    this.obstacles = [];
    this.handler = null;
    this.praised = false;
    this.allowance = false;
    this.score_text = "Money: $ ";
    this.keywords = {
      race: ["Qwertydian", "Dvorakian"],
      right: ["D", "E"],
      jump: ["W", ","],
      pound: ["S", "O"]
    };
    // prettier-ignore
    this.level_1 =[
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]];
    // prettier-ignore
    this.level_2 =[
[1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[1,1,1,1,1,1,1,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[1,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[1,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[1,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[1,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[1,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[1,1,0,0,0,0,0,2,2,2,2,2,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[1,1,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[1,1,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[1,1,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[1,1,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[1,1,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]];
  }

  start() {
    switch (this.level_id) {
      case 0:
        this.int_title = new Interface(
          this.gameWidth / 2,
          this.gameHeight / 4,
          "game_title",
          "text"
        );
        this.int_start = new Interface(
          this.gameWidth / 2,
          this.gameHeight / 2,
          "start_game",
          "text"
        );
        new InterfaceInputHandler("start_game", this, this.int_start);
        this.gameObjects = [this.int_title, this.int_start];
        break;
      case 1:
        this.int_qwerty = new Interface(
          this.gameWidth / 4,
          this.gameHeight / 2,
          "q_choice",
          "image"
        );
        this.int_dvorak = new Interface(
          (3 * this.gameWidth) / 4,
          this.gameHeight / 2,
          "d_choice",
          "image"
        );
        new InterfaceInputHandler("q_choice", this, this.int_qwerty);
        new InterfaceInputHandler("d_choice", this, this.int_dvorak);
        this.gameObjects = [this.int_qwerty, this.int_dvorak];
        break;
      case 2:
        if (this.game.chosen_layout === 1) {
          this.elder = new Static(
            (5 * this.gameWidth) / 6,
            this.gameHeight - 48,
            "d_elder"
          );
        } else {
          this.elder = new Static(
            (5 * this.gameWidth) / 6,
            this.gameHeight - 48,
            "q_elder"
          );
        }
        this.create_obstacles(this.level_1);
        this.player = new Player(
          this.game,
          500,
          500,
          this.obstacles,
          2,
          this,
          false,
          this.level_1
        );
        let dialogue = [
          "Hello, fellow " + this.keywords.race[this.chosen_layout] + "!",
          "As a " +
            this.keywords.race[this.chosen_layout] +
            ", you will use '" +
            this.keywords.jump[this.chosen_layout] +
            "' to jump;" +
            "'A' to go left;" +
            "'" +
            this.keywords.pound[this.chosen_layout] +
            "' to ground-pound;" +
            "and '" +
            this.keywords.right[this.chosen_layout] +
            "' to go right.",
          "It's easy to remember because our body actually has all the symbols!",
          "Aren't you glad to be a " +
            this.keywords.race[this.chosen_layout] +
            "?",
          "Try moving around a bit!"
        ];
        this.handler = this.getHandler(this.player);
        this.dialogue = new Dialogue(
          this.gameWidth / 10,
          this.gameHeight / 10,
          dialogue,
          this,
          this.handler
        );
        this.gameObjects.push(this.player);
        this.gameObjects.push(this.elder);
        this.gameObjects.push(this.dialogue);
        break;
      case 3:
        this.create_obstacles(this.level_2);
        this.player = new Player(
          this.game,
          24,
          0,
          this.obstacles,
          3,
          this,
          true,
          this.level_2
        );
        this.handler = this.getHandler(this.player);
        this.gameObjects.push(this.player);
        this.score = this.getScore();
        this.gameObjects.push(this.score);
        if (this.game.deviance !== 5) {
          this.giveAllowance();
        }
        break;
      default:
        break;
    }
  }
  async giveAllowance() {
    sleep(1000);
    var gifty = [
      [
        "Before you start, here's some money to get you going.",
        "Your total money at the end of your journey is super important!",
        "Good luck!"
      ],
      [
        "Wait.",
        "Here's some money to get you started.",
        "Your total money at the end will be important."
      ],
      [
        "Wait.",
        "I was hesitant, but here's some money to get you started.",
        "It'll be important at the end of your journey."
      ]
    ];
    var index = 0;
    switch (this.game.deviance) {
      case 0:
      case 1:
      case 2:
        index = 0;
        break;
      case 3:
        index = 1;
        break;
      case 4:
        index = 2;
        break;
      default:
        break;
    }
    var gift = new Dialogue(
      this.gameWidth / 5,
      this.gameHeight / 10,
      gifty[index],
      this,
      this.handler
    );
    var face = new Static(
      this.gameWidth / 10,
      this.gameHeight / 5,
      this.chosen_layout === 1 ? "d_elder_port" : "q_elder_port"
    );
    this.gameObjects.push(gift);
    this.gameObjects.push(face);
  }
  getHandler(player) {
    return new InputHandler(player);
  }
  removeHandler() {
    this.handler = null;
  }
  update(dt) {
    this.gameObjects.forEach((object) => object.update(dt));
  }
  draw(ctx) {
    this.gameObjects.forEach((object) => object.draw(ctx));
  }
  next_level() {
    this.reset_dummies();
    this.game.next();
  }
  start_with_layout(choice) {
    this.game.set_layout(choice);
    this.next_level();
  }
  reset_dummies() {
    this.dummy1 = document.getElementById("dummy1");
    this.dummy1.style.width = 0;
    this.dummy1.style.height = 0;
    this.dummy1.style.position = "";
    this.dummy1.style.top = 0;
    this.dummy1.style.left = 0;

    this.dummy1.replaceWith(this.dummy1.cloneNode(true));

    this.dummy2 = document.getElementById("dummy2");
    this.dummy2.style.width = 0;
    this.dummy2.style.height = 0;
    this.dummy2.style.position = "";
    this.dummy2.style.top = 0;
    this.dummy2.style.left = 0;
    this.dummy2.replaceWith(this.dummy2.cloneNode(true));
    this.dummy3 = document.getElementById("dummy3");
    this.dummy3.style.width = 0;
    this.dummy3.style.height = 0;
    this.dummy3.style.position = "";
    this.dummy3.style.top = 0;
    this.dummy3.style.left = 0;
    this.dummy3.replaceWith(this.dummy3.cloneNode(true));
  }
  cleanObstacles() {
    for (let i = 0; i < this.obstacles.length; i++) {
      this.obstacles[i][2] = this.obstacles[i][0] + this.obstacles[i][2];
      this.obstacles[i][3] = this.obstacles[i][1] + this.obstacles[i][3];
    }
  }
  delete_obj(obj) {
    this.gameObjects = this.gameObjects.filter(function (value, index, arr) {
      return value !== obj;
    });
  }
  elder_scold(key) {
    let scolding = [
      [
        "Oops! You used '" +
          key +
          "' That's for " +
          this.keywords.race[(this.chosen_layout + 1) % 2] +
          "s.",
        "You're a " + this.keywords.race[this.chosen_layout] + "!",
        "You have to use '" +
          this.keywords.jump[this.chosen_layout] +
          "' to jump;" +
          "'A' to go left;" +
          "'" +
          this.keywords.pound[this.chosen_layout] +
          "' to ground-pound;" +
          "and'" +
          this.keywords.right[this.chosen_layout] +
          "' to go right.",
        "Please try again."
      ],
      [
        "Hey now! You used '" + key + "'",
        "I told you. That's for " +
          this.keywords.race[(this.chosen_layout + 1) % 2] +
          "s.",
        "You're a proud " + this.keywords.race[this.chosen_layout] + "!",
        "You have to use '" +
          this.keywords.jump[this.chosen_layout] +
          "' to jump;" +
          "'A' to go left;" +
          "'" +
          this.keywords.pound[this.chosen_layout] +
          "' to ground-pound;" +
          "and'" +
          this.keywords.right[this.chosen_layout] +
          "' to go right.",
        "Try again."
      ],
      [
        "Stop.",
        "Why did you use '" + key + "'?",
        "You're a " + this.keywords.race[this.chosen_layout] + "!!!!",

        "You have to use '" +
          this.keywords.jump[this.chosen_layout] +
          "' to jump;" +
          "'A' to go left;" +
          "'" +
          this.keywords.pound[this.chosen_layout] +
          "' to ground-pound;" +
          "and'" +
          this.keywords.right[this.chosen_layout] +
          "' to go right.",
        "I'm telling you this for your own sake.",

        "Your journey will be much harder if you don't stop pretending being a " +
          this.keywords.race[(this.chosen_layout + 1) % 2] +
          ".",
        "Try again."
      ],
      [
        "STOP!!",
        "Do you want to be a laughstock?",
        "I'm telling you.",

        "YOU ARE A " +
          this.keywords.race[this.chosen_layout].toUpperCase() +
          ".",
        "I am not going to just watch you throw your life away.",
        "This is your last chance.",
        "You're a " + this.keywords.race[this.chosen_layout] + ".",

        "You have to use '" +
          this.keywords.jump[this.chosen_layout] +
          "' to jump;" +
          "'A' to go left;" +
          "'" +
          this.keywords.pound[this.chosen_layout] +
          "' to ground-pound;" +
          "and'" +
          this.keywords.right[this.chosen_layout] +
          "' to go right.",
        "Again. Remember. I'm not going to take any more of this."
      ],
      [
        "I see.;Do not expect any help from me.",
        "Go past me to leave.",
        "Get out."
      ]
    ];
    if (this.game.deviance !== scolding.length) {
      var scold = new Dialogue(
        this.gameWidth / 10,
        this.gameHeight / 10,
        scolding[this.game.deviance],
        this,
        this.handler
      );
      this.gameObjects.push(scold);
      this.game.deviance++;
      this.praised = false;
      console.log("dev: " + this.game.deviance);
      return false;
    }
    return true;
  }
  praise() {
    if (!this.praised && this.deviance !== 5) {
      let praising = [
        ["Good job!", "Go past me to start your journey."],
        [
          "Good",
          "Remember what I told you.",
          "Go past me to start your journey."
        ],
        [
          "Finally.",
          "Don't let me catch you doing that again.",
          "Go past me to start your journey."
        ]
      ];
      var praise = new Dialogue(
        this.gameWidth / 10,
        this.gameHeight / 10,
        praising[Math.floor(this.game.deviance / 2)],
        this,
        this.handler
      );
      this.praised = true;
      this.gameObjects.push(praise);
      return false;
    } else {
      return true;
    }
  }
  getScore() {
    return new Interface(
      this.gameWidth - 300,
      200,
      undefined,
      "text",
      this.score_text + this.game.score
    );
  }
  create_obstacles(arr) {
    for (let i = 0; i < arr.length; i++) {
      for (let j = 1; j < arr[0].length; j++) {
        (function (i_val, j_val, gameObjects, obstacles, gameHeight) {
          var new_block = null;
          if (arr[i_val][j_val] === 1) {
            new_block = create_floor(
              (j_val - 1) * 48,
              gameHeight - 48 * (arr.length - i_val)
            );
          } else if (arr[i_val][j_val] === 2) {
            new_block = create_spike_block(
              (j_val - 1) * 48,
              gameHeight - 48 * (arr.length - i_val)
            );
          }
          if (arr[i_val][j_val] !== 0) {
            gameObjects.push(new_block);
            obstacles.push([
              (j_val - 1) * 48,
              gameHeight - 48 * (arr.length - i_val),
              48,
              48
            ]);
          }
        })(i, j, this.gameObjects, this.obstacles, this.gameHeight);
      }
    }
    this.cleanObstacles();
  }
  setScore(num) {
    this.game.set_score(num);
    this.score.text = this.score_text + this.game.score;
  }
}
function create_floor(x, y) {
  return new Obstacle(x, y, "terrain");
}
function create_spike_block(x, y) {
  return new Obstacle(x, y, "spike_block");
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
