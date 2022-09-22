class Player {
  constructor(ch, speed) {
    //
    this.w = height / 8;
    this.h = height / 5;
    this.hbw = this.w/2.2;
    this.hbh = this.h;
    //
    this.base = height * 0.75 - this.h;
    //
    this.wh = this.w * 0.8;
    this.hh = this.h * 0.98;
    //
    this.x = height / 8;
    this.y = this.base;
    this.hbx = this.x+this.w/4;
    this.hby = this.y;
    //
    this.vy = 0;
    this.vx = 0;
    //
    this.g = height / 1300;
    this.jumpPow = height / 44;
    this.vmove;
    this.ch = ch;
  }

  hitboxcalc(){
    this.hbw = this.w/2.2;
    this.hbh = this.h;
    this.hbx = this.x+this.w/4;
    this.hby = this.y;
  }

  show() {
    rectMode(CORNER);
    stroke(255, 0, 0);
    strokeWeight(3);
    //rect(this.hbx, this.hby, this.hbw, this.hbh);
    image(this.ch, this.x, this.y, this.w, this.h);
    this.y += this.vy;
    this.hby = this.y;
    this.vmove = height / 80 + score / 1000;
    strokeWeight(0);
  }

  jump() {
    if (this.y === this.base) {
      this.vy -= this.jumpPow;
    }
  }

  left() {
    if (this.x > 0) {
      this.x -= this.vmove;
      this.hbx -= this.vmove;
    }
  }

  right() {
    if (this.x < width - this.w) {
      this.x += this.vmove;
      this.hbx += this.vmove;
    }
  }

  crouch(flag) {
    let fcrouch = false;
    let h1;

    if (flag) {
      if (this.y > this.base - this.h / 5) {
        this.h = height / 10;
        this.w = height / 16;
        this.hbw = this.w/2.2;
        this.hbh = this.h;
        this.hbx = this.x+this.w/4;
        this.base = height * 0.75 - this.h;
        this.y = this.base;
        fcrouch = true;
      }
    } else {
      h1 = height / 5;
      this.base = height * 0.75 - h1;
      if (fcrouch) {
        this.y = this.base - h1;
      }

      this.h = h1;
      this.w = height / 8;
      this.hbw = this.w/2.2;
      this.hbh = this.h;
      this.hbx = this.x+this.w/4;
    }
  }

  gravity(score) {
    if (this.y > this.base) {
      this.y = this.base;
      this.vy = 0;
    } else this.vy += this.g;
  }

  sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }
}
