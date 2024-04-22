class Jar {
    constructor(mCount = 1, jarX = 160,jarY = 480, jarWidth = 280, jarHeight = 200, marbleSize = 20, colorSet = 0) {
        this.c = color(180,180,255);
        this.mSize = marbleSize;
        this.w = jarWidth;
        this.h = jarHeight;
        this.x = jarX;
        this.y = jarY;

        // precalculate the jar edges
        this.l = this.x - this.w/2 + (this.mSize/2);
        this.r = this.x + this.w/2 - (this.mSize/2);
        this.u = this.y - this.h/2 + (this.mSize/2);
        this.d = this.y + this.h/2 - (this.mSize/2);
        
        // set array of possible marble colors
        if (colorSet == 0)
            this.colors = [color('red'),color('orange'),color('yellow'),color('green'),color('blue'),color('purple'),color('white')];
        else if (colorSet == 1)
            this.colors = [color(255,0,0,100),color(0,255,0,100),color(0,0,255,100)];
        else if (colorSet == 2)
            this.colors = [color(255,0,0,30),color(0,255,0,30),color(0,0,255,30),color(255,0,0,150),color(0,255,0,150),color(0,0,255,150)];
        else
            this.colors = [color('black'),color('white')];

        // initialize marbles[] array
        this.marbles = [];
        for (let i = 0; i < mCount; i++) {
            let posX = random(this.l, this.r);
            let posY = random(this.u, this.d);
            this.add(posX, posY);
        }
    }

    // remove marble from jar
    remove =() => {
        // only if we have more than 1 left
        if (this.marbles.length > 1) {
            this.marbles.pop();
        }
    };

    // adds marble to jar at coordinates
    add =(new_x, new_y) => {
        // check if marble is within jar
        if (new_x > this.l && new_x < this.r && new_y > this.u && new_y < this.d) {
            // calculate color of new marble
            let new_c = this.colors[floor(random(0,this.colors.length))];
            
            // set marble size
            let new_s = this.mSize;

            // add new marble object to end of the array
            this.marbles.push(new Marble(new_x, new_y, new_c, new_s));
        }
    };

    // moves objects in jar
    move =() => {
        // display all marbles
        for (let i = 0; i < this.marbles.length; i++) {
            this.marbles[i].update(this.d);
        }
    };

    // displays jar
    display =() => {
        rectMode(CENTER);
        // jar glass
        fill(this.c);
        rect(this.x,this.y,this.w,this.h);

        // display all marbles
        for (let i = 0; i < this.marbles.length; i++) {
            this.marbles[i].display();
        }
        
        // jar lid
        fill(40);
        rect(this.x,this.u-15,this.w+40,30);

        // lid label
        textSize(25);
        fill("white");
        text("Marbles: " + this.marbles.length, this.x,this.u-5);
    };
    
    // highlight jar
    highlight =() => {
        // jar lid
        fill("yellow");
        rect(this.x,this.u-15,this.w+40,30);

        // lid label
        textSize(25);
        fill("black");
        text("Marbles: " + this.marbles.length, this.x,this.u-5);
    };

    // change marble count to desired number
    reset =(new_count = 1) => {
        // if we need to remove marbles to reach new_count
        if (new_count < this.marbles.length) {
            for (i = this.marbles.length; i > new_count; i--) {
                this.remove();
            }
            return;
        }
        // if we need to add marbles to reach new_count
        else if (new_count > this.marbles.length) {
            for (i = this.marbles.length; i < new_count; i++) {
                let posX = random(this.l, this.r);
                let posY = random(this.u, this.d);
                this.add(posX, posY);
            }
            return;
        }
        // same number of marbles we already have
        else {
            return;
        }
    };
}