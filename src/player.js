export default class Player {
  constructor(game, xx, yy, obstacles, level_id, level, small, level_arr) {
    if (small) {
      this.size_factor = 5 / 10;
    } else {
      this.size_factor = 1;
    }
    this.level_arr = level_arr;
    this.killers = "";
    this.obs = "";
    for (let i = 0; i < level_arr.length; i++) {
      for (let j = 0; j < level_arr[0].length; j++) {
        var temp_set = (function (i_val, j_val) {
          if (level_arr[i_val][j_val] === 1) {
            var obs = "(" + j_val + "," + i_val + "),";
            return [obs];
          } else if (level_arr[i_val][j_val] === 2) {
            var kills = "(" + j_val + "," + i_val + "),";
            return [0, kills];
          } else if (level_arr[i_val][j_val] === 0) {
            return [0];
          }
        })(i, j);
        if (temp_set[0] !== 0) {
          this.obs = this.obs.concat(temp_set[0]);
        } else if (temp_set[1] !== 0) {
          this.killers = this.killers.concat(temp_set[1]);
        }
      }
    }
    this.game = game;
    this.jump_count = 0;
    this.x_input_start = false;
    this.gameHeight = game.gameHeight;
    this.gameWidth = game.gameWidth;
    this.chosen_layout = game.chosen_layout;
    this.pixel_size = game.pixel_size;
    this.level_id = level_id;
    this.level = level;
    //true = qwerty; false = dvorak
    this.right = (this.chosen_layout + 1) % 2;
    this.tail = (this.chosen_layout + 1) % 2;
    this.mouth = (this.chosen_layout + 1) % 2;
    this.logging = false;

    this.gravity = game.gravity;
    this.body_y_acc = 0;
    this.x_acc = 0;

    this.y_acc = this.gravity;

    this.flag = 0;

    this.x_vel = 0;
    this.y_vel = 0;

    this.obstacles = obstacles;
    this.walk_speed = 100;
    this.max_x_vel = 75;
    this.max_y_vel = 100;

    this.jumping = false;
    this.hasLaunched = false;
    this.airborne = false;
    this.d_mouth = document.getElementById("d-mouth");
    this.d_right = document.getElementById("d-right");
    this.d_tail = document.getElementById("d-tail");
    this.q_mouth = document.getElementById("q-mouth");
    this.q_right = document.getElementById("q-right");
    this.q_tail = document.getElementById("q-tail");
    this.left = document.getElementById("left");
    this.shared_body = document.getElementById("shared_body");
    this.col_flag = false;
    this.rights = [this.d_right, this.q_right];
    this.mouths = [this.d_mouth, this.q_mouth];
    this.tails = [this.d_tail, this.q_tail];
    this.y_col = null;
    this.x_col = null;
    this.it_num_x = Math.ceil(
      (this.shared_body.height * this.size_factor) / 30
    );
    this.it_num_y = Math.ceil((this.shared_body.width * this.size_factor) / 30);
    this.div_x = (this.shared_body.height * this.size_factor) / this.it_num_x;
    this.div_y = (this.shared_body.width * this.size_factor) / this.it_num_y;
    this.shifter_x = [];
    this.shifter_y = [];
    for (let i = 0; i < this.it_num_x + 1; i++) {
      this.shifter_x.push(i * this.div_x);
    }
    for (let i = 0; i < this.it_num_y + 1; i++) {
      this.shifter_y.push(i * this.div_y);
    }
    this.position = {
      x: xx,
      y: yy
    };
    this.body_position = {
      x: xx + (this.size_factor * this.shared_body.width) / 2,
      y: yy + (this.size_factor * this.shared_body.height) / 2
    };
  }

  update(dt) {
    if (dt !== 0.0) {
      this.y_acc = this.body_y_acc + this.gravity;
      let temp_x_vel = this.x_vel + this.x_acc / dt;
      let temp_y_vel = this.y_vel + this.y_acc / dt;
      if (temp_x_vel < this.max_x_vel && temp_x_vel > -1 * this.max_x_vel) {
        this.x_vel = temp_x_vel;
      }
      if (temp_y_vel < this.max_y_vel && temp_y_vel > -1 * this.max_y_vel) {
        this.y_vel = temp_y_vel;
      }
      let temp_x = this.position.x + this.x_vel / dt;
      let temp_y = this.position.y + this.y_vel / dt;
      var x_col = false;
      var y_col = false;
      var y_col_below = true;
      var x_col_points = 0.0;
      var y_col_points = 0.0;

      for (let i = 0; i < this.shifter_x.length; i++) {
        let checkpoint_left = [
          Math.floor(temp_x / 48) + 1,
          Math.floor((temp_y - 24 + this.shifter_x[i]) / 48)
        ];
        let checkpoint_right = [
          Math.floor(
            (temp_x + this.shared_body.width * this.size_factor) / 48
          ) + 1,
          Math.floor((temp_y - 24 + this.shifter_x[i]) / 48)
        ];
        if (
          checkpoint_left[0] < 0 ||
          checkpoint_left[1] < 0 ||
          checkpoint_right[0] < 0 ||
          checkpoint_right[1] < 0
        ) {
          continue;
        }
        let arr_val_left = this.level_arr[checkpoint_left[1]][
          checkpoint_left[0]
        ];
        let arr_val_right = this.level_arr[checkpoint_right[1]][
          checkpoint_right[0]
        ];

        if (arr_val_left !== 0 || arr_val_right !== 0) {
          if (arr_val_left === 1 || arr_val_right === 1) {
            x_col_points++;
            if (i !== 0 && i !== this.shifter_x.length - 1) {
              x_col_points += 1.5;
            }
          }
          if (arr_val_left === 2 || arr_val_right === 2) {
          }
        }
      }
      if (x_col_points > 2) {
        x_col = true;
      }
      for (let i = 0; i < this.shifter_y.length; i++) {
        let checkpoint_up = [
          Math.floor((temp_x + this.shifter_y[i]) / 48) + 1,
          Math.floor((temp_y - 24) / 48)
        ];

        let checkpoint_down = [
          Math.floor((temp_x + this.shifter_y[i]) / 48) + 1,
          Math.floor(
            (temp_y - 24 + this.shared_body.height * this.size_factor) / 48
          )
        ];
        if (
          checkpoint_down[0] < 0 ||
          checkpoint_down[1] < 0 ||
          checkpoint_up[0] < 0 ||
          checkpoint_up[1] < 0
        ) {
          continue;
        }
        let arr_val_up = this.level_arr[checkpoint_up[1]][checkpoint_up[0]];
        let arr_val_down = this.level_arr[checkpoint_down[1]][
          checkpoint_down[0]
        ];

        if (arr_val_up !== 0 || arr_val_down !== 0) {
          if (arr_val_up === 1) {
            y_col_below = false;
            y_col_points++;
            if (i !== 0 && i !== this.shifter_y.length - 1) {
              y_col_points += 1.5;
            }
          } else if (arr_val_down === 1) {
            y_col_below = true;
            y_col_points++;
            if (i !== 0 && i !== this.shifter_y.length - 1) {
              y_col_points += 1.5;
            }
          }
          if (arr_val_up === 2 || arr_val_down === 2) {
          }
        }
      }
      if (y_col_points > 2) {
        y_col = true;
        this.jumping = false;
        this.hasLaunched = false;
        this.jump_count = 0;
      }
      if (x_col) {
        this.x_vel = 0;
        this.x_acc = 0;
      }
      if (y_col) {
        if (y_col_below) {
          this.y_body_acc = -1 * this.gravity;
          this.airborne = false;
        } else {
          this.y_body_acc = 0;
          this.airborne = true;
        }
        this.y_vel = 0;
      }
      if (
        temp_x >
        this.gameWidth - (this.size_factor * this.shared_body.width) / 2
      ) {
        this.level.handler.remove_listeners();
        this.game.next();
      }
      if (!x_col) {
        this.position.x = temp_x;
        this.body_position.x = this.body_position.x + this.x_vel / dt;
      }
      if (!y_col) {
        this.airborne = true;
        this.position.y = temp_y;
        this.body_position.y = this.body_position.y + this.y_vel / dt;
      }
      if (!x_col && !y_col) {
        this.col_flag = false;
      }
      this.y_col = y_col;
      this.x_col = x_col;
    }
  }

  draw(ctx) {
    ctx.drawImage(
      this.shared_body,
      0,
      0,
      this.shared_body.width,
      this.shared_body.height,
      this.position.x,
      this.position.y,
      this.shared_body.width * this.size_factor,
      this.shared_body.height * this.size_factor
    );
    ctx.drawImage(
      this.mouths[this.mouth],
      0,
      0,
      this.mouths[this.mouth].width,
      this.mouths[this.mouth].height,
      this.body_position.x - this.pixel_size * 3.5 * this.size_factor,
      this.body_position.y - this.pixel_size * 11.5 * this.size_factor,
      this.mouths[this.mouth].width * this.size_factor,
      this.mouths[this.mouth].height * this.size_factor
    );
    ctx.drawImage(
      this.rights[this.right],
      0,
      0,
      this.rights[this.right].width,
      this.rights[this.right].height,
      this.body_position.x + this.pixel_size * 1.5 * this.size_factor,
      this.body_position.y - this.pixel_size * 4.5 * this.size_factor,
      this.rights[this.right].width * this.size_factor,
      this.rights[this.right].height * this.size_factor
    );
    ctx.drawImage(
      this.tails[this.tail],
      0,
      0,
      this.tails[this.tail].width,
      this.tails[this.tail].height,
      this.body_position.x - this.pixel_size * 6.5 * this.size_factor,
      this.body_position.y + this.pixel_size * 6.5 * this.size_factor,
      this.tails[this.tail].width * this.size_factor,
      this.tails[this.tail].height * this.size_factor
    );
    ctx.drawImage(
      this.left,
      0,
      0,
      this.left.width,
      this.left.height,
      this.body_position.x - this.pixel_size * 9.5 * this.size_factor,
      this.body_position.y - this.pixel_size * 4.5 * this.size_factor,
      this.left.width * this.size_factor,
      this.left.height * this.size_factor
    );
  }

  setRight(right) {
    this.right = right;
  }
  setMouth(mouth) {
    this.mouth = mouth;
  }
  setTail(tail) {
    this.tail = tail;
  }
  moveRight() {
    if (!this.x_input_start) {
      if (this.airborne) {
        this.x_vel = 70;
        this.x_acc = 0;
        this.stopY();
      } else {
        this.x_acc = this.size_factor * this.walk_speed;
        this.x_input_start = true;
      }
    } else {
      if (!this.jumping) {
        this.x_acc = this.size_factor * this.walk_speed;
      } else {
        this.x_acc = (this.size_factor * this.walk_speed) / 3;
      }
    }
  }
  moveLeft() {
    if (!this.x_input_start) {
      if (this.airborne) {
        this.x_vel = -70;
        this.x_acc = 0;
        this.stopY();
      } else {
        this.x_acc = this.size_factor * -1 * this.walk_speed;
        this.x_input_start = true;
      }
    } else {
      if (!this.jumping) {
        this.x_acc = this.size_factor * -1 * this.walk_speed;
      } else {
        this.x_acc = (this.size_factor * (-1 * this.walk_speed)) / 3;
      }
    }
  }
  jump() {
    if (!this.jumping) {
      this.y_vel = -150 * this.size_factor;
      this.body_y_acc = 0;
      this.jumping = true;
      if (this.x_vel !== 0) {
        this.x_vel = (Math.abs(this.x_vel) / this.x_vel) * 5;
      }

      this.x_acc = (Math.abs(this.x_acc) / this.x_acc) * 3;
      this.jump_count++;
      return;
    }
    if (this.jump_count < 2) {
      this.y_vel = -150 * this.size_factor;
      this.body_y_acc = 0;
      this.jumping = true;
      if (this.x_vel !== 0) {
        this.x_vel = (Math.abs(this.x_vel) / this.x_vel) * 5;
      }
      this.x_acc = (Math.abs(this.x_acc) / this.x_acc) * 3;
      this.jump_count++;
    }
    this.flag = 0;
  }
  async deviance_jump(layout) {
    var triggered = true;
    if (this.level_id === 2) {
      if (this.chosen_layout === layout) {
        if (layout === 1) {
          triggered = this.level.elder_scold("W");
        } else {
          triggered = this.level.elder_scold(",");
        }
      } else {
        triggered = this.level.praise();
      }
      if (!triggered) {
        await sleep(150);
        if (this.y_vel !== 0) {
          this.stopY();
        }
      }
    }
  }
  async deviance_pound(layout) {
    var triggered = true;
    if (this.level_id === 2) {
      if (this.chosen_layout === layout) {
        if (layout === 1) {
          triggered = this.level.elder_scold("O");
        } else {
          triggered = this.level.elder_scold("S");
        }
      } else {
        triggered = this.level.praise();
      }
      if (!triggered) {
        await sleep(150);
        if (this.y_vel !== 0) {
          this.stopY();
        }
      }
    }
  }
  async deviance_right(layout) {
    var triggered = true;
    if (this.level_id === 2) {
      if (this.chosen_layout === layout) {
        if (layout === 1) {
          triggered = this.level.elder_scold("D");
        } else {
          triggered = this.level.elder_scold("E");
        }
      } else {
        triggered = this.level.praise();
      }
      if (!triggered) {
        await sleep(150);
        if (this.x_vel !== 0) {
          this.stopX();
        }
      }
    }
  }
  pound() {
    this.y_vel = 30;
    this.body_y_acc = 0;
  }
  stopX() {
    this.x_acc = 0;
    this.x_vel = 0;
    this.x_input_start = false;
  }
  stopY() {
    this.body_y_acc = 0;
    this.y_vel = 0;
    console.log("stopy");
  }
  log() {
    console.log("jumping: " + this.jumping);
    console.log("hasLaunched: " + this.hasLaunched);
    console.log("y_acc: " + this.y_acc);
    console.log("y_vel: " + this.y_vel);
    console.log("y: " + this.position.y);
    console.log("x_acc: " + this.x_acc);
    console.log("x_vel: " + this.x_vel);
    console.log("x: " + this.position.x);
    console.log("body_x: " + this.body_position.x);
    console.log("body_y: " + this.body_position.y);
    console.log("y_body_acc: " + this.body_y_acc);
    console.log("x_col: " + this.x_col);
    console.log("y_col: " + this.y_col);
    console.log(" ");
  }
  restart() {
    this.game.restart();
  }
  col_log(temp_x, temp_y, text = "") {
    if (this.flag < 100) {
      console.log(
        "TL_floored: " +
          "(" +
          Math.floor(temp_x / 48) +
          "," +
          Math.floor(temp_y / 48) +
          "),"
      );
      console.log(
        "BR_floored: " +
          "(" +
          (Math.floor(
            (temp_x + this.shared_body.width * this.size_factor) / 48
          ) +
            1) +
          "," +
          Math.floor(
            (temp_y + this.shared_body.height * this.size_factor) / 48
          ) +
          "),"
      );
      this.flag++;
      console.log(text);
    }
  }
}
/*
      if (!this.flag) {
        console.log(temp_x);
        console.log(temp_y);
        console.log(temp_x + this.shared_body.width);
        console.log(temp_y + this.shared_body.height);
        console.log(
          temp_x > this.obstacles[0][2] &&
            temp_x + this.shared_body.width > this.obstacles[0][2]
        );
        console.log(
          temp_x < this.obstacles[0][0] &&
            temp_x + this.shared_body.width < this.obstacles[0][0]
        );
        console.log(
          temp_y > this.obstacles[0][3] &&
            temp_y + this.shared_body.height > this.obstacles[0][3]
        );
        console.log(
          temp_y < this.obstacles[0][1] &&
            temp_y + this.shared_body.height < this.obstacles[0][1]
        );
        console.log(
          !(
            temp_x > this.obstacles[0][2] &&
            temp_x + this.shared_body.width > this.obstacles[0][2]
          ) ||
            !(
              temp_x < this.obstacles[0][0] &&
              temp_x + this.shared_body.width < this.obstacles[i][0]
            )
        );
      }*/
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
/*
      for (let i = 0; i < this.obstacles.length; i++) {
        if (
          (!(
            temp_x > this.obstacles[i][2] &&
            temp_x + this.size_factor * this.shared_body.width >
              this.obstacles[i][2]
          ) &&
            !(
              temp_x < this.obstacles[i][0] &&
              temp_x + this.size_factor * this.shared_body.width <
                this.obstacles[i][0]
            ) &&
            !(
              temp_y > this.obstacles[i][3] &&
              temp_y + this.size_factor * this.shared_body.height >
                this.obstacles[i][3]
            ) &&
            !(
              temp_y < this.obstacles[i][1] &&
              temp_y + this.size_factor * this.shared_body.height <
                this.obstacles[i][1]
            )) ||
          (temp_x < this.obstacles[i][0] &&
            temp_x + this.size_factor * this.shared_body.width >
              this.obstacles[i][2] &&
            temp_y < this.obstacles[i][1] &&
            temp_y + this.size_factor * this.shared_body.height >
              this.obstacles[i][3])
        ) {
          let x_center = (this.obstacles[i][0] + this.obstacles[i][2]) / 2;
          let y_center = (this.obstacles[i][1] + this.obstacles[i][3]) / 2;
          let half_width = (this.obstacles[i][2] - this.obstacles[i][0]) / 2;
          let half_height = (this.obstacles[i][3] - this.obstacles[i][1]) / 2;
          let rel_x = Math.abs(this.body_position.x - x_center);
          let rel_y = Math.abs(this.body_position.y - y_center);
          if (Math.abs((half_height * rel_x) / half_width) < rel_y) {
            if (!(this.body_position.y - y_center > 0)) {
              if (this.jumping && this.hasLaunched) {
                this.body_y_acc = -1 * this.gravity;
                this.y_vel = 0;
                this.jumping = false;
                this.hasLaunched = false;
                standing = true;
                console.log("1");
              } else if (this.jumping) {
                this.hasLaunched = true;
                console.log("2");
              } else {
                this.body_y_acc = -1 * this.gravity;
                standing = true;
                this.y_vel = 0;
                console.log("3");
              }
            } else {
              this.body_y_acc = 0;
              this.y_vel = 0;
            }

            if (!this.flag) {
              console.log("yy");
              console.log("hh: " + half_height);
              console.log("hw: " + half_width);
              console.log("rx: " + rel_x);
              console.log("ry: " + rel_y);
              console.log("xc: " + x_center);
              console.log("yc: " + y_center);
              console.log(this.obstacles[i]);
              console.log("B: " + Math.abs((half_height * rel_x) / half_width));
              this.log();
              this.flag = true;
            }
          } else {
            this.x_acc = 0;
            this.x_vel = 0;
            if (!this.flag) {
              console.log("xx");
              console.log("hh: " + half_height);
              console.log("hw: " + half_width);
              console.log("rx: " + rel_x);
              console.log("ry: " + rel_y);
              console.log("xc: " + x_center);
              console.log("yc: " + y_center);
              console.log(this.obstacles[i]);
              console.log("B: " + Math.abs((half_height * rel_x) / half_width));
              this.log();
              this.flag = true;
            }
          }
          if (!standing) {
            this.y_body_acc = 0;
            console.log("standing!");
          }*/
/*
        if (
          this.obs.indexOf(
            "(" +
              (Math.floor(temp_x / 48) + 1) +
              "," +
              Math.floor((temp_y - 24 + this.shifter_x[i]) / 48) +
              "),"
          ) !== -1 ||
          this.obs.indexOf(
            "(" +
              (Math.floor(
                (temp_x + this.shared_body.width * this.size_factor) / 48
              ) +
                1) +
              "," +
              Math.floor((temp_y - 24 + this.shifter_x[i]) / 48) +
              "),"
          ) !== -1
        ) {
          x_col_points++;
        }*/
/*
      for (let i = 0; i < this.shifter_y.length; i++) {
        if (
          this.obs.indexOf(
            "(" +
              (Math.floor((temp_x + this.shifter_y[i]) / 48) + 1) +
              "," +
              Math.floor((temp_y - 24) / 48) +
              "),"
          ) !== -1
        ) {
          y_col_points++;
          y_col_below = false;
        }
        if (
          this.obs.indexOf(
            "(" +
              (Math.floor((temp_x + this.shifter_y[i]) / 48) + 1) +
              "," +
              Math.floor(
                (temp_y - 24 + this.shared_body.height * this.size_factor) / 48
              ) +
              "),"
          ) !== -1
        ) {
          y_col_points++;
          y_col_below = true;
        }
      }*/

/*this.col_log(
          temp_x,
          temp_y,
          "checkpoint_left: " +
            checkpoint_left +
            "; checkpoint_right: " +
            checkpoint_right +
            "; arr_val_left: " +
            arr_val_left +
            "; arr_val_right: " +
            arr_val_right
        );*/
