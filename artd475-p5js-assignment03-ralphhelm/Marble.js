// Marble class

class Marble {
    constructor(tempX = 50, tempY = 250, tempC = color(255)) {
        this.x = tempX;
        this.y = tempY;
        this.size = 20;
        this.c = tempC;
  
        this.display = () => {
            ellipseMode(CENTER);
            fill(this.c);
            stroke(0);
            strokeWeight(1);
            ellipse(this.x,this.y,this.size,this.size);
        };
    }
}