/**
 * @course ARTD475
 * 
 * @author Ralph Helm
 * 
 * @assignment Assignment 4
 * 
 * @due 03/06/2024
 * 
 * More practice of arrays of objects.
 * Array of multiple jars, with their own array of marbles.
 * 
 * Interacting with jar closest to mouse.
 * 
 * Arrow keys to add and remove marbles.
 * Spacebar will rest marbles to 1.
 * Mouse click will add new marble at mouse position.
 */ 

let jars = [];      // declare an array of jar objects as a global variable.
let gravity = 0.2;  // set gravity
let closest = 0;    // index of closest jar

function setup() {
    createCanvas(800, 600);
    //create some jar objects
    jars[0] = new Jar(30, 480, 210, 500);
    jars[1] = new Jar(30, 100, 300, 100, 80, 20, 1);
    jars[2] = new Jar(123, 180, 480, 280, 200, 5, 3);
    jars[3] = new Jar(8, 480, 450, 200, 200, 40, 2);
    jars[4] = new Jar(6, 670, 450, 120, 100, 10, 3);
}

function draw() {
//------LOGIC------
    // find closest jar
    closest = 0;
    for (let i = 0; i < jars.length; i++) {
        if (dist(jars[i].x, jars[i].y, mouseX, mouseY) < dist(jars[closest].x, jars[closest].y, mouseX, mouseY)) {
            closest = i;
        }
    }
    
//------DRAW STUFF------
    // draw background
    background(220);
    // draw all jars
    for (i = 0; i < jars.length; i++) {
        // move all objects in jar
        jars[i].move();
        // display entire jar, including marbles
        jars[i].display();
        // highlight closest jar
        jars[closest].highlight();
    }
    // draw UI
    drawUI();

//------CONTROLS------
    // continuously remove marbles while held
    if (keyIsDown(LEFT_ARROW)) {
        jars[closest].remove();
    }

    // continuously add marbles while held
    if (keyIsDown(RIGHT_ARROW)) {
        posX = random(jars[closest].l, jars[closest].r)
        posY = random(jars[closest].u, jars[closest].d);
        jars[closest].add(posX, posY);
    }

}

// add marble at mouse click
function mousePressed() {
    // add marble at mouse position to closest jar
    jars[closest].add(mouseX, mouseY);
    return false; //prevent default
}

// add or remove a single marble at a time
// or rest marble count
function keyPressed() {
    if (keyCode === UP_ARROW) {
        posX = random(jars[closest].l, jars[closest].r)
        posY = random(jars[closest].u, jars[closest].d);
        jars[closest].add(posX, posY);
    } else if (keyCode === DOWN_ARROW) {
        jars[closest].remove();
    }
    else if (keyCode === 32) {  //SpaceBar
       // rest marble count to 1
        jars[closest].reset(1); 
    }
    return false; // prevent default
}

function drawUI() {
    // header text
    fill("red")
    textAlign(CENTER);
    textSize(20);
    fill(255,0,0);
    text("Ralph", 480, 30)
    text("Assignment 4:", 480, 50)
    textSize(14);
    fill("black");
    text("Object Arrays with Interaction", 480, 70)

    // instructions text
    textAlign(CENTER);
    textSize(20);
    fill("blue");
    text("CONTROLS", 100, 30)
    textSize(14);
    fill("black");
    text("Up: Add Marble", 100, 45)
    text("Down: Remove Marble", 100, 60)
    text("Hold Left: Remove Marbles", 100, 75)
    text("Hold Right: Add Marbles", 100, 90)
    text("Spacebar: Reset Marbles", 100, 105)
    text("Mouse Click: Add Marble", 100, 145)
}