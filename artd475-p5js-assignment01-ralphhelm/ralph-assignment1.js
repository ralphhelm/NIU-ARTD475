/**
 * @course ARTD475
 * 
 * @author Ralph Helm
 * 
 * @assignment Assignment 1
 * 
 * Draws a character and moves them around the screen using the mouse pointer.
 * Pressing a key or mouse button will cycle the background color and increment a counter.
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
let grass;

// initialize helper variables
let counter;
let characterCenter;

/**
 * runs once at startup
 */
function setup() {
  // sets canvas to a minimum of 500x500, up to browser window size
    createCanvas(max(500, windowWidth), max(500, windowHeight));
    background(225);

    frameRate(60);

    // set color variables
    darkFur = color(180,150,90);
    lightFur = color(170,160,110);
    darkNose = color(130,100,130);
    eyeWhite = color(210,210,222);
    mouthRed = color(160,40,40);
    white = color(255,255,255);
    black = color(0,0,0);
    bgColor = color(220, 220, 220);
    grass = color(50,255,50);

    // set helper variables
    counter = 0;
    characterCenter = 250;  // offset to move character to mouse
}

/**
 * runs every frame
 * "main" function
 */
function draw() {
// set mouse pointer variables
mX = mouseX - characterCenter;   // current mouse X with offset
mY = mouseY - characterCenter;   // current mouse Y with offset
pmX = pmouseX - characterCenter; // previous mouse X with offset
pmY = pmouseY - characterCenter; // previous mouse Y with offset

// set draw modes
ellipseMode(CENTER);
rectMode(CENTER);

// draw bg
colorMode(RGB);
background(bgColor);

// draw title text
stroke(black);
strokeWeight(1);
fill(0, 0, 255);
textSize(40);
textAlign(CENTER);
text("Ralph - Assignment 1", width/2, 100);

// draw character
  // legs
  stroke(darkFur);
  strokeWeight(8);
  line(230+mX, 220+mY, 220+pmX, 260+pmY);  // left (with wiggle)
  line(270+mX, 220+mY, 280+pmX, 260+pmY);  // right (with wiggle)

  // arms
  stroke(darkFur);
  strokeWeight(8);
  line(180+mX, 180+mY, 100+pmX, 190+pmY);  // left (with wiggle)
  line(320+mX, 180+mY, 400+pmX, 190+pmY);  // right (with wiggle)

  // body
    // bg
    fill(darkFur);
    noStroke();
    ellipse(250+mX, 180+mY, 140, 80);
    // belly
    fill(lightFur);
    noStroke();
    ellipse(250+mX, 190+mY, 30, 50);

  // head
    // bg
    fill(darkFur);
    noStroke();
    ellipse(250+mX, 100+mY, 300, 140);

  // mouth
    // bg
    fill(black);
    strokeWeight(2);
    stroke(mouthRed);
    triangle(200+mX, 110+mY, 300+mX, 110+mY, 250+mX, 155+mY);
    // tooth
    fill(white);
    strokeWeight(1);
    stroke(black);
    rect(250+mX, 116+mY, 30, 10);

  // left eye
    // bg
    fill(eyeWhite);
    strokeWeight(1);
    stroke(black);
    ellipse(100+mX, 100+mY, 40, 40);
    // pupil (with wiggle)
    fill(black);
    stroke(black);
    ellipse(100+pmX, 100+pmY, 10, 10);

  // right eye
    // bg
    fill(eyeWhite);
    stroke(black);
    ellipse(400+mX, 100+mY, 40, 40);
    // pupil (with wiggle)
    fill(black);
    stroke(black);
    ellipse(400+pmX, 100+pmY, 10, 10);

  // nose
    // bg
    fill(darkNose);
    stroke(black);
    rect(250+mX, 80+mY, 60, 40, 10);
    // left nostril
    fill(black);
    stroke(black);
    ellipse(240+mX, 90+mY, 5, 5);
    // right nostril
    fill(black);
    stroke(black);
    ellipse(260+mX, 90+mY, 5, 5);


// draw grass box
fill(grass);
rect(width/2,height,width,100);  // grass rectangle at bottom

// draw counter text
stroke(black);
noStroke();
fill(0, 0, 0);
textSize(20);
textAlign(LEFT);
text("Times a button has been pressed: " + counter, 10, height - 20);
}

/**
 * runs every time a key is pressed
 * this will change the background color to some random values based on a counter
 */
function keyPressed(){
  // call change background function
  changeBG();
  // increments counter
  counter++;
}

/**
 * runs every time a mouse button is pressed
 * this will change the background color to some random values based on a counter
 */
function mousePressed(){
  // call change background function
  changeBG();
  // increments counter
  counter++;
}
/**
 * sets color of background to random hue, based on counter
 */
function changeBG()
{
  colorMode(HSB);
  bgColor = color((counter*111) % 256, 100, 100);
}