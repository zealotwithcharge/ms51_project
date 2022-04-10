export default class Obstacle {
  constructor(x, y, id) {
    this.id = id;
    this.inter_obj = document.getElementById(this.id);
    this.width = this.inter_obj.naturalWidth;
    this.height = this.inter_obj.naturalHeight;
    this.x = x;
    this.y = y;
  }
  draw(ctx) {
    switch (this.id) {
      case "terrain":
        ctx.drawImage(this.inter_obj, 96, 0, 48, 48, this.x, this.y, 48, 48);
        break;
      case "spike_block":
        ctx.drawImage(this.inter_obj, 0, 0, 54, 52, this.x, this.y, 54, 52);
        break;
      case "restart":
        ctx.drawImage(this.inter_obj, 0, 0, 21, 22, this.x, this.y, 48, 48);
        break;
      default:
        break;
    }
  }
  update(dt) {
    return;
  }
}
