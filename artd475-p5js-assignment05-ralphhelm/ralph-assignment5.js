/**
 * @course ARTD475
 * 
 * @author Ralph Helm
 * 
 * @assignment Assignment 5
 * 
 * @due 03/27/2024
 * 
 * Practice with recursive functions
 */ 

let time=0;
let increment = 1;
let colorChannel = 0;
let circleColor;

function setup() {
    // create canvas
    createCanvas(600, 600);

    // initial background to black
    background(0);
}

function draw() {
    //we don't reset background on purpose for additive effect

    // set origin to center
    translate(width/2, height/2);

    // rotate entire image slowly over time
    rotate(time/200);

    // call recursive function for current frame
    recursiveCircles(time);

    // increment "time"
    time += increment;

    // reset time if big
    if (time > 250) {
        time = 0;
        // change to next color channel if we reset (red, green, blue)
        colorChannel = (colorChannel + 1) % 3;
    }
}

function recursiveCircles(size) {
    //setup
    ellipseMode(CENTER);
    noStroke();

    //base case
    if (size < 2) {
        return;
    }

    //draw circles
    // number of circles depends on part of the recursive stack we are in
    for (i = 0; i < size; i++) {
        // change color from black to fully saturated, in current color channel
        if (colorChannel == 0) {
            circleColor = color(map(i,0,size,0,255),0 ,0);
        }
        else if (colorChannel == 1) {
            circleColor = color(0, map(i,0,size,0,255), 0);
        }
        else if (colorChannel == 2) {
            circleColor = color(0, 0, map(i,0,size,0,255));
        }
        // set color of next circle
        fill(circleColor);
        // set position of next circle
        x = 5 * i * cos(i);
        y = 5 * i * sin(i);
        // draw circle
        ellipse(x,y,size);
    }
    //recursive call
    recursiveCircles(size-15);
}