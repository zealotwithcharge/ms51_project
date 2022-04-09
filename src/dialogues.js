export default class Dialogue {
  constructor(x, y, text, level, handler) {
    this.level = level;
    this.width = this.level.gameWidth - 200;
    this.handler = handler;
    this.height = 100;
    this.x = x;
    this.y = y;
    this.text = text;
    this.index = 0;
    this.cleaned = [];
    this.handler.remove_listeners();
    this.dialoguer = dialogue.bind(this);
    document.addEventListener("keypress", this.dialoguer);
    var splitted = "";
    for (let i = 0; i < this.text.length; i++) {
      splitted = this.text[i].split(";");
      this.cleaned.push(this.clean(splitted));
    }
  }
  draw(ctx) {
    if (this.index < this.cleaned.length) {
      for (let i = 0; i < this.cleaned[this.index].length; i++) {
        ctx.fillText(
          this.cleaned[this.index][i],
          this.x,
          this.y + i * this.height
        );
      }
    }
  }
  update(dt) {
    return;
  }
  next_dialogue() {
    if (this.text[0].localeCompare("You Died") !== 0) {
      this.index++;
      if (this.index === this.text.length) {
        document.removeEventListener("keypress", this.dialoguer);
        this.handler.add_listeners();
        if (this.level.level_id === 3) {
          this.level.gameObjects.pop();
          this.level.setScore(500);
        }
      }
    }
  }
  clean(arr) {
    var new_arr = [];
    var max_char = 45;
    if (this.level.level_id === 3) {
      max_char = 20;
    }
    for (let k = 0; k < arr.length; k++) {
      let super_split = arr[k].split(" ");
      let temper = "";
      for (let a = 0; a < super_split.length; a++) {
        if (temper.length < max_char) {
          temper += super_split[a] + " ";
        } else {
          new_arr.push(temper);
          temper = super_split[a] + " ";
        }
      }
      if (temper !== " ") {
        new_arr.push(temper);
      }
      //new_arr.push(org);
    }
    return new_arr;
  }
}

function dialogue(event) {
  if (event.key === " ") {
    this.next_dialogue();
  }
}
