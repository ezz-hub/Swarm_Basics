/* eslint-disable no-undef, no-unused-vars */

const seedX = Math.random();
const seedY = Math.random();
const radX = 0.7;
const radY = 0.6;
let ampX;
let ampY;

const gif = {
  startLoop: 1,
  endLoop: 2,
  fileName: "noiseLoop2x.gif"
};
function setup() {
  createCanvas(300, 300);

  frameRate(60);
  fill(127);
  noStroke();
  createLoop(3, { gif });
  createCanvas(windowWidth, windowHeight);

  TheBallX = [];
  TheBallY = [];
  SpeederX = [];
  SpeederY = [];
  TheChangerGlobalX = [];
  TheChangerGlobalY = [];

  QueenX = windowWidth / 2;
  QueenY = windowHeight / 2;

  TheSignalX = 0;
  TheSignalY = 0;
  Velocity = 1;
  MCC = 255;
  for (let i = 0; i <= 2500; i++) {
    RandomX = Math.random() * windowWidth;
    RandomY = Math.random() * windowHeight;
    TheBallX.push(RandomX);
    TheBallY.push(RandomY);
    SpeederX.push(Velocity);
    SpeederY.push(Velocity);
    TheChangerGlobalX.push(0);
    TheChangerGlobalY.push(0);
  }

  Gravity = 0;

  SpeederQ = Velocity;
  r = 0;
  // Put setup code here
}

function draw() {
  background(0, 0, 0);

  for (let i = 0; i <= 2500; i++) {
    if (
      Math.abs(TheBallX[i]) <= Math.abs(QueenX) + 60 &&
      Math.abs(TheBallX[i]) >= Math.abs(QueenX - 60) &&
      Math.abs(TheBallY[i]) <= Math.abs(QueenY) + 60 &&
      Math.abs(TheBallY[i]) >= Math.abs(QueenY - 60)
    ) {
      MCC = 0;
    }

    if (
      Math.abs(TheBallX[i]) <= Math.abs(QueenX) + 40 &&
      Math.abs(TheBallX[i]) >= Math.abs(QueenX - 40) &&
      Math.abs(TheBallY[i]) <= Math.abs(QueenY) + 40 &&
      Math.abs(TheBallY[i]) >= Math.abs(QueenY - 40)
    ) {
      TheChangerGlobalY[i] = QueenY - SpeederY[i];
      TheChangerGlobalX[i] = QueenX - SpeederX[i];

      for (let z = 0; z <= 2500; z++) {
        if (
          Math.abs(TheChangerGlobalX[i]) <= Math.abs(TheBallX[z]) + 100 &&
          Math.abs(TheChangerGlobalX[i]) >= Math.abs(TheBallX[z] - 100) &&
          Math.abs(TheChangerGlobalY[i]) <= Math.abs(TheBallY[z]) + 100 &&
          Math.abs(TheChangerGlobalY[i]) >= Math.abs(TheBallY[z] - 100)
        ) {
          TheChangerGlobalY[z] = TheBallY[z] - TheChangerGlobalY[i];
          TheChangerGlobalX[z] = TheBallX[z] - TheChangerGlobalX[i];
        }
      }
    }

    TheBallY[i] += Math.random() * SpeederY[i] * 2 + TheChangerGlobalY[i];
    TheBallX[i] += Math.random() * SpeederX[i] * 2 + TheChangerGlobalX[i];

    if (TheBallY[i] >= windowHeight && SpeederY[i] >= 0) {
      SpeederY[i] = -1 * Velocity;
    }

    if (TheBallY[i] <= 0 && SpeederY[i] <= 0) {
      SpeederY[i] = Velocity;
    }

    if (TheBallX[i] >= windowWidth && SpeederX[i] >= 0) {
      SpeederX[i] = -1 * Velocity;
    }

    if (TheBallX[i] <= 0 && SpeederX[i] <= 0) {
      SpeederX[i] = Velocity;
    }
    r++;
    squareColor = color(0, 200, 255);
    squareColor.setAlpha(-20 + 128 * sin(millis() / 1000));
    fill(squareColor);
    circle(TheBallX[i], TheBallY[i], 13);

    fill(0, 200, MCC);
    circle(TheBallX[i], TheBallY[i], 3);
    MCC = 255;
  }

  //The Queen

  QueenY += SpeederQ;
  QueenX += SpeederQ;
  if (QueenY >= windowHeight && SpeederQ[0] >= 0) {
    SpeederQ = -1 * Velocity;
  }

  if (QueenY <= 0 && SpeederQ <= 0) {
    SpeederQ = Velocity;
  }

  if (QueenX >= windowWidth && SpeederQ >= 0) {
    SpeederQ = -1 * Velocity;
  }

  if (QueenX <= 0 && SpeederQ <= 0) {
    SpeederQ = Velocity;
  }
  r++;

  noFill();
  fill(255, 255, 255);
  circle(QueenX, QueenY, 50);
}
// Put drawings here

// This Redraws the Canvas when resized
windowResized = function () {
  resizeCanvas(windowWidth, windowHeight);
};
