class NormalObstacle {
  constructor(imgNormObst, score, speed) {
    this.imgNormObst = imgNormObst;
    this.score = score;
    this.x = width;
    this.w = height / 12;
    this.h = height / 8;
    this.base = height * 0.75 - this.h;
    this.y = this.base;
    this.vx;
  }

  show() {
    imageMode(CORNER, BOTTOM);
    stroke(255, 0, 0);
    strokeWeight(3);
    /*beginShape();
        vertex(
            this.x,
            this.y
        );
        vertex(
            this.x,
            this.y + this.h
        );
        vertex(
            this.x + this.w,
            this.y + this.h
        );
        vertex(
            this.x + this.w,
            this.y
        );
    endShape();
    */
    strokeWeight(0);
    image(this.imgNormObst, this.x, this.y, this.w, this.h);

    this.vx = height / 80 + score / 1000;
  }
  move() {
    this.x -= this.vx * speed;
  }
}
