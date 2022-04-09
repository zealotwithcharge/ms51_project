export default class Static {
  constructor(x, y, id) {
    this.id = id;
    this.static_obj = document.getElementById(this.id);
    this.width = this.static_obj.naturalWidth;
    this.height = this.static_obj.naturalHeight;
    this.x = x;
    this.y = y - this.height;
  }
  draw(ctx) {
    ctx.drawImage(this.static_obj, this.x, this.y);
  }
  update(dt) {
    return;
  }
}
