class Marble {
    constructor(marbleX, marbleY, marbleColor, marbleSize = 20) {
        this.x = marbleX;
        this.y = marbleY;
        this.size = marbleSize;
        this.c = marbleColor;
        this.speed = 1;
  
        // draw marble
        this.display = () => {
            ellipseMode(CENTER);
            fill(this.c);
            stroke(0);
            strokeWeight(1);
            ellipse(this.x,this.y,this.size,this.size);
        };

        // update marble position
        this.update = function(edge) {
            // add speed to y
            this.y = this.y + this.speed; 
      
            // add gravity to speed
            this.speed = this.speed + gravity; 
      
            // if square reaches the bottom, reverse speed
            if (this.y >= edge) { 
              this.speed = this.speed * -0.95;  
            } 
        };
    }
}