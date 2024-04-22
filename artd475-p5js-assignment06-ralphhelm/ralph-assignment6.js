/**
 * @course ARTD475
 * 
 * @author Ralph Helm
 * 
 * @assignment Assignment 6
 * 
 * @due 04/10/2024
 * 
 * Practice with images
 * Uses virtual "markers" to draw each images
 * continuosuly with a series of squares.
 * 
 * Creates a wiggly, pixelated image.
 * 
 * Press a key for a new image
 */ 

let maxImages = 13; // total number of images
let imageIndex; // currently selected image
let images = new Array(maxImages); 

let markers = new Array();
let markerCount = 500; // number of Marker object

function setup() {
    createCanvas(500, 500);

    // load images into array
    for (let i = 0; i < images.length; i ++ ) {
        images[i] = loadImage( "data/" + i + ".jpg" );
    }

    // create initial marker objects
    for (let j = 0; j < markerCount; j++) {
        markers[j] = new Marker(floor(random(100,400)),floor(random(100,400)));
    }

    // select random image to start
    imageIndex = floor(random(0,13));
}

function draw() {
    // load pixels from current image
    images[imageIndex].loadPixels();

    // update and display all markers
    for (let i = 0; i < markerCount; i++) {
        markers[i].update();
        markers[i].display();
    }

    //draw bottom bar
    noStroke();
    fill(20,80,255);
    rect(0,468,width,height)
    
    // bottom text
    fill(255);
    textSize(16);
    textStyle(BOLD);
    textAlign(LEFT);
    text("IMAGE #" + imageIndex,10,490);
    textAlign(RIGHT);
    text("PRESS ANY KEY FOR NEW IMAGE",490,490)
}

// next image if mouse clicked
function mousePressed() {
    imageIndex = (imageIndex + 1) % maxImages;
}

// next image if key pressed
function keyPressed() {
    imageIndex = (imageIndex + 1) % maxImages;
}

// virtual "marker" that will draw a series of marks 
  // across the canvas, based on the given image
class Marker {
    constructor(x_,y_) {
        this.x = x_;
        this.y = y_;
        this.xSpeed = floor(random(-10,10));
        this.ySpeed = floor(random(-10,10));
        this.size = 5;
        this.r;
        this.g;
        this.b;
        this.loc;
        this.c;

        // updates position and color of marker
        this.update = function() {
            // increment position
            this.x += this.xSpeed;
            this.y += this.ySpeed;

            // reverse if this marker has hit the edge
            if (this.x >= width || this.x <= 0){
                this.xSpeed *= -1;
            }
            if (this.y >= height || this.y <= 0){
                this.ySpeed *= -1;
            }
            // now get corresponding location in image pixel array
            this.loc = this.x*4 + this.y*images[imageIndex].width*4;

            // update color of marker
            this.r = images[imageIndex].pixels[this.loc];
            this.g = images[imageIndex].pixels[this.loc+1];
            this.b = images[imageIndex].pixels[this.loc+2];
            this.c = color(this.r,this.g,this.b);
        };

        // draws a mark from the marker
        this.display = function() {
            // draw individual mark
            noStroke();
            fill(this.c);
            rect(this.x,this.y,this.size,this.size);
        }
    }
}
