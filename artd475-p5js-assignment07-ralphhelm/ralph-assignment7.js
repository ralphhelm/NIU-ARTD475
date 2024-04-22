/**
 * @course ARTD475
 * 
 * @author Ralph Helm
 * 
 * @assignment Assignment 7
 * 
 * @due 04/15/2024
 * 
 * Practice with cameras/video
 * Produces a scann-y, line by line "filter" look
 * Kind of meshes some of the pointalize, mirror, and filter
 * examples we worked through recently.
 */ 


let size = 10;
let draw_per_frame = 100;
let x;
let y;
let scan = 8;

let video;

function setup() {
    createCanvas(320,240);
    background(220);

    x = 0;
    y = 0;

    noStroke();

    video = createCapture(VIDEO);
    video.size(width, height);
    video.hide();

    frameRate(30);
}

function draw() {
    
    for(let i=0; i<draw_per_frame; i++){
        // scan through xy grid
        x = x + scan;
        if (x > width) {
            x = 0;
            y = y + scan;
            if (y > height) {
                x = 0;
                y = 0;
            }
        }

        // get location of point in pixel array
        let loc = x*4 + y*video.width*4;
        
        // look up the RGB color of pixel in camera
        video.loadPixels();
        
        let r = video.pixels[loc];
        let g = video.pixels[loc+1];
        let b = video.pixels[loc+2];
               
        // draw a shape based on pixel value from camera
        fill(r,g,b,100);
        rect(x,y,size,size); 
    }
}