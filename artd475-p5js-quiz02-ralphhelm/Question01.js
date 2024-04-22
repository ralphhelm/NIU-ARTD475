
/*
 * Write a Smiley class which draws a simple smiley face 
     (using at least two different drawing primitive shapes).  
 * Use a random color for the main color of the smiley. 
 * Initialize the position to be the center of the canvas.  
 *   (use variables, not hard-coded values, as the size of the canvas may change.)
 * Generate a random speed between -3 and 3 for each direction
 * Move the smiley in both x and y, using those random speeds.
 * Each time the smiley reaches an edge, it should change direction.
 *   (Think bouncing ball example.)

 * Write a P5js sketch with a random generated canvas size between 
 *   400 and 600 in each dimension.  You should be able to reload the page, 
 *   and have a different sized window, and everything still works.
 * Create an array that hold a maximum number of smileys, 
     with maximum initially set to 20 Smiley objects.  
 * Start with just one smiley.  
 * Each time a smiley reaches an edge of the screen, add a new smiley.  
 * When the max number of smileys is reached, reset the program to have just one smiley.

 * Once everyrthing is working, increase the maximum number of smileys to 100.
*/

// create variables keep track of the maximum number of Smileys, and the current number of Smileys.
let maxSmileys = 100;
let numSmileys = 0;

// create a variable that is an array that can hold the maximum number of Smileys.
let smileys = new Array(maxSmileys);

function setup(){
    // Create the canvas with a random size between 400 and 600 in each dimension.
    //    Don't use hardcoded values.
    createCanvas(random(400,600),random(400,600));

    // Add a new Smiley at the beginning of the smiley array, 
    //   and increment the current number of Smileys.
    smileys[0] = new Smiley();
    numSmileys++;
}

function draw(){
    // Clear the background, use a light color other than white, 
    // so we can see where the edges are.
    colorMode(RGB);
    background(220);

    // Loop through all of the current Smileys in the array
    //   That is, how ever many we have created so far.
    for (let i = 0; i < numSmileys; i++) {
        // For each one, display and move it.
        smileys[i].display();
        smileys[i].move();
        //   Then check to see if it has bounced.
        if (smileys[i].didBounce() == true) {
            // If it has, check to see if we have already added the maximum
            // number of Smileys to our array.
            if (numSmileys >= maxSmileys) {
            // If we have, reset the number of Smileys to 0
                numSmileys = 0;
                // FOR FUN: redraw canvas at a new random size
                colorMode(RGB);
                resizeCanvas(random(400,600),random(400,600));
                background(200);
            }
    //      Then add a new Smiley to the current end of the array,
    //      (aka at current new position, not increasing array size)
    //      and increment the number of Smileys in the array.
            smileys[numSmileys] = new Smiley();
            numSmileys++;
        }
    }
}