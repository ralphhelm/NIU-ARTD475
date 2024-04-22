// Jar Class that holds marbles
// defaults to 1 marble if none are given
class Jar {
    constructor(mCount = 1, jarWidth = 400, jarHeight = 700) {
        this.c = color(180,180,255);
        this.w = this.setWidth(jarWidth);
        this.h = this.setHeight(jarHeight);
        this.x = width/2;                    // (centered)
        this.y = height - this.h/2 - 10;     // (canvas height - half jar h - 10px buffer)
        this.mSize = 20;
        this.mCols = floor(this.w/this.mSize);
        this.mRows = floor(this.h/this.mSize);
        this.mCapacity = this.mCols * this.mRows;
        
        // array of possible marble colors
        this.colors = [color('red'),color('blue'),color('black'),color('white')];
        
        // initialize the marbles[] array
        this.marbles = [];
        // if we have enough space
        if (mCount <= this.mCapacity) {
            for (let i = 0; i < mCount; i++) {
                this.add();
            }
        }
        // if we have requested too many marbles
        else {
            for (let i = 0; i < this.mCapacity; i++) {
                this.add();
            } 
        }

    }

    // ensure width is between (100) and (width-60)
    setWidth =(new_w) => {
        if (new_w < 100) {
            return 100;
        }
        else if (new_w >= width-60) {
            return width-60;
        }
        else {
            return new_w;
        }
    };

    // ensure height is between (100) and (height-140)
    setHeight =(new_h) => {
        if (new_h < 100) {
            return 100;
        }
        else if (new_h >= height-140) {
            return height-140;
        }
        else {
            return new_h;
        }
    };

    // removes a marble to the jar
    remove =() => {
        // remove marble only if we have more than 1 left
        if (this.marbles.length > 1) {
            this.marbles.pop();
        }
    };

    // adds a marble to the jar
    add =() => {
        let pos = this.marbles.length;
        // add marble only if we have room
        if (pos < this.mCapacity) {
            // calculate position and color of new marble
            let nextMarbleX = (this.x-this.w/2+this.mSize/2)+(pos%this.mCols)*this.mSize;  // (left edge)+(pos%slots)*size
            let nextMarbleY = (this.y+this.h/2-this.mSize/2)-floor(pos/this.mCols)*this.mSize; // (bottom edge)-(pos/slots)*size
            let nextMarbleC = this.colors[floor(random(0,this.colors.length))];
            
            // add new marble object to end of the array
            this.marbles.push(new Marble(nextMarbleX, nextMarbleY, nextMarbleC));
        }
    };

    // displays the jar
    display =() => {
        rectMode(CENTER);
        // jar glass
        fill(this.c);
        rect(this.x,this.y,this.w,this.h);
        
        // jar lid
        fill(40);
        rect(this.x,this.y-this.h/2-15,this.w+40,30);

        // lid label
        textSize(25);
        fill("white");
        text("Marble Count: " + this.marbles.length, this.x,this.y-this.h/2-5);

        // display all marbles
        for (let i = 0; i < this.marbles.length; i++) {
            this.marbles[i].display();
        }
    };
}