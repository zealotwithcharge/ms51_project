export default class Interface {
  constructor(x, y, id = null, type, text = null) {
    this.id = id;
    this.text = text;
    this.type = type;
    if (this.id !== null) {
      this.inter_obj = document.getElementById(this.id);
    }

    if (this.type === "text") {
      if (this.text !== null) {
        this.width = this.text.length * 53;
      } else {
        this.width = this.inter_obj.innerText.length * 53;
      }

      this.height = 150;
      this.x = x;
      this.y = y;
    } else if (this.type === "image") {
      this.width = this.inter_obj.naturalWidth;
      this.height = this.inter_obj.naturalHeight;
      this.x = x - this.inter_obj.naturalWidth / 2;
      this.y = y - this.inter_obj.naturalHeight / 2;
    }
  }
  draw(ctx) {
    if (this.type === "text") {
      if (this.text !== null) {
        ctx.fillText(this.text, this.x, this.y);
      } else {
        ctx.fillText(this.inter_obj.innerText, this.x, this.y);
      }
    }
    if (this.type === "image") {
      ctx.drawImage(this.inter_obj, this.x, this.y);
    }
  }
  update(dt) {
    return;
  }
  set_score(num) {
    this.text = "Money: $ " + num;
  }
}
