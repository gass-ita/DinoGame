let player;
let normObst = [];
let highObst = [];
var normObstPoly = Array.from(Array(10), () => new Array(4));
var highObstPoly = Array.from(Array(10), () => new Array(4));
let seed;

let hit = false;
let score = 0;
let startCount = false;

let imgNormObst;
let imgHighObst;
let ch;

let bg;
let x1;
let x2;

let speed = 1;

let pixelFont;

let slowpow;
let slowf;

function preload() {
  frameRate(60);
  bg = loadImage("assets/img/pippoa.jpg");
  imgNormObst = loadImage("assets/img/lowObst.png");
  imgHighObst = loadImage("assets/img/highObst.png");
  ch = loadImage("assets/img/character.gif");
  pixelFont = loadFont("assets/font/Pixeled.ttf");
}

function setup() {
  textFont(pixelFont);
  //setup variable
  seed = hour() + minute() + second() + day() + month() + year();
  randomSeed(seed);
  score = 0;
  startCount = false;
  hit = false;
  normObst.length = 0;
  highObst.length = 0;
  x1 = 0;
  speed = 1;
  slowpow = 100;
  slowf = true;

  //Canvas
  createCanvas(windowWidth, windowHeight);
  x2 = width;

  //object
  player = new Player(ch);

  loop();
}

function keyPressed() {
  if (key === "r" || key === "R") setup();
}

function death(score) {
  stroke(0, 0, 0);
  strokeWeight(3);
  fill(0, 0, 0, 200);
  rect(0, 0, width, height);
  textSize(width / 20);
  textAlign(CENTER);
  fill(255, 0, 0);
  text("You died!", width / 2, height / 2);
  textSize(width / 40);
  fill(255, 255, 255);
  text("score: " + score, width / 2, height / 2 + width / 40);
  text("seed: " + seed, width / 2, height / 2 + width / 20);
  fill(255, 0, 0);
  text("Press R to restart", width / 2, height / 2 + width / 10);
  fill(0, 0, 0, 0);
  strokeWeight(0);
  noLoop();
}

function printUI(score, FPS) {
  stroke(0, 0, 0);
  strokeWeight(3);
  textSize(width / 50);
  fill(7, 117, 73);
  text("Score: " + score, width * 0.99, 0 + textSize());
  fill(0, 0, 255);
  text("Slow Energy: " + int(slowpow) + "%", width * 0.99, 30 + textSize());
  textAlign(RIGHT, BOTTOM);
  fill(0, 0, 0, 0);
  strokeWeight(0);
}

function coll() {
  //normalObst
  for (let i = 0; i < normObst.length; i++) {
    normObstPoly[i][0] = createVector(
      normObst[i].x, 
      normObst[i].y
    );
    normObstPoly[i][1] = createVector(
      normObst[i].x,
      normObst[i].y + normObst[i].h
    );
    normObstPoly[i][2] = createVector(
      normObst[i].x + normObst[i].w,
      normObst[i].y + normObst[i].h
    );
    normObstPoly[i][3] = createVector(
      normObst[i].x + normObst[i].w,
      normObst[i].y
    );

    if (
      collideRectPoly(player.hbx, player.hby, player.hbw, player.hbh, normObstPoly[i])
    )
      return true;
  }

  //highObst
  for (let i = 0; i < highObst.length; i++) {
    highObstPoly[i][0] = createVector(
      highObst[i].x,
      highObst[i].y + highObst[i].h / 2
    );
    highObstPoly[i][1] = createVector(
      highObst[i].x + highObst[i].w / 2,
      highObst[i].y
    );
    highObstPoly[i][2] = createVector(
      highObst[i].x + highObst[i].w,
      highObst[i].y + highObst[i].h / 2
    );
    highObstPoly[i][3] = createVector(
      highObst[i].x + highObst[i].w / 2,
      highObst[i].y + highObst[i].h
    );
    if (
      collideRectPoly(player.hbx, player.hby, player.hbw, player.hbh, highObstPoly[i])
    )
      return true;
  }
}

function distanceObst(Obst) {
  return (
    Obst.length === 0 || Obst[Obst.length - 1].x <= width / random(1.5, 2.5)
  );
}

function totalDistanceObst() {
  return distanceObst(normObst) && distanceObst(highObst);
}

function draw() {
  imageMode(CORNER);

  image(bg, x1, 0, width, height);
  image(bg, x2, 0, width, height);

  x1 -= (height / 80 + score / 1000) * speed;
  x2 -= (height / 80 + score / 1000) * speed;

  if (x1 < -width+20) {
    x1 = width;
  }
  if (x2 < -width+20) {
    x2 = width;
  }

  if (keyIsDown(65) || keyIsDown(LEFT_ARROW)) player.left();
  if (keyIsDown(68) || keyIsDown(RIGHT_ARROW)) player.right();
  if (keyIsDown(32) || keyIsDown(UP_ARROW)) player.jump();
  player.crouch(keyIsDown(83) || keyIsDown(DOWN_ARROW));
  if (keyIsDown(16) && slowf) {
    if (slowpow > 0 && slowf) {
      speed = 0.5;
      slowpow -= 1;
      fill(0, 0, 255, 20);
      rect(0, 0, width, height);
      fill(0, 0, 0, 0);
    }
    if (slowpow < 2) slowf = false;
  } else {
    if (slowpow < 100) {
      slowpow += 0.5;
    }

    if (slowpow === 100) slowf = true;
    speed = 1;
  }

  if (random(1) < 0.03 && normObst.length + highObst.length < 4)
    if (random(1) < 0.8 && totalDistanceObst())
      normObst.push(new NormalObstacle(imgNormObst, score, speed));
    else if (totalDistanceObst())
      highObst.push(new HighObstacle(imgHighObst, score, speed));


  if (startCount) score++;

  for (let i = normObst.length - 1; i >= 0; i--) {
    if (normObst[i].x < 0 - normObst[i].w) normObst.splice(i, 1);
  }

  for (let i = highObst.length - 1; i >= 0; i--) {
    if (highObst[i].x < 0 - highObst[i].w) highObst.splice(i, 1);
  }

  for (let i = 0; i < highObst.length; i++) {
    highObst[i].show();
    highObst[i].move();
  }

  for (let i = 0; i < normObst.length; i++) {
    normObst[i].show();
    normObst[i].move();
    if (normObst[0].x < player.x && startCount === false) startCount = true;
  }

  printUI(score, int(frameRate()));


  player.show();
  player.gravity(score);

  if (coll()) {
    death(score);
  }
}
