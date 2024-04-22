/**
 * @course ARTD475
 * 
 * @author Ralph Helm
 * 
 * @assignment Assignment 3
 * 
 * @due 03/04/2024
 * 
 * Practice with functions and classes, with multiple files.
 * A Jar object can be filed with multple Marble objects.
 * Creates a random canvas size each time the page is reloaded.
 * Can add and remove marble objects from the jar.
 * 
 * Spacebar will generate a new Jar.
 */ 

let jar1; // declare a jar object as a global variable.

function setup() {
    // creates a random canvas size each time page is reloaded
    createCanvas(random(350, 600), random(200, 600));
    // uses random and floor to generate random whole int number of marbles
    let marbleCount = floor(random(5,200));
    // initialize Jar object with number of marbles
    // optionally give a desired jar width and height
    jar1 = new Jar(marbleCount);
}

function draw() {
    background(220);
    jar1.display();
    fill("red")
    
    // header text
    textAlign(CENTER);
    textSize(20);
    fill(255,0,0);
    text("Ralph", 100, 30)
    text("Assignment 3:", 100, 50)
    textSize(14);
    fill("black");
    text("Functions + Classes", 100, 70)

    // instructions text
    textAlign(CENTER);
    textSize(20);
    fill("blue");
    text("CONTROLS", width-100, 20)
    textSize(14);
    fill("black");
    text("Up: Add Marble", width-100, 35)
    text("Down: Remove Marble", width-100, 50)
    text("Hold Left: Remove Marbles", width-100, 65)
    text("Hold Right: Add Marbles", width-100, 80)
    text("Spacebar: New Jar", width-100, 95)

    // continuously remove marbles while held
    if (keyIsDown(LEFT_ARROW)) {
        jar1.remove();
    }

  // continuously add marbles while held
    if (keyIsDown(RIGHT_ARROW)) {
        jar1.add();
    }
}

// add or remove a single marble at a time
// or generate a new jar
function keyPressed() {
    if (keyCode === UP_ARROW) {
        jar1.add();
    } else if (keyCode === DOWN_ARROW) {
        jar1.remove();
    }
    else if (keyCode === 32) {  //SpaceBar
       // new jar
        jar1 = new Jar(floor(random(5,200)));
    }
    return false; // prevent default
}