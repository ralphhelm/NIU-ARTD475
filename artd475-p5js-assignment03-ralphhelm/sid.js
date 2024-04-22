/**
 * draws our Sid character
 * 
 * @param sidX current Sid X location
 * @param sidY current Sid Y location
 * @param psidX previous frame Sid X location
 * @param psidX previous frame Sid Y location
 */
function drawSid(sidX, sidY, psidX, psidY) {
    // set draw modes
    ellipseMode(CENTER);
    rectMode(CENTER);
    push();
    scale(1/sidScale)
    translate(width/sidScale,height/sidScale);
  
    // draw character
    // legs
    stroke(darkFur);
    strokeWeight(8);
    line(sidX-20, sidY-30, psidX-30, psidY+10);  // left (with wiggle)
    line(sidX+20, sidY-30, psidX+30, psidY+10);  // right (with wiggle)
  
    // arms
    stroke(darkFur);
    strokeWeight(8);
    line(sidX-70, sidY-70, psidX-150, psidY-60);  // left (with wiggle)
    line(sidX+70, +sidY-70, psidX+150, psidY-60);  // right (with wiggle)
  
    // body
      // bg
      fill(darkFur);
      noStroke();
      ellipse(sidX+0, sidY-70, 140, 80);
      // belly
      fill(lightFur);
      noStroke();
      ellipse(sidX+0, sidY-60, 30, 50);
  
    // head
      // bg
      fill(darkFur);
      noStroke();
      ellipse(sidX+0, sidY-150, 300, 140);
  
    // mouth
      // bg
      fill(black);
      strokeWeight(2);
      stroke(mouthRed);
      triangle(sidX-50, sidY-140, sidX+50, sidY-140, sidX+0, sidY-95);
      // tooth
      fill(white);
      strokeWeight(1);
      stroke(black);
      rect(sidX+0, sidY-134, 30, 10);
  
    // left eyebrows
    strokeWeight(1);
    stroke(black);
    noFill();
    eyeX = -150;
    eyeY = -150;
    for (let i = 1; i < 6; i++) {
      beginShape();
      curveVertex(sidX+eyeX-70,          sidY+eyeY+70);
      curveVertex(sidX+eyeX,             sidY+eyeY);
      curveVertex(psidX+eyeX-(i*8),     psidY+eyeY-60+(i*7));
      curveVertex(psidX+eyeX-100-(i*8), psidY+eyeY+30+(i*10));
      endShape();
    }
  
    // right eyebrows
    strokeWeight(1);
    stroke(black);
    noFill();
    eyeX = 150;
    eyeY = -150;
    for (let i = 1; i < 6; i++) {
      beginShape();
      curveVertex(sidX+eyeX+70,          sidY+eyeY+70);
      curveVertex(sidX+eyeX,             sidY+eyeY);
      curveVertex(psidX+eyeX+(i*8),     psidY+eyeY-60+(i*7));
      curveVertex(psidX+eyeX+100-(i*8), psidY+eyeY+30+(i*10));
      endShape();
    }
  
    // left eye
      // bg
      fill(eyeWhite);
      strokeWeight(1);
      stroke(black);
      ellipse(sidX-150, sidY-150, 40, 40);
      // pupil (with wiggle)
      fill(black);
      stroke(black);
      ellipse(psidX-150, psidY-150, 10, 10);
  
    // right eye
      // bg
      fill(eyeWhite);
      stroke(black);
      ellipse(sidX+150, sidY-150, 40, 40);
      // pupil (with wiggle)
      fill(black);
      stroke(black);
      ellipse(psidX+150, psidY-150, 10, 10);
  
    // nose
      // bg
      fill(darkNose);
      stroke(black);
      rect(sidX+0, sidY-170, 60, 40, 10);
      // left nostril
      fill(black);
      stroke(black);
      ellipse(sidX-10, sidY-160, 5, 5);
      // right nostril
      fill(black);
      stroke(black);
      ellipse(sidX+10, sidY-160, 5, 5);

      pop();
  }