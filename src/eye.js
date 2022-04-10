export default class Eye {
  constructor(x, y, type) {
    this.type = type;
    this.static_obj = document.getElementById("closed_eye");
    this.beam = document.getElementById("beam");
    this.x = x;
    this.y = y;
    this.open = false;
    this.charge = 0;
    this.shooting = false;
    this.dest = {
      x: 0,
      y: 0
    };
  }
  is_shooting() {
    return this.shooting;
  }
  get_line_eq() {
    return [
      this.x + 60,
      this.y + 60,
      (this.dest.y - this.y - 60) / (this.dest.x - this.x - 60)
    ];
  }
  toggle_eye(on) {
    if (!on) {
      this.open = false;
      this.shooting = false;
    } else {
      this.open = true;
    }
  }
  draw(ctx) {
    ctx.drawImage(this.static_obj, this.x, this.y);
    if (this.shooting) {
      if (this.type === 0) {
        this.dest.x = 960;
        this.dest.y = 0;
      }
      if (this.type === 1) {
        this.dest.x = 0;
        this.dest.y = 500;
      }
      if (this.type === 2) {
        this.dest.x = 480;
        this.dest.y = 0;
      }
      ctx.moveTo(this.x + 60, this.y + 60);
      ctx.lineTo(this.dest.x, this.dest.y);
      ctx.lineWidth = 20;
      ctx.strokeStyle = "red";
      ctx.stroke();
    }
  }

  update(dt) {
    if (dt !== 0) {
      if (this.open) {
        var stage = Math.floor(this.charge / 100);
        switch (stage) {
          case 0:
            this.static_obj = document.getElementById("open_eye");
            this.shooting = false;
            break;
          case 1:
            this.static_obj = document.getElementById("charge_eye1");
            break;
          case 2:
            this.static_obj = document.getElementById("charge_eye2");
            break;
          case 3:
            this.static_obj = document.getElementById("charge_eye3");
            break;
          case 4:
            this.static_obj = document.getElementById("charge_eye4");
            break;
          case 5:
            this.static_obj = document.getElementById("charge_eye5");
            break;
          case 6:
            this.static_obj = document.getElementById("charge_eye6");
            this.shooting = true;
            break;
          default:
            break;
        }
        this.charge++;
        if (this.charge === 701) {
          this.charge = 0;
        }
      } else {
        this.static_obj = document.getElementById("closed_eye");
      }
    }
  }
}
