export default class InterfaceInputHandler {
  constructor(obj_id, level, int_obj) {
    this.obj_id = obj_id;
    this.obj = document.getElementById(this.obj_id);
    this.int_obj = int_obj;
    switch (this.obj_id) {
      case "start_game":
        this.prepare_dummy1();
        this.dummy1.addEventListener("click", function () {
          level.next_level();
        });
        break;
      case "q_choice":
        this.prepare_dummy1();
        this.dummy1.addEventListener("click", function () {
          level.start_with_layout(true);
        });
        break;
      case "d_choice":
        this.prepare_dummy2();
        this.dummy2.addEventListener("click", function () {
          level.start_with_layout(false);
        });
        break;
      default:
        break;
    }
  }
  prepare_dummy1() {
    this.dummy1 = document.getElementById("dummy1");
    this.dummy1.style.width = this.int_obj.width + "px";
    this.dummy1.style.height = this.int_obj.height + "px";
    this.dummy1.style.position = "absolute";
    this.dummy1.style.top = this.int_obj.y + "px";
    this.dummy1.style.left = this.int_obj.x + "px";
  }
  prepare_dummy2() {
    this.dummy2 = document.getElementById("dummy2");
    this.dummy2.style.width = this.int_obj.width + "px";
    this.dummy2.style.height = this.int_obj.height + "px";
    this.dummy2.style.position = "absolute";
    this.dummy2.style.top = this.int_obj.y + "px";
    this.dummy2.style.left = this.int_obj.x + "px";
  }
}
