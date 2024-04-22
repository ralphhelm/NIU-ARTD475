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
*/

// Create a Smiley class. Don't forget appropriate opening and closing curly brackets.
 class Smiley {
    
    // the class should have a constructor 
    // which declares all needed variables and functions
    constructor() {

        // You'll variables for the x and y positions and x and y speeds
        this.x = width/2;
        this.y = height/2;
        this.xSpeed = random(-3,3);
        this.ySpeed = random(-3,3);
        // FOR FUN: angle and angle rotation speed
        this.a = 0;
        this.aSpeed = random(-0.1, 0.1);
        // FOR FUN: helpful size variables
        this.diameter = 80;
        this.radius = this.diameter/2;  // precalculate radius for easier edge detection
        // sets color mode to hue, saturation, brightness with 255 max values
        colorMode(HSB, 255);
        // sets random hue, with full saturation and brightness
        this.headC = color(random(0,255), 255, 255);
        // set mouth color to compliment of head color
        this.mouthC = color((hue(this.headC) + 160) % 256, 255, 255);
        // You'll need a variable to keep track of whether the smiley 
        //    has bounced since the last time we checked.  Initialize it to false.
        this.bounced = false;


        // Write a function which draws your Smiley.
        // Use at least two shapes.
        this.display = () => {
            // setup
            push();
            translate(this.x, this.y);
            rotate(this.a);
            ellipseMode(CENTER);
            stroke('black');
            strokeWeight(5);
            // head
            fill(this.headC);
            ellipse(0,0, this.diameter);
            // eyes
            fill('black');
            ellipse(-14,-10, 10);  // left
            ellipse(14,-10, 10);  // right
            // mouth
            fill(this.mouthC);
            beginShape();
            curveVertex(-20,-100);
            curveVertex(-20,10);
            curveVertex(20,10);
            curveVertex(20,-100);
            endShape();
            line(-20,10, 20,10);
            // reset translation
            pop();
        };

        // Write a function which moves the Smiley, and check to see if it hit an edge.
        // If an edge was hit, change direction, and bounced variable appropriately.
        this.move = () => {
            // update positions
            this.x = this.x + this.xSpeed;
            this.y = this.y + this.ySpeed;
            this.a = (this.a + this.aSpeed) % 360;
            // check x-axis edges
            if (this.x <= 0 + this.radius || this.x >= width - this.radius) {
                this.xSpeed = this.xSpeed * -1;
                this.bounced = true;
            }
            // check y-axis edges
            if (this.y <= 0 + this.radius || this.y >= height - this.radius) {
                this.ySpeed = this.ySpeed * -1;
                this.bounced = true;
            }
        }
        
        // Write the didBounce function, which returns the value of the bounced variable.
        //   However, we want to first reset the bounced variable to false.  
        //   How can we return the current value of the variable, and also reset the value?
        //   If we first say return the current value, we won't be able to reset it.
        //   If we first reset it, we'll lose the current value.
        //   So, we use a temporary variable to hold the current value of bounced.
        //       We then reset the value of bounced to false.
        //       Then, finally, return the value in temporary variable.
        this.didBounce = () => {
            let tempBounced = this.bounced;
            this.bounced = false;
            return tempBounced;
        }
    }
}
