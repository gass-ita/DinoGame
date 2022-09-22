class HighObstacle {
  constructor(imgHighObst, score, speed) {
    this.imgHighObst = imgHighObst;
    this.score = score;
    this.x = width;
    this.w = height / 4.6;
    this.h = height / 20;
    this.base = height * 0.75 - this.h;
    this.y = this.base - height / 5 / 1.8;
    this.vx;
  }

  show() {
    imageMode(CORNER, BOTTOM);
    /* beginShape();
            vertex(
                this.x,
                this.y + this.h/2
            );
            vertex(
                this.x + this.w/2,
                this.y
            );
            vertex(
                this.x+this.w,
                this.y+this.h/2
            );
            vertex(
                this.x + this.w/2,
                this.y+this.h
            );
        endShape(CLOSE);  */
    image(this.imgHighObst, this.x, this.y, this.w, this.h);
    this.vx = height / 80 + score / 1000;
  }

  move() {
    this.x -= this.vx * speed;
  }
}
