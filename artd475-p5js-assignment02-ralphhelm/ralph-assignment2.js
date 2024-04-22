/**
 * @course ARTD475
 * 
 * @author Ralph Helm
 * 
 * @assignment Assignment 2
 * 
 * @due 02/21/2024
 * 
 * Incremental update to Assignment 1, utilizing functions, loops, variables and control modes.
 * 
 * Draws a character (with eyebrows now) and moves them around the screen.
 * Pressing a keyboard button will changes to keyboard controls, and
 * Pressing a mouse key will change to mouse controls.
 * Pressing a key or mouse button will cycle the background color and increment a counter.
 * An iceberg floats and moves by itself in the background.
 */ 

// initialize some color variables
let darkFur;
let lightFur;
let darkNose;
let eyeWhite;
let mouthRed;
let white;
let black;

let bgColor;
let barColor;

// initialize helper variables
let img;

let counter;
let mode;
let iceChange;
let iceDirection;

let posX;
let posY;
let prevX;
let prevY;

/**
 * runs once at startup
 */
function setup() {
  // sets canvas to a minimum of 700x500, up to browser window size
  createCanvas(max(700, windowWidth), max(500, windowHeight));
  background(225);

  // loads acorn image for iceberg
  img = loadImage('assets/acorn.png');

  frameRate(60);

  // set color variables
  darkFur = color(180,150,90);
  lightFur = color(170,160,110);
  darkNose = color(130,100,130);
  eyeWhite = color(210,210,222);
  mouthRed = color(160,40,40);
  white = color(255,255,255);
  black = color(0,0,0);

  bgColor = color(220, 220, 220); // changes via changeBG() function
  barColor = color(120,120,255);  // will change based on control mode

  // set helper variables
  counter = 0;
  mode ="Mouse";
  iceChange = 0;
  iceDirection = 1;
}

/**
 * runs every frame
 * "main" function
 */
function draw() {
  // updates position variables
  updateLocation();

  // draw bg
  colorMode(RGB);
  background(bgColor);

  // draw title text first (so it is behind Sid)
  stroke(black);
  strokeWeight(1);
  fill(0, 0, 255);
  textSize(40);
  textAlign(CENTER);
  text("Ralph - Assignment 2", width/2, 100);

  // draw control mode text (still behind Sid)
  stroke(black);
  strokeWeight(5);
  fill(barColor);
  textSize(100);
  textAlign(CENTER);
  text(mode.toUpperCase(), width/2, height/2);

  // draw Iceberg
  drawIceberg();

  // call drawSid() function
  drawSid(posX, posY, prevX, prevY);

  // draw remaining UI elements
  drawUI();

  // slowly drop Sid if in keyboard control mode
  if (mode == "Keyboard") {
    posY = constrain(posY+1,280,height-70);
  }
}

/**
 * runs every time a key is pressed
 * this will change the background color to some random values based on a counter
 * and change Sid's control mode to using the keyboard.
 */
function keyPressed() {
  // changes mode to Keyboard
  mode = "Keyboard";
  barColor = color(255,120,120);

  // call change background function
  changeBG();

  // increments counter
  counter++;
}

/**
 * runs every time a mouse button is pressed
 * this will change the background color to some random values based on a counter
 * and change Sid's control mode to using the mouse.
 */
function mousePressed() {
  // changes mode to Mouse
  mode = "Mouse";
  barColor = color(120,120,255);

  // call change background function
  changeBG();

  // increments counter
  counter++;
}
/**
 * sets color of background to random hue, based on counter
 */
function changeBG() {
  colorMode(HSL);
  // dark colors if mouse mode
  if (mode == "Mouse") {
    bgColor = color((counter*111) % 256, 100, 20);
  }
  // light colors if keyboard mode
  else {
    bgColor = color((counter*111) % 256, 100, 60);
  }
}

/**
 * updates location, based on current control mode
 */
function updateLocation() {
  if (mode == "Mouse")
  {
    // set mouse pointer variables
    posX = mouseX;   // current mouse X
    posY = mouseY;   // current mouse Y
    prevX = pmouseX; // previous mouse X
    prevY = pmouseY; // previous mouse Y  
  }
  else if (mode == "Keyboard")
  {
    prevX = posX;
    prevY = posY;

    if (keyIsDown(LEFT_ARROW)) {
      posX = constrain(posX-5,200,width-200);
    }
  
    if (keyIsDown(RIGHT_ARROW)) {
      posX = constrain(posX+5,200,width-200);
    }
  
    if (keyIsDown(UP_ARROW)) {
      posY = constrain(posY-7,280,height-70);
    }
  
    if (keyIsDown(DOWN_ARROW)) {
      posY = constrain(posY+5,280,height-70);
    }
  } 
}

/**
 * draws our Sid character
 * 
 * @param sidX current Sid X location
 * @param sidY current Sid Y location
 * @param psidX previous frame Sid X location
 * @param psidX previous frame Sid Y location
 */
function drawSid(sidX, sidY, psidX, psidY) {
  // set draw modes
  ellipseMode(CENTER);
  rectMode(CENTER);

  // draw character
  // legs
  stroke(darkFur);
  strokeWeight(8);
  line(sidX-20, sidY-30, psidX-30, psidY+10);  // left (with wiggle)
  line(sidX+20, sidY-30, psidX+30, psidY+10);  // right (with wiggle)

  // arms
  stroke(darkFur);
  strokeWeight(8);
  line(sidX-70, sidY-70, psidX-150, psidY-60);  // left (with wiggle)
  line(sidX+70, +sidY-70, psidX+150, psidY-60);  // right (with wiggle)

  // body
    // bg
    fill(darkFur);
    noStroke();
    ellipse(sidX+0, sidY-70, 140, 80);
    // belly
    fill(lightFur);
    noStroke();
    ellipse(sidX+0, sidY-60, 30, 50);

  // head
    // bg
    fill(darkFur);
    noStroke();
    ellipse(sidX+0, sidY-150, 300, 140);

  // mouth
    // bg
    fill(black);
    strokeWeight(2);
    stroke(mouthRed);
    triangle(sidX-50, sidY-140, sidX+50, sidY-140, sidX+0, sidY-95);
    // tooth
    fill(white);
    strokeWeight(1);
    stroke(black);
    rect(sidX+0, sidY-134, 30, 10);

  // left eyebrows
  strokeWeight(1);
  stroke(black);
  noFill();
  eyeX = -150;
  eyeY = -150;
  for (let i = 1; i < 6; i++) {
    beginShape();
    curveVertex(sidX+eyeX-70,          sidY+eyeY+70);
    curveVertex(sidX+eyeX,             sidY+eyeY);
    curveVertex(psidX+eyeX-(i*8),     psidY+eyeY-60+(i*7));
    curveVertex(psidX+eyeX-100-(i*8), psidY+eyeY+30+(i*10));
    endShape();
  }

  // right eyebrows
  strokeWeight(1);
  stroke(black);
  noFill();
  eyeX = 150;
  eyeY = -150;
  for (let i = 1; i < 6; i++) {
    beginShape();
    curveVertex(sidX+eyeX+70,          sidY+eyeY+70);
    curveVertex(sidX+eyeX,             sidY+eyeY);
    curveVertex(psidX+eyeX+(i*8),     psidY+eyeY-60+(i*7));
    curveVertex(psidX+eyeX+100-(i*8), psidY+eyeY+30+(i*10));
    endShape();
  }

  // left eye
    // bg
    fill(eyeWhite);
    strokeWeight(1);
    stroke(black);
    ellipse(sidX-150, sidY-150, 40, 40);
    // pupil (with wiggle)
    fill(black);
    stroke(black);
    ellipse(psidX-150, psidY-150, 10, 10);

  // right eye
    // bg
    fill(eyeWhite);
    stroke(black);
    ellipse(sidX+150, sidY-150, 40, 40);
    // pupil (with wiggle)
    fill(black);
    stroke(black);
    ellipse(psidX+150, psidY-150, 10, 10);

  // nose
    // bg
    fill(darkNose);
    stroke(black);
    rect(sidX+0, sidY-170, 60, 40, 10);
    // left nostril
    fill(black);
    stroke(black);
    ellipse(sidX-10, sidY-160, 5, 5);
    // right nostril
    fill(black);
    stroke(black);
    ellipse(sidX+10, sidY-160, 5, 5);
}

/**
 * draws most UI elements
 */
function drawUI()
{
  // draw bottom box
  stroke(black);
  strokeWeight(1);
  fill(barColor);
  rect(width/2,height,width,100);  // rectangle at bottom

  // draw bottom counter text
  stroke(black);
  noStroke();
  fill(0, 0, 0);
  textSize(20);
  textAlign(LEFT);
  text("Times a button has been pressed: " + counter, 10, height - 20);

  // draw top box
  stroke(black);
  strokeWeight(1);
  fill(barColor);
  rect(width/2,0,width,100);  // rectangle at top

  // draw top Mode text
  stroke(black);
  noStroke();
  fill(0, 0, 0);
  textSize(20);
  textAlign(LEFT);
  text("CONTROL MODE: " + mode, 10, 30);
}

/**
 * draws a floating, moving iceberg behind Sid
 */
function drawIceberg() {
  // set size of iceberg
  iceW = (7/8)*width;  // 7/8 the width of screen
  iceH = (1/4)*height; // 1/4 of height

  // bounce direction of ice movement
  if (iceChange < -120) {
    iceDirection = 1;
  }
  if (iceChange > 120) {
    iceDirection = -1;
  }
  iceChange = iceChange + iceDirection;

  //draw iceberg
  fill(140, 140, 255);
  strokeWeight(10);
  beginShape();
  vertex((width/2) - (iceW/2), (height) - (iceH+iceChange));
  vertex((width/2) + (iceW/2), (height) - (iceH-iceChange));
  vertex((width/2) + (iceW/2), (height));
  vertex((width/2) - (iceW/2), (height));
  endShape(CLOSE);

  // draws multiple acorns across the ground of the iceberg
  for (i = 0; i < 6; i++) {
    image(img, ((i+1)/8)*width, height-1.3*iceH-iceChange+(.3*i*iceChange), img.width/4, img.height/4);
  }
}